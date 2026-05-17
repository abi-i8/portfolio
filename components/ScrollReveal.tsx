"use client";
import { useEffect, useRef, ReactNode } from "react";

export default function ScrollReveal({ children }: { children: ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const revs = containerRef.current.querySelectorAll(".reveal");
    
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -28px 0px" }
    );

    revs.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [children]);

  return <div ref={containerRef}>{children}</div>;
}
