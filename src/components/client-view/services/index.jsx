"use client";

import AnimationWrapper from "../animation-wrapper";
import { TrendingUp, Settings, Users, BarChart2, RefreshCcw, Zap, Database, Globe, Layers } from "lucide-react";

/* ─── CRM-themed service icons ───────────────────────────────────── */
const ICON_MAP = {
  // CRM platforms
  FaSalesforce:          Zap,
  FaHubspot:             TrendingUp,
  FaMicrosoft:           Layers,
  // Integration & automation
  FaPlug:                RefreshCcw,
  FaBolt:                Zap,
  FaChalkboardTeacher:   Users,
  // Legacy web-dev icons (kept for backwards compat)
  FaLaptopCode:          Globe,
  FaServer:              Database,
  FaCloudUploadAlt:      Settings,
  FaReact:               Globe,
  FaNodeJs:              Database,
  FaMobileAlt:           Layers,
  FaDesktop:             Globe,
  FaDatabase:            Database,
  FaFigma:               Layers,
  FaTerminal:            Settings,
  FaMicrochip:           Zap,
  FaLayerGroup:          Layers,
  default:               BarChart2,
};



export default function ClientServicesView({ data }) {
  return (
    <section id="services" className="relative py-28" style={{ background: "var(--bg-surface)" }}>
      {/* Decorative orbs */}
      <div className="absolute top-20 right-10 w-64 h-64 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(0,161,224,0.05) 0%, transparent 70%)", filter: "blur(50px)" }} />

      <div className="max-w-screen-xl mx-auto px-6 lg:px-16">

        {/* Heading */}
        <AnimationWrapper delay={100} className="flex flex-col items-center mb-8">
          <span className="section-label">What I Offer</span>
          <h2 className="section-title text-center">My <span>Services</span></h2>
          <div className="section-divider mx-auto" />
        </AnimationWrapper>



        {/* ── Services Grid ────────────────────────────────────────── */}
        {data && data.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.map((item, index) => {
              const Icon = ICON_MAP[item.fareacticon] || ICON_MAP.default;
              // Cycle through CRM colors for the cards
              const colors = ["#00A1E0", "#FF7A59", "#9B59B6", "#8B5CF6", "#00D4AA", "#F2C811"];
              const cardColor = colors[index % colors.length];

              return (
                <AnimationWrapper key={index} delay={200 + (index % 3) * 100}>
                  <div
                    className="glass-card h-full p-8 flex flex-col items-start group transition-all duration-350"
                    onMouseOver={e => { e.currentTarget.style.borderColor = `${cardColor}45`; e.currentTarget.style.boxShadow = `0 8px 40px ${cardColor}15`; }}
                    onMouseOut={e  => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.boxShadow = "var(--shadow-card)"; }}
                  >
                    {/* Icon */}
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300"
                      style={{ background: `${cardColor}12`, border: `1px solid ${cardColor}30`, color: cardColor }}
                    >
                      <Icon size={28} />
                    </div>

                    {/* Color bar */}
                    <div className="w-8 h-0.5 rounded-full mb-4" style={{ background: cardColor }} />

                    <h3 className="text-lg font-bold mb-3 transition-colors duration-300" style={{ color: "var(--text-primary)" }}>
                      {item.title}
                    </h3>
                    <p className="text-sm leading-relaxed flex-grow" style={{ color: "var(--text-muted)" }}>
                      {item.service}
                    </p>

                    {/* Arrow indicator */}
                    <div className="mt-6 flex items-center gap-2 text-xs font-semibold transition-all duration-200" style={{ color: cardColor, opacity: 0.7 }}>
                      <span>Learn More</span>
                      <svg viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"/></svg>
                    </div>
                  </div>
                </AnimationWrapper>
              );
            })}
          </div>
        ) : (
          /* Default CRM services if no DB data */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: TrendingUp, title: "Salesforce Implementation",   desc: "End-to-end Salesforce CRM setup, customization, and deployment tailored to your business processes.", color: "#00A1E0" },
              { icon: Users,      title: "HubSpot Onboarding",          desc: "Full HubSpot platform setup including CRM, Marketing Hub, Sales Hub, and custom workflow automation.", color: "#FF7A59" },
              { icon: RefreshCcw, title: "CRM Migration",               desc: "Seamless data migration between CRM platforms with zero data loss and minimal business disruption.", color: "#9B59B6" },
              { icon: BarChart2,  title: "CRM Analytics & Reporting",   desc: "Custom dashboards, reports, and KPI frameworks to give you actionable insights from your CRM data.", color: "#8B5CF6" },
              { icon: Settings,   title: "Dynamics 365 Consulting",     desc: "Microsoft Dynamics 365 implementation, customization, and Power Platform integration for enterprise teams.", color: "#F2C811" },
              { icon: Zap,        title: "Workflow Automation",         desc: "Automate repetitive tasks, lead nurturing, and sales processes across your entire CRM ecosystem.", color: "#00D4AA" },
            ].map((s, i) => (
              <AnimationWrapper key={i} delay={200 + (i % 3) * 100}>
                <div
                  className="glass-card h-full p-8 flex flex-col items-start group"
                  onMouseOver={e => { e.currentTarget.style.borderColor = `${s.color}45`; e.currentTarget.style.boxShadow = `0 8px 40px ${s.color}15`; e.currentTarget.style.transform = "translateY(-5px)"; }}
                  onMouseOut={e  => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.boxShadow = "var(--shadow-card)"; e.currentTarget.style.transform = "translateY(0)"; }}
                >
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6" style={{ background: `${s.color}12`, border: `1px solid ${s.color}30`, color: s.color }}>
                    <s.icon size={28} />
                  </div>
                  <div className="w-8 h-0.5 rounded-full mb-4" style={{ background: s.color }} />
                  <h3 className="text-lg font-bold mb-3" style={{ color: "var(--text-primary)" }}>{s.title}</h3>
                  <p className="text-sm leading-relaxed flex-grow" style={{ color: "var(--text-muted)" }}>{s.desc}</p>
                  <div className="mt-6 flex items-center gap-1.5 text-xs font-semibold" style={{ color: s.color, opacity: 0.75 }}>
                    <span>Learn More</span>
                    <svg viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"/></svg>
                  </div>
                </div>
              </AnimationWrapper>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
