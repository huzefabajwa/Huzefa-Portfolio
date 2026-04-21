"use client";

import AnimationWrapper from "../animation-wrapper";
import { Briefcase, GraduationCap, Award } from "lucide-react";

export default function ClientExperienceAndEducationView({ educationData, experienceData }) {
  return (
    <section id="experience" className="relative py-28 section-grid-bg">
      {/* Decorative orbs */}
      <div className="absolute top-40 left-0 w-80 h-80 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(0,161,224,0.05) 0%, transparent 70%)", filter: "blur(60px)" }} />

      <div className="max-w-screen-xl mx-auto px-6 lg:px-16">

        {/* Heading */}
        <AnimationWrapper delay={100} className="flex flex-col items-center mb-20">
          <span className="section-label">My Journey</span>
          <h2 className="section-title text-center">Resume & <span>Expertise</span></h2>
          <div className="section-divider mx-auto" />
        </AnimationWrapper>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

          {/* ── Experience ────────────────────────────────────────── */}
          <div>
            <AnimationWrapper delay={200} className="flex items-center gap-4 mb-10">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: "rgba(254,197,68,0.1)", border: "1px solid rgba(254,197,68,0.25)", color: "var(--gold)" }}>
                <Briefcase size={22} />
              </div>
              <div>
                <h3 className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>Experience</h3>
                <p className="text-xs tracking-wider uppercase" style={{ color: "var(--text-faint)" }}>Professional History</p>
              </div>
            </AnimationWrapper>

            <div className="timeline">
              {experienceData && experienceData.length > 0 ? (
                experienceData.map((item, index) => (
                  <AnimationWrapper key={index} delay={300 + index * 100} className="timeline-item">
                    <div className="glass-card p-6 rounded-2xl relative group transition-all duration-300"
                      onMouseOver={e => { e.currentTarget.style.borderColor = "rgba(0,161,224,0.35)"; e.currentTarget.style.boxShadow = "0 8px 40px rgba(0,161,224,0.1)"; }}
                      onMouseOut={e  => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.boxShadow = "var(--shadow-card)"; }}
                    >
                      <span className="inline-flex items-center gap-1 px-3 py-1 mb-3 text-xs font-bold uppercase tracking-wider rounded-full" style={{ background: "rgba(254,197,68,0.12)", color: "var(--gold)", border: "1px solid rgba(254,197,68,0.2)" }}>
                        {item.duration}
                      </span>
                      <h4 className="text-lg font-bold mb-1 transition-colors" style={{ color: "var(--text-primary)" }}>{item.position}</h4>
                      <h5 className="text-sm font-semibold mb-3" style={{ color: "var(--sf-blue)" }}>
                        {item.company}
                        {item.location && <span style={{ color: "var(--text-faint)" }}> · {item.location}</span>}
                      </h5>
                      <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>{item.jobprofile}</p>
                    </div>
                  </AnimationWrapper>
                ))
              ) : (
                // Default CRM experience fallback
                [
                  { duration: "2022 – Present", position: "Senior CRM Consultant", company: "Independent", location: "Remote", desc: "Delivering Salesforce, HubSpot, and Dynamics 365 implementations for enterprise clients across multiple industries." },
                  { duration: "2020 – 2022",    position: "CRM Specialist",        company: "Digital Agency",  location: "Dubai",  desc: "Led CRM onboarding and automation projects for 20+ clients in MENA region." },
                ].map((item, i) => (
                  <AnimationWrapper key={i} delay={300 + i * 100} className="timeline-item">
                    <div className="glass-card p-6 rounded-2xl">
                      <span className="inline-flex items-center gap-1 px-3 py-1 mb-3 text-xs font-bold uppercase tracking-wider rounded-full" style={{ background: "rgba(254,197,68,0.12)", color: "var(--gold)", border: "1px solid rgba(254,197,68,0.2)" }}>
                        {item.duration}
                      </span>
                      <h4 className="text-lg font-bold mb-1" style={{ color: "var(--text-primary)" }}>{item.position}</h4>
                      <h5 className="text-sm font-semibold mb-3" style={{ color: "var(--sf-blue)" }}>
                        {item.company} <span style={{ color: "var(--text-faint)" }}>· {item.location}</span>
                      </h5>
                      <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>{item.desc}</p>
                    </div>
                  </AnimationWrapper>
                ))
              )}
            </div>
          </div>

          {/* ── Education & Certifications ─────────────────────────── */}
          <div>
            <AnimationWrapper delay={200} className="flex items-center gap-4 mb-10">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: "rgba(108,99,255,0.1)", border: "1px solid rgba(108,99,255,0.25)", color: "var(--accent)" }}>
                <GraduationCap size={22} />
              </div>
              <div>
                <h3 className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>Education</h3>
                <p className="text-xs tracking-wider uppercase" style={{ color: "var(--text-faint)" }}>Academic Background</p>
              </div>
            </AnimationWrapper>

            <div className="timeline timeline--education">
              {educationData && educationData.length > 0 ? (
                educationData.map((item, index) => (
                  <AnimationWrapper key={index} delay={300 + index * 100} className="timeline-item">
                    <div className="glass-card p-6 rounded-2xl"
                      onMouseOver={e => { e.currentTarget.style.borderColor = "rgba(108,99,255,0.35)"; e.currentTarget.style.boxShadow = "0 8px 40px rgba(108,99,255,0.08)"; }}
                      onMouseOut={e  => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.boxShadow = "var(--shadow-card)"; }}
                    >
                      <span className="inline-flex items-center gap-1 px-3 py-1 mb-3 text-xs font-bold uppercase tracking-wider rounded-full" style={{ background: "rgba(108,99,255,0.12)", color: "var(--accent)", border: "1px solid rgba(108,99,255,0.2)" }}>
                        {item.year}
                      </span>
                      <h4 className="text-lg font-bold mb-1" style={{ color: "var(--text-primary)" }}>{item.degree}</h4>
                      <h5 className="text-sm font-semibold" style={{ color: "var(--text-muted)" }}>{item.college}</h5>
                    </div>
                  </AnimationWrapper>
                ))
              ) : (
                <AnimationWrapper delay={300} className="timeline-item">
                  <div className="glass-card p-6 rounded-2xl">
                    <span className="inline-flex px-3 py-1 mb-3 text-xs font-bold uppercase tracking-wider rounded-full" style={{ background: "rgba(108,99,255,0.12)", color: "var(--accent)", border: "1px solid rgba(108,99,255,0.2)" }}>2018 – 2022</span>
                    <h4 className="text-lg font-bold mb-1" style={{ color: "var(--text-primary)" }}>Bachelor of Science in Information Technology</h4>
                    <h5 className="text-sm font-semibold" style={{ color: "var(--text-muted)" }}>University</h5>
                  </div>
                </AnimationWrapper>
              )}
            </div>


          </div>

        </div>
      </div>
    </section>
  );
}
