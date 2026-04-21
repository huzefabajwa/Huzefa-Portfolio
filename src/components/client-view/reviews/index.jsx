"use client";

import AnimationWrapper from "../animation-wrapper";
import { Star, Quote } from "lucide-react";

function StarRating({ rating = 5 }) {
  return (
    <div className="flex gap-0.5 mb-4">
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          size={15}
          fill={n <= rating ? "#FEC544" : "transparent"}
          stroke={n <= rating ? "#FEC544" : "#3D5170"}
        />
      ))}
    </div>
  );
}

export default function ClientReviewsView({ data }) {
  if (!data || data.length === 0) return null;

  return (
    <section id="reviews" className="relative py-24" style={{ background: "var(--bg-base)" }}>
      {/* Radial glow */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 80% 50% at 50% 100%, rgba(0,161,224,0.04), transparent)" }} />

      <div className="max-w-screen-xl mx-auto px-6 lg:px-16 relative">

        {/* Heading */}
        <AnimationWrapper delay={100} className="flex flex-col items-center mb-14">
          <span className="section-label">Client Feedback</span>
          <h2 className="section-title text-center">What Clients <span>Say</span></h2>
          <div className="section-divider mx-auto mt-4" />
        </AnimationWrapper>

        {/* Reviews grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((item, i) => (
            <AnimationWrapper key={item._id || i} delay={150 + (i % 3) * 80}>
              <div className="glass-card p-6 h-full flex flex-col relative overflow-hidden group">
                {/* Quote watermark */}
                <Quote
                  size={72}
                  className="absolute -top-2 -right-2 opacity-[0.04] pointer-events-none"
                  style={{ color: "var(--sf-blue)" }}
                />

                {/* Stars */}
                <StarRating rating={item.rating || 5} />

                {/* Review text */}
                <p className="text-sm leading-relaxed flex-grow italic mb-5"
                  style={{ color: "var(--text-muted)" }}>
                  "{item.review}"
                </p>

                {/* Divider */}
                <div className="w-full h-px mb-4" style={{ background: "var(--border)" }} />

                {/* Author */}
                <div className="flex items-center gap-3">
                  {/* Avatar initials */}
                  <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold"
                    style={{
                      background: `rgba(0,161,224,0.12)`,
                      border: `1px solid rgba(0,161,224,0.25)`,
                      color: "var(--sf-blue)"
                    }}>
                    {(item.name || "?")[0].toUpperCase()}
                  </div>
                  <div>
                    <p className="text-sm font-bold" style={{ color: "var(--text-primary)" }}>
                      {item.name}
                    </p>
                    <p className="text-xs" style={{ color: "var(--text-faint)" }}>
                      {item.company}
                    </p>
                  </div>
                </div>
              </div>
            </AnimationWrapper>
          ))}
        </div>

      </div>
    </section>
  );
}
