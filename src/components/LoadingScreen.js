"use client";

import { useEffect, useState } from "react";

/* ─── Platform definitions ─── */
const PLATFORMS = [
  {
    id:    "sf",
    label: "Salesforce",
    color: "#00A1E0",
    logo:  "/salesforce-logo.png",
    start: 0,
    end:   60,
  },
  {
    id:    "hs",
    label: "HubSpot",
    color: "#FF7A59",
    logo:  "/hubspot-logo.png",
    start: 20,
    end:   80,
  },
  {
    id:    "pa",
    label: "Power Apps",
    color: "#8B5CF6",
    logo:  "/powerapps-logo.png",
    start: 40,
    end:   100,
  },
];

const STATUS = [
  [0,  "Initialising..."],
  [15, "Connecting to Salesforce..."],
  [35, "Loading HubSpot..."],
  [55, "Syncing Power Platform..."],
  [80, "Configuring dashboard..."],
  [95, "Almost ready..."],
  [100,"Portfolio ready ✦"],
];

/* ── Individual logo card ── */
function LogoCard({ p, total, visible, delay }) {
  const range = p.end - p.start;
  const fill  = total < p.start ? 0
              : total > p.end   ? 100
              : Math.round(((total - p.start) / range) * 100);
  const done  = fill >= 100;

  return (
    <div style={{
      opacity:   visible ? 1 : 0,
      transform: visible ? "none" : "translateY(16px)",
      transition: `opacity 0.5s ${delay}s ease, transform 0.5s ${delay}s ease`,
    }}>
      {/* Card shell */}
      <div style={{
        width: 110,
        background: fill > 0 ? `${p.color}0A` : "rgba(255,255,255,0.02)",
        border: `1px solid ${fill > 0 ? p.color + "28" : "rgba(255,255,255,0.05)"}`,
        borderRadius: 16,
        padding: "20px 16px 16px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 12,
        position: "relative",
        transition: "all 0.4s ease",
        boxShadow: fill > 0 ? `0 0 28px ${p.color}18` : "none",
      }}>

        {/* Done badge */}
        {done && (
          <div style={{
            position: "absolute", top: -8, right: -8,
            width: 18, height: 18, borderRadius: "50%",
            background: p.color, display: "flex",
            alignItems: "center", justifyContent: "center",
            animation: "pop 0.3s cubic-bezier(0.34,1.56,0.64,1)",
            boxShadow: `0 0 8px ${p.color}`,
          }}>
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <polyline points="1.5,5 4,7.5 8.5,2.5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
          </div>
        )}

        {/* Logo with fill-up reveal */}
        <div style={{ width: 48, height: 48, position: "relative" }}>
          {/* Ghost */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={p.logo} alt={p.label} style={{
            width: "100%", height: "100%", objectFit: "contain",
            position: "absolute", inset: 0,
            filter: "grayscale(1) brightness(0.18)",
          }} />
          {/* Filled portion */}
          <div style={{
            position: "absolute", left: 0, right: 0,
            bottom: 0, height: `${fill}%`,
            overflow: "hidden",
            transition: "height 0.3s ease",
          }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={p.logo} alt="" style={{
              width: 48, height: 48, objectFit: "contain",
              position: "absolute", bottom: 0,
              filter: fill > 0 ? `drop-shadow(0 0 6px ${p.color}88)` : "none",
            }} />
          </div>
        </div>

        {/* Thin progress bar */}
        <div style={{ width: "100%", height: 2, borderRadius: 2, background: "rgba(255,255,255,0.05)" }}>
          <div style={{
            height: "100%", borderRadius: 2,
            width: `${fill}%`,
            background: p.color,
            transition: "width 0.3s ease",
            boxShadow: fill > 0 ? `0 0 6px ${p.color}` : "none",
          }} />
        </div>

        {/* Label */}
        <p style={{
          fontSize: "0.68rem", fontWeight: 700,
          color: fill > 0 ? p.color : "rgba(255,255,255,0.2)",
          transition: "color 0.4s ease",
          margin: 0,
        }}>{p.label}</p>
      </div>
    </div>
  );
}

/* ── Main component ── */
export default function LoadingScreen({ isLoading }) {
  const [progress, setProgress]  = useState(0);
  const [visible,  setVisible]   = useState(false);
  const [status,   setStatus]    = useState(STATUS[0][1]);
  const [exit,     setExit]      = useState(false);
  const [gone,     setGone]      = useState(false);

  /* Drive progress */
  useEffect(() => {
    if (!isLoading) return;
    const tc = setTimeout(() => setVisible(true), 200);

    let val = 0;
    const iv = setInterval(() => {
      val += Math.random() * 5 + 2;
      if (val >= 100) { val = 100; clearInterval(iv); }
      const n = Math.round(val);
      setProgress(n);
      for (let i = STATUS.length - 1; i >= 0; i--) {
        if (n >= STATUS[i][0]) { setStatus(STATUS[i][1]); break; }
      }
    }, 75);

    return () => { clearTimeout(tc); clearInterval(iv); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  /* Exit when site is ready */
  useEffect(() => {
    if (!isLoading && progress >= 95) {
      setProgress(100);
      setStatus("Portfolio ready ✦");
      const t = setTimeout(() => {
        setExit(true);
        setTimeout(() => setGone(true), 650);
      }, 500);
      return () => clearTimeout(t);
    }
  }, [isLoading, progress]);

  if (gone) return null;

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 999,
      background: "#060E1C",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      gap: 0,
      opacity:   exit ? 0 : 1,
      transform: exit ? "scale(1.03)" : "scale(1)",
      transition: exit ? "opacity 0.65s ease, transform 0.65s ease" : "none",
      overflow: "hidden",
    }}>

      {/* Subtle grid */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: "linear-gradient(rgba(0,161,224,0.035) 1px,transparent 1px),linear-gradient(90deg,rgba(0,161,224,0.035) 1px,transparent 1px)",
        backgroundSize: "60px 60px",
      }} />

      {/* Ambient blobs */}
      <div style={{ position:"absolute", top:"-20%", left:"-10%", width:600, height:600, borderRadius:"50%", background:"radial-gradient(circle,rgba(0,161,224,0.06) 0%,transparent 60%)", filter:"blur(70px)", pointerEvents:"none" }} />
      <div style={{ position:"absolute", bottom:"-20%", right:"-10%", width:500, height:500, borderRadius:"50%", background:"radial-gradient(circle,rgba(139,92,246,0.06) 0%,transparent 60%)", filter:"blur(70px)", pointerEvents:"none" }} />

      {/* ── Identity ── */}
      <div style={{ display:"flex", flexDirection:"column", alignItems:"center", marginBottom: 44, animation: "fadeUp 0.6s ease" }}>
        {/* Three logo row */}
        <div style={{ display:"flex", gap: 10, marginBottom: 16 }}>
          {PLATFORMS.map(p => (
            <div key={p.id} style={{
              width: 32, height: 32, borderRadius: 8,
              background: `${p.color}12`,
              border: `1px solid ${p.color}25`,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.logo} alt={p.label} style={{ width: 18, height: 18, objectFit: "contain" }} />
            </div>
          ))}
        </div>

        <h1 style={{
          margin: 0,
          fontSize: "1.75rem", fontWeight: 900,
          letterSpacing: "-0.045em",
          background: "linear-gradient(90deg, #fff 40%, rgba(0,161,224,0.7) 100%)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          lineHeight: 1,
        }}>
          Huzefa<span style={{ color: "#00A1E0", WebkitTextFillColor: "#00A1E0" }}>.</span>
        </h1>
        <p style={{
          margin: "6px 0 0", fontSize: "0.6rem",
          letterSpacing: "0.3em", textTransform: "uppercase",
          color: "rgba(0,161,224,0.7)", fontWeight: 700,
        }}>CRM Consultant</p>
      </div>

      {/* ── Platform cards ── */}
      <div style={{ display:"flex", gap: 14, marginBottom: 40 }}>
        {PLATFORMS.map((p, i) => (
          <LogoCard key={p.id} p={p} total={progress} visible={visible} delay={i * 0.1} />
        ))}
      </div>

      {/* ── Global progress bar ── */}
      <div style={{ width: "min(360px, 78vw)", display:"flex", flexDirection:"column", gap: 8 }}>
        {/* Track */}
        <div style={{ height: 2, borderRadius: 2, background: "rgba(255,255,255,0.05)", overflow:"hidden" }}>
          <div style={{
            height: "100%", borderRadius: 2,
            width: `${progress}%`,
            background: "linear-gradient(90deg, #00A1E0, #8B5CF6, #FF7A59)",
            transition: "width 0.2s ease",
            boxShadow: "0 0 10px rgba(0,161,224,0.4)",
            position: "relative", overflow: "hidden",
          }}>
            {/* shimmer */}
            <div style={{
              position:"absolute", inset:0,
              background:"linear-gradient(90deg,transparent,rgba(255,255,255,0.3),transparent)",
              animation: "shimmer 1.5s linear infinite",
            }} />
          </div>
        </div>

        {/* Status + % */}
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
          <span style={{ fontSize:"0.68rem", color:"rgba(255,255,255,0.3)", letterSpacing:"0.04em" }}>
            {status}
          </span>
          <span style={{ fontSize:"0.72rem", fontWeight: 800, color:"#00A1E0", fontVariantNumeric:"tabular-nums" }}>
            {progress}%
          </span>
        </div>
      </div>

      <style>{`
        @keyframes shimmer { from{transform:translateX(-100%)} to{transform:translateX(400%)} }
        @keyframes pop {
          0%{transform:scale(0);opacity:0} 70%{transform:scale(1.2)} 100%{transform:scale(1);opacity:1}
        }
        @keyframes fadeUp {
          from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:none}
        }
      `}</style>
    </div>
  );
}
