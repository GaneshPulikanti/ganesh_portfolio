"use client";

import React, { useState, useEffect } from "react";
import { ArrowUpRight, Menu, X, FileText } from "lucide-react";

export const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [mobileMenuOpen]);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navLinks = [
    { id: "build", label: "BUILD", number: "01" },
    { id: "about", label: "ABOUT", number: "02" },
    { id: "projects", label: "WORK", number: "03" },
    { id: "process", label: "PROCESS", number: "04" },
    { id: "contact", label: "CONTACT", number: "05" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-4 sm:px-12 py-3 sm:py-5 ${
          scrolled || mobileMenuOpen
            ? "bg-[#0A0406]/95 backdrop-blur-md border-b border-[#C43859]/15 py-3 sm:py-4"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Brand / Logo */}
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            data-magnetic
            className="group text-left z-50"
          >
            <span className="block font-display text-base sm:text-2xl font-light tracking-wide text-[#F5EBE6] group-hover:text-[#C43859] transition-colors">
              GANESH PULIKANTI
            </span>
            <span className="block font-code text-[8px] sm:text-[10px] tracking-[0.2em] sm:tracking-[0.25em] text-[#C43859] uppercase">
              SOFTWARE / AI ARCHITECT
            </span>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden sm:flex items-center gap-6 lg:gap-8 font-code text-xs tracking-widest uppercase">
            {navLinks.slice(0, 4).map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="text-[#B8ADA8] hover:text-[#F5EBE6] transition-colors"
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => scrollToSection("contact")}
              data-magnetic
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#C43859] text-[#F5EBE6] hover:bg-[#8B1E3F] transition-colors font-medium shadow-md shadow-[#8B1E3F]/30"
            >
              <span>CONTACT</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            data-magnetic
            className="sm:hidden p-2.5 rounded-full bg-[#16080E] border border-[#C43859]/30 text-[#F5EBE6] hover:border-[#C43859] transition-all z-50 flex items-center gap-2 font-code text-[10px] uppercase tracking-wider"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? (
              <>
                <span>CLOSE</span>
                <X className="w-4 h-4 text-[#C43859]" />
              </>
            ) : (
              <>
                <span>MENU</span>
                <Menu className="w-4 h-4 text-[#C43859]" />
              </>
            )}
          </button>
        </div>
      </header>

      {/* Full-Screen Mobile Editorial Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#0A0406]/98 backdrop-blur-2xl flex flex-col justify-between p-6 pt-28 pb-10 sm:hidden">
          {/* Navigation Links List */}
          <div className="space-y-6">
            <div className="font-code text-[10px] text-[#C43859] uppercase tracking-[0.3em] pb-2 border-b border-[#C43859]/20">
              NAVIGATION DIRECTORY
            </div>
            <nav className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className="flex items-center justify-between text-left group py-1"
                >
                  <span className="font-display text-3xl font-light text-[#F5EBE6] group-hover:text-[#C43859] transition-colors">
                    {link.label}
                  </span>
                  <span className="font-code text-xs text-[#C43859]">
                    {link.number}
                  </span>
                </button>
              ))}
            </nav>
          </div>

          {/* Bottom Social & Action Footer inside Mobile Overlay */}
          <div className="pt-6 border-t border-[#C43859]/20 space-y-4">
            <div className="font-code text-[10px] text-[#B8ADA8] uppercase tracking-widest">
              CONNECT & RESUME
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href="https://github.com/GaneshPulikanti"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-full bg-[#16080E] border border-[#C43859]/30 text-[#F5EBE6] font-code text-xs"
              >
                GITHUB
              </a>
              <a
                href="https://linkedin.com/in/ganesh-pulikanti"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-full bg-[#16080E] border border-[#C43859]/30 text-[#F5EBE6] font-code text-xs"
              >
                LINKEDIN
              </a>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-full bg-[#C43859] text-[#F5EBE6] font-code text-xs font-semibold inline-flex items-center gap-1.5"
              >
                <span>CV</span>
                <FileText className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

