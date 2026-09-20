"use client";

import React, { useState, useEffect } from "react";
import { ArrowUpRight } from "lucide-react";

export const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-4 sm:px-12 py-3 sm:py-5 ${
        scrolled
          ? "bg-[#0A0406]/90 backdrop-blur-md border-b border-[#C43859]/15 py-3 sm:py-4"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand / Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          data-magnetic
          className="group text-left"
        >
          <span className="block font-display text-lg sm:text-2xl font-light tracking-wide text-[#F5EBE6] group-hover:text-[#C43859] transition-colors">
            GANESH PULIKANTI
          </span>
          <span className="block font-code text-[9px] sm:text-[10px] tracking-[0.2em] sm:tracking-[0.25em] text-[#C43859] uppercase">
            SOFTWARE / AI ARCHITECT
          </span>
        </button>

        {/* Navigation Links */}
        <nav className="flex items-center gap-3 sm:gap-8 font-code text-[11px] sm:text-xs tracking-widest uppercase">
          <button
            onClick={() => scrollToSection("build")}
            className="text-[#B8ADA8] hover:text-[#F5EBE6] transition-colors hidden sm:block"
          >
            BUILD
          </button>
          <button
            onClick={() => scrollToSection("about")}
            className="text-[#B8ADA8] hover:text-[#F5EBE6] transition-colors hidden sm:block"
          >
            ABOUT
          </button>
          <button
            onClick={() => scrollToSection("projects")}
            className="text-[#B8ADA8] hover:text-[#F5EBE6] transition-colors"
          >
            WORK
          </button>
          <button
            onClick={() => scrollToSection("process")}
            className="text-[#B8ADA8] hover:text-[#F5EBE6] transition-colors hidden md:block"
          >
            PROCESS
          </button>
          <button
            onClick={() => scrollToSection("contact")}
            data-magnetic
            className="inline-flex items-center gap-1 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-[#C43859] text-[#F5EBE6] hover:bg-[#8B1E3F] transition-colors font-medium shadow-md shadow-[#8B1E3F]/30"
          >
            <span>CONTACT</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </nav>
      </div>
    </header>
  );
};
