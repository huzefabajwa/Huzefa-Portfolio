"use client";

import { useState } from "react";
import { AdminCard, AdminInput, AdminTextarea, SaveButton, DeleteButton } from "../ui";
import { TrendingUp, Users, FolderOpen } from "lucide-react";

export default function AdminAboutView({ formData, setFormData, handleSaveData }) {
  const [saving, setSaving] = useState(false);
  const update = (name, value) => setFormData(prev => ({ ...prev, [name]: value }));

  async function save() {
    setSaving(true);
    await handleSaveData();
    setSaving(false);
  }

  return (
    <div className="flex flex-col gap-6">
      <AdminCard title="About Me" subtitle="Your bio shown in the About section">
        <AdminTextarea label="Bio / About Me" name="aboutme" value={formData.aboutme} onChange={update}
          rows={6} placeholder="Tell clients about yourself, your expertise, and what makes you unique..."
          hint="This appears as a featured quote in the About section" />
      </AdminCard>

      <AdminCard title="Stats & Numbers" subtitle="Key metrics displayed as stat chips">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="rounded-xl p-4 flex flex-col gap-3" style={{ background: "rgba(0,161,224,0.06)", border: "1px solid rgba(0,161,224,0.15)" }}>
            <div className="flex items-center gap-2" style={{ color: "#00A1E0" }}>
              <Users size={16} />
              <span className="text-xs font-bold uppercase tracking-wider">Clients Served</span>
            </div>
            <input type="number" name="noofclients" value={formData.noofclients || ""}
              onChange={e => update(e.target.name, e.target.value)}
              className="w-full px-3 py-2.5 rounded-lg text-2xl font-black outline-none"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(0,161,224,0.2)", color: "#00A1E0", fontFamily: "inherit" }}
              onFocus={e => { e.target.style.borderColor = "#00A1E0"; }}
              onBlur={e => { e.target.style.borderColor = "rgba(0,161,224,0.2)"; }}
              placeholder="50" />
          </div>
          <div className="rounded-xl p-4 flex flex-col gap-3" style={{ background: "rgba(255,122,89,0.06)", border: "1px solid rgba(255,122,89,0.15)" }}>
            <div className="flex items-center gap-2" style={{ color: "#FF7A59" }}>
              <FolderOpen size={16} />
              <span className="text-xs font-bold uppercase tracking-wider">Projects Done</span>
            </div>
            <input type="number" name="noofprojects" value={formData.noofprojects || ""}
              onChange={e => update(e.target.name, e.target.value)}
              className="w-full px-3 py-2.5 rounded-lg text-2xl font-black outline-none"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,122,89,0.2)", color: "#FF7A59", fontFamily: "inherit" }}
              onFocus={e => { e.target.style.borderColor = "#FF7A59"; }}
              onBlur={e => { e.target.style.borderColor = "rgba(255,122,89,0.2)"; }}
              placeholder="100" />
          </div>
          <div className="rounded-xl p-4 flex flex-col gap-3" style={{ background: "rgba(139,92,246,0.06)", border: "1px solid rgba(139,92,246,0.15)" }}>
            <div className="flex items-center gap-2" style={{ color: "#8B5CF6" }}>
              <TrendingUp size={16} />
              <span className="text-xs font-bold uppercase tracking-wider">Years Experience</span>
            </div>
            <input type="number" name="yearsofexperience" value={formData.yearsofexperience || ""}
              onChange={e => update(e.target.name, e.target.value)}
              className="w-full px-3 py-2.5 rounded-lg text-2xl font-black outline-none"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(139,92,246,0.2)", color: "#8B5CF6", fontFamily: "inherit" }}
              onFocus={e => { e.target.style.borderColor = "#8B5CF6"; }}
              onBlur={e => { e.target.style.borderColor = "rgba(139,92,246,0.2)"; }}
              placeholder="5" />
          </div>
        </div>
      </AdminCard>

      <AdminCard title="Skills & Expertise" subtitle='Format: "Skill Name 85" (name then percentage, comma-separated)'>
        <AdminTextarea label="Skills" name="skills" value={formData.skills} onChange={update}
          rows={5} placeholder="Salesforce CRM 95, HubSpot 90, Dynamics 365 88, Power Platform 82, CRM Strategy 93"
          hint='Each entry becomes a skill bar. Format: "Name 90" means 90% proficiency.' />
        {/* Preview */}
        {formData.skills && (
          <div className="mt-4 flex flex-col gap-3">
            <p className="text-xs font-bold uppercase tracking-widest" style={{ color: "#3D5170" }}>Live Preview</p>
            {formData.skills.split(",").slice(0, 5).map((s, i) => {
              const match = s.trim().match(/^(.*?)[\s-]+(\d+)$/);
              if (!match) return null;
              const [, name, pct] = match;
              return (
                <div key={i} className="flex flex-col gap-1.5">
                  <div className="flex justify-between">
                    <span className="text-xs font-semibold" style={{ color: "#F0F6FF" }}>{name.trim()}</span>
                    <span className="text-xs font-bold" style={{ color: "#00A1E0" }}>{pct}%</span>
                  </div>
                  <div className="h-1.5 rounded-full" style={{ background: "rgba(255,255,255,0.06)" }}>
                    <div className="h-full rounded-full" style={{ width: `${pct}%`, background: "linear-gradient(90deg, #00A1E0, #6C63FF)" }} />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </AdminCard>

      <div className="flex justify-end">
        <SaveButton onClick={save} loading={saving} />
      </div>
    </div>
  );
}
