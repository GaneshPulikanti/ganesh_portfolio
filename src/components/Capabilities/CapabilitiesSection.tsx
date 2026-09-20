"use client";

import React, { useEffect, useRef } from "react";
import { CAPABILITIES } from "@/data/skills";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Cpu, Globe, Smartphone, Server, CheckCircle } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const CAP_ICONS = [Cpu, Globe, Smartphone, Server];

export const CapabilitiesSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx: gsap.Context;

    const timer = setTimeout(() => {
      ctx = gsap.context(() => {
        const track = trackRef.current;
        if (!track) return;

        const getScrollAmount = () => {
          return Math.max(0, track.scrollWidth - window.innerWidth);
        };

        gsap.to(track, {
          x: () => -getScrollAmount(),
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: () => `+=${getScrollAmount() + 1000}`,
            scrub: 1,
            pin: true,
            pinSpacing: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        ScrollTrigger.refresh();
      }, sectionRef);
    }, 150);

    return () => {
      clearTimeout(timer);
      if (ctx) ctx.revert();
    };
  }, []);

  return (
    <section
      id="build"
      ref={sectionRef}
      className="relative w-full h-screen bg-transparent overflow-hidden flex items-center z-10 border-t border-[#C43859]/15"
    >
      {/* Pinned Left Editorial Title */}
      <div className="absolute left-4 sm:left-12 lg:left-16 top-6 sm:top-14 z-30 pointer-events-none max-w-xs">
        <div className="font-code text-[10px] sm:text-[11px] text-[#C43859] tracking-[0.25em] sm:tracking-[0.3em] uppercase mb-1 font-semibold">
          CAPABILITIES & ARCHITECTURE
        </div>
        <h2 className="font-display text-3xl sm:text-6xl text-[#F5EBE6] font-light leading-none">
          WHAT <br />
          <span className="italic text-[#C43859]">I BUILD</span>
        </h2>
      </div>

      {/* Gradient Mask on Left side to smoothly hide scrolled cards under the left title */}
      <div className="hidden sm:block absolute left-0 top-0 bottom-0 w-[280px] sm:w-[400px] lg:w-[460px] bg-gradient-to-r from-[#0A0406] via-[#0A0406] to-transparent z-20 pointer-events-none" />

      {/* Horizontal Track with Fits-in-Screen Compact Cards */}
      <div
        ref={trackRef}
        className="flex items-center h-full pl-[200px] sm:pl-[420px] lg:pl-[480px] pr-[10vw] gap-5 sm:gap-14 whitespace-nowrap pt-16 sm:pt-0"
      >
        {CAPABILITIES.map((cap, index) => {
          const IconComponent = CAP_ICONS[index % CAP_ICONS.length];
          return (
            <div
              key={cap.id}
              className="w-[82vw] sm:w-[50vw] lg:w-[38vw] max-h-[76vh] sm:max-h-[84vh] shrink-0 whitespace-normal bg-[#16080E] border border-[#C43859]/25 rounded-2xl sm:rounded-3xl p-5 sm:p-8 lg:p-10 shadow-2xl shadow-[#8B1E3F]/20 flex flex-col justify-between transition-all duration-300 hover:border-[#C43859]/60 pointer-events-auto overflow-hidden"
            >
              <div>
                {/* Header Meta */}
                <div className="flex items-center justify-between font-code text-[10px] sm:text-xs text-[#C43859] uppercase tracking-widest mb-3 sm:mb-4">
                  <span>{cap.code}</span>
                  <div className="p-1.5 sm:p-2 rounded-xl bg-[#200B14] border border-[#C43859]/30 text-[#C43859]">
                    <IconComponent className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
                  </div>
                </div>

                {/* Main Title & Subtitle */}
                <h3 className="font-display text-xl sm:text-4xl text-[#F5EBE6] font-light mb-1">
                  {cap.title}
                </h3>
                <p className="font-sans text-[11px] sm:text-sm text-[#C43859] font-medium mb-3 sm:mb-4">
                  {cap.subtitle}
                </p>

                {/* Description */}
                <p className="font-sans text-[11px] sm:text-sm text-[#B8ADA8] font-light leading-relaxed mb-4 sm:mb-5 line-clamp-3 sm:line-clamp-none">
                  {cap.description}
                </p>

                {/* Feature Bullet Highlights */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5 mb-4 sm:mb-5">
                  {cap.features.map((feat, fIdx) => (
                    <div
                      key={fIdx}
                      className="flex items-center gap-1.5 font-sans text-[11px] sm:text-xs text-[#F5EBE6]/90"
                    >
                      <CheckCircle className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-[#C43859] shrink-0" />
                      <span className="truncate">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technology Labels */}
              <div className="pt-3 sm:pt-4 border-t border-[#C43859]/15">
                <div className="font-code text-[9px] sm:text-[10px] text-[#B8ADA8] tracking-widest uppercase mb-1.5 sm:mb-2">
                  PRIMARY STACK & TOOLS
                </div>
                <div className="flex flex-wrap gap-1 sm:gap-1.5">
                  {cap.skills.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-[11px] font-code bg-[#200B14] text-[#F5EBE6] border border-[#C43859]/25"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
