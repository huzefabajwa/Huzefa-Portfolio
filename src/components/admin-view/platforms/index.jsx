"use client";

import { useState } from "react";
import { AdminCard, AdminInput, AdminTextarea, SaveButton, DeleteButton, StatusBadge } from "../ui";
import { SiSalesforce, SiHubspot } from "react-icons/si";
import { Image as ImageIcon, Palette } from "lucide-react";

const PLATFORM_LOGOS = [
  { name: "Salesforce",   icon: <SiSalesforce size={20} />, color: "#00A1E0", url: "/salesforce-logo.png" },
  { name: "HubSpot",      icon: <SiHubspot size={20} />,    color: "#FF7A59", url: "/hubspot-logo.png" },
  { name: "Power Apps",   icon: null,                        color: "#8B5CF6", url: "/powerapps-logo.png" },
  { name: "Dynamics 365", icon: null,                        color: "#9B59B6", url: "" },
];

export default function AdminPlatformsView({ formData, setFormData, handleSaveData, data, setAllData }) {
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(null);
  const update = (name, value) => setFormData(prev => ({ ...prev, [name]: value }));

  function applyTemplate(template) {
    setFormData(prev => ({
      ...prev,
      name: template.name,
      color: template.color,
      logoUrl: template.url,
    }));
  }

  async function save() {
    setSaving(true);
    await handleSaveData();
    setSaving(false);
  }

  async function handleDelete(id) {
    setDeleting(id);
    try {
      const res = await fetch("/api/platforms/delete", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      const result = await res.json();
      if (result.success) {
        setAllData(prev => ({ ...prev, platforms: prev.platforms?.filter(p => p._id !== id) }));
      }
    } catch (e) { console.error(e); }
    setDeleting(null);
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Quick templates */}
      <AdminCard title="Quick Add Templates" subtitle="Click to pre-fill official platform data">
        <div className="flex flex-wrap gap-3">
          {PLATFORM_LOGOS.map(t => (
            <button key={t.name} onClick={() => applyTemplate(t)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200"
              style={{ background: `${t.color}12`, border: `1px solid ${t.color}30`, color: t.color }}
              onMouseOver={e => { e.currentTarget.style.background = `${t.color}22`; }}
              onMouseOut={e => { e.currentTarget.style.background = `${t.color}12`; }}>
              {t.icon}
              {t.name}
            </button>
          ))}
        </div>
      </AdminCard>

      <AdminCard title="Add Platform" subtitle="Add or update a CRM platform you work with"
        action={<StatusBadge count={data?.length || 0} label="platforms" color="#8B5CF6" />}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <AdminInput label="Platform Name" name="name" value={formData.name} onChange={update}
            placeholder="e.g. Salesforce" />
          <AdminInput label="Description" name="description" value={formData.description} onChange={update}
            placeholder="e.g. CRM Cloud Platform" />
          <AdminInput label="Logo URL (image path)" name="logoUrl" value={formData.logoUrl} onChange={update}
            placeholder="/salesforce-logo.png or https://..." />
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold uppercase tracking-widest flex items-center gap-2" style={{ color: "#8DA0BC" }}>
              <Palette size={12} /> Brand Color
            </label>
            <div className="flex items-center gap-3">
              <input type="color" value={formData.color || "#00A1E0"} onChange={e => update("color", e.target.value)}
                className="w-12 h-12 rounded-xl cursor-pointer border-0 outline-none p-0.5"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }} />
              <input type="text" value={formData.color || ""} onChange={e => update("color", e.target.value)}
                placeholder="#00A1E0"
                className="flex-1 px-4 py-3 rounded-xl text-sm outline-none"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "#F0F6FF", fontFamily: "monospace" }}
                onFocus={e => { e.target.style.borderColor = "#00A1E0"; }}
                onBlur={e => { e.target.style.borderColor = "rgba(255,255,255,0.08)"; }} />
            </div>
          </div>
          <AdminInput label="Sort Order" name="order" value={formData.order} onChange={update}
            placeholder="1" type="number" hint="Lower numbers appear first" />
          {/* Logo Preview */}
          {formData.logoUrl && (
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold uppercase tracking-widest flex items-center gap-2" style={{ color: "#8DA0BC" }}>
                <ImageIcon size={12} /> Logo Preview
              </label>
              <div className="w-20 h-20 rounded-xl flex items-center justify-center"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <img src={formData.logoUrl} alt="logo" className="w-14 h-14 object-contain"
                  onError={e => { e.target.style.display = "none"; }} />
              </div>
            </div>
          )}
        </div>
        <div className="flex justify-end mt-5">
          <SaveButton onClick={save} loading={saving} label="Add Platform" />
        </div>
      </AdminCard>

      {data && data.length > 0 && (
        <AdminCard title="Active Platforms" subtitle="CRM platforms displayed on your portfolio">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.map((item, i) => (
              <div key={item._id || i} className="rounded-xl p-4 flex flex-col gap-3"
                style={{ background: `${item.color}08`, border: `1px solid ${item.color}25` }}>
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    {item.logoUrl ? (
                      <img src={item.logoUrl} alt={item.name} className="w-8 h-8 object-contain" />
                    ) : (
                      <div className="w-8 h-8 rounded-full" style={{ background: item.color }} />
                    )}
                    <div>
                      <p className="font-bold text-sm" style={{ color: item.color }}>{item.name}</p>
                      <p className="text-xs" style={{ color: "#3D5170" }}>{item.description}</p>
                    </div>
                  </div>
                  <DeleteButton onClick={() => handleDelete(item._id)} loading={deleting === item._id} />
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full border border-white/10" style={{ background: item.color }} />
                  <code className="text-xs" style={{ color: "#3D5170" }}>{item.color}</code>
                  <span className="text-xs ml-auto" style={{ color: "#3D5170" }}>Order: {item.order}</span>
                </div>
              </div>
            ))}
          </div>
        </AdminCard>
      )}
    </div>
  );
}
