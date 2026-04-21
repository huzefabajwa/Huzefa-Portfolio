"use client";

import { useState, useRef, useCallback } from "react";
import { AdminCard, AdminInput, SaveButton } from "../ui";
import { Link, Github, Linkedin, Code2, ExternalLink, Upload, X, Loader2, Image as ImageIcon } from "lucide-react";

/* ─── Photo Upload ────────────────────────────────────────────────── */
function PhotoUpload({ value, onChange }) {
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
      if (data.success) onChange(data.url);
      else setError(data.message || "Upload failed");
    } catch {
      setError("Upload failed — check your connection");
    } finally {
      setUploading(false);
    }
  }

  const onDrop = useCallback((e) => {
    e.preventDefault(); setDrag(false);
    if (e.dataTransfer.files[0]) uploadFile(e.dataTransfer.files[0]);
  }, []); // eslint-disable-line

  return (
    <div className="flex flex-col gap-3">
      <label className="text-xs font-semibold uppercase tracking-widest flex items-center gap-1.5" style={{ color: "#8DA0BC" }}>
        <ImageIcon size={11} /> Profile Photo
      </label>

      {!value ? (
        <div
          onClick={() => inputRef.current?.click()}
          onDrop={onDrop}
          onDragOver={e => { e.preventDefault(); setDrag(true); }}
          onDragLeave={() => setDrag(false)}
          className="flex flex-col items-center justify-center gap-3 rounded-xl transition-all"
          style={{
            height: 160, border: `2px dashed ${drag ? "#00A1E0" : "rgba(255,255,255,0.1)"}`,
            background: drag ? "rgba(0,161,224,0.05)" : "rgba(255,255,255,0.02)",
            cursor: uploading ? "wait" : "pointer",
          }}>
          {uploading ? (
            <><Loader2 size={22} className="animate-spin" style={{ color: "#00A1E0" }} /><span className="text-xs" style={{ color: "#8DA0BC" }}>Uploading...</span></>
          ) : (
            <>
              <div className="flex items-center justify-center w-12 h-12 rounded-xl" style={{ background: "rgba(0,161,224,0.12)", border: "1px solid rgba(0,161,224,0.3)" }}>
                <Upload size={20} style={{ color: "#00A1E0" }} />
              </div>
              <div className="text-center">
                <p className="text-xs font-semibold" style={{ color: "#8DA0BC" }}>Click or drag & drop your photo</p>
                <p className="text-[10px] mt-0.5" style={{ color: "#3D5170" }}>JPG, PNG, WebP — max 10 MB</p>
              </div>
            </>
          )}
          <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={e => e.target.files[0] && uploadFile(e.target.files[0])} />
        </div>
      ) : (
        <div className="relative rounded-xl overflow-hidden group" style={{ border: "1px solid rgba(0,161,224,0.3)", aspectRatio: "1/1", maxWidth: 200, background: "#050D1A" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={value} alt="profile" className="w-full h-full object-cover" />
          <div className="absolute inset-0 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity"
            style={{ background: "rgba(5,13,26,0.75)" }}>
            <button onClick={() => inputRef.current?.click()}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold"
              style={{ background: "rgba(0,161,224,0.2)", border: "1px solid rgba(0,161,224,0.4)", color: "#00A1E0" }}>
              <Upload size={12} /> Replace
            </button>
            <button onClick={() => onChange("")}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold"
              style={{ background: "rgba(255,80,80,0.15)", border: "1px solid rgba(255,80,80,0.3)", color: "#FF6B6B" }}>
              <X size={12} /> Remove
            </button>
          </div>
          <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={e => e.target.files[0] && uploadFile(e.target.files[0])} />
          {uploading && (
            <div className="absolute inset-0 flex items-center justify-center" style={{ background: "rgba(5,13,26,0.7)" }}>
              <Loader2 size={24} className="animate-spin" style={{ color: "#00A1E0" }} />
            </div>
          )}
        </div>
      )}

      {error && (
        <p className="text-xs px-3 py-2 rounded-lg" style={{ color: "#FF6B6B", background: "rgba(255,80,80,0.08)", border: "1px solid rgba(255,80,80,0.2)" }}>
          ⚠ {error}
        </p>
      )}
      <p className="text-xs" style={{ color: "#3D5170" }}>This photo appears in the hero section of your portfolio</p>
    </div>
  );
}

export default function AdminHomeView({ formData, setFormData, handleSaveData }) {
  const [saving, setSaving] = useState(false);

  const update = (name, value) => setFormData(prev => ({ ...prev, [name]: value }));

  async function save() {
    setSaving(true);
    await handleSaveData();
    setSaving(false);
  }

  const links = [
    { name: "hireme",   label: "Hire Me / Upwork Profile URL",   icon: ExternalLink, placeholder: "https://upwork.com/freelancers/..." },
    { name: "upwork",   label: "Upwork URL",                      icon: ExternalLink, placeholder: "https://upwork.com/..." },
    { name: "github",   label: "GitHub URL",                      icon: Github,       placeholder: "https://github.com/..." },
    { name: "linkedin", label: "LinkedIn URL",                    icon: Linkedin,     placeholder: "https://linkedin.com/in/..." },
    { name: "slack",    label: "Slack URL",                       icon: Link,         placeholder: "https://..." },
    { name: "stack",    label: "Stack Overflow URL",              icon: Code2,        placeholder: "https://stackoverflow.com/users/..." },
  ];

  return (
    <div className="flex flex-col gap-6">

      {/* Hero Content */}
      <AdminCard title="Hero Section" subtitle="Main headline and specializations shown in the hero">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <AdminInput label="Your Name / Heading" name="heading" value={formData.heading} onChange={update}
            placeholder="e.g. Huzefa Bajwa" />
          <AdminInput label="Career Summary (comma-separated)" name="summary" value={formData.summary} onChange={update}
            placeholder="Salesforce Consultant, HubSpot Expert, ..."
            hint="Each item appears in the typewriter animation" />
        </div>
      </AdminCard>

      {/* Profile Photo */}
      <AdminCard title="Profile Photo" subtitle="Upload your photo shown in the hero section">
        <PhotoUpload value={formData.imageUrl} onChange={url => update("imageUrl", url)} />
      </AdminCard>

      {/* Social Links */}
      <AdminCard title="Social & Contact Links" subtitle="URLs that appear as buttons and icons on your portfolio">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {links.map(({ name, label, icon: Icon, placeholder }) => (
            <div key={name} className="flex flex-col gap-2">
              <label className="text-xs font-semibold uppercase tracking-widest flex items-center gap-2" style={{ color: "#8DA0BC" }}>
                <Icon size={12} />{label}
              </label>
              <input
                type="url" name={name} value={formData[name] || ""} onChange={e => update(e.target.name, e.target.value)}
                placeholder={placeholder}
                className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "#F0F6FF", fontFamily: "inherit" }}
                onFocus={e => { e.target.style.borderColor = "#00A1E0"; e.target.style.boxShadow = "0 0 0 3px rgba(0,161,224,0.1)"; }}
                onBlur={e  => { e.target.style.borderColor = "rgba(255,255,255,0.08)"; e.target.style.boxShadow = "none"; }}
              />
              {formData[name] && (
                <a href={formData[name]} target="_blank" rel="noopener noreferrer"
                  className="text-xs flex items-center gap-1 w-fit" style={{ color: "#00A1E0" }}>
                  <ExternalLink size={10} /> Preview link
                </a>
              )}
            </div>
          ))}
        </div>
      </AdminCard>

      <div className="flex justify-end">
        <SaveButton onClick={save} loading={saving} />
      </div>
    </div>
  );
}