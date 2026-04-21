"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";
import { FaUpwork, FaGithub, FaLinkedin, FaStackOverflow } from "react-icons/fa6";
import { FaSlack } from "react-icons/fa";
import { PlatformIcon } from "@/components/crm-icons";
import talhabajwa from "../../../app/assets/Talhabajwa.jpg";


/* ─── CRM Brand Colors ───────────────────────────────────────────── */
const CRM_COLORS = {
  sf:   { primary: "#00A1E0", glow: "rgba(0,161,224,0.6)",   dim: "rgba(0,161,224,0.15)"  },
  hs:   { primary: "#FF7A59", glow: "rgba(255,122,89,0.6)",  dim: "rgba(255,122,89,0.15)" },
  d365: { primary: "#742774", glow: "rgba(116,39,116,0.6)",  dim: "rgba(116,39,116,0.15)" },
};

/* ─── Enhanced Particle Canvas — clean mesh + mouse repel ───────── */
function ParticleCanvas() {
  const canvasRef = useRef(null);
  const mouse     = useRef({ x: -9999, y: -9999 });
  const rafId     = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize, { passive: true });

    const COUNT = 110;
    const colorPool = [
      "rgba(0,161,224,",    // SF Blue
      "rgba(108,99,255,",   // Indigo
      "rgba(255,122,89,",   // HubSpot orange
      "rgba(116,39,116,",   // D365 purple
      "rgba(0,212,170,",    // Teal
    ];

    const particles = Array.from({ length: COUNT }, () => ({
      x:     Math.random() * (canvas.width  || 1200),
      y:     Math.random() * (canvas.height || 800),
      vx:    (Math.random() - 0.5) * 0.35,
      vy:    (Math.random() - 0.5) * 0.35,
      r:     0.8 + Math.random() * 1.4,
      color: colorPool[Math.floor(Math.random() * colorPool.length)],
    }));

    const LINK_DIST    = 120;
    const MOUSE_REPEL  = 150;
    const MOUSE_SWIRL  = 280;
    const MOUSE_FORCE  = 0.055;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const mx = mouse.current.x;
      const my = mouse.current.y;

      // Subtle mouse halo glow
      if (mx > 0 && mx < canvas.width) {
        const g = ctx.createRadialGradient(mx, my, 0, mx, my, 200);
        g.addColorStop(0, "rgba(0,161,224,0.08)");
        g.addColorStop(0.5, "rgba(108,99,255,0.04)");
        g.addColorStop(1, "rgba(0,161,224,0)");
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      particles.forEach((p, idx) => {
        const dx   = mx - p.x;
        const dy   = my - p.y;
        const dist = Math.hypot(dx, dy);

        if (dist < MOUSE_REPEL && dist > 1) {
          // Repel
          const force = (MOUSE_REPEL - dist) / MOUSE_REPEL;
          p.vx -= (dx / dist) * force * MOUSE_FORCE * 2.5;
          p.vy -= (dy / dist) * force * MOUSE_FORCE * 2.5;
        } else if (dist < MOUSE_SWIRL && dist > MOUSE_REPEL) {
          // Tangential swirl
          const angle = Math.atan2(dy, dx) + Math.PI * 0.28;
          const force = (dist - MOUSE_REPEL) / (MOUSE_SWIRL - MOUSE_REPEL);
          p.vx += Math.cos(angle) * force * MOUSE_FORCE * 0.4;
          p.vy += Math.sin(angle) * force * MOUSE_FORCE * 0.4;
        }

        p.vx *= 0.98;
        p.vy *= 0.98;
        p.x  += p.vx;
        p.y  += p.vy;

        if (p.x < 0 || p.x > canvas.width)  p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        // Brighten near mouse
        const bright = dist < MOUSE_REPEL
          ? 0.7 + 0.3 * (1 - dist / MOUSE_REPEL)
          : 0.45;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${bright})`;
        ctx.fill();

        // Link nearby particles
        for (let j = idx + 1; j < COUNT; j++) {
          const p2   = particles[j];
          const d    = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (d < LINK_DIST) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(108,99,255,${(1 - d / LINK_DIST) * 0.12})`;
            ctx.lineWidth   = 0.5;
            ctx.stroke();
          }
        }
      });

      // Custom crosshair cursor dot
      if (mx > 0 && mx < canvas.width) {
        ctx.beginPath();
        ctx.arc(mx, my, 3.5, 0, Math.PI * 2);
        ctx.fillStyle   = "rgba(0,161,224,0.92)";
        ctx.shadowColor = "rgba(0,161,224,0.7)";
        ctx.shadowBlur  = 14;
        ctx.fill();
        ctx.shadowBlur = 0;

        ctx.beginPath();
        ctx.moveTo(mx - 10, my); ctx.lineTo(mx + 10, my);
        ctx.moveTo(mx, my - 10); ctx.lineTo(mx, my + 10);
        ctx.strokeStyle = "rgba(0,161,224,0.28)";
        ctx.lineWidth   = 0.8;
        ctx.stroke();
      }

      rafId.current = requestAnimationFrame(draw);
    };

    draw();

    const onMove = (e) => {
      const rect      = canvas.getBoundingClientRect();
      mouse.current.x = e.clientX - rect.left;
      mouse.current.y = e.clientY - rect.top;
    };
    const onLeave = () => { mouse.current.x = -9999; mouse.current.y = -9999; };
    window.addEventListener("mousemove",  onMove,  { passive: true });
    window.addEventListener("mouseleave", onLeave, { passive: true });

    return () => {
      cancelAnimationFrame(rafId.current);
      window.removeEventListener("resize",    resize);
      window.removeEventListener("mousemove",  onMove);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ cursor: "none", pointerEvents: "none" }}
      aria-hidden="true"
    />
  );
}


/* ─── Inline CRM Platform SVG Logos ─────────────────────────────── */
function SalesforceBadge() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.55, duration: 0.4, type: "spring", stiffness: 200 }}
      className="platform-badge absolute z-20"
      style={{
        top: "6%", right: "-20px",
        background: "rgba(5,18,40,0.92)",
        border: "1px solid rgba(0,161,224,0.45)",
        color: "#00A1E0",
        boxShadow: "0 4px 20px rgba(0,161,224,0.25)",
        backdropFilter: "blur(10px)",
      }}
    >
      {/* Salesforce Cloud SVG inline */}
      <svg viewBox="0 0 24 16" fill="none" className="w-5 h-3.5">
        <path d="M10 2a3.8 3.8 0 0 1 2.7-1.1c1.35 0 2.6.7 3.27 1.76A4.73 4.73 0 0 1 18 2.2c2.65 0 4.8 2.17 4.8 4.85S20.65 11.9 18 11.9c-.33 0-.64-.03-.93-.09a3.3 3.3 0 0 1-3.1 2.18 3.26 3.26 0 0 1-1.4-.3 4 4 0 0 1-3.73 2.51A4 4 0 0 1 4.95 13a3.6 3.6 0 0 1-.6.05A3.6 3.6 0 0 1 .75 9.45a3.6 3.6 0 0 1 2.42-3.4 4.26 4.26 0 0 1-.12-.98C3.05 3.08 5.08 1 7.6 1c.87 0 1.68.24 2.4.68V2z" fill="currentColor"/>
      </svg>
      <span style={{ fontSize: "0.7rem", fontWeight: 700 }}>Salesforce</span>
    </motion.div>
  );
}

function HubSpotBadge() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.68, duration: 0.4, type: "spring", stiffness: 200 }}
      className="platform-badge absolute z-20"
      style={{
        top: "34%", right: "-24px",
        background: "rgba(5,18,40,0.92)",
        border: "1px solid rgba(255,122,89,0.45)",
        color: "#FF7A59",
        boxShadow: "0 4px 20px rgba(255,122,89,0.25)",
        backdropFilter: "blur(10px)",
      }}
    >
      {/* HubSpot sprocket SVG inline */}
      <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4">
        <path d="M11 5.8V3.5a1 1 0 1 0-2 0v2.3a3 3 0 1 0 2 0zM10 11.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" fill="currentColor"/>
        <path d="M6 7H4.5V4H3v3H1.5v1H3v4h1.5V8H6V7z" fill="currentColor"/>
      </svg>
      <span style={{ fontSize: "0.7rem", fontWeight: 700 }}>HubSpot</span>
    </motion.div>
  );
}

function Dynamics365Badge() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.82, duration: 0.4, type: "spring", stiffness: 200 }}
      className="platform-badge absolute z-20"
      style={{
        bottom: "28%", left: "-24px",
        background: "rgba(5,18,40,0.92)",
        border: "1px solid rgba(116,39,116,0.45)",
        color: "#B06FC0",
        boxShadow: "0 4px 20px rgba(116,39,116,0.25)",
        backdropFilter: "blur(10px)",
      }}
    >
      {/* Dynamics hexagon SVG inline */}
      <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4">
        <path d="M8 1.5L1.5 5v6L8 14.5l6.5-3.5V5L8 1.5z" fill="currentColor" opacity="0.3"/>
        <path d="M8 1.5l6.5 3.5-6.5 3.5L1.5 5 8 1.5z" fill="currentColor"/>
        <path d="M1.5 5l6.5 3.5v6L1.5 11V5z" fill="currentColor" opacity="0.7"/>
      </svg>
      <span style={{ fontSize: "0.7rem", fontWeight: 700 }}>Dynamics 365</span>
    </motion.div>
  );
}

function PowerAppsBadge() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.95, duration: 0.4, type: "spring", stiffness: 200 }}
      className="platform-badge absolute z-20"
      style={{
        bottom: "7%", left: "10px",
        background: "rgba(5,18,40,0.92)",
        border: "1px solid rgba(108,99,255,0.45)",
        color: "#8B5CF6",
        boxShadow: "0 4px 20px rgba(108,99,255,0.25)",
        backdropFilter: "blur(10px)",
      }}
    >
      <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4">
        <path d="M8 2L3 7h3v7h4V7h3L8 2z" fill="currentColor"/>
      </svg>
      <span style={{ fontSize: "0.7rem", fontWeight: 700 }}>Power Apps</span>
    </motion.div>
  );
}

/* ─── Social Icons map ───────────────────────────────────────────── */
const ICON_MAP = {
  upwork:   FaUpwork,
  github:   FaGithub,
  linkedin: FaLinkedin,
  stack:    FaStackOverflow,
  slack:    FaSlack,
};

/* ─── Stat Chip ──────────────────────────────────────────────────── */
function StatChip({ value, label, color }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.0, duration: 0.5 }}
      className="flex flex-col items-center px-5 py-3 rounded-2xl"
      style={{
        background: "rgba(12,24,41,0.8)",
        border: `1px solid ${color}40`,
        boxShadow: `0 4px 20px ${color}18`,
        backdropFilter: "blur(12px)",
        minWidth: 80,
      }}
    >
      <span className="text-2xl font-black" style={{ color }}>{value}</span>
      <span className="text-xs mt-0.5" style={{ color: "var(--text-faint)", letterSpacing: "0.05em" }}>{label}</span>
    </motion.div>
  );
}

/* ─── Hero Section ───────────────────────────────────────────────── */
export default function ClientHomeView({ data, platformsData, aboutData, onLoaded }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);
  useEffect(() => {
    if (mounted && typeof onLoaded === "function") onLoaded();
  }, [mounted, onLoaded]);

  const d          = data?.[0] || {};
  const ab         = aboutData || {};
  const hireMeLink = d.hireme || "#";
  const roleTitle  = d.roleTitle || "CRM Consultant & Digital Transformation Expert";
  const summaryParts = (
    d.summary || "Salesforce Consultant,HubSpot Specialist,Dynamics 365 Expert,CRM Architect"
  ).split(",");

  // Hero stat chips — read from aboutData (same DB as About section)
  const heroStats = [
    { value: ab.noofclients       ? `${ab.noofclients}+`       : "50+",  label: "Clients",   color: "var(--sf-blue)"    },
    { value: ab.noofplatforms     ? `${ab.noofplatforms}+`     : "3+",   label: "Platforms", color: "var(--hs-orange)"  },
    { value: ab.yearsofexperience ? `${ab.yearsofexperience}+` : "5+",   label: "Years",     color: "var(--d365-purple)"},
  ];

  const platforms = (platformsData && platformsData.length > 0) ? platformsData : [
    { name: "Salesforce", color: "#00A1E0", logoUrl: "/salesforce-logo.png" },
    { name: "HubSpot", color: "#FF7A59", logoUrl: "/hubspot-logo.png" },
    { name: "Dynamics 365", color: "#9B59B6", logoUrl: "/powerapps-logo.png" },
    { name: "Power Apps", color: "#8B5CF6", logoUrl: "/powerapps-logo.png" }
  ];

  const socials = [
    { id: "linkedin", link: d.linkedin?.trim() || "", label: "LinkedIn" },
    { id: "upwork",   link: d.upwork?.trim()   || "", label: "Upwork" },
    { id: "github",   link: d.github?.trim()   || "", label: "GitHub" },
    { id: "slack",    link: d.slack?.trim()    || "", label: "Slack" },
  ].filter(s => s.link);

  return (
    <section
      id="home"
      className="relative w-full min-h-screen overflow-hidden flex items-center"
      style={{ background: "var(--bg-base)" }}
    >
      {/* Multi-color particle canvas */}
      {mounted && <ParticleCanvas />}

      {/* Layered gradient overlays */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse 70% 55% at 25% 50%, rgba(0,161,224,0.07) 0%, transparent 60%)",
      }} />
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse 60% 50% at 75% 60%, rgba(108,99,255,0.07) 0%, transparent 60%)",
      }} />
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse 80% 40% at 50% 100%, rgba(5,13,26,0.9) 0%, transparent 60%)",
      }} />

      {/* Content */}
      <div className="relative z-10 w-full max-w-screen-xl mx-auto px-6 lg:px-16 xl:px-20 pt-28 pb-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

        {/* ── LEFT: Text ─────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="flex flex-col items-start"
        >
          {/* Greeting pill */}
          <motion.span
            className="section-label mb-4"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <span style={{ color: "var(--gold)" }}>👋</span> Hello, I'm
          </motion.span>

          {/* Name */}
          <h1
            className="font-black leading-none tracking-tight"
            style={{
              fontSize: "clamp(3rem, 7vw, 5.2rem)",
              background: "linear-gradient(135deg, #fff 30%, rgba(0,161,224,0.9) 75%, rgba(108,99,255,0.8) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {d.heading || "Huzefa Bajwa"}
          </h1>

          {/* CRM Role identifier — editable from Admin > Hero */}
          <div className="mt-3 flex items-center gap-2">
            <div style={{ width: 3, height: 18, background: "var(--sf-blue)", borderRadius: 4 }} />
            <span className="text-sm font-semibold tracking-wide" style={{ color: "var(--sf-blue)" }}>
              {roleTitle}
            </span>
          </div>

          {/* Typewriter specializations */}
          <p className="mt-5 text-xl lg:text-2xl font-medium" style={{ color: "var(--text-muted)", minHeight: "2rem" }}>
            <span style={{ color: "var(--gold)" }}>
              <Typewriter
                words={summaryParts}
                loop={Infinity}
                cursor
                cursorStyle="|"
                typeSpeed={60}
                deleteSpeed={35}
                delaySpeed={2200}
              />
            </span>
          </p>

          {/* Blurb */}
          <p className="mt-4 max-w-lg text-base leading-relaxed" style={{ color: "var(--text-muted)" }}>
            {d.aboutme || "Helping businesses streamline operations and accelerate growth through strategic CRM implementation and digital transformation."}
          </p>

          {/* Stat chips — values from DB (aboutData) */}
          <motion.div
            className="mt-7 flex flex-wrap gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            {heroStats.map((s, i) => (
              <StatChip key={i} value={s.value} label={s.label} color={s.color} />
            ))}
          </motion.div>

          {/* CTA + Socials */}
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href={hireMeLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full font-semibold text-sm transition-all duration-250"
              style={{
                background: "linear-gradient(135deg, var(--sf-blue), var(--accent))",
                color: "#fff",
                boxShadow: "0 0 28px rgba(0,161,224,0.35)",
              }}
              onMouseOver={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 32px rgba(0,161,224,0.4)"; }}
              onMouseOut={e  => { e.currentTarget.style.transform = "translateY(0)";     e.currentTarget.style.boxShadow = "0 0 28px rgba(0,161,224,0.35)"; }}
            >
              Hire Me
              <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"/></svg>
            </a>

            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full font-semibold text-sm transition-all duration-250"
              style={{
                background: "transparent",
                color: "var(--text-primary)",
                border: "1px solid var(--border)",
              }}
              onMouseOver={e => { e.currentTarget.style.borderColor = "rgba(0,161,224,0.5)"; e.currentTarget.style.background = "rgba(0,161,224,0.07)"; }}
              onMouseOut={e  => { e.currentTarget.style.borderColor = "var(--border)";         e.currentTarget.style.background = "transparent"; }}
            >
              Get in Touch
            </a>

            {/* Social icons */}
            <div className="flex items-center gap-2 ml-1">
              {socials.map(({ id, link, label }) => {
                const Icon = ICON_MAP[id];
                return (
                  <a
                    key={id}
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="w-9 h-9 rounded-full flex items-center justify-center text-sm transition-all duration-200"
                    style={{ background: "var(--bg-card)", border: "1px solid var(--border)", color: "var(--text-muted)" }}
                    onMouseOver={e => { e.currentTarget.style.borderColor = "var(--sf-blue)"; e.currentTarget.style.color = "var(--sf-blue)"; e.currentTarget.style.boxShadow = "0 0 14px rgba(0,161,224,0.3)"; }}
                    onMouseOut={e  => { e.currentTarget.style.borderColor = "var(--border)";   e.currentTarget.style.color = "var(--text-muted)"; e.currentTarget.style.boxShadow = "none"; }}
                  >
                    <Icon />
                  </a>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* ── RIGHT: Photo Card ───────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
          className="relative flex justify-center lg:justify-end"
        >
          {/* Glow blobs */}
          <div className="absolute" style={{
            width: 280, height: 280, borderRadius: "50%",
            background: "radial-gradient(circle, rgba(0,161,224,0.22) 0%, transparent 70%)",
            filter: "blur(50px)", top: "50%", left: "50%",
            transform: "translate(-50%, -50%)", zIndex: 0,
          }} />
          <div className="absolute" style={{
            width: 200, height: 200, borderRadius: "50%",
            background: "radial-gradient(circle, rgba(108,99,255,0.2) 0%, transparent 70%)",
            filter: "blur(40px)", top: "20%", right: "5%", zIndex: 0,
          }} />

          {/* Photo frame */}
          <div
            className="relative z-10"
            style={{
              width: "clamp(260px, 34vw, 390px)",
              height: "clamp(310px, 42vw, 470px)",
              borderRadius: "24px 24px 80px 24px",
              overflow: "hidden",
              border: "2px solid transparent",
              backgroundImage: "linear-gradient(var(--bg-card), var(--bg-card)), linear-gradient(135deg, var(--sf-blue), var(--accent), var(--d365-purple))",
              backgroundOrigin: "border-box",
              backgroundClip: "padding-box, border-box",
              boxShadow: "0 28px 64px rgba(0,0,0,0.55), 0 0 0 1px rgba(0,161,224,0.15)",
              transform: "rotate(-2deg)",
              transformOrigin: "center",
              transition: "transform 0.45s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.45s ease",
            }}
            onMouseOver={e => {
              e.currentTarget.style.transform = "rotate(0deg) scale(1.025)";
              e.currentTarget.style.boxShadow = "0 36px 80px rgba(0,0,0,0.55), 0 0 50px rgba(0,161,224,0.25)";
            }}
            onMouseOut={e => {
              e.currentTarget.style.transform = "rotate(-2deg)";
              e.currentTarget.style.boxShadow = "0 28px 64px rgba(0,0,0,0.55), 0 0 0 1px rgba(0,161,224,0.15)";
            }}
          >
            {/* DB photo takes priority; fall back to bundled photo */}
            {d.imageUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={d.imageUrl}
                alt="Huzefa Bajwa — CRM Consultant"
                className="w-full h-full object-cover object-top"
              />
            ) : (
              <Image
                src={talhabajwa}
                alt="Huzefa Bajwa — CRM Consultant"
                fill
                quality={95}
                className="object-cover object-top"
                priority
              />
            )}
            {/* Gradient overlay */}
            <div className="absolute inset-x-0 bottom-0 h-1/3" style={{
              background: "linear-gradient(to top, rgba(5,13,26,0.75), transparent)",
            }} />
            {/* Name tag at bottom */}
            <div className="absolute bottom-5 left-5 right-5">
              <p className="text-xs font-bold tracking-widest uppercase" style={{ color: "var(--sf-blue)" }}>CRM Consultant</p>
            </div>
          </div>

          {/* CRM Platform Badges - official logos */}
          {platforms.slice(0, 4).map((platform, idx) => {
            const positions = [
              { top: "5%", right: "-5%" },
              { top: "42%", right: "-14%" },
              { bottom: "12%", right: "4%" },
              { bottom: "3%", left: "-6%" }
            ];
            const pos = positions[idx] || positions[0];
            return (
              <motion.div
                key={`platform-badge-${idx}`}
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.4 + (idx * 0.18), duration: 0.55, type: "spring", stiffness: 200 }}
                className="absolute flex items-center gap-2 px-3 py-2 rounded-full z-20"
                style={{
                  ...pos,
                  background: `${platform.color}18`,
                  border: `1px solid ${platform.color}45`,
                  backdropFilter: "blur(10px)",
                  boxShadow: `0 4px 16px ${platform.color}20`
                }}
              >
                {platform.logoUrl ? (
                  <img src={platform.logoUrl} alt={platform.name} className="object-contain" style={{ width: 18, height: 18 }} />
                ) : (
                  <PlatformIcon name={platform.name} color={platform.color} size={16} />
                )}
                <span className="text-[10px] font-bold whitespace-nowrap" style={{ color: platform.color }}>{platform.name}</span>
              </motion.div>
            );
          })}
        </motion.div>

      </div>

      {/* Scroll cue */}
      {mounted && (
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3 }}
        >
          <span className="text-[10px] tracking-[0.25em] uppercase" style={{ color: "var(--text-faint)" }}>Scroll</span>
          <div className="w-5 h-8 rounded-full flex items-start justify-center pt-1.5" style={{ border: "1px solid var(--border)" }}>
            <motion.div
              className="w-1 h-2 rounded-full"
              style={{ background: "var(--sf-blue)" }}
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      )}
    </section>
  );
}
