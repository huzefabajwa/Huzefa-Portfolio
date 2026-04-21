"use client";

import Link from "next/link";
import Image from "next/image";
import AnimationWrapper from "../animation-wrapper";
import { ArrowRight, ExternalLink, Github } from "lucide-react";

// Map thumbnailPosition to CSS object-position values
const THUMB_POSITION = {
  top:    "center top",
  center: "center center",
  bottom: "center bottom",
};

export default function ClientProjectView({ data }) {
  if (!data || data.length === 0) return null;

  const sortedData = [...data].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return (
    <section id="project" className="relative py-24 bg-[var(--bg-surface)]">
      {/* Subtle grid background */}
      <div className="absolute inset-0 section-grid-bg pointer-events-none opacity-40" />

      <div className="max-w-screen-xl mx-auto px-6 lg:px-16 relative">

        {/* Section Heading */}
        <AnimationWrapper delay={100} className="flex flex-col items-center mb-16">
          <span className="section-label">Showcase</span>
          <h2 className="section-title">My <span>Portfolio</span></h2>
          <div className="section-divider mx-auto mt-4" />
        </AnimationWrapper>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sortedData.map((item, index) => {
            // Handle both old schema (imageUrl as array) and new (imageUrl as string)
            const thumbnail = typeof item.imageUrl === "string" && item.imageUrl
              ? item.imageUrl
              : Array.isArray(item.imageUrl) && item.imageUrl.length > 0
                ? item.imageUrl[0]
                : null;

            const galleryCount = (item.images || []).filter(Boolean).length;
            const objPos = THUMB_POSITION[item.thumbnailPosition] || "center center";

            return (
              <AnimationWrapper key={item._id || index} delay={150 + (index % 3) * 80}>
                <Link href={`/project/${item._id}`} className="block h-full">
                  <div className="glass-card group h-full flex flex-col overflow-hidden rounded-2xl cursor-pointer">

                    {/* ── Thumbnail ── */}
                    <div className="relative w-full h-52 overflow-hidden bg-[var(--bg-card)] flex-shrink-0">
                      {thumbnail ? (
                        <Image
                          src={thumbnail}
                          alt={item.name || "Project"}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                          style={{ objectPosition: objPos }}
                          unoptimized
                        />
                      ) : (
                        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2"
                          style={{ background: "linear-gradient(135deg, rgba(0,161,224,0.08), rgba(108,99,255,0.08))" }}>
                          <div className="w-12 h-12 rounded-2xl flex items-center justify-center"
                            style={{ background: "rgba(0,161,224,0.12)", border: "1px solid rgba(0,161,224,0.2)" }}>
                            <span style={{ color: "var(--sf-blue)", fontSize: 22 }}>◈</span>
                          </div>
                          <span className="text-xs font-medium" style={{ color: "var(--text-faint)" }}>No Preview</span>
                        </div>
                      )}

                      {/* Hover overlay with action icons */}
                      <div className="absolute inset-0 flex items-center justify-center gap-3
                        opacity-0 group-hover:opacity-100 transition-all duration-300"
                        style={{ background: "rgba(5,13,26,0.72)", backdropFilter: "blur(6px)" }}>
                        {item.github && (
                          <span onClick={e => { e.preventDefault(); window.open(item.github, "_blank"); }}
                            className="w-11 h-11 rounded-full flex items-center justify-center transition-all hover:scale-110"
                            style={{ background: "rgba(240,246,255,0.12)", border: "1px solid rgba(240,246,255,0.2)", color: "#fff" }}>
                            <Github size={17} />
                          </span>
                        )}
                        {(item.weburl || item.website) && (
                          <span onClick={e => { e.preventDefault(); window.open(item.weburl || item.website, "_blank"); }}
                            className="w-11 h-11 rounded-full flex items-center justify-center transition-all hover:scale-110"
                            style={{ background: "rgba(0,161,224,0.18)", border: "1px solid rgba(0,161,224,0.35)", color: "var(--sf-blue)" }}>
                            <ExternalLink size={17} />
                          </span>
                        )}
                      </div>

                      {/* Gallery count badge */}
                      {galleryCount > 0 && (
                        <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-bold z-10"
                          style={{ background: "rgba(0,0,0,0.65)", backdropFilter: "blur(8px)", color: "#00D4AA", border: "1px solid rgba(0,212,170,0.3)" }}>
                          ⊞ {galleryCount + 1}
                        </div>
                      )}

                      {/* Project type badge */}
                      {item.projecttype && (
                        <div className="absolute top-3 left-3 z-10">
                          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider"
                            style={{ background: "rgba(0,0,0,0.65)", backdropFilter: "blur(8px)", color: "var(--gold)", border: "1px solid rgba(254,197,68,0.25)" }}>
                            {item.projecttype}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* ── Content ── */}
                    <div className="p-6 flex flex-col flex-grow" style={{ background: "rgba(12,24,41,0.5)" }}>
                      <h3 className="text-lg font-bold leading-snug mb-2 group-hover:text-[var(--sf-blue)] transition-colors"
                        style={{ color: "var(--text-primary)" }}>
                        {item.name}
                      </h3>

                      <p className="text-sm leading-relaxed mb-4 flex-grow line-clamp-3"
                        style={{ color: "var(--text-muted)" }}>
                        {item.shortdescription || "View project details →"}
                      </p>

                      {/* Tags */}
                      {item.tags && item.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {item.tags.slice(0, 4).map((tag, i) => (
                            <span key={i} className="px-2 py-0.5 rounded-md text-[11px] font-semibold"
                              style={{ background: "rgba(0,161,224,0.07)", border: "1px solid rgba(0,161,224,0.14)", color: "var(--sf-blue)" }}>
                              {tag}
                            </span>
                          ))}
                          {item.tags.length > 4 && (
                            <span className="text-[11px] self-center" style={{ color: "var(--text-faint)" }}>
                              +{item.tags.length - 4}
                            </span>
                          )}
                        </div>
                      )}

                      {/* CTA */}
                      <span className="inline-flex items-center gap-2 text-sm font-semibold mt-auto transition-all group-hover:gap-3"
                        style={{ color: "var(--text-muted)" }}>
                        View Case Study
                        <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" style={{ color: "var(--sf-blue)" }} />
                      </span>
                    </div>

                  </div>
                </Link>
              </AnimationWrapper>
            );
          })}
        </div>

      </div>
    </section>
  );
}
