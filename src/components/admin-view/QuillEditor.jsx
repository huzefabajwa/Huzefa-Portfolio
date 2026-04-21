"use client";

/**
 * QuillEditor — custom wrapper around quill@1.3.7 that avoids react-quill's
 * deprecated ReactDOM.findDOMNode call (broken in React 18).
 *
 * Usage:
 *   <QuillEditor value={html} onChange={setHtml} placeholder="Write here..." />
 */

import { useEffect, useRef, useCallback } from "react";

const TOOLBAR_ID = "quill-toolbar-custom";

const TOOLBAR_HTML = `
<div id="${TOOLBAR_ID}" style="
  background: rgba(12,24,41,0.9);
  border: 1px solid rgba(255,255,255,0.08);
  border-bottom: none;
  border-radius: 12px 12px 0 0;
  padding: 6px 8px;
  display: flex;
  flex-wrap: wrap;
  gap: 2px;
  align-items: center;
">
  <select class="ql-header">
    <option value="2">Heading 2</option>
    <option value="3">Heading 3</option>
    <option value="">Normal</option>
  </select>
  <button class="ql-bold"     title="Bold"></button>
  <button class="ql-italic"   title="Italic"></button>
  <button class="ql-underline" title="Underline"></button>
  <button class="ql-strike"   title="Strike"></button>
  <span style="width:1px;height:20px;background:rgba(255,255,255,0.1);margin:0 4px;"></span>
  <button class="ql-list" value="ordered"  title="Numbered list"></button>
  <button class="ql-list" value="bullet"   title="Bullet list"></button>
  <span style="width:1px;height:20px;background:rgba(255,255,255,0.1);margin:0 4px;"></span>
  <button class="ql-blockquote"   title="Blockquote"></button>
  <button class="ql-code-block"   title="Code block"></button>
  <span style="width:1px;height:20px;background:rgba(255,255,255,0.1);margin:0 4px;"></span>
  <button class="ql-link"         title="Link"></button>
  <button class="ql-clean"        title="Clear formatting"></button>
</div>
`;

export default function QuillEditor({ value, onChange, placeholder = "Write your project description here..." }) {
  const wrapperRef = useRef(null);
  const quillRef   = useRef(null);
  const isUpdating = useRef(false);

  // Inject CSS once
  useEffect(() => {
    if (document.getElementById("quill-theme-css")) return;
    const link = document.createElement("link");
    link.id   = "quill-theme-css";
    link.rel  = "stylesheet";
    link.href = "https://cdn.quilljs.com/1.3.7/quill.snow.css";
    document.head.appendChild(link);

    const style = document.createElement("style");
    style.id = "quill-crm-overrides";
    style.textContent = `
      .ql-container {
        background: rgba(12,24,41,0.7) !important;
        border: 1px solid rgba(255,255,255,0.08) !important;
        border-top: none !important;
        border-radius: 0 0 12px 12px !important;
        font-family: 'Inter', system-ui, sans-serif !important;
        min-height: 220px;
      }
      .ql-editor {
        color: #C5D5E8 !important;
        font-size: 0.9rem !important;
        line-height: 1.8 !important;
        padding: 16px !important;
        min-height: 200px;
        cursor: text;
      }
      .ql-editor.ql-blank::before {
        color: #3D5170 !important;
        font-style: italic;
      }
      .ql-toolbar.ql-snow { border: none !important; padding: 0 !important; }
      .ql-toolbar button, .ql-toolbar .ql-picker-label { color: #8DA0BC !important; }
      .ql-toolbar button:hover, .ql-toolbar button.ql-active { color: #00A1E0 !important; }
      .ql-toolbar button svg .ql-stroke { stroke: #8DA0BC !important; }
      .ql-toolbar button:hover svg .ql-stroke,
      .ql-toolbar button.ql-active svg .ql-stroke { stroke: #00A1E0 !important; }
      .ql-toolbar button svg .ql-fill { fill: #8DA0BC !important; }
      .ql-toolbar button:hover svg .ql-fill,
      .ql-toolbar button.ql-active svg .ql-fill { fill: #00A1E0 !important; }
      .ql-toolbar .ql-picker { color: #8DA0BC !important; }
      .ql-toolbar .ql-picker-options {
        background: #0C1829 !important;
        border: 1px solid rgba(255,255,255,0.08) !important;
        border-radius: 8px !important;
      }
      .ql-toolbar .ql-picker-item:hover,
      .ql-toolbar .ql-picker-item.ql-selected { color: #00A1E0 !important; }
      .ql-editor blockquote {
        border-left: 3px solid #00A1E0 !important;
        color: #8DA0BC !important;
        padding-left: 14px !important;
        margin: 8px 0 !important;
      }
      .ql-editor pre.ql-syntax, .ql-editor code {
        background: rgba(0,161,224,0.08) !important;
        color: #00D4AA !important;
        border-radius: 6px !important;
      }
      .ql-editor h2 { color: #F0F6FF !important; font-size: 1.3em; font-weight: 700; margin-bottom: 6px; }
      .ql-editor h3 { color: #8DA0BC !important; font-size: 1.1em; font-weight: 600; }
      .ql-editor li { color: #C5D5E8 !important; }
      .ql-editor strong { color: #F0F6FF !important; font-weight: 700; }
      .ql-editor a { color: #00A1E0 !important; }
      .ql-tooltip {
        background: #0C1829 !important;
        border: 1px solid rgba(0,161,224,0.3) !important;
        color: #F0F6FF !important;
        border-radius: 8px !important;
        box-shadow: 0 8px 32px rgba(0,0,0,0.5) !important;
      }
      .ql-tooltip input[type=text] {
        background: rgba(255,255,255,0.04) !important;
        border: 1px solid rgba(255,255,255,0.12) !important;
        color: #F0F6FF !important;
        border-radius: 6px !important;
        outline: none !important;
      }
    `;
    document.head.appendChild(style);
  }, []);

  // Init Quill once
  useEffect(() => {
    if (!wrapperRef.current || quillRef.current) return;

    // Build toolbar + editor container
    const container = wrapperRef.current;
    container.innerHTML = TOOLBAR_HTML + `<div id="quill-editor-area"></div>`;

    import("quill").then(({ default: Quill }) => {
      const editorEl = container.querySelector("#quill-editor-area");
      if (!editorEl) return;

      const quill = new Quill(editorEl, {
        theme:   "snow",
        modules: {
          toolbar: `#${TOOLBAR_ID}`,
        },
        formats: [
          "header", "bold", "italic", "underline", "strike",
          "color", "background", "list", "bullet",
          "blockquote", "code-block", "link",
        ],
        placeholder,
      });

      quillRef.current = quill;

      // Set initial content
      if (value) {
        quill.clipboard.dangerouslyPasteHTML(value);
      }

      // Listen for changes
      quill.on("text-change", () => {
        if (isUpdating.current) return;
        const html = quill.root.innerHTML;
        onChange?.(html === "<p><br></p>" ? "" : html);
      });
    });

    return () => {
      quillRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Sync external value changes (e.g., clearing the form)
  useEffect(() => {
    const quill = quillRef.current;
    if (!quill) return;
    const current = quill.root.innerHTML;
    const norm = (s) => (s === "<p><br></p>" ? "" : s || "");
    if (norm(current) !== norm(value)) {
      isUpdating.current = true;
      quill.clipboard.dangerouslyPasteHTML(value || "");
      isUpdating.current = false;
    }
  }, [value]);

  return (
    <div ref={wrapperRef} style={{ borderRadius: 12, overflow: "visible" }} />
  );
}
