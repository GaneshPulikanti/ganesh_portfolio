"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Sparkles, Terminal, Code2 } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export const AboutSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const wordsRef = useRef<HTMLSpanElement[]>([]);

  const statement = "I build software that feels alive.";
  const words = statement.split(" ");

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Word by Word Physical Reveal Animation via ScrollTrigger
      gsap.fromTo(
        wordsRef.current,
        {
          clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)",
          y: 40,
          opacity: 0,
          filter: "blur(8px)",
        },
        {
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
            end: "top 30%",
            scrub: 0.5,
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative w-full min-h-screen bg-transparent py-32 px-6 sm:px-12 flex flex-col justify-center items-center z-10 border-t border-[#C43859]/15"
    >
      <div className="max-w-5xl w-full mx-auto space-y-16">
        {/* Section Header */}
        <div className="flex items-center gap-3 font-code text-xs text-[#C43859] uppercase tracking-[0.3em]">
          <Terminal className="w-4 h-4" />
          <span>02 / PHILOSOPHY & BACKGROUND</span>
        </div>

        {/* Oversized Word-by-Word Reveal Statement */}
        <div className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-[#F5EBE6] font-light leading-[1.05] tracking-tight">
          {words.map((word, index) => (
            <span
              key={index}
              ref={(el) => {
                if (el) wordsRef.current[index] = el;
              }}
              className="inline-block mr-[0.28em] will-change-transform"
            >
              {word === "alive." ? (
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F5EBE6] via-[#C43859] to-[#8B1E3F] italic font-normal">
                  {word}
                </span>
              ) : (
                word
              )}
            </span>
          ))}
        </div>

        {/* Detailed Bio Narrative Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-12 border-t border-[#C43859]/15">
          <div className="space-y-6 font-sans text-base sm:text-lg text-[#B8ADA8] font-light leading-relaxed">
            <p>
              I am a Software Engineer and AI Developer based in India, specializing in the convergence of artificial intelligence, high-performance web systems, and interactive creative technology.
            </p>
            <p>
              My work spans designing deep neural network pipelines, sub-second streaming voice AI assistants, and Awwwards-grade WebGL visual canvases that respond dynamically to human input.
            </p>
          </div>

          <div className="space-y-6 font-sans text-base sm:text-lg text-[#B8ADA8] font-light leading-relaxed">
            <p>
              I view code not merely as functional instruction, but as an architectural canvas. Every micro-animation, state transition, and shader iteration is crafted with strict mathematical precision and aesthetic intent.
            </p>
            <div className="pt-4 flex flex-wrap gap-4">
              <div className="p-4 rounded-2xl bg-[#16080E] border border-[#C43859]/20 flex items-center gap-3">
                <Sparkles className="w-5 h-5 text-[#C43859]" />
                <div className="font-code text-xs">
                  <div className="text-[#F5EBE6] font-medium">FULL-STACK & AI</div>
                  <div className="text-[#6E635F]">END-TO-END ARCHITECTURE</div>
                </div>
              </div>
              <div className="p-4 rounded-2xl bg-[#16080E] border border-[#C43859]/20 flex items-center gap-3">
                <Code2 className="w-5 h-5 text-[#C43859]" />
                <div className="font-code text-xs">
                  <div className="text-[#F5EBE6] font-medium">60 FPS WEBGL</div>
                  <div className="text-[#6E635F]">KINETIC MOTION DESIGN</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
