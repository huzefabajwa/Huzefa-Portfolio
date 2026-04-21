"use client";

import { useState } from "react";
import { AdminCard, AdminInput, AdminTextarea, SaveButton, DeleteButton, StatusBadge } from "../ui";
import { Star } from "lucide-react";

export default function AdminReviewsView({ formData, setFormData, handleSaveData, data, setAllData }) {
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
      const res = await fetch("/api/reviews/delete", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      const result = await res.json();
      if (result.success) {
        setAllData(prev => ({ ...prev, reviews: prev.reviews?.filter(r => r._id !== id) }));
      }
    } catch (e) { console.error(e); }
    setDeleting(null);
  }

  return (
    <div className="flex flex-col gap-6">
      <AdminCard title="Add Review / Testimonial" subtitle="Client testimonials boost credibility on Upwork proposals"
        action={<StatusBadge count={data?.length || 0} label="reviews" color="#FEC544" />}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <AdminInput label="Client Name" name="author" value={formData.author} onChange={update} placeholder="e.g. John Smith" />
          <AdminInput label="Company" name="company" value={formData.company} onChange={update} placeholder="e.g. TechCorp Inc." />
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold uppercase tracking-widest" style={{ color: "#8DA0BC" }}>Rating (1-5)</label>
            <div className="flex items-center gap-2">
              {[1,2,3,4,5].map(n => (
                <button key={n} type="button" onClick={() => update("rating", n)}
                  className="transition-transform hover:scale-110"
                  style={{ color: n <= (formData.rating || 0) ? "#FEC544" : "#3D5170" }}>
                  <Star size={28} fill={n <= (formData.rating || 0) ? "#FEC544" : "none"} />
                </button>
              ))}
              <span className="ml-2 text-sm font-bold" style={{ color: "#FEC544" }}>{formData.rating || 0}/5</span>
            </div>
          </div>
          <AdminInput label="Link (e.g. Upwork review URL)" name="link" value={formData.link} onChange={update} placeholder="https://..." />
          <div className="md:col-span-2">
            <AdminTextarea label="Review Content" name="content" value={formData.content} onChange={update}
              rows={5} placeholder="What the client said about your work..." />
          </div>
        </div>
        <div className="flex justify-end mt-5">
          <SaveButton onClick={save} loading={saving} label="Add Review" />
        </div>
      </AdminCard>

      {data && data.length > 0 && (
        <AdminCard title="Client Reviews" subtitle="Testimonials visible on your portfolio">
          <div className="flex flex-col gap-4">
            {data.map((item, i) => (
              <div key={item._id || i} className="rounded-xl p-5 flex flex-col gap-3"
                style={{ background: "rgba(254,197,68,0.04)", border: "1px solid rgba(254,197,68,0.12)" }}>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex flex-col gap-2 flex-1">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-black"
                        style={{ background: "rgba(254,197,68,0.15)", color: "#FEC544" }}>
                        {(item.author || "?")[0].toUpperCase()}
                      </div>
                      <div>
                        <p className="font-bold text-sm" style={{ color: "#F0F6FF" }}>{item.author}</p>
                        {item.company && <p className="text-xs" style={{ color: "#8DA0BC" }}>{item.company}</p>}
                      </div>
                      <div className="ml-auto flex items-center gap-0.5">
                        {[1,2,3,4,5].map(n => (
                          <Star key={n} size={12} style={{ color: "#FEC544" }} fill={n <= (item.rating || 0) ? "#FEC544" : "none"} />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm leading-relaxed italic" style={{ color: "#8DA0BC" }}>
                      "{item.content?.substring(0, 150)}{(item.content?.length || 0) > 150 ? "..." : ""}"
                    </p>
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