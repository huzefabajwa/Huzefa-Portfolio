"use client";

const currentYear = new Date().getFullYear();

export default function Footer() {
  const platforms = [
    { name: "Salesforce", color: "#00A1E0" },
    { name: "HubSpot",    color: "#FF7A59" },
    { name: "Dynamics 365", color: "#9B59B6" },
    { name: "Power Apps",  color: "#8B5CF6" },
  ];

  return (
    <footer style={{ background: "var(--bg-base)", borderTop: "1px solid var(--border)" }}>
      <div className="max-w-screen-xl mx-auto px-6 lg:px-16 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Brand */}
          <div className="flex flex-col items-start leading-none group cursor-pointer">
            <span 
              className="text-[18px] font-black tracking-tighter"
              style={{ 
                background: "linear-gradient(to right, #fff, var(--text-muted))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Huzefa<span style={{ color: "var(--sf-blue)", WebkitTextFillColor: "var(--sf-blue)" }}>.</span>
            </span>
            <span className="text-[8px] font-bold tracking-[0.25em] uppercase mt-1" style={{ color: "var(--sf-blue)" }}>
              CRM Consultant
            </span>
          </div>

          {/* Platform tags */}
          <div className="flex items-center gap-2">
            {platforms.map(p => (
              <span key={p.name} className="hidden sm:inline text-[10px] font-semibold px-2.5 py-1 rounded-full" style={{ border: `1px solid ${p.color}30`, color: p.color, background: `${p.color}08` }}>
                {p.name}
              </span>
            ))}
          </div>

          {/* Copyright */}
          <p className="text-xs text-center" style={{ color: "var(--text-faint)" }}>
            © {currentYear} Huzefa Bajwa. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
