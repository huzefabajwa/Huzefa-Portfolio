"use client";

import { useEffect } from "react";

/**
 * Techy pointer cursor — it's a mouse arrow shape but:
 *  - Rendered via CSS background-image with an inline SVG arrow
 *  - Has a subtle blue glow/drop-shadow
 *  - A small lagging "aura" dot follows it
 *  - On hover over interactive elements: turns accent-bright + glow intensifies
 */
export default function CursorTracker() {
  useEffect(() => {
    const cursor = document.createElement("div");
    cursor.id = "crm-cursor";
    document.body.appendChild(cursor);

    const aura = document.createElement("div");
    aura.id = "crm-cursor-ring";
    document.body.appendChild(aura);

    let px = -100, py = -100;
    let ax = -100, ay = -100;
    let rafId = null;

    const loop = () => {
      ax += (px - ax) * 0.12;
      ay += (py - ay) * 0.12;
      // Aura is centered; cursor is tip-positioned (top-left of SVG = hotspot)
      aura.style.transform = `translate(${ax - 10}px, ${ay - 10}px)`;
      rafId = requestAnimationFrame(loop);
    };
    loop();

    const onMove = (e) => {
      px = e.clientX;
      py = e.clientY;
      // Position so SVG tip (top-left corner, 2px 2px) aligns with pointer
      cursor.style.transform = `translate(${px - 2}px, ${py - 2}px)`;
    };

    const INTERACTORS = "a, button, input, textarea, select, [role='button'], label, summary, [tabindex]";

    const onOver = (e) => {
      if (e.target.closest(INTERACTORS)) {
        cursor.classList.add("cursor-hover");
        aura.classList.add("aura-hover");
      } else {
        cursor.classList.remove("cursor-hover");
        aura.classList.remove("aura-hover");
      }
    };

    const hideAll  = () => { cursor.style.opacity = "0"; aura.style.opacity = "0"; };
    const showAll  = () => { cursor.style.opacity = "1"; aura.style.opacity = "1"; };

    window.addEventListener("mousemove",  onMove,  { passive: true });
    window.addEventListener("mouseover",  onOver,  { passive: true });
    document.addEventListener("mouseleave", hideAll, { passive: true });
    document.addEventListener("mouseenter", showAll, { passive: true });

    return () => {
      cursor.remove();
      aura.remove();
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove",  onMove);
      window.removeEventListener("mouseover",  onOver);
      document.removeEventListener("mouseleave", hideAll);
      document.removeEventListener("mouseenter", showAll);
    };
  }, []);

  return null;
}
