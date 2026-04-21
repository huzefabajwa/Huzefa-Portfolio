"use client";

import { useState } from "react";
import { AdminCard, AdminInput, AdminTextarea, SaveButton } from "../ui";
import { Link, Github, Linkedin, Code2, ExternalLink } from "lucide-react";

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

      {/* Social Links */}
      <AdminCard title="Social & Contact Links" subtitle="URLs that appear as buttons and icons on your portfolio">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {links.map(({ name, label, icon: Icon, placeholder }) => (
            <div key={name} className="flex flex-col gap-2">
              <label className="text-xs font-semibold uppercase tracking-widest flex items-center gap-2"
                style={{ color: "#8DA0BC" }}>
                <Icon size={12} />
                {label}
              </label>
              <input
                type="url"
                name={name}
                value={formData[name] || ""}
                onChange={e => update(e.target.name, e.target.value)}
                placeholder={placeholder}
                className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "#F0F6FF", fontFamily: "inherit" }}
                onFocus={e => { e.target.style.borderColor = "#00A1E0"; e.target.style.boxShadow = "0 0 0 3px rgba(0,161,224,0.1)"; }}
                onBlur={e => { e.target.style.borderColor = "rgba(255,255,255,0.08)"; e.target.style.boxShadow = "none"; }}
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