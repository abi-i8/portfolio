"use client";
import { useEffect, useState } from "react";

export default function ScrollProgress() {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollTotal = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollTotal === 0) return;
      setWidth((window.scrollY / scrollTotal) * 100);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      id="prog"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 900,
        height: "2px",
        width: `${width}%`,
        background: "linear-gradient(90deg, var(--neon), var(--cyan), var(--gold))",
        transition: "width .08s",
      }}
    />
  );
}
