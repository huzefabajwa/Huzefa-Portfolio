"use client";

import { useState } from "react";
import { AdminCard, AdminInput, AdminTextarea, SaveButton, DeleteButton, StatusBadge } from "../ui";
import { TrendingUp, Zap, Settings } from "lucide-react";

const CRM_ICONS = [
  "TrendingUp", "Settings", "Users", "BarChart2", "RefreshCcw",
  "Zap", "Database", "Globe", "Layers", "Shield", "Award", "Target"
];

export default function AdminServicesView({ formData, setFormData, handleSaveData, data, setAllData }) {
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
      const res = await fetch("/api/services/delete", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      const result = await res.json();
      if (result.success) {
        setAllData(prev => ({ ...prev, services: prev.services?.filter(s => s._id !== id) }));
      }
    } catch (e) { console.error(e); }
    setDeleting(null);
  }

  const CRM_COLORS = ["#00A1E0", "#FF7A59", "#9B59B6", "#8B5CF6", "#00D4AA", "#F2C811"];

  return (
    <div className="flex flex-col gap-6">
      <AdminCard title="Add Service" subtitle="Add a CRM service offering to your portfolio"
        action={<StatusBadge count={data?.length || 0} label="services" color="#00A1E0" />}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <AdminInput label="Service Title" name="title" value={formData.title} onChange={update}
            placeholder="e.g. Salesforce Implementation" />
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold uppercase tracking-widest" style={{ color: "#8DA0BC" }}>Icon Name</label>
            <select
              value={formData.fareacticon || ""}
              onChange={e => update("fareacticon", e.target.value)}
              className="w-full px-4 py-3 rounded-xl text-sm outline-none"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "#F0F6FF", fontFamily: "inherit" }}
            >
              <option value="" style={{ background: "#0C1829" }}>Select icon...</option>
              {CRM_ICONS.map(icon => (
                <option key={icon} value={icon} style={{ background: "#0C1829" }}>{icon}</option>
              ))}
            </select>
          </div>
          <div className="md:col-span-2">
            <AdminTextarea label="Service Description" name="service" value={formData.service} onChange={update}
              rows={4} placeholder="Describe this service offering in detail..." />
          </div>
        </div>
        <div className="flex justify-end mt-5">
          <SaveButton onClick={save} loading={saving} label="Add Service" />
        </div>
      </AdminCard>

      {data && data.length > 0 && (
        <AdminCard title="Active Services" subtitle="Services displayed on your portfolio">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.map((item, i) => {
              const color = CRM_COLORS[i % CRM_COLORS.length];
              return (
                <div key={item._id || i} className="rounded-xl p-5 flex flex-col gap-3"
                  style={{ background: `${color}06`, border: `1px solid ${color}20` }}>
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ background: `${color}20`, color }}>
                        <TrendingUp size={18} />
                      </div>
                      <div>
                        <p className="font-bold text-sm" style={{ color: "#F0F6FF" }}>{item.title}</p>
                        <div className="w-5 h-0.5 rounded-full mt-1" style={{ background: color }} />
                      </div>
                    </div>
                    <DeleteButton onClick={() => handleDelete(item._id)} loading={deleting === item._id} />
                  </div>
                  <p className="text-xs leading-relaxed" style={{ color: "#8DA0BC" }}>
                    {item.service?.substring(0, 100)}{(item.service?.length || 0) > 100 ? "..." : ""}
                  </p>
                </div>
              );
            })}
          </div>
        </AdminCard>
      )}
    </div>
  );
}
