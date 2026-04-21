"use client";

import AnimationWrapper from "../animation-wrapper";
import { SiSalesforce, SiHubspot, PlatformIcon } from "@/components/crm-icons";
import { Dynamics365Icon, PowerAppsIcon, PowerBIIcon, ZohoIcon } from "@/components/crm-icons";

/* ─── Official CRM logos using centralized icon lib ────────────── */
const CRM_PLATFORMS = [
  {
    name: "Salesforce",
    color: "#00A1E0",
    bgColor: "rgba(0,161,224,0.08)",
    border: "rgba(0,161,224,0.25)",
    logo: <SiSalesforce className="w-5 h-5 flex-shrink-0" />,
  },
  {
    name: "HubSpot",
    color: "#FF7A59",
    bgColor: "rgba(255,122,89,0.08)",
    border: "rgba(255,122,89,0.25)",
    logo: <SiHubspot className="w-4 h-4 flex-shrink-0" />,
  },
  {
    name: "Dynamics 365",
    color: "#9B59B6",
    bgColor: "rgba(155,89,182,0.08)",
    border: "rgba(155,89,182,0.25)",
    logo: <Dynamics365Icon size={16} />,
  },
  {
    name: "Power Apps",
    color: "#8B5CF6",
    bgColor: "rgba(139,92,246,0.08)",
    border: "rgba(139,92,246,0.25)",
    logo: <PowerAppsIcon size={16} />,
  },
  {
    name: "Power BI",
    color: "#F2C811",
    bgColor: "rgba(242,200,17,0.08)",
    border: "rgba(242,200,17,0.25)",
    logo: <PowerBIIcon size={16} />,
  },
  {
    name: "Zoho CRM",
    color: "#E42527",
    bgColor: "rgba(228,37,39,0.08)",
    border: "rgba(228,37,39,0.25)",
    logo: <ZohoIcon size={16} />,
  },
];

export default function ClientAboutView({ data, platformsData }) {
  const stats = [
    { label: "Clients Served",    value: `${data?.noofclients || "50"}+`,    color: "var(--sf-blue)" },
    { label: "Projects Delivered",value: `${data?.noofprojects || "100"}+`,  color: "var(--hs-orange)" },
    { label: "Years Experience",  value: `${data?.yearsofexperience || "5"}+`,color: "var(--d365-purple)" },
  ];

  const skills = (data?.skills || "").split(",").map(s => {
    const match = s.trim().match(/^(.*?)[\s-]+(\d+)$/);
    if (!match) return null;
    return { name: match[1].trim(), percentage: parseInt(match[2], 10) };
  }).filter(Boolean);

  // Use platformsData from DB, fall back to hardcoded with official icons
  const activePlatforms = (platformsData && platformsData.length > 0)
    ? platformsData.map(p => ({
        ...p,
        logo: CRM_PLATFORMS.find(c => c.name.toLowerCase() === p.name?.toLowerCase())?.logo || null
      }))
    : CRM_PLATFORMS;

  const marqueePlatforms = activePlatforms.length > 0 ? activePlatforms : CRM_PLATFORMS;

  return (
    <section id="about" className="relative py-28 section-grid-bg">
      <div className="max-w-screen-xl mx-auto px-6 lg:px-16">

        {/* Heading */}
        <AnimationWrapper delay={100} className="flex flex-col items-center mb-20">
          <span className="section-label">Who I Am</span>
          <h2 className="section-title text-center">About <span>Me</span></h2>
          <div className="section-divider mx-auto" />
        </AnimationWrapper>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-20">

          {/* Left: Bio */}
          <AnimationWrapper delay={200} className="flex flex-col gap-8">
            <h3 className="text-3xl lg:text-4xl font-bold leading-tight" style={{ color: "var(--text-primary)" }}>
              Your Partner in CRM Excellence &amp; Digital Transformation
            </h3>

            <div className="pl-5 border-l-4 rounded" style={{ borderColor: "var(--sf-blue)" }}>
              <p className="text-lg leading-relaxed italic" style={{ color: "var(--text-muted)" }}>
                "{data?.aboutme || "I specialize in implementing and optimizing CRM solutions that transform how businesses connect with their customers, streamline operations, and drive sustainable growth."}"
              </p>
            </div>

            {/* Platform expertise row with official icons */}
            <div className="grid grid-cols-3 gap-3">
              {activePlatforms.slice(0, 3).map((p, i) => (
                <div key={`top-${i}-${p.name}`} className="glass-card p-4 flex flex-col items-center text-center gap-2">
                  <span style={{ color: p.color, fontSize: "1.5rem" }}>
                    {p.logo || <span className="w-2 h-2 rounded-full block mx-auto" style={{ background: p.color }} />}
                  </span>
                  <p className="text-xs font-bold leading-tight" style={{ color: p.color }}>{p.name}</p>
                  <p className="text-[9px] tracking-wider uppercase" style={{ color: "var(--text-faint)" }}>Expert</p>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mt-2">
              {stats.map((s, i) => (
                <AnimationWrapper key={i} delay={300 + i * 80}>
                  <div className="glass-card p-5 flex flex-col items-center text-center">
                    <span className="text-3xl font-black mb-1" style={{ color: s.color }}>{s.value}</span>
                    <span className="text-[10px] font-semibold tracking-widest uppercase" style={{ color: "var(--text-faint)" }}>{s.label}</span>
                  </div>
                </AnimationWrapper>
              ))}
            </div>
          </AnimationWrapper>

          {/* Right: Skills */}
          <AnimationWrapper delay={300}>
            <div className="glass-card p-8 lg:p-10">
              <h4 className="text-xl font-bold mb-8" style={{ color: "var(--text-primary)" }}>Technical Expertise</h4>
              {skills.length > 0 ? (
                <div className="flex flex-col gap-6">
                  {skills.map((skill, i) => (
                    <div key={i} className="flex flex-col gap-2">
                      <div className="flex justify-between items-end">
                        <span className="font-semibold text-sm" style={{ color: "var(--text-primary)" }}>{skill.name}</span>
                        <span className="text-xs font-bold" style={{ color: "var(--sf-blue)" }}>{skill.percentage}%</span>
                      </div>
                      <div className="skill-bar">
                        <div className="skill-bar-fill" style={{ width: `${skill.percentage}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col gap-6">
                  {[
                    { name: "Salesforce CRM",         pct: 95, color: "#00A1E0" },
                    { name: "HubSpot",                pct: 90, color: "#FF7A59" },
                    { name: "Microsoft Dynamics 365", pct: 88, color: "#9B59B6" },
                    { name: "Power Platform",         pct: 82, color: "#8B5CF6" },
                    { name: "CRM Strategy",           pct: 93, color: "#00D4AA" },
                  ].map((s, i) => (
                    <div key={i} className="flex flex-col gap-2">
                      <div className="flex justify-between">
                        <span className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>{s.name}</span>
                        <span className="text-xs font-bold" style={{ color: s.color }}>{s.pct}%</span>
                      </div>
                      <div className="skill-bar">
                        <div style={{ width: `${s.pct}%`, height: "100%", borderRadius: 999, background: `linear-gradient(90deg, ${s.color}80, ${s.color})` }} />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </AnimationWrapper>
        </div>

        {/* ── CRM Platform Marquee with Official Icons ─────────────── */}
        <AnimationWrapper delay={400}>
          <div className="relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
              style={{ background: "linear-gradient(to right, var(--bg-base), transparent)" }} />
            <div className="absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
              style={{ background: "linear-gradient(to left, var(--bg-base), transparent)" }} />

            <div className="flex overflow-hidden py-2">
              <div className="marquee-track">
                {[...marqueePlatforms, ...marqueePlatforms].map((p, i) => (
                  <div
                    key={`marquee-${i}`}
                    className="platform-badge flex-shrink-0 flex items-center gap-2"
                    style={{
                      background: p.bgColor || `${p.color}15`,
                      border: `1px solid ${p.border || `${p.color}40`}`,
                      color: p.color,
                      padding: "8px 16px 8px 12px",
                      borderRadius: 12,
                    }}
                  >
                    {/* Official logo: DB image > react-icon > fallback dot */}
                    {p.logoUrl ? (
                      <img src={p.logoUrl} alt={p.name} className="w-4 h-4 object-contain" />
                    ) : p.logo ? (
                      <span style={{ color: p.color, display: "flex" }}>{p.logo}</span>
                    ) : (
                      <span className="w-2 h-2 rounded-full" style={{ background: p.color }} />
                    )}
                    <span className="text-sm font-semibold">{p.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </AnimationWrapper>

      </div>
    </section>
  );
}
