"use client";

import React, { useState, useEffect } from "react";
import { ArrowUp, Clock } from "lucide-react";

export const Footer: React.FC = () => {
  const [istTime, setIstTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      };
      const formatter = new Intl.DateTimeFormat("en-GB", options);
      setIstTime(formatter.format(new Date()));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative w-full bg-[#0A0406] py-10 px-6 sm:px-12 border-t border-[#C43859]/15 z-10">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 font-code text-xs text-[#B8ADA8] tracking-widest uppercase">
        {/* Left: Brand Copyright */}
        <div className="flex items-center gap-3">
          <span className="text-[#F5EBE6] font-medium">GANESH PULIKANTI</span>
          <span className="text-[#C43859]">•</span>
          <span>© {new Date().getFullYear()} ALL RIGHTS RESERVED</span>
        </div>



        {/* Right: Scroll to Top */}
        <button
          onClick={scrollToTop}
          data-magnetic
          className="inline-flex items-center gap-2 text-[#B8ADA8] hover:text-[#C43859] transition-colors"
        >
          <span>BACK TO TOP</span>
          <div className="p-2 rounded-full bg-[#16080E] border border-[#C43859]/20">
            <ArrowUp className="w-3.5 h-3.5 text-[#C43859]" />
          </div>
        </button>
      </div>
    </footer>
  );
};
