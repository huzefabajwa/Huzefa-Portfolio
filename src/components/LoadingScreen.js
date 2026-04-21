"use client";

import { useEffect, useState } from "react";

/* ─── Platform definitions ─── */
const PLATFORMS = [
  { id: "sf", label: "Salesforce",   color: "#00A1E0", logo: "/salesforce-logo.png", start: 0,  end: 50 },
  { id: "hs", label: "HubSpot",      color: "#FF7A59", logo: "/hubspot-logo.png",    start: 25, end: 75 },
  { id: "pa", label: "Power Apps",   color: "#8B5CF6", logo: "/powerapps-logo.png",  start: 50, end: 100 },
];

const TERMINAL_LOGS = [
  [0,  "> INITIALIZING SYSTEM KERNEL..."],
  [5,  "> SECURE CONNECTION ESTABLISHED"],
  [15, "> SYNCING SALESFORCE METADATA [100%]"],
  [25, "> HYDRATING HUBSPOT WORKFLOWS..."],
  [40, "> COMPILING CRM ARCHITECTURE..."],
  [55, "> OPTIMIZING POWER PLATFORM NODES..."],
  [75, "> DEPLOYING DIGITAL TRANSFORMATION..."],
  [90, "> FINALIZING UI MODULES..."],
  [100,"> SYSTEM READY. LAUNCHING PORTFOLIO ✦"],
];

/* ── Individual sleek glass node ── */
function PlatformNode({ p, total, visible, delay }) {
  const range = p.end - p.start;
  const fill  = total < p.start ? 0
              : total > p.end   ? 100
              : Math.round(((total - p.start) / range) * 100);
  const done  = fill >= 100;

  return (
    <div style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "none" : "translateY(24px) scale(0.95)",
      transition: `opacity 0.7s ${delay}s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s ${delay}s cubic-bezier(0.16, 1, 0.3, 1)`,
      display: "flex", flexDirection: "column", alignItems: "center", gap: 12
    }}>
      {/* Hex/Glass Orb */}
      <div style={{
        position: "relative",
        width: 80, height: 80,
        borderRadius: 24,
        background: "rgba(10, 15, 30, 0.6)",
        backdropFilter: "blur(12px)",
        border: `1px solid ${fill > 0 ? p.color + "40" : "rgba(255,255,255,0.05)"}`,
        boxShadow: fill > 0 ? `0 8px 32px ${p.color}20, inset 0 0 20px ${p.color}10` : "0 8px 32px rgba(0,0,0,0.4)",
        display: "flex", alignItems: "center", justifyContent: "center",
        overflow: "hidden",
        transition: "all 0.5s ease"
      }}>
        {/* Animated glow rotating around border */}
        {fill > 0 && !done && (
          <div style={{
            position: "absolute", width: "150%", height: "150%",
            background: `conic-gradient(from 0deg, transparent 0%, transparent 80%, ${p.color} 100%)`,
            animation: "spinRotate 2s linear infinite",
            opacity: 0.5
          }} />
        )}

        {/* Inner dark circle to mask the rotating conic gradient */}
        <div style={{
          position: "absolute", inset: 2, borderRadius: 22,
          background: "#080C17", zIndex: 1
        }} />

        {/* Background fill wave */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0,
          height: `${fill}%`, background: `linear-gradient(180deg, ${p.color}40 0%, ${p.color}10 100%)`,
          zIndex: 2, transition: "height 0.3s ease",
          borderTop: fill > 0 && fill < 100 ? `1px solid ${p.color}` : "none",
        }} />

        {/* Logo */}
        <div style={{ position: "relative", zIndex: 3, width: 36, height: 36 }}>
          {/* Ghost Image */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={p.logo} alt="" style={{
            width: "100%", height: "100%", objectFit: "contain",
            position: "absolute", filter: "grayscale(1) opacity(0.2)"
          }} />
          
          {/* Filled Image */}
          <div style={{
            position: "absolute", bottom: 0, left: 0, right: 0,
            height: `${fill}%`, overflow: "hidden", transition: "height 0.3s ease"
          }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={p.logo} alt={p.label} style={{
              width: 36, height: 36, objectFit: "contain",
              position: "absolute", bottom: 0,
              filter: `drop-shadow(0 0 8px ${p.color}80)`
            }} />
          </div>
        </div>

        {/* Done Checkmark */}
        {done && (
          <div style={{
            position: "absolute", top: -6, right: -6, zIndex: 4,
            width: 20, height: 20, borderRadius: "50%", background: p.color,
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: `0 0 12px ${p.color}`, animation: "pop 0.4s cubic-bezier(0.34,1.56,0.64,1)"
          }}>
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <polyline points="2,5 4,7 8,3" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        )}
      </div>

      {/* Label and % */}
      <div style={{ textAlign: "center" }}>
        <p style={{
          fontSize: "0.65rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em",
          color: done ? p.color : "rgba(255,255,255,0.4)", margin: 0, transition: "color 0.4s ease"
        }}>{p.label}</p>
        <p style={{
          fontSize: "0.6rem", color: "rgba(255,255,255,0.2)", fontFamily: "monospace", margin: "2px 0 0"
        }}>{fill}%</p>
      </div>
    </div>
  );
}

/* ── Main Loading Screen ── */
export default function LoadingScreen({ isLoading }) {
  const [progress, setProgress] = useState(0);
  const [visible,  setVisible]  = useState(false);
  const [log,      setLog]      = useState(TERMINAL_LOGS[0][1]);
  const [exit,     setExit]     = useState(false);
  const [gone,     setGone]     = useState(false);

  useEffect(() => {
    if (!isLoading) return;
    const tc = setTimeout(() => setVisible(true), 100);

    let val = 0;
    const iv = setInterval(() => {
      val += Math.random() * 4 + 1; // Slower, smoother increment
      if (val >= 100) { val = 100; clearInterval(iv); }
      const n = Math.round(val);
      setProgress(n);
      
      // Update terminal log
      for (let i = TERMINAL_LOGS.length - 1; i >= 0; i--) {
        if (n >= TERMINAL_LOGS[i][0]) { setLog(TERMINAL_LOGS[i][1]); break; }
      }
    }, 60);

    return () => { clearTimeout(tc); clearInterval(iv); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  useEffect(() => {
    if (!isLoading && progress >= 90) {
      setProgress(100);
      setLog("> SYSTEM READY. LAUNCHING PORTFOLIO ✦");
      const t = setTimeout(() => {
        setExit(true);
        setTimeout(() => setGone(true), 800);
      }, 600);
      return () => clearTimeout(t);
    }
  }, [isLoading, progress]);

  if (gone) return null;

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 9999,
      backgroundColor: "#030712", // ultra dark premium background
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      opacity: exit ? 0 : 1,
      transform: exit ? "scale(1.05)" : "scale(1)",
      transition: "opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
      overflow: "hidden",
    }}>

      {/* ── Background Effects ── */}
      {/* Moving Dot Grid */}
      <div style={{
        position: "absolute", inset: "-50%", pointerEvents: "none",
        backgroundImage: "radial-gradient(rgba(255,255,255,0.08) 1px, transparent 1px)",
        backgroundSize: "40px 40px",
        animation: "panGrid 40s linear infinite",
        opacity: visible ? 1 : 0, transition: "opacity 2s ease"
      }} />

      {/* Giant Ambient Glowing Orbs */}
      <div style={{ position:"absolute", top:"-10%", left:"-10%", width:"50vw", height:"50vw", background:"radial-gradient(circle, rgba(0,161,224,0.08) 0%, transparent 60%)", filter:"blur(80px)", mixBlendMode:"screen", animation:"pulseOrb 8s ease-in-out infinite alternate" }} />
      <div style={{ position:"absolute", bottom:"-10%", right:"-10%", width:"50vw", height:"50vw", background:"radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 60%)", filter:"blur(80px)", mixBlendMode:"screen", animation:"pulseOrb 10s ease-in-out infinite alternate-reverse" }} />

      {/* ── Center Content ── */}
      <div style={{
        position: "relative", zIndex: 10, display: "flex", flexDirection: "column", alignItems: "center",
        width: "100%", maxWidth: 600, padding: 24
      }}>

        {/* Top Identity Title */}
        <div style={{
          opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(-20px)",
          transition: "all 1s cubic-bezier(0.16, 1, 0.3, 1)",
          marginBottom: 60, textAlign: "center"
        }}>
          <h1 style={{
            margin: 0, fontSize: "2.5rem", fontWeight: 900, letterSpacing: "0.2em",
            textTransform: "uppercase", color: "transparent",
            WebkitTextStroke: "1px rgba(255,255,255,0.1)",
            position: "relative"
          }}>
            {/* The outline text */}
            HUZEFA
            {/* The filled text that grows with progress */}
            <span style={{
              position: "absolute", left: 0, top: 0, overflow: "hidden",
              width: `${progress}%`, transition: "width 0.2s ease",
              background: "linear-gradient(90deg, #00A1E0, #8B5CF6, #FF7A59)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              WebkitTextStroke: "0px", whiteSpace: "nowrap"
            }}>HUZEFA</span>
          </h1>
          <p style={{
            margin: "12px 0 0", fontSize: "0.7rem", letterSpacing: "0.4em",
            textTransform: "uppercase", color: "#00A1E0", fontWeight: 700,
            textShadow: "0 0 12px rgba(0,161,224,0.5)"
          }}>CRM Systems Architect</p>
        </div>

        {/* Platform Nodes (The 3 circles) */}
        <div style={{ display:"flex", gap: 32, marginBottom: 70 }}>
          {PLATFORMS.map((p, i) => (
            <PlatformNode key={p.id} p={p} total={progress} visible={visible} delay={0.2 + i * 0.15} />
          ))}
        </div>

        {/* Global Progress Bar */}
        <div style={{
          width: "100%", maxWidth: 400,
          opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)",
          transition: "all 1s 0.6s cubic-bezier(0.16, 1, 0.3, 1)"
        }}>
          {/* Percentage */}
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 12 }}>
            <span style={{ fontSize: "2rem", fontWeight: 300, color: "#fff", fontVariantNumeric: "tabular-nums", letterSpacing: "-0.02em" }}>
              {progress}<span style={{ color: "rgba(255,255,255,0.2)", fontSize: "1.2rem" }}>%</span>
            </span>
          </div>

          {/* Glowing Track */}
          <div style={{ height: 3, background: "rgba(255,255,255,0.05)", borderRadius: 4, position: "relative", overflow: "hidden" }}>
            <div style={{
              position: "absolute", top: 0, bottom: 0, left: 0,
              width: `${progress}%`, transition: "width 0.15s ease",
              background: "linear-gradient(90deg, #00A1E0, #8B5CF6)",
              boxShadow: "0 0 15px rgba(139,92,246,0.6)"
            }} />
          </div>

          {/* Terminal Log Output */}
          <div style={{
            marginTop: 16, height: 20, display: "flex", alignItems: "center", justifyContent: "center"
          }}>
            <span style={{
              fontFamily: "'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace",
              fontSize: "0.65rem", color: "rgba(255,255,255,0.4)", letterSpacing: "0.05em",
              animation: "pulseText 1.5s infinite"
            }}>
              {log}
            </span>
          </div>
        </div>

      </div>

      {/* Global Styles specific to Loading Screen */}
      <style>{`
        @keyframes panGrid {
          0% { transform: translateY(0); }
          100% { transform: translateY(40px); }
        }
        @keyframes spinRotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes pulseOrb {
          0% { transform: scale(1) translate(0, 0); opacity: 0.8; }
          100% { transform: scale(1.1) translate(2%, 2%); opacity: 1; }
        }
        @keyframes pop {
          0% { transform: scale(0); opacity: 0; }
          60% { transform: scale(1.2); }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes pulseText {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.8; }
        }
      `}</style>
    </div>
  );
}
