"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDown } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export const HeroSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const bgTextRef = useRef<HTMLDivElement>(null);
  const titleWrapperRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Smooth subtle parallax on scroll without hiding or dimming the text
      gsap.to(bgTextRef.current, {
        y: 100,
        opacity: 0.04,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-screen flex flex-col justify-between px-4 sm:px-12 md:px-16 pt-20 sm:pt-28 pb-8 sm:pb-12 overflow-hidden bg-transparent z-10 select-none"
    >
      {/* Background Editorial Typography */}
      <div
        ref={bgTextRef}
        className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 opacity-[0.06] sm:opacity-[0.08]"
      >
      </div>

      {/* Top Header Grid Metadata */}
      <div
        ref={metaRef}
        className="relative z-20 flex items-center justify-between font-code text-[10px] sm:text-xs text-[#B8ADA8] tracking-[0.2em] sm:tracking-[0.25em] uppercase border-b border-[#C43859]/20 pb-3 sm:pb-4"
      >
        <div className="flex items-center gap-2 sm:gap-3">
          <span className="text-[#C43859]">LOCATION</span>
          <span className="text-[#F5EBE6]">INDIA</span>
        </div>
        <div className="hidden md:flex items-center gap-3">
          <span className="text-[#C43859]">DISCIPLINE</span>
          <span className="text-[#F5EBE6]">SOFTWARE / AI / WEB</span>
        </div>
      </div>

      {/* Main Center Identity Composition */}
      <div className="relative z-20 max-w-4xl py-8 sm:py-16 my-auto">
        <div ref={titleWrapperRef} className="space-y-3 sm:space-y-4">
          {/* Subtitle Badge */}
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-[#16080E]/80 backdrop-blur-md border border-[#C43859]/40 text-[#C43859] font-code text-[10px] sm:text-xs tracking-[0.2em] sm:tracking-[0.3em] uppercase font-semibold shadow-md shadow-[#8B1E3F]/20">
            <span>SOFTWARE ENGINEER & AI DEVELOPER</span>
          </div>

          {/* Main Full Name Heading - High Contrast & Transparent Background */}
          <h1 className="font-display text-4xl sm:text-7xl md:text-8xl lg:text-9xl leading-[0.95] sm:leading-[0.92] text-[#F5EBE6] font-light tracking-tight drop-shadow-lg">
            GANESH <br />
            <span className="italic text-[#C43859] font-normal">PULIKANTI</span>
          </h1>
        </div>

        {/* Secondary Editorial Statement */}
        <div ref={subtitleRef} className="mt-6 sm:mt-8 max-w-xl">
          <p className="font-sans text-sm sm:text-lg text-[#F5EBE6]/95 font-light leading-relaxed border-l-2 border-[#C43859] pl-3 sm:pl-4">
            &ldquo;I build digital experiences that think, move and interact.&rdquo;
          </p>
        </div>
      </div>

      {/* Bottom Scroll Indicator & Coordinates */}
      <div className="relative z-20 flex items-end justify-between font-code text-[10px] sm:text-xs text-[#B8ADA8] tracking-widest uppercase pt-3 sm:pt-4 border-t border-[#C43859]/20">
        <div className="flex items-center gap-2 sm:gap-3 text-[#F5EBE6]">
          <ArrowDown className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-[#C43859] animate-bounce" />
          <span>SCROLL TO EXPLORE</span>
        </div>
      </div>
    </section>
  );
};
