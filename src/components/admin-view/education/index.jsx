"use client";

import { useState } from "react";
import { AdminCard, AdminInput, SaveButton, DeleteButton, StatusBadge } from "../ui";
import { GraduationCap, Calendar, Building } from "lucide-react";

export default function AdminEducationView({ formData, setFormData, handleSaveData, data, setAllData }) {
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
      const res = await fetch("/api/education/delete", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      const result = await res.json();
      if (result.success) {
        setAllData(prev => ({ ...prev, education: prev.education?.filter(e => e._id !== id) }));
      }
    } catch (e) { console.error(e); }
    setDeleting(null);
  }

  return (
    <div className="flex flex-col gap-6">
      <AdminCard title="Add Education" subtitle="Add a degree or certification"
        action={<StatusBadge count={data?.length || 0} label="entries" color="#8B5CF6" />}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="md:col-span-2">
            <AdminInput label="Degree / Qualification" name="degree" value={formData.degree} onChange={update}
              placeholder="e.g. Bachelor of Computer Science" />
          </div>
          <AdminInput label="Year" name="year" value={formData.year} onChange={update} placeholder="e.g. 2022" />
          <div className="md:col-span-3">
            <AdminInput label="Institution / University" name="college" value={formData.college} onChange={update}
              placeholder="e.g. COMSATS University" />
          </div>
        </div>
        <div className="flex justify-end mt-5">
          <SaveButton onClick={save} loading={saving} label="Add Education" />
        </div>
      </AdminCard>

      {data && data.length > 0 && (
        <AdminCard title="Education History">
          <div className="flex flex-col gap-4">
            {data.map((item, i) => (
              <div key={item._id || i} className="rounded-xl p-5 flex items-center justify-between gap-4"
                style={{ background: "rgba(139,92,246,0.04)", border: "1px solid rgba(139,92,246,0.12)" }}>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: "rgba(139,92,246,0.15)", color: "#8B5CF6" }}>
                    <GraduationCap size={18} />
                  </div>
                  <div>
                    <p className="font-bold text-sm" style={{ color: "#F0F6FF" }}>{item.degree}</p>
                    <p className="text-xs mt-0.5 flex items-center gap-2" style={{ color: "#8DA0BC" }}>
                      <Building size={11} /> {item.college}
                      <Calendar size={11} className="ml-1" /> {item.year}
                    </p>
                  </div>
                </div>
                <DeleteButton onClick={() => handleDelete(item._id)} loading={deleting === item._id} />
              </div>
            ))}
          </div>
        </AdminCard>
      )}
    </div>
  );
}