"use client";

import { useEffect, useState, useCallback } from "react";
import { usePathname } from "next/navigation";
import { scroller } from "react-scroll";
import { Menu, X } from "lucide-react";
import { SiSalesforce, SiHubspot } from "react-icons/si";
import { Dynamics365Icon, PowerAppsIcon } from "@/components/crm-icons";

const NAV_ITEMS = [
  { id: "home",       label: "Home" },
  { id: "about",      label: "About" },
  { id: "services",   label: "Services" },
  { id: "experience", label: "Resume" },
  { id: "project",    label: "Portfolio" },
  { id: "contact",    label: "Contact" },
];

export default function Navbar() {
  const pathname           = usePathname();
  const [active, setActive]   = useState("home");
  const [open, setOpen]       = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = NAV_ITEMS.map(({ id }) => document.getElementById(id)).filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -40% 0px", threshold: 0 }
    );
    sections.forEach(s => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const navigate = useCallback((id) => {
    if (pathname === "/") {
      scroller.scrollTo(id, { smooth: true, duration: 600, offset: -80 });
    } else {
      window.location.href = `/#${id}`;
    }
    setActive(id);
    setOpen(false);
  }, [pathname]);

  return (
    <>
      {/* Desktop Navbar */}
      <header
        style={{
          background: scrolled ? "rgba(5,13,26,0.88)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(0,161,224,0.08)" : "none",
          transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
        className="fixed top-0 left-0 right-0 z-50 hidden lg:flex items-center justify-between px-8 xl:px-16 py-4"
      >
        {/* Brand */}
        <button onClick={() => navigate("home")} className="flex flex-col items-start leading-none group">
          <span
            className="text-[22px] font-black tracking-tighter"
            style={{
              background: "linear-gradient(to right, #fff, var(--text-muted))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              transition: "opacity 0.3s ease"
            }}
          >
            Huzefa<span style={{ color: "var(--sf-blue)", WebkitTextFillColor: "var(--sf-blue)" }}>.</span>
          </span>
          <span
            className="text-[9px] font-bold tracking-[0.25em] uppercase mt-1 transition-all duration-300 group-hover:tracking-[0.3em]"
            style={{ color: "var(--sf-blue)" }}
          >
            CRM Consultant
          </span>
        </button>

        {/* Nav Links */}
        <nav className="flex items-center gap-1">
          {NAV_ITEMS.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => navigate(id)}
              className="relative px-4 py-2 text-sm font-medium transition-all duration-200 rounded-xl"
              style={{ color: active === id ? "var(--text-primary)" : "var(--text-muted)" }}
            >
              {label}
              {active === id && (
                <span className="absolute inset-x-2 bottom-1 h-[2px] rounded-full" style={{ background: "var(--sf-blue)" }} />
              )}
            </button>
          ))}
        </nav>

        {/* CTA */}
        <a
          href="#contact"
          onClick={e => { e.preventDefault(); navigate("contact"); }}
          className="text-sm font-bold px-5 py-2.5 rounded-full transition-all duration-200"
          style={{
            background: "linear-gradient(135deg, var(--sf-blue), var(--accent))",
            color: "#fff",
            boxShadow: "0 0 20px rgba(0,161,224,0.3)",
          }}
          onMouseOver={e => { e.currentTarget.style.opacity = "0.85"; e.currentTarget.style.boxShadow = "0 0 32px rgba(0,161,224,0.5)"; }}
          onMouseOut={e  => { e.currentTarget.style.opacity = "1";    e.currentTarget.style.boxShadow = "0 0 20px rgba(0,161,224,0.3)"; }}
        >
          Let's Talk
        </a>
      </header>

      {/* Mobile toggle */}
      <div className="lg:hidden fixed top-4 right-4 z-50">
        <button
          onClick={() => setOpen(!open)}
          className="w-10 h-10 rounded-full flex items-center justify-center transition-all"
          style={{
            background: "rgba(5,13,26,0.92)",
            border: "1px solid rgba(0,161,224,0.25)",
            color: "var(--sf-blue)",
            backdropFilter: "blur(12px)",
          }}
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <div
        className="lg:hidden fixed inset-0 z-40 flex flex-col pt-20 px-6 pb-10"
        style={{
          background: "rgba(5,13,26,0.97)",
          backdropFilter: "blur(24px)",
          transform: open ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.38s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        {/* Mobile brand */}
        <div className="flex flex-col items-start leading-none mb-10 pb-8 border-b" style={{ borderColor: "var(--border)" }}>
          <span
            className="text-[28px] font-black tracking-tighter"
            style={{
              background: "linear-gradient(to right, #fff, var(--text-muted))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Huzefa<span style={{ color: "var(--sf-blue)", WebkitTextFillColor: "var(--sf-blue)" }}>.</span>
          </span>
          <span className="text-[10px] font-bold tracking-[0.25em] uppercase mt-2" style={{ color: "var(--sf-blue)" }}>
            CRM Consultant
          </span>
        </div>

        <nav className="flex flex-col gap-1">
          {NAV_ITEMS.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => navigate(id)}
              className="text-left py-3.5 px-5 text-lg font-semibold rounded-xl transition-all duration-200"
              style={{
                color: active === id ? "var(--sf-blue)" : "var(--text-muted)",
                background: active === id ? "rgba(0,161,224,0.08)" : "transparent",
                borderLeft: active === id ? "2px solid var(--sf-blue)" : "2px solid transparent",
              }}
            >
              {label}
            </button>
          ))}
        </nav>

        {/* Platform pills with official logos */}
        <div className="mt-auto pt-8 flex flex-col gap-2">
          <p className="text-xs tracking-widest uppercase mb-3" style={{ color: "var(--text-faint)" }}>Expert In</p>
          <div className="flex flex-wrap gap-2">
            {[
              { label: "Salesforce",   icon: <SiSalesforce size={12} />,     color: "var(--sf-blue)" },
              { label: "HubSpot",      icon: <SiHubspot size={12} />,        color: "var(--hs-orange)" },
              { label: "Dynamics 365", icon: <Dynamics365Icon size={12} />,  color: "#B06FC0" },
              { label: "Power Apps",   icon: <PowerAppsIcon size={12} />,    color: "var(--accent)" },
            ].map(p => (
              <span key={p.label} className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold"
                style={{ border: `1px solid ${p.color}40`, color: p.color, background: `${p.color}12` }}>
                <span style={{ color: p.color }}>{p.icon}</span>
                {p.label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
