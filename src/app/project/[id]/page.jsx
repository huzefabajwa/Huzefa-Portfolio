"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import useSWR from "swr";
import Image from "next/image";
import Navbar from "@/components/client-view/navbar";
import LoadingScreen from "@/components/LoadingScreen";
import {
  ArrowLeft, Github, Globe, Smartphone, ExternalLink,
  Tag, Calendar, Layers, ZoomIn, ChevronLeft, ChevronRight, X
} from "lucide-react";
import { FaApple, FaGooglePlay } from "react-icons/fa";

const fetcher = (url) =>
  fetch(url).then((r) => r.json()).then((d) => d.data || null);

/* ── Simple inline lightbox (no external dep) ── */
function InlineLightbox({ slides, index, onClose, onPrev, onNext }) {
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose, onPrev, onNext]);

  if (!slides || slides.length === 0) return null;
  const src = slides[index]?.src;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      style={{ background: "rgba(5,13,26,0.95)", backdropFilter: "blur(20px)" }}
      onClick={onClose}
    >
      <button onClick={onClose} className="absolute top-5 right-5 w-10 h-10 rounded-full flex items-center justify-center z-10 transition-all hover:bg-white/10"
        style={{ border: "1px solid rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.7)" }}>
        <X size={18} />
      </button>
      {slides.length > 1 && (
        <>
          <button onClick={e => { e.stopPropagation(); onPrev(); }}
            className="absolute left-4 md:left-8 w-11 h-11 rounded-full flex items-center justify-center z-10 transition-all hover:bg-white/10"
            style={{ border: "1px solid rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.7)" }}>
            <ChevronLeft size={22} />
          </button>
          <button onClick={e => { e.stopPropagation(); onNext(); }}
            className="absolute right-4 md:right-8 w-11 h-11 rounded-full flex items-center justify-center z-10 transition-all hover:bg-white/10"
            style={{ border: "1px solid rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.7)" }}>
            <ChevronRight size={22} />
          </button>
        </>
      )}
      <div className="relative max-w-5xl max-h-[85vh] w-full mx-8" onClick={e => e.stopPropagation()}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt="" className="w-full h-full object-contain rounded-xl" style={{ maxHeight: "85vh" }} />
        <p className="absolute bottom-3 left-1/2 -translate-x-1/2 text-xs font-semibold px-3 py-1 rounded-full"
          style={{ background: "rgba(0,0,0,0.6)", color: "rgba(255,255,255,0.6)" }}>
          {index + 1} / {slides.length}
        </p>
      </div>
    </div>
  );
}

export default function ProjectDetails() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id;

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [activeThumb, setActiveThumb] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const { data: project, error, isLoading } = useSWR(
    id ? `/api/projects/${id}` : null,
    fetcher
  );

  if (!mounted || isLoading) return <LoadingScreen isLoading />;

  if (error || !project) return (
    <div style={{ background: "var(--bg-base)", minHeight: "100vh" }}
      className="flex flex-col items-center justify-center gap-6">
      <Navbar />
      <div className="text-center mt-20 px-6">
        <div className="text-6xl mb-4">🔍</div>
        <h1 className="text-2xl font-bold mb-2" style={{ color: "var(--text-primary)" }}>Project Not Found</h1>
        <p className="mb-8" style={{ color: "var(--text-muted)" }}>This project may have been removed or the link is invalid.</p>
        <button onClick={() => router.push("/#project")}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all"
          style={{ background: "var(--sf-blue)", color: "#fff" }}>
          <ArrowLeft size={16} /> Back to Portfolio
        </button>
      </div>
    </div>
  );

  const thumbnail = typeof project.imageUrl === "string"
    ? project.imageUrl
    : Array.isArray(project.imageUrl) && project.imageUrl[0]
      ? project.imageUrl[0]
      : null;

  const gallery = (project.images || []).filter(Boolean);
  const allImages = [thumbnail, ...gallery].filter(Boolean);
  const lightboxSlides = allImages.map((src) => ({ src }));

  const techItems = project.techstack
    ? project.techstack.split(",").map((t) => t.trim()).filter(Boolean)
    : [];

  const links = [
    project.github    && { label: "GitHub",      href: project.github,      icon: <Github size={18} />,       color: "#F0F6FF", bg: "rgba(240,246,255,0.08)" },
    project.weburl    && { label: "View Live",    href: project.weburl,      icon: <Globe size={18} />,        color: "#00A1E0", bg: "rgba(0,161,224,0.1)" },
    project.playstore && { label: "Google Play",  href: project.playstore,   icon: <FaGooglePlay size={16} />, color: "#34A853", bg: "rgba(52,168,83,0.1)" },
    project.ios       && { label: "App Store",    href: project.ios,         icon: <FaApple size={18} />,      color: "#F0F6FF", bg: "rgba(255,255,255,0.08)" },
    project.application&&{ label: "Download APK", href: project.application, icon: <Smartphone size={18} />,   color: "#FF7A59", bg: "rgba(255,122,89,0.1)" },
  ].filter(Boolean);

  const totalSlides = lightboxSlides.length;
  function openLightbox(idx) { setLightboxIndex(idx); setLightboxOpen(true); }
  function closeLightbox() { setLightboxOpen(false); }
  function prevSlide() { setLightboxIndex(i => (i - 1 + totalSlides) % totalSlides); }
  function nextSlide() { setLightboxIndex(i => (i + 1) % totalSlides); }

  return (
    <div style={{ background: "var(--bg-base)", minHeight: "100vh", color: "var(--text-primary)" }}>
      <Navbar />

      {/* ── Hero Banner ────────────────────────────────────────────── */}
      <div className="relative w-full overflow-hidden" style={{ height: "420px" }}>
        {allImages[activeThumb] && (
          <Image
            src={allImages[activeThumb]}
            alt={project.name}
            fill
            className="object-cover scale-105"
            style={{ filter: "blur(2px)", opacity: 0.25 }}
            unoptimized
          />
        )}
        <div className="absolute inset-0"
          style={{ background: "linear-gradient(to bottom, rgba(5,13,26,0.3) 0%, var(--bg-base) 100%)" }} />

        <div className="absolute top-24 left-6 md:left-16 z-10">
          <button onClick={() => router.push("/#project")}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all hover:gap-3"
            style={{
              background: "rgba(5,13,26,0.7)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "var(--text-muted)"
            }}>
            <ArrowLeft size={15} /> Portfolio
          </button>
        </div>

        <div className="absolute bottom-0 left-0 right-0 px-6 md:px-16 pb-10 z-10">
          <div className="max-w-screen-xl mx-auto">
            {project.projecttype && (
              <span className="section-label mb-3 inline-flex">{project.projecttype}</span>
            )}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight tracking-tight"
              style={{ color: "var(--text-primary)", textShadow: "0 2px 20px rgba(0,0,0,0.5)" }}>
              {project.name}
            </h1>
          </div>
        </div>
      </div>

      {/* ── Main Content ───────────────────────────────────────────── */}
      <div className="max-w-screen-xl mx-auto px-6 md:px-16 py-12">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">

          {/* ── LEFT: Content ─────────────────────────────────────── */}
          <div className="flex-1 min-w-0">

            {project.tags && project.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-8">
                {project.tags.map((tag, i) => (
                  <span key={i} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold"
                    style={{ background: "rgba(0,161,224,0.08)", border: "1px solid rgba(0,161,224,0.2)", color: "var(--sf-blue)" }}>
                    <Tag size={10} /> {tag}
                  </span>
                ))}
              </div>
            )}

            {project.shortdescription && (
              <p className="text-lg leading-relaxed mb-8 pb-8"
                style={{ color: "var(--text-muted)", borderBottom: "1px solid var(--border)" }}>
                {project.shortdescription}
              </p>
            )}

            {project.description && (
              <div className="mb-10">
                <h2 className="text-lg font-bold mb-5 flex items-center gap-2" style={{ color: "var(--text-primary)" }}>
                  <span className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0"
                    style={{ background: "rgba(0,161,224,0.15)", color: "var(--sf-blue)" }}>
                    <Layers size={12} />
                  </span>
                  Project Overview
                </h2>
                <div className="prose-crm" dangerouslySetInnerHTML={{ __html: project.description }} />
              </div>
            )}

            {techItems.length > 0 && (
              <div className="mb-10">
                <h2 className="text-lg font-bold mb-5 flex items-center gap-2" style={{ color: "var(--text-primary)" }}>
                  <span className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0"
                    style={{ background: "rgba(108,99,255,0.15)", color: "var(--accent)" }}>
                    <Tag size={12} />
                  </span>
                  Tech Stack
                </h2>
                <div className="flex flex-wrap gap-2.5">
                  {techItems.map((tech, i) => (
                    <span key={i}
                      className="px-4 py-2 rounded-xl text-sm font-semibold transition-all hover:-translate-y-0.5"
                      style={{
                        background: "rgba(108,99,255,0.08)",
                        border: "1px solid rgba(108,99,255,0.2)",
                        color: "var(--accent)"
                      }}>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {links.length > 0 && (
              <div>
                <h2 className="text-lg font-bold mb-5 flex items-center gap-2" style={{ color: "var(--text-primary)" }}>
                  <span className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0"
                    style={{ background: "rgba(0,212,170,0.15)", color: "var(--teal)" }}>
                    <ExternalLink size={12} />
                  </span>
                  Links
                </h2>
                <div className="flex flex-wrap gap-3">
                  {links.map((link, i) => (
                    <a key={i} href={link.href} target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-2.5 px-5 py-3 rounded-xl text-sm font-semibold transition-all hover:-translate-y-0.5 hover:shadow-lg"
                      style={{ background: link.bg, border: `1px solid ${link.color}30`, color: link.color }}>
                      {link.icon} {link.label}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* ── RIGHT: Gallery ────────────────────────────────────── */}
          {allImages.length > 0 && (
            <div className="w-full lg:w-[420px] flex-shrink-0">
              <div className="sticky top-28">
                <div
                  className="relative w-full rounded-2xl overflow-hidden cursor-zoom-in group mb-4"
                  style={{
                    aspectRatio: "16/10",
                    background: "var(--bg-card)",
                    border: "1px solid var(--border)",
                    boxShadow: "var(--shadow-card)"
                  }}
                  onClick={() => openLightbox(activeThumb)}
                >
                  <Image
                    src={allImages[activeThumb]}
                    alt={`${project.name} screenshot ${activeThumb + 1}`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    unoptimized
                  />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: "rgba(5,13,26,0.5)", backdropFilter: "blur(4px)" }}>
                    <div className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold"
                      style={{ background: "rgba(0,161,224,0.2)", border: "1px solid rgba(0,161,224,0.3)", color: "#fff" }}>
                      <ZoomIn size={16} /> View Full Size
                    </div>
                  </div>
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-bold"
                    style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(8px)", color: "#fff" }}>
                    {activeThumb + 1} / {allImages.length}
                  </div>
                </div>

                {allImages.length > 1 && (
                  <div className="flex gap-2 flex-wrap">
                    {allImages.map((img, i) => (
                      <button key={i} onClick={() => setActiveThumb(i)}
                        className="relative rounded-xl overflow-hidden transition-all flex-shrink-0"
                        style={{
                          width: 72, height: 52,
                          border: activeThumb === i ? "2px solid var(--sf-blue)" : "2px solid transparent",
                          opacity: activeThumb === i ? 1 : 0.5,
                          boxShadow: activeThumb === i ? "0 0 12px rgba(0,161,224,0.4)" : "none",
                        }}>
                        <Image src={img} alt={`Thumbnail ${i + 1}`} fill className="object-cover" unoptimized />
                      </button>
                    ))}
                  </div>
                )}

                {allImages.length > 1 && (
                  <div className="flex items-center gap-3 mt-4 lg:hidden">
                    <button
                      onClick={() => setActiveThumb(i => Math.max(0, i - 1))}
                      disabled={activeThumb === 0}
                      className="flex-1 py-2 rounded-xl flex items-center justify-center gap-1.5 text-sm font-semibold transition-all disabled:opacity-30"
                      style={{ background: "var(--bg-card)", border: "1px solid var(--border)", color: "var(--text-muted)" }}>
                      <ChevronLeft size={16} /> Prev
                    </button>
                    <button
                      onClick={() => setActiveThumb(i => Math.min(allImages.length - 1, i + 1))}
                      disabled={activeThumb === allImages.length - 1}
                      className="flex-1 py-2 rounded-xl flex items-center justify-center gap-1.5 text-sm font-semibold transition-all disabled:opacity-30"
                      style={{ background: "var(--bg-card)", border: "1px solid var(--border)", color: "var(--text-muted)" }}>
                      Next <ChevronRight size={16} />
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

        </div>
      </div>

      {/* Inline Lightbox */}
      {lightboxOpen && (
        <InlineLightbox
          slides={lightboxSlides}
          index={lightboxIndex}
          onClose={closeLightbox}
          onPrev={prevSlide}
          onNext={nextSlide}
        />
      )}
    </div>
  );
}
