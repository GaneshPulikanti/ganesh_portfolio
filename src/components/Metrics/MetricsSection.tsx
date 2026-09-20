"use client";

import React, { useEffect, useRef } from "react";
import { PHILOSOPHY_PILLARS } from "@/data/achievements";
import { Cpu, Terminal } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export const MetricsSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (cardsRef.current) {
        gsap.fromTo(
          cardsRef.current.children,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 75%",
              once: true,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-transparent py-28 px-6 sm:px-12 z-10 border-t border-[#C43859]/15"
    >
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#C43859]/15 pb-8">
          <div>
            <div className="flex items-center gap-3 font-code text-xs text-[#C43859] uppercase tracking-[0.3em] mb-2">
              <Cpu className="w-4 h-4" />
              <span>04 / ENGINEERING STANDARDS & CORE STRENGTHS</span>
            </div>
            <h2 className="font-display text-4xl sm:text-6xl text-[#F5EBE6] font-light">
              HOW I <span className="italic text-[#B8ADA8]">BUILD</span>
            </h2>
          </div>
          <div className="flex items-center gap-2 font-code text-xs text-[#C43859]">
            <Terminal className="w-4 h-4" />
            <span>AUTHENTIC TECHNICAL PHILOSOPHY</span>
          </div>
        </div>

        {/* 4-Column Core Strengths Grid */}
        <div ref={cardsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PHILOSOPHY_PILLARS.map((pillar) => (
            <div
              key={pillar.id}
              className="relative p-8 rounded-3xl bg-[#16080E]/90 backdrop-blur-md border border-[#C43859]/20 flex flex-col justify-between space-y-6 group hover:border-[#C43859]/60 hover:bg-[#200B14] transition-all duration-300 shadow-xl shadow-black/40"
            >
              <div className="flex items-center justify-between font-code text-xs text-[#C43859]">
                <span className="font-display text-lg text-[#F5EBE6] font-light">{pillar.code}</span>
                <span className="tracking-widest uppercase text-[10px] bg-[#200B14] px-2.5 py-1 rounded-full border border-[#C43859]/30">
                  {pillar.category}
                </span>
              </div>

              <div>
                <h3 className="font-display text-2xl text-[#F5EBE6] font-light mb-1 leading-snug group-hover:text-[#C43859] transition-colors">
                  {pillar.title}
                </h3>
                <p className="font-code text-xs text-[#C43859] font-medium mb-3">
                  {pillar.tagline}
                </p>
                <p className="font-sans text-xs sm:text-sm text-[#B8ADA8] font-light leading-relaxed">
                  {pillar.description}
                </p>
              </div>

              <div className="w-full h-1 bg-[#200B14] rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-[#8B1E3F] to-[#C43859] w-full group-hover:from-[#C43859] group-hover:to-[#F5EBE6] transition-all duration-500" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

