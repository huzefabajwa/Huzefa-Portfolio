"use client";

import { useState } from "react";
import { AdminCard, AdminTextarea, SaveButton } from "../ui";
import { TrendingUp, Users, FolderOpen, Layout, Loader2, Upload, X } from "lucide-react";

/* ─── Stat Card ───────────────────────────────────────────────────── */
function StatInput({ icon: Icon, label, name, value, onChange, color, bg, border }) {
  return (
    <div className="rounded-xl p-4 flex flex-col gap-3" style={{ background: bg, border: `1px solid ${border}` }}>
      <div className="flex items-center gap-2" style={{ color }}>
        <Icon size={16} />
        <span className="text-xs font-bold uppercase tracking-wider">{label}</span>
      </div>
      <input
        type="number" name={name} value={value || ""}
        onChange={e => onChange(e.target.name, e.target.value)}
        className="w-full px-3 py-2.5 rounded-lg text-2xl font-black outline-none"
        style={{ background: "rgba(255,255,255,0.04)", border: `1px solid ${border}`, color, fontFamily: "inherit" }}
        onFocus={e => { e.target.style.borderColor = color; }}
        onBlur={e  => { e.target.style.borderColor = border; }}
        placeholder="0"
      />
    </div>
  );
}

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

      <AdminCard title="Stats & Numbers" subtitle="Key metrics displayed as stat chips on the portfolio">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatInput icon={Users}      label="Clients Served"    name="noofclients"      value={formData.noofclients}      onChange={update} color="#00A1E0" bg="rgba(0,161,224,0.06)"    border="rgba(0,161,224,0.2)" />
          <StatInput icon={FolderOpen} label="Projects Done"     name="noofprojects"     value={formData.noofprojects}     onChange={update} color="#FF7A59" bg="rgba(255,122,89,0.06)"   border="rgba(255,122,89,0.2)" />
          <StatInput icon={TrendingUp} label="Years Experience"  name="yearsofexperience"value={formData.yearsofexperience}onChange={update} color="#8B5CF6" bg="rgba(139,92,246,0.06)"   border="rgba(139,92,246,0.2)" />
          <StatInput icon={Layout}     label="Platforms Served"  name="noofplatforms"    value={formData.noofplatforms}    onChange={update} color="#00D4AA" bg="rgba(0,212,170,0.06)"    border="rgba(0,212,170,0.2)" />
        </div>
        <p className="text-xs mt-3" style={{ color: "#3D5170" }}>
          These numbers appear with a "+" suffix on the portfolio (e.g. 50 → "50+")
        </p>
      </AdminCard>

      <AdminCard title="Skills & Expertise" subtitle='Format: "Skill Name 85" (name then percentage, comma-separated)'>
        <AdminTextarea label="Skills" name="skills" value={formData.skills} onChange={update}
          rows={5} placeholder="Salesforce CRM 95, HubSpot 90, Dynamics 365 88, Power Platform 82, CRM Strategy 93"
          hint='Each entry becomes a skill bar. Format: "Name 90" means 90% proficiency.' />
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
