"use client";

import { useEffect } from "react";

// A streamed homepage can mount after Next.js first tries to scroll to its hash.
// Retry only when the page commits, when the target sections exist in the DOM.
export default function HomeSectionScroll() {
  useEffect(() => {
    const scrollToSection = () => {
      const id = window.location.hash.slice(1);
      if (!["services", "case-studies", "contact", "introduction"].includes(id)) return;
      document.getElementById(id)?.scrollIntoView({ behavior: "instant", block: "start" });
    };
    const frame = window.requestAnimationFrame(scrollToSection);
    window.addEventListener("hashchange", scrollToSection);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("hashchange", scrollToSection);
    };
  }, []);

  return null;
}
