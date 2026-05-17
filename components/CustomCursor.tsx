"use client";
import { useEffect, useState } from "react";

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [trail, setTrail] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    setIsMobile(window.matchMedia("(pointer:coarse)").matches);
    
    const onMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
    };

    const onOver = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest("a, button, .tag, .scard, .skc, .pc, .ei, .ai")) {
        setHovered(true);
      } else {
        setHovered(false);
      }
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);

    let rafId: number;
    const tick = () => {
      setTrail((prev) => ({
        x: prev.x + (pos.x - prev.x) * 0.1,
        y: prev.y + (pos.y - prev.y) * 0.1,
      }));
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      cancelAnimationFrame(rafId);
    };
  }, [pos]);

  if (isMobile) return null;

  return (
    <>
      <div
        id="cursor"
        style={{
          position: "fixed",
          zIndex: 9999,
          pointerEvents: "none",
          left: pos.x,
          top: pos.y,
          transform: "translate(-50%, -50%)",
        }}
      >
        <div className="cursor-dot" />
      </div>
      <div
        id="cursor-outer"
        style={{
          position: "fixed",
          zIndex: 9998,
          pointerEvents: "none",
          left: trail.x,
          top: trail.y,
          transform: "translate(-50%, -50%)",
          width: hovered ? "54px" : "40px",
          height: hovered ? "54px" : "40px",
          borderRadius: "50%",
          border: hovered ? "1px solid var(--cyan)" : "1px solid rgba(124, 77, 255, .5)",
          transition: "width .3s var(--sp), height .3s var(--sp), border-color .3s",
        }}
      />
      <style jsx global>{`
        .cursor-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: var(--cyan);
        }
      `}</style>
    </>
  );
}
