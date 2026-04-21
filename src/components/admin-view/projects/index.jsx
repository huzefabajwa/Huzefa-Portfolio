"use client";

import { useState, useRef, useCallback } from "react";
import dynamic from "next/dynamic";
import { AdminCard, SaveButton, DeleteButton, StatusBadge } from "../ui";
import { FolderOpen, Github, Globe, Smartphone, X, Upload, Plus, Tag, Image as ImageIcon, ExternalLink, Loader2, Edit2 } from "lucide-react";

// Custom Quill wrapper — avoids react-quill's broken ReactDOM.findDOMNode in React 18
const QuillEditor = dynamic(() => import("../QuillEditor"), {
  ssr: false,
  loading: () => (
    <div className="h-48 rounded-xl flex items-center justify-center"
      style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}>
      <span className="text-sm" style={{ color: "#3D5170" }}>Loading editor...</span>
    </div>
  ),
});

/* ─── Styled text input ─────────────────────────────────────────── */
function StyledInput({ label, name, value, onChange, placeholder, type = "text", hint }) {
  return (
    <div className="flex flex-col gap-2">
      {label && <label className="text-xs font-semibold uppercase tracking-widest" style={{ color: "#8DA0BC" }}>{label}</label>}
      <input
        type={type} name={name} value={value || ""} onChange={e => onChange(e.target.name, e.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
        style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "#F0F6FF", fontFamily: "inherit" }}
        onFocus={e => { e.target.style.borderColor = "#00A1E0"; e.target.style.boxShadow = "0 0 0 3px rgba(0,161,224,0.1)"; }}
        onBlur={e  => { e.target.style.borderColor = "rgba(255,255,255,0.08)"; e.target.style.boxShadow = "none"; }}
      />
      {hint && <p className="text-xs" style={{ color: "#3D5170" }}>{hint}</p>}
    </div>
  );
}

/* ─── Image Upload Slot ─────────────────────────────────────────── */
function ImageUpload({ label, value, onChange, accent = "#00A1E0", multiple = false }) {
  const [uploading, setUploading] = useState(false);
  const [error, setError]         = useState("");
  const [drag, setDrag]           = useState(false);
  const inputRef = useRef(null);

  async function uploadFile(file) {
    if (!file) return;
    setError("");
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res  = await fetch("/api/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (data.success) {
        onChange(data.url);
      } else {
        setError(data.message || "Upload failed");
      }
    } catch {
      setError("Upload failed — check your connection");
    } finally {
      setUploading(false);
    }
  }

  function handleFiles(files) {
    if (!files || files.length === 0) return;
    uploadFile(files[0]);
  }

  const onDrop = useCallback((e) => {
    e.preventDefault();
    setDrag(false);
    handleFiles(e.dataTransfer.files);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const onDragOver = (e) => { e.preventDefault(); setDrag(true); };
  const onDragLeave = () => setDrag(false);

  return (
    <div className="flex flex-col gap-2">
      <label className="text-xs font-semibold uppercase tracking-widest flex items-center gap-1.5" style={{ color: "#8DA0BC" }}>
        <ImageIcon size={11} />{label}
      </label>

      {/* Drop zone / button */}
      {!value ? (
        <div
          onClick={() => inputRef.current?.click()}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          className="relative flex flex-col items-center justify-center gap-3 rounded-xl transition-all"
          style={{
            height: 120,
            border: `2px dashed ${drag ? accent : "rgba(255,255,255,0.1)"}`,
            background: drag ? `${accent}08` : "rgba(255,255,255,0.02)",
            cursor: uploading ? "wait" : "pointer",
            boxShadow: drag ? `0 0 20px ${accent}18` : "none",
            transition: "all 0.2s ease",
          }}
        >
          {uploading ? (
            <>
              <Loader2 size={22} className="animate-spin" style={{ color: accent }} />
              <span className="text-xs" style={{ color: "#8DA0BC" }}>Uploading...</span>
            </>
          ) : (
            <>
              <div className="flex items-center justify-center w-10 h-10 rounded-xl"
                style={{ background: `${accent}15`, border: `1px solid ${accent}30` }}>
                <Upload size={18} style={{ color: accent }} />
              </div>
              <div className="text-center">
                <p className="text-xs font-semibold" style={{ color: "#8DA0BC" }}>
                  Click to upload <span style={{ color: accent }}>or drag & drop</span>
                </p>
                <p className="text-[10px] mt-0.5" style={{ color: "#3D5170" }}>PNG, JPG, WebP — max 10 MB</p>
              </div>
            </>
          )}
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={e => handleFiles(e.target.files)}
          />
        </div>
      ) : (
        /* Preview with replace/remove buttons */
        <div className="relative rounded-xl overflow-hidden group"
          style={{ border: `1px solid ${accent}30`, aspectRatio: "16/9", background: "#050D1A" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={value} alt="preview" className="w-full h-full object-cover" />
          {/* Overlay on hover */}
          <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            style={{ background: "rgba(5,13,26,0.75)", backdropFilter: "blur(4px)" }}>
            <button
              onClick={() => inputRef.current?.click()}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all hover:scale-105"
              style={{ background: `${accent}25`, border: `1px solid ${accent}50`, color: accent }}>
              <Upload size={13} /> Replace
            </button>
            <button
              onClick={() => onChange("")}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all hover:scale-105"
              style={{ background: "rgba(255,80,80,0.15)", border: "1px solid rgba(255,80,80,0.3)", color: "#FF6B6B" }}>
              <X size={13} /> Remove
            </button>
          </div>
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={e => handleFiles(e.target.files)}
          />
          {/* Upload spinner if replacing */}
          {uploading && (
            <div className="absolute inset-0 flex items-center justify-center" style={{ background: "rgba(5,13,26,0.7)" }}>
              <Loader2 size={28} className="animate-spin" style={{ color: accent }} />
            </div>
          )}
        </div>
      )}

      {error && (
        <p className="text-xs flex items-center gap-1.5 px-3 py-2 rounded-lg"
          style={{ color: "#FF6B6B", background: "rgba(255,80,80,0.08)", border: "1px solid rgba(255,80,80,0.2)" }}>
          ⚠ {error}
        </p>
      )}
    </div>
  );
}

/* ─── Tags input ────────────────────────────────────────────────── */
function TagsInput({ value = [], onChange }) {
  const [input, setInput] = useState("");

  function addTag(e) {
    e.preventDefault();
    const tag = input.trim();
    if (tag && !value.includes(tag)) onChange([...value, tag]);
    setInput("");
  }

  return (
    <div className="flex flex-col gap-2">
      <label className="text-xs font-semibold uppercase tracking-widest flex items-center gap-1.5" style={{ color: "#8DA0BC" }}>
        <Tag size={11} />Tags / Tech Stack Chips
      </label>
      <div className="flex flex-wrap gap-2 p-3 rounded-xl min-h-[48px]"
        style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}>
        {value.map((tag, i) => (
          <span key={i} className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold"
            style={{ background: "rgba(0,161,224,0.12)", border: "1px solid rgba(0,161,224,0.25)", color: "#00A1E0" }}>
            {tag}
            <button onClick={() => onChange(value.filter(t => t !== tag))} className="hover:text-red-400 transition-colors"><X size={10} /></button>
          </span>
        ))}
        <form onSubmit={addTag} className="flex items-center">
          <input value={input} onChange={e => setInput(e.target.value)}
            placeholder={value.length === 0 ? "Type tag and press Enter..." : "Add more..."}
            className="text-xs outline-none bg-transparent px-1"
            style={{ color: "#F0F6FF", minWidth: 120 }} />
        </form>
      </div>
      <p className="text-xs" style={{ color: "#3D5170" }}>Press Enter to add each tag (e.g. Salesforce, Apex, LWC)</p>
    </div>
  );
}

/* ─── Gallery slots config ──────────────────────────────────────── */
const GALLERY_ACCENTS = ["#00A1E0", "#FF7A59", "#8B5CF6", "#00D4AA"];

/* ─── Main component ────────────────────────────────────────────── */
export default function AdminProjectView({ formData, setFormData, handleSaveData, data, setData, setUpdate }) {
  const [saving,   setSaving]   = useState(false);
  const [deleting, setDeleting] = useState(null);

  const update = (name, value) => setFormData(prev => ({ ...prev, [name]: value }));

  function updateGalleryImage(index, url) {
    const imgs = [...(formData.images || ["", "", "", ""])];
    while (imgs.length < 4) imgs.push("");
    imgs[index] = url;
    setFormData(prev => ({ ...prev, images: imgs }));
  }

  async function save() {
    setSaving(true);
    const cleanImages = (formData.images || []).filter(Boolean);
    setFormData(prev => ({ ...prev, images: cleanImages }));
    await handleSaveData();
    setSaving(false);
  }

  async function handleDelete(id) {
    setDeleting(id);
    try {
      const res    = await fetch("/api/projects/delete", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) });
      const result = await res.json();
      if (result.success) setData(prev => ({ ...prev, projects: prev.projects?.filter(p => p._id !== id) }));
    } catch (e) { console.error(e); }
    setDeleting(null);
  }

  const galleryImages = formData.images || ["", "", "", ""];

  return (
    <div className="flex flex-col gap-6">

      {/* ── Add Project Form ─────────────────────────────────────── */}
      <AdminCard
        title="Add Project"
        subtitle="Showcase a CRM implementation, integration, or digital project"
        action={<StatusBadge count={data?.length || 0} label="projects" color="#00D4AA" />}
      >
        <div className="flex flex-col gap-6">

          {/* Core info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <StyledInput label="Project Name"    name="name"          value={formData.name}          onChange={update} placeholder="e.g. Salesforce CPQ Implementation" />
            <StyledInput label="Project Type"    name="projecttype"   value={formData.projecttype}   onChange={update} placeholder="e.g. Enterprise CRM, Freelance" />
            <StyledInput label="Application Type" name="application"  value={formData.application}   onChange={update} placeholder="e.g. CRM Implementation, Analytics" />
            <StyledInput label="Tech Stack (comma-separated)" name="techstack" value={formData.techstack} onChange={update} placeholder="Salesforce, Apex, LWC, REST API" />
          </div>

          {/* Tags */}
          <TagsInput value={formData.tags || []} onChange={tags => setFormData(prev => ({ ...prev, tags }))} />

          {/* Short description */}
          <StyledInput label="Short Description (card preview)" name="shortdescription" value={formData.shortdescription} onChange={update}
            placeholder="One sentence summary shown on the portfolio card..." />

          {/* Rich text */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold uppercase tracking-widest" style={{ color: "#8DA0BC" }}>Full Description (rich text)</label>
            <p className="text-xs" style={{ color: "#3D5170" }}>Supports bold, italic, bullet points, headings, blockquotes, and code blocks</p>
            <QuillEditor
              value={formData.description || ""}
              onChange={val => update("description", val)}
              placeholder="Write a detailed description of the project — challenge, solution, and impact..."
            />
          </div>

          {/* ── Thumbnail Image upload ── */}
          <ImageUpload
            label="Thumbnail Image (shown on portfolio card)"
            value={formData.imageUrl}
            onChange={val => update("imageUrl", val)}
            accent="#00A1E0"
          />

          {/* Thumbnail Crop Position */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold uppercase tracking-widest" style={{ color: "#8DA0BC" }}>Thumbnail Crop Position</label>
            <p className="text-xs" style={{ color: "#3D5170" }}>Controls which part of the thumbnail is visible on the portfolio card</p>
            <div className="flex gap-2">
              {["top", "center", "bottom"].map(pos => (
                <button key={pos} type="button" onClick={() => update("thumbnailPosition", pos)}
                  className="flex-1 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all capitalize"
                  style={{
                    background: formData.thumbnailPosition === pos ? "rgba(0,161,224,0.18)" : "rgba(255,255,255,0.04)",
                    border:     formData.thumbnailPosition === pos ? "1px solid #00A1E0" : "1px solid rgba(255,255,255,0.08)",
                    color:      formData.thumbnailPosition === pos ? "#00A1E0" : "#3D5170",
                    boxShadow:  formData.thumbnailPosition === pos ? "0 0 12px rgba(0,161,224,0.2)" : "none",
                  }}>
                  {pos}
                </button>
              ))}
            </div>
          </div>

          {/* ── Gallery Images ── */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.06)" }} />
              <span className="text-xs font-bold uppercase tracking-widest px-3" style={{ color: "#3D5170" }}>Gallery Images — up to 4</span>
              <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.06)" }} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[0, 1, 2, 3].map(i => (
                <ImageUpload
                  key={i}
                  label={`Gallery Image ${i + 1}`}
                  value={galleryImages[i] || ""}
                  onChange={url => updateGalleryImage(i, url)}
                  accent={GALLERY_ACCENTS[i]}
                />
              ))}
            </div>
          </div>

          {/* ── Project Links ── */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.06)" }} />
              <span className="text-xs font-bold uppercase tracking-widest px-3" style={{ color: "#3D5170" }}>Project Links (optional)</span>
              <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.06)" }} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {[
                { name: "github",    label: "GitHub URL",        icon: <Github size={11} />,       ph: "https://github.com/..." },
                { name: "weburl",    label: "Live / Web URL",    icon: <Globe size={11} />,        ph: "https://..." },
                { name: "playstore", label: "Play Store URL",    icon: <Smartphone size={11} />,   ph: "https://play.google.com/..." },
                { name: "ios",       label: "iOS / App Store",   icon: <ExternalLink size={11} />, ph: "https://apps.apple.com/..." },
              ].map(f => (
                <div key={f.name} className="flex flex-col gap-2">
                  <label className="text-xs font-semibold uppercase tracking-widest flex items-center gap-1.5" style={{ color: "#8DA0BC" }}>
                    {f.icon} {f.label}
                  </label>
                  <input type="url" name={f.name} value={formData[f.name] || ""} onChange={e => update(e.target.name, e.target.value)}
                    placeholder={f.ph}
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                    style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "#F0F6FF", fontFamily: "inherit" }}
                    onFocus={e => { e.target.style.borderColor = "#00A1E0"; }}
                    onBlur={e  => { e.target.style.borderColor = "rgba(255,255,255,0.08)"; }}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end">
            <SaveButton onClick={save} loading={saving} label="Add Project" />
          </div>
        </div>
      </AdminCard>

      {/* ── Projects List ──────────────────────────────────────── */}
      {data && data.length > 0 && (
        <AdminCard title="Your Projects" subtitle="All project cards visible on your portfolio">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.map((item, i) => {
              const thumb = item.imageUrl || (Array.isArray(item.images) && item.images[0]) || null;
              const galleryCount = (item.images || []).filter(Boolean).length;
              return (
                <div key={item._id || i} className="rounded-xl overflow-hidden group"
                  style={{ background: "rgba(0,212,170,0.03)", border: "1px solid rgba(0,212,170,0.12)" }}>
                  {/* Thumbnail */}
                  <div className="relative w-full h-36 overflow-hidden" style={{ background: "rgba(5,13,26,0.6)" }}>
                    {thumb ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={thumb} alt={item.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        onError={e => { e.target.parentElement.style.display = "none"; }} />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center" style={{ color: "#3D5170" }}>
                        <FolderOpen size={32} />
                      </div>
                    )}
                    {galleryCount > 0 && (
                      <div className="absolute top-2 right-2 flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold"
                        style={{ background: "rgba(0,0,0,0.7)", color: "#00D4AA", border: "1px solid rgba(0,212,170,0.3)" }}>
                        <ImageIcon size={10} /> +{galleryCount}
                      </div>
                    )}
                  </div>
                  {/* Info */}
                  <div className="p-4 flex flex-col gap-2">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-sm truncate" style={{ color: "#F0F6FF" }}>{item.name}</p>
                        <p className="text-xs mt-0.5" style={{ color: "#00D4AA" }}>{item.projecttype}</p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => { setFormData(item); setUpdate(true); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                          className="p-1.5 rounded-lg transition-all"
                          style={{ background: "rgba(0,161,224,0.1)", color: "#00A1E0" }}
                          title="Edit Project"
                        >
                          <Edit2 size={16} />
                        </button>
                        <DeleteButton onClick={() => handleDelete(item._id)} loading={deleting === item._id} />
                      </div>
                    </div>
                    {item.tags && item.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-1">
                        {item.tags.slice(0, 4).map((tag, j) => (
                          <span key={j} className="px-2 py-0.5 rounded-full text-[10px] font-semibold"
                            style={{ background: "rgba(0,161,224,0.1)", border: "1px solid rgba(0,161,224,0.2)", color: "#00A1E0" }}>
                            {tag}
                          </span>
                        ))}
                        {item.tags.length > 4 && <span className="text-[10px]" style={{ color: "#3D5170" }}>+{item.tags.length - 4} more</span>}
                      </div>
                    )}
                    <div className="flex items-center gap-3 mt-1">
                      {item.github    && <a href={item.github}    target="_blank" rel="noopener noreferrer" style={{ color: "#8DA0BC" }}><Github size={14} /></a>}
                      {item.weburl    && <a href={item.weburl}    target="_blank" rel="noopener noreferrer" style={{ color: "#8DA0BC" }}><Globe size={14} /></a>}
                      {item.playstore && <a href={item.playstore} target="_blank" rel="noopener noreferrer" style={{ color: "#8DA0BC" }}><Smartphone size={14} /></a>}
                      <span className="ml-auto text-xs" style={{ color: "#3D5170" }}>{item.techstack?.split(",")[0]?.trim()}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </AdminCard>
      )}
    </div>
  );
}