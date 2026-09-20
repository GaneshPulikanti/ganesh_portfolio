"use client";

import React, { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";

export const CustomCursor: React.FC = () => {
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);
  const [cursorText, setCursorText] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const [isProjectHover, setIsProjectHover] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    // Disable on touch devices
    if (typeof window !== "undefined" && ("ontouchstart" in window || navigator.maxTouchPoints > 0)) {
      setIsTouch(true);
      return;
    }

    const dot = cursorDotRef.current;
    const ring = cursorRingRef.current;
    if (!dot || !ring) return;

    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      gsap.to(dot, {
        x: mouseX,
        y: mouseY,
        duration: 0.1,
        ease: "power2.out",
      });

      gsap.to(ring, {
        x: mouseX,
        y: mouseY,
        duration: 0.35,
        ease: "power3.out",
      });
    };

    // Event Delegation for Interactive Elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest("a, button, [data-cursor-expand]");
      const project = target.closest("[data-cursor-view]");
      const magnetic = target.closest("[data-magnetic]");

      if (project) {
        setIsProjectHover(true);
        setCursorText("VIEW");
        setIsHovered(true);
      } else if (interactive) {
        setIsProjectHover(false);
        setCursorText("");
        setIsHovered(true);
      } else {
        setIsProjectHover(false);
        setCursorText("");
        setIsHovered(false);
      }

      // Magnetic Pull Effect on magnetic elements
      if (magnetic) {
        const rect = magnetic.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const deltaX = (e.clientX - centerX) * 0.3;
        const deltaY = (e.clientY - centerY) * 0.3;

        gsap.to(magnetic, {
          x: deltaX,
          y: deltaY,
          duration: 0.3,
          ease: "power2.out",
        });
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && target.closest("[data-magnetic]")) {
        const magnetic = target.closest("[data-magnetic]") as HTMLElement;
        gsap.to(magnetic, {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: "elastic.out(1, 0.3)",
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mouseout", handleMouseOut);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mouseout", handleMouseOut);
    };
  }, []);

  if (isTouch) return null;

  return (
    <>
      {/* Tiny Dot */}
      <div
        ref={cursorDotRef}
        aria-hidden="true"
        className="fixed top-0 left-0 w-2 h-2 bg-[#F5EBE6] rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300"
        style={{ opacity: isHovered ? 0 : 1 }}
      />

      {/* Interactive Outer Ring / Badge */}
      <div
        ref={cursorRingRef}
        aria-hidden="true"
        className={`fixed top-0 left-0 pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 rounded-full flex items-center justify-center transition-all duration-300 ease-out border ${
          isProjectHover
            ? "w-20 h-20 bg-[#C43859] border-[#F5EBE6] text-[#F5EBE6] shadow-xl shadow-[#8B1E3F]/40 scale-100"
            : isHovered
            ? "w-14 h-14 bg-[#8B1E3F]/30 border-[#C43859]/60 backdrop-blur-xs scale-100"
            : "w-8 h-8 border-[#F5EBE6]/30 bg-transparent scale-75"
        }`}
      >
        {isProjectHover && (
          <span className="font-code text-[10px] tracking-widest font-bold uppercase animate-pulse">
            {cursorText}
          </span>
        )}
      </div>
    </>
  );
};
