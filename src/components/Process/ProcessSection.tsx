"use client";

import React, { useEffect, useRef, useState } from "react";
import { GitCommit, Lightbulb, Compass, Code, TestTube, Rocket } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const PROCESS_STEPS = [
  {
    step: "01",
    title: "IDEATE",
    subtitle: "Problem Definition & AI Feasibility",
    description:
      "Analyzing technical constraints, identifying high-impact AI model applications, and defining clear engineering requirements.",
    icon: Lightbulb,
  },
  {
    step: "02",
    title: "DESIGN",
    subtitle: "System Architecture & UI/UX Spec",
    description:
      "Architecting data flow pipelines, microservice contracts, vector database schemas, and high-fidelity interaction design.",
    icon: Compass,
  },
  {
    step: "03",
    title: "BUILD",
    subtitle: "Code Execution & Model Training",
    description:
      "Writing clean, modular TypeScript, Python, and C++ code. Training and fine-tuning neural networks with GPU acceleration.",
    icon: Code,
  },
  {
    step: "04",
    title: "TEST",
    subtitle: "Validation & Latency Profiling",
    description:
      "Stress-testing microservices, profiling WebGL shader frames to maintain 60 FPS, and validating model inference accuracy.",
    icon: TestTube,
  },
  {
    step: "05",
    title: "DEPLOY",
    subtitle: "CI/CD & Production Launch",
    description:
      "Containerized Docker deployments, edge CDN distribution, zero-downtime database migrations, and real-time observability.",
    icon: Rocket,
  },
];

export const ProcessSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);

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
            trigger: containerRef.current,
            start: "top top",
            end: () => `+=${getScrollAmount() + 800}`,
            scrub: 1,
            pin: true,
            pinSpacing: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const stepIndex = Math.min(
                Math.floor(self.progress * PROCESS_STEPS.length),
                PROCESS_STEPS.length - 1
              );
              setActiveStep(stepIndex);
            },
          },
        });

        ScrollTrigger.refresh();
      }, containerRef);
    }, 150);

    return () => {
      clearTimeout(timer);
      if (ctx) ctx.revert();
    };
  }, []);

  return (
    <section
      id="process"
      ref={containerRef}
      className="relative w-full h-screen bg-transparent overflow-hidden flex items-center z-10 border-t border-[#C43859]/15"
    >
      {/* Top Editorial Header */}
      <div className="absolute left-6 sm:left-12 top-12 z-20 pointer-events-none">
        <div className="flex items-center gap-3 font-code text-xs text-[#C43859] uppercase tracking-[0.3em] mb-1">
          <GitCommit className="w-4 h-4" />
          <span>05 / DEVELOPMENT METHODOLOGY</span>
        </div>
        <h2 className="font-display text-4xl sm:text-6xl text-[#F5EBE6] font-light">
          THE <span className="italic text-[#B8ADA8]">PROCESS</span>
        </h2>
      </div>

      {/* Progress Indicator Timeline Line */}
      <div className="absolute left-6 sm:left-12 right-6 sm:right-12 top-1/2 -translate-y-1/2 h-[2px] bg-[#200B14] z-0 pointer-events-none">
        <div
          className="h-full bg-gradient-to-r from-[#8B1E3F] via-[#C43859] to-[#F5EBE6] transition-all duration-300"
          style={{ width: `${((activeStep + 1) / PROCESS_STEPS.length) * 100}%` }}
        />
      </div>

      {/* Horizontal Steps Track */}
      <div
        ref={trackRef}
        className="flex items-center h-full pl-[25vw] pr-[15vw] gap-12 sm:gap-20 whitespace-nowrap z-10"
      >
        {PROCESS_STEPS.map((item, index) => {
          const Icon = item.icon;
          const isActive = index === activeStep;
          return (
            <div
              key={item.step}
              className={`w-[75vw] sm:w-[45vw] lg:w-[32vw] shrink-0 whitespace-normal p-8 sm:p-10 rounded-3xl transition-all duration-500 border ${
                isActive
                  ? "bg-[#16080E] border-[#C43859] shadow-2xl shadow-[#8B1E3F]/30 scale-105"
                  : "bg-[#0A0406]/90 border-[#C43859]/15 opacity-40 scale-95"
              }`}
            >
              <div className="flex items-center justify-between mb-6">
                <span className="font-display text-3xl font-light text-[#C43859]">
                  {item.step}
                </span>
                <div
                  className={`p-3 rounded-2xl border transition-colors ${
                    isActive
                      ? "bg-[#C43859] text-[#F5EBE6] border-[#C43859]"
                      : "bg-[#200B14] text-[#B8ADA8] border-[#C43859]/20"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>
              </div>

              <h3 className="font-display text-3xl sm:text-4xl text-[#F5EBE6] font-light mb-1">
                {item.title}
              </h3>
              <p className="font-sans text-xs sm:text-sm text-[#C43859] font-medium mb-4">
                {item.subtitle}
              </p>
              <p className="font-sans text-xs sm:text-sm text-[#B8ADA8] font-light leading-relaxed">
                {item.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};
