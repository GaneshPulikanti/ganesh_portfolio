"use client";

import React, { useEffect, useRef, useState } from "react";
import { ACHIEVEMENTS } from "@/data/achievements";
import { Award, Zap } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export const MetricsSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [counts, setCounts] = useState<number[]>(ACHIEVEMENTS.map(() => 0));

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 75%",
        once: true,
        onEnter: () => {
          ACHIEVEMENTS.forEach((ach, index) => {
            const obj = { val: 0 };
            gsap.to(obj, {
              val: ach.metric,
              duration: 2,
              ease: "power2.out",
              onUpdate: () => {
                setCounts((prev) => {
                  const updated = [...prev];
                  updated[index] = Math.floor(obj.val);
                  return updated;
                });
              },
            });
          });
        },
      });
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
              <Award className="w-4 h-4" />
              <span>04 / VERIFIED METRICS & RECOGNITION</span>
            </div>
            <h2 className="font-display text-4xl sm:text-6xl text-[#F5EBE6] font-light">
              PROVEN <span className="italic text-[#B8ADA8]">IMPACT</span>
            </h2>
          </div>
          <div className="flex items-center gap-2 font-code text-xs text-[#C43859]">
            <Zap className="w-4 h-4" />
            <span>MEASURED PERFORMANCE DATA</span>
          </div>
        </div>

        {/* 4-Column Metric Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {ACHIEVEMENTS.map((ach, index) => (
            <div
              key={ach.id}
              className="relative p-8 rounded-3xl bg-[#16080E] border border-[#C43859]/20 flex flex-col justify-between space-y-6 group hover:border-[#C43859]/50 transition-colors"
            >
              <div className="font-code text-[10px] text-[#C43859] tracking-widest uppercase">
                {ach.category}
              </div>

              <div>
                <div className="font-display text-5xl sm:text-6xl text-[#F5EBE6] font-light tracking-tight mb-2">
                  <span>{ach.prefix}</span>
                  <span>{counts[index]}</span>
                  <span className="text-[#C43859]">{ach.suffix}</span>
                </div>
                <h3 className="font-sans text-lg text-[#F5EBE6] font-medium mb-2">
                  {ach.label}
                </h3>
                <p className="font-sans text-xs text-[#B8ADA8] font-light leading-relaxed">
                  {ach.description}
                </p>
              </div>

              <div className="w-full h-1 bg-[#200B14] rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#8B1E3F] to-[#C43859] transition-all duration-1000"
                  style={{ width: `${(counts[index] / ach.metric) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
