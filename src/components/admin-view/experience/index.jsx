"use client";

import { useState } from "react";
import { AdminCard, AdminInput, AdminTextarea, SaveButton, DeleteButton, StatusBadge } from "../ui";
import { Plus, Briefcase, MapPin, Calendar, Building } from "lucide-react";

export default function AdminExperienceView({ formData, setFormData, handleSaveData, data, setAllData }) {
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(null);
  const update = (name, value) => setFormData(prev => ({ ...prev, [name]: value }));

  async function save() {
    setSaving(true);
    await handleSaveData();
    setSaving(false);
  }

  async function handleDelete(id) {
    setDeleting(id);
    try {
      const res = await fetch("/api/experience/delete", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      const result = await res.json();
      if (result.success) {
        setAllData(prev => ({ ...prev, experience: prev.experience?.filter(e => e._id !== id) }));
      }
    } catch (e) {
      console.error(e);
    }
    setDeleting(null);
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Add New */}
      <AdminCard title="Add Experience" subtitle="Add a new role to your career timeline"
        action={<StatusBadge count={data?.length || 0} label="entries" color="#FF7A59" />}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <AdminInput label="Job Title / Position" name="position" value={formData.position} onChange={update}
            placeholder="e.g. Salesforce Consultant" />
          <AdminInput label="Company Name" name="company" value={formData.company} onChange={update}
            placeholder="e.g. Accenture" />
          <AdminInput label="Duration" name="duration" value={formData.duration} onChange={update}
            placeholder="e.g. Jan 2023 – Present" />
          <AdminInput label="Location" name="location" value={formData.location} onChange={update}
            placeholder="e.g. Dubai, UAE – Remote" />
          <div className="md:col-span-2">
            <AdminTextarea label="Job Description" name="jobprofile" value={formData.jobprofile} onChange={update}
              rows={4} placeholder="Describe key responsibilities and achievements..." />
          </div>
        </div>
        <div className="flex justify-end mt-5">
          <SaveButton onClick={save} loading={saving} label="Add Experience" />
        </div>
      </AdminCard>

      {/* List */}
      {data && data.length > 0 && (
        <AdminCard title="Experience Timeline" subtitle="Your career history shown on the portfolio">
          <div className="flex flex-col gap-4">
            {data.map((item, i) => (
              <div key={item._id || i} className="rounded-xl p-5 flex flex-col gap-3 group"
                style={{ background: "rgba(255,122,89,0.04)", border: "1px solid rgba(255,122,89,0.12)" }}>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex flex-col gap-1.5 flex-1">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{ background: "rgba(255,122,89,0.15)", color: "#FF7A59" }}>
                        <Briefcase size={14} />
                      </div>
                      <span className="font-bold text-sm" style={{ color: "#F0F6FF" }}>{item.position}</span>
                    </div>
                    <div className="flex flex-wrap items-center gap-3 pl-9">
                      <span className="flex items-center gap-1.5 text-xs" style={{ color: "#8DA0BC" }}>
                        <Building size={11} /> {item.company}
                      </span>
                      <span className="flex items-center gap-1.5 text-xs" style={{ color: "#8DA0BC" }}>
                        <Calendar size={11} /> {item.duration}
                      </span>
                      <span className="flex items-center gap-1.5 text-xs" style={{ color: "#8DA0BC" }}>
                        <MapPin size={11} /> {item.location}
                      </span>
                    </div>
                    {item.jobprofile && (
                      <p className="text-xs leading-relaxed pl-9" style={{ color: "#3D5170" }}>
                        {item.jobprofile.substring(0, 120)}{item.jobprofile.length > 120 ? "..." : ""}
                      </p>
                    )}
                  </div>
                  <DeleteButton onClick={() => handleDelete(item._id)} loading={deleting === item._id} />
                </div>
              </div>
            ))}
          </div>
        </AdminCard>
      )}
    </div>
  );
}