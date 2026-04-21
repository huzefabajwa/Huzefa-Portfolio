"use client";

import { useState } from "react";
import AnimationWrapper from "../animation-wrapper";
import { Mail, Phone, MapPin, Send, Linkedin, Github } from "lucide-react";
import { FaUpwork } from "react-icons/fa6";

export default function ClientContactView() {
  const [form, setForm]       = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus]   = useState("idle"); // idle | sending | sent | error
  const [touched, setTouched] = useState({});

  const update = (key, val) => setForm(prev => ({ ...prev, [key]: val }));
  const blur   = (key) => setTouched(prev => ({ ...prev, [key]: true }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    // Open mail client — works without a backend
    const subject = encodeURIComponent(form.subject || "Portfolio Enquiry");
    const body    = encodeURIComponent(
      `Hello Huzefa,\n\n${form.message}\n\nBest regards,\n${form.name}\n${form.email}`
    );
    window.open(`mailto:huzefabajwa62@gmail.com?subject=${subject}&body=${body}`, "_blank");
    setTimeout(() => setStatus("sent"), 400);
  };

  const contactItems = [
    { icon: <Mail size={18} />,     label: "Email",    value: "huzefabajwa62@gmail.com",   href: "mailto:huzefabajwa62@gmail.com", color: "var(--sf-blue)" },
    { icon: <MapPin size={18} />,   label: "Location", value: "Available Worldwide · Remote", color: "var(--hs-orange)" },
    { icon: <Phone size={18} />,    label: "Response", value: "Usually within 24 hours", color: "var(--d365-purple)" },
  ];

  const socialLinks = [
    { icon: <Linkedin size={18} />, label: "LinkedIn", color: "#0A66C2", href: "#" },
    { icon: <FaUpwork size={18} />, label: "Upwork",   color: "#6FDA44", href: "#" },
    { icon: <Github size={18} />,   label: "GitHub",   color: "#94A3B8", href: "#" },
  ];

  return (
    <section id="contact" className="relative py-28" style={{ background: "var(--bg-surface)" }}>
      {/* Accent orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(0,161,224,0.06) 0%, transparent 70%)", filter: "blur(60px)" }} />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(108,99,255,0.06) 0%, transparent 70%)", filter: "blur(60px)" }} />

      <div className="max-w-screen-xl mx-auto px-6 lg:px-16 relative z-10">

        {/* Heading */}
        <AnimationWrapper delay={100} className="flex flex-col items-center mb-20">
          <span className="section-label">Let's Connect</span>
          <h2 className="section-title text-center">Get In <span>Touch</span></h2>
          <p className="mt-4 text-center max-w-lg" style={{ color: "var(--text-muted)" }}>
            Ready to transform your business with the right CRM solution? Let's discuss your project.
          </p>
          <div className="section-divider mx-auto" />
        </AnimationWrapper>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">

          {/* ── LEFT: Info ─────────────────────────────────────────── */}
          <AnimationWrapper delay={200} className="lg:col-span-2 flex flex-col gap-8">

            {/* CTA copy */}
            <div className="glass-card p-8">
              <h3 className="text-2xl font-bold mb-3" style={{ color: "var(--text-primary)" }}>
                Ready to Elevate Your CRM?
              </h3>
              <p style={{ color: "var(--text-muted)", lineHeight: 1.7 }}>
                Whether you need a full Salesforce implementation, HubSpot onboarding, or a Dynamics 365 migration — I deliver enterprise-grade solutions tailored to your business.
              </p>

              {/* Platform tags */}
              <div className="flex flex-wrap gap-2 mt-5">
                {[
                  { label: "Salesforce", color: "#00A1E0" },
                  { label: "HubSpot",    color: "#FF7A59" },
                  { label: "Dynamics 365", color: "#9B59B6" },
                  { label: "Power Apps", color: "#8B5CF6" },
                ].map(p => (
                  <span key={p.label} className="text-xs font-semibold px-3 py-1 rounded-full" style={{ border: `1px solid ${p.color}35`, color: p.color, background: `${p.color}10` }}>{p.label}</span>
                ))}
              </div>
            </div>

            {/* Contact items */}
            <div className="flex flex-col gap-4">
              {contactItems.map((item, i) => (
                <AnimationWrapper key={i} delay={300 + i * 80}>
                  <div className="glass-card p-5 flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${item.color}15`, border: `1px solid ${item.color}30`, color: item.color }}>
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider mb-0.5" style={{ color: "var(--text-faint)" }}>{item.label}</p>
                      {item.href
                        ? <a href={item.href} className="text-sm font-medium transition-colors" style={{ color: "var(--text-primary)" }} onMouseOver={e => e.currentTarget.style.color = item.color} onMouseOut={e => e.currentTarget.style.color = "var(--text-primary)"}>{item.value}</a>
                        : <p className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>{item.value}</p>
                      }
                    </div>
                  </div>
                </AnimationWrapper>
              ))}
            </div>

            {/* Social row */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "var(--text-faint)" }}>Find Me On</p>
              <div className="flex gap-3">
                {socialLinks.map(s => (
                  <a key={s.label} href={s.href} aria-label={s.label}
                    className="w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-200"
                    style={{ background: "var(--bg-card)", border: "1px solid var(--border)", color: "var(--text-muted)" }}
                    onMouseOver={e => { e.currentTarget.style.color = s.color; e.currentTarget.style.borderColor = `${s.color}50`; e.currentTarget.style.boxShadow = `0 0 16px ${s.color}25`; }}
                    onMouseOut={e  => { e.currentTarget.style.color = "var(--text-muted)"; e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.boxShadow = "none"; }}
                  >{s.icon}</a>
                ))}
              </div>
            </div>

          </AnimationWrapper>

          {/* ── RIGHT: Contact Form ─────────────────────────────────── */}
          <AnimationWrapper delay={300} className="lg:col-span-3">
            <div className="glass-card p-8 lg:p-10">
              <h3 className="text-xl font-bold mb-6" style={{ color: "var(--text-primary)" }}>Send Me a Message</h3>

              {status === "sent" ? (
                <div className="flex flex-col items-center justify-center py-16 gap-4">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ background: "rgba(0,212,170,0.12)", border: "1px solid rgba(0,212,170,0.3)" }}>
                    <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8" style={{ color: "var(--teal)" }}><path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                  <p className="text-lg font-bold" style={{ color: "var(--text-primary)" }}>Message Ready!</p>
                  <p className="text-sm text-center" style={{ color: "var(--text-muted)" }}>Your email client should have opened. I'll respond within 24 hours.</p>
                  <button onClick={() => { setStatus("idle"); setForm({ name: "", email: "", subject: "", message: "" }); }} className="mt-2 px-5 py-2 rounded-full text-sm font-semibold transition-all" style={{ background: "rgba(0,161,224,0.1)", border: "1px solid rgba(0,161,224,0.3)", color: "var(--sf-blue)" }}>Send Another</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--text-faint)" }}>Full Name *</label>
                      <input
                        required
                        type="text"
                        value={form.name}
                        onChange={e => update("name", e.target.value)}
                        onBlur={() => blur("name")}
                        placeholder="John Smith"
                        className="form-input"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--text-faint)" }}>Email Address *</label>
                      <input
                        required
                        type="email"
                        value={form.email}
                        onChange={e => update("email", e.target.value)}
                        onBlur={() => blur("email")}
                        placeholder="john@company.com"
                        className="form-input"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--text-faint)" }}>Subject</label>
                    <input
                      type="text"
                      value={form.subject}
                      onChange={e => update("subject", e.target.value)}
                      placeholder="Salesforce Implementation Project"
                      className="form-input"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--text-faint)" }}>Message *</label>
                    <textarea
                      required
                      rows={6}
                      value={form.message}
                      onChange={e => update("message", e.target.value)}
                      placeholder="Tell me about your project, CRM goals, and timeline..."
                      className="form-input resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-sm transition-all duration-200 self-start mt-1"
                    style={{
                      background: "linear-gradient(135deg, var(--sf-blue), var(--accent))",
                      color: "#fff",
                      boxShadow: "0 4px 24px rgba(0,161,224,0.35)",
                      opacity: status === "sending" ? 0.8 : 1,
                    }}
                    onMouseOver={e => { if (status !== "sending") e.currentTarget.style.boxShadow = "0 8px 36px rgba(0,161,224,0.5)"; }}
                    onMouseOut={e  => { e.currentTarget.style.boxShadow = "0 4px 24px rgba(0,161,224,0.35)"; }}
                  >
                    {status === "sending" ? (
                      <>
                        <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white" style={{ animation: "spin-slow 0.9s linear infinite" }} />
                        Opening email client...
                      </>
                    ) : (
                      <>
                        <Send size={16} />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </AnimationWrapper>

        </div>
      </div>
    </section>
  );
}