"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const roleRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (!nameRef.current || !lineRef.current || !roleRef.current || !containerRef.current) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          setIsVisible(false);
          onComplete();
        },
      });

      // Step 1: Reveal Name with clip-path mask reveal
      tl.to(nameRef.current, {
        y: "0%",
        opacity: 1,
        duration: 0.9,
        ease: "power3.out",
        delay: 0.2,
      })
      // Step 2: Expand middle line
      .to(lineRef.current, {
        scaleX: 1,
        duration: 0.6,
        ease: "power2.inOut",
      }, "-=0.3")
      // Step 3: Reveal Roles
      .to(roleRef.current, {
        y: "0%",
        opacity: 1,
        duration: 0.7,
        ease: "power3.out",
      }, "-=0.4")
      // Short pause
      .to({}, { duration: 0.6 })
      // Step 4: Curtain wipe exit reveal
      .to(containerRef.current, {
        clipPath: "inset(0% 0% 100% 0%)",
        duration: 0.9,
        ease: "power4.inOut",
      });
    }, containerRef);

    return () => ctx.revert();
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0A0406] text-[#F5EBE6] px-6 select-none overflow-hidden"
      style={{ clipPath: "inset(0% 0% 0% 0%)" }}
    >
      <div className="text-center max-w-2xl space-y-4">
        {/* Name Reveal Wrapper */}
        <div className="overflow-hidden">
          <h1
            ref={nameRef}
            className="font-display text-4xl sm:text-6xl md:text-7xl tracking-wider text-[#F5EBE6] uppercase font-light translate-y-full opacity-0"
          >
            GANESH PULIKANTI
          </h1>
        </div>

        {/* Separator Line */}
        <div className="flex justify-center my-2">
          <div
            ref={lineRef}
            className="h-[1px] w-24 bg-gradient-to-r from-transparent via-[#C43859] to-transparent scale-x-0 origin-center"
          />
        </div>

        {/* Roles Reveal Wrapper */}
        <div className="overflow-hidden">
          <div
            ref={roleRef}
            className="font-code text-xs sm:text-sm tracking-[0.3em] text-[#C43859] uppercase translate-y-full opacity-0 flex flex-wrap justify-center gap-3 sm:gap-6 font-medium"
          >
            <span>SOFTWARE ENGINEER</span>
            <span className="text-[#6E635F]">•</span>
            <span>AI</span>
            <span className="text-[#6E635F]">•</span>
            <span>WEB</span>
            <span className="text-[#6E635F]">•</span>
            <span>MOBILE</span>
          </div>
        </div>
      </div>
    </div>
  );
};
