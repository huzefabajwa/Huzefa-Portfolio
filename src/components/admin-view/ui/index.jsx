"use client";

// Shared admin card container
export function AdminCard({ title, subtitle, children, action }) {
  return (
    <div className="rounded-2xl overflow-hidden" style={{
      background: "rgba(12,24,41,0.7)",
      border: "1px solid rgba(255,255,255,0.06)",
      backdropFilter: "blur(20px)",
      boxShadow: "0 4px 40px rgba(0,0,0,0.4)"
    }}>
      {(title || action) && (
        <div className="flex items-center justify-between px-6 py-5 border-b"
          style={{ borderColor: "rgba(255,255,255,0.05)" }}>
          <div>
            {title && <h3 className="font-bold text-base" style={{ color: "#F0F6FF" }}>{title}</h3>}
            {subtitle && <p className="text-xs mt-0.5" style={{ color: "#8DA0BC" }}>{subtitle}</p>}
          </div>
          {action}
        </div>
      )}
      <div className="p-6">{children}</div>
    </div>
  );
}

// Styled input
export function AdminInput({ label, name, value, onChange, placeholder, type = "text", hint }) {
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label className="text-xs font-semibold uppercase tracking-widest" style={{ color: "#8DA0BC" }}>{label}</label>
      )}
      <input
        type={type}
        name={name}
        value={value || ""}
        onChange={e => onChange(e.target.name, e.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
        style={{
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.08)",
          color: "#F0F6FF",
          fontFamily: "inherit"
        }}
        onFocus={e => { e.target.style.borderColor = "#00A1E0"; e.target.style.boxShadow = "0 0 0 3px rgba(0,161,224,0.1)"; }}
        onBlur={e => { e.target.style.borderColor = "rgba(255,255,255,0.08)"; e.target.style.boxShadow = "none"; }}
      />
      {hint && <p className="text-xs" style={{ color: "#3D5170" }}>{hint}</p>}
    </div>
  );
}

// Styled textarea
export function AdminTextarea({ label, name, value, onChange, placeholder, rows = 4, hint }) {
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label className="text-xs font-semibold uppercase tracking-widest" style={{ color: "#8DA0BC" }}>{label}</label>
      )}
      <textarea
        name={name}
        value={value || ""}
        onChange={e => onChange(e.target.name, e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all resize-none"
        style={{
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.08)",
          color: "#F0F6FF",
          fontFamily: "inherit",
          lineHeight: 1.6
        }}
        onFocus={e => { e.target.style.borderColor = "#00A1E0"; e.target.style.boxShadow = "0 0 0 3px rgba(0,161,224,0.1)"; }}
        onBlur={e => { e.target.style.borderColor = "rgba(255,255,255,0.08)"; e.target.style.boxShadow = "none"; }}
      />
      {hint && <p className="text-xs" style={{ color: "#3D5170" }}>{hint}</p>}
    </div>
  );
}

// Save button
export function SaveButton({ onClick, loading, label = "Save Changes" }) {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm text-white transition-all duration-200"
      style={{
        background: "linear-gradient(135deg, #00A1E0, #6C63FF)",
        boxShadow: "0 0 20px rgba(0,161,224,0.25)",
        opacity: loading ? 0.7 : 1,
        cursor: loading ? "not-allowed" : "pointer"
      }}
      onMouseOver={e => { if (!loading) e.currentTarget.style.boxShadow = "0 0 30px rgba(0,161,224,0.4)"; }}
      onMouseOut={e => { e.currentTarget.style.boxShadow = "0 0 20px rgba(0,161,224,0.25)"; }}
    >
      {loading ? (
        <>
          <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
          </svg>
          Saving...
        </>
      ) : (
        <>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4">
            <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/>
          </svg>
          {label}
        </>
      )}
    </button>
  );
}

// Delete button
export function DeleteButton({ onClick, loading }) {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200"
      style={{
        background: "rgba(255,80,80,0.1)",
        border: "1px solid rgba(255,80,80,0.2)",
        color: "#FF6B6B",
        cursor: loading ? "not-allowed" : "pointer"
      }}
      onMouseOver={e => { if (!loading) { e.currentTarget.style.background = "rgba(255,80,80,0.2)"; }}}
      onMouseOut={e => { e.currentTarget.style.background = "rgba(255,80,80,0.1)"; }}
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5">
        <polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
      </svg>
      {loading ? "Deleting..." : "Delete"}
    </button>
  );
}

// Status badge
export function StatusBadge({ count, label, color = "#00A1E0" }) {
  return (
    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold"
      style={{ background: `${color}15`, border: `1px solid ${color}30`, color }}>
      <span className="font-black text-base leading-none">{count}</span>
      <span>{label}</span>
    </div>
  );
}
