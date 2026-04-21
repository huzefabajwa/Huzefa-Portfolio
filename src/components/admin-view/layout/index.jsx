"use client";

import { useState } from "react";
import { SiSalesforce, SiHubspot } from "react-icons/si";
import { 
  Home, Settings, Briefcase, GraduationCap, FolderOpen, 
  Star, Users, Layers, LogOut, Menu, X, ChevronRight,
  BarChart3, Globe, Shield
} from "lucide-react";

const NAV_ITEMS = [
  { id: "home",       label: "Home",       icon: Home },
  { id: "about",      label: "About",      icon: Users },
  { id: "platforms",  label: "Platforms",  icon: Layers },
  { id: "services",   label: "Services",   icon: Settings },
  { id: "experience", label: "Experience", icon: Briefcase },
  { id: "education",  label: "Education",  icon: GraduationCap },
  { id: "projects",   label: "Projects",   icon: FolderOpen },
  { id: "reviews",    label: "Reviews",    icon: Star },
  { id: "contact",    label: "Contact",    icon: Globe },
];

const ACCENT = "#00A1E0";

export default function AdminLayout({ currentTab, setActiveTab, onLogout, children, allData }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const stats = [
    { label: "Services",   value: allData?.services?.length   || 0, color: "#00A1E0", icon: Settings },
    { label: "Projects",   value: allData?.projects?.length   || 0, color: "#FF7A59", icon: FolderOpen },
    { label: "Experience", value: allData?.experience?.length || 0, color: "#8B5CF6", icon: Briefcase },
  ];

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Brand */}
      <div className="px-6 py-6 border-b" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: "linear-gradient(135deg, #00A1E0, #6C63FF)", boxShadow: "0 0 20px rgba(0,161,224,0.3)" }}>
            <Shield size={18} color="white" />
          </div>
          {sidebarOpen && (
            <div className="overflow-hidden">
              <p className="font-black text-base leading-none" style={{ color: "#F0F6FF" }}>Admin</p>
              <p className="text-[10px] font-bold tracking-[0.2em] uppercase" style={{ color: "#00A1E0" }}>CRM Portal</p>
            </div>
          )}
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 overflow-y-auto flex flex-col gap-1">
        {NAV_ITEMS.map(({ id, label, icon: Icon }) => {
          const active = currentTab === id;
          return (
            <button
              key={id}
              onClick={() => { setActiveTab(id); setMobileSidebarOpen(false); }}
              className="w-full flex items-center gap-3 rounded-xl transition-all duration-200 group"
              style={{
                padding: sidebarOpen ? "10px 14px" : "10px",
                justifyContent: sidebarOpen ? "flex-start" : "center",
                background: active ? "rgba(0,161,224,0.12)" : "transparent",
                border: active ? "1px solid rgba(0,161,224,0.25)" : "1px solid transparent",
                color: active ? ACCENT : "#8DA0BC",
              }}
              onMouseOver={e => { if (!active) { e.currentTarget.style.background = "rgba(255,255,255,0.04)"; e.currentTarget.style.color = "#F0F6FF"; }}}
              onMouseOut={e => { if (!active) { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#8DA0BC"; }}}
              title={!sidebarOpen ? label : ""}
            >
              <Icon size={18} className="flex-shrink-0" />
              {sidebarOpen && <span className="text-sm font-medium">{label}</span>}
              {sidebarOpen && active && <ChevronRight size={14} className="ml-auto opacity-60" />}
            </button>
          );
        })}
      </nav>

      {/* CRM logos */}
      {sidebarOpen && (
        <div className="px-5 py-4 border-t" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
          <p className="text-[9px] font-bold uppercase tracking-widest mb-3" style={{ color: "#3D5170" }}>Managing Platforms</p>
          <div className="flex items-center gap-3">
            <SiSalesforce size={18} style={{ color: "#00A1E0" }} />
            <SiHubspot size={18} style={{ color: "#FF7A59" }} />
            <svg viewBox="0 0 23 23" className="w-[18px] h-[18px]" style={{ color: "#8B5CF6" }}>
              <path d="M11.5 0L0 6.5v10L11.5 23 23 16.5v-10z" fill="currentColor" opacity=".3"/>
              <path d="M11.5 0l11.5 6.5-11.5 6.5L0 6.5z" fill="currentColor"/>
              <path d="M0 6.5l11.5 6.5v10L0 16.5z" fill="currentColor" opacity=".6"/>
            </svg>
          </div>
        </div>
      )}

      {/* Logout */}
      <div className="px-3 pb-4">
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 rounded-xl p-3 transition-all duration-200"
          style={{
            justifyContent: sidebarOpen ? "flex-start" : "center",
            color: "#8DA0BC",
            border: "1px solid transparent"
          }}
          onMouseOver={e => { e.currentTarget.style.background = "rgba(255,80,80,0.08)"; e.currentTarget.style.color = "#FF6B6B"; e.currentTarget.style.borderColor = "rgba(255,80,80,0.2)"; }}
          onMouseOut={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#8DA0BC"; e.currentTarget.style.borderColor = "transparent"; }}
          title={!sidebarOpen ? "Logout" : ""}
        >
          <LogOut size={18} className="flex-shrink-0" />
          {sidebarOpen && <span className="text-sm font-medium">Logout</span>}
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: "#050D1A" }}>
      {/* Desktop Sidebar */}
      <aside
        className="hidden md:flex flex-col flex-shrink-0 h-full border-r transition-all duration-300"
        style={{
          width: sidebarOpen ? 220 : 68,
          background: "rgba(7,15,32,0.95)",
          borderColor: "rgba(255,255,255,0.06)",
          backdropFilter: "blur(20px)"
        }}
      >
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar Overlay */}
      {mobileSidebarOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setMobileSidebarOpen(false)} />
          <aside className="relative w-64 h-full border-r flex flex-col"
            style={{ background: "rgba(7,15,32,0.98)", borderColor: "rgba(255,255,255,0.06)" }}>
            <SidebarContent />
          </aside>
        </div>
      )}

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="flex items-center justify-between px-6 py-4 border-b flex-shrink-0"
          style={{ background: "rgba(7,15,32,0.8)", borderColor: "rgba(255,255,255,0.06)", backdropFilter: "blur(20px)" }}>
          <div className="flex items-center gap-4">
            {/* Mobile menu toggle */}
            <button className="md:hidden p-2 rounded-lg" style={{ color: "#8DA0BC" }}
              onClick={() => setMobileSidebarOpen(true)}>
              <Menu size={20} />
            </button>
            {/* Desktop collapse */}
            <button className="hidden md:flex p-2 rounded-lg transition-colors"
              style={{ color: "#8DA0BC" }}
              onClick={() => setSidebarOpen(!sidebarOpen)}
              onMouseOver={e => { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; e.currentTarget.style.color = "#F0F6FF"; }}
              onMouseOut={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#8DA0BC"; }}>
              <Menu size={20} />
            </button>
            <div>
              <h1 className="font-bold text-base capitalize" style={{ color: "#F0F6FF" }}>
                {NAV_ITEMS.find(n => n.id === currentTab)?.label || "Dashboard"}
              </h1>
              <p className="text-xs" style={{ color: "#3D5170" }}>Manage your portfolio content</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
              style={{ background: "linear-gradient(135deg, #00A1E0, #6C63FF)", color: "#fff" }}>A</div>
            <div className="hidden sm:block">
              <p className="text-sm font-semibold" style={{ color: "#F0F6FF" }}>Admin</p>
              <p className="text-xs" style={{ color: "#3D5170" }}>CRM Consultant</p>
            </div>
          </div>
        </header>

        {/* Stats Bar */}
        <div className="px-6 py-4 border-b flex-shrink-0 flex items-center gap-4 overflow-x-auto"
          style={{ borderColor: "rgba(255,255,255,0.04)", background: "rgba(12,24,41,0.4)" }}>
          {stats.map((s, i) => (
            <div key={i} className="flex items-center gap-3 rounded-xl px-4 py-2.5 flex-shrink-0"
              style={{ background: "rgba(12,24,41,0.6)", border: "1px solid rgba(255,255,255,0.05)" }}>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: `${s.color}15`, color: s.color }}>
                <s.icon size={16} />
              </div>
              <div>
                <p className="text-lg font-black leading-none" style={{ color: s.color }}>{s.value}</p>
                <p className="text-[10px] uppercase tracking-wider" style={{ color: "#3D5170" }}>{s.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-6" style={{ background: "#050D1A" }}>
          {children}
        </main>
      </div>
    </div>
  );
}
