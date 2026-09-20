"use client";

import React, { useState } from "react";
import { useLenis } from "@/hooks/useLenis";
import { Preloader } from "@/components/UI/Preloader";
import { CustomCursor } from "@/components/UI/CustomCursor";
import { GrainOverlay } from "@/components/UI/GrainOverlay";
import { BackgroundCanvas } from "@/components/ThreeScene/BackgroundCanvas";
import { Header } from "@/components/Navigation/Header";
import { HeroSection } from "@/components/Hero/HeroSection";
import { CapabilitiesSection } from "@/components/Capabilities/CapabilitiesSection";
import { AboutSection } from "@/components/About/AboutSection";
import { ProjectsSection } from "@/components/Projects/ProjectsSection";
import { MetricsSection } from "@/components/Metrics/MetricsSection";
import { ProcessSection } from "@/components/Process/ProcessSection";
import { ContactSection } from "@/components/Contact/ContactSection";
import { Footer } from "@/components/Footer/Footer";

export default function Home() {
  useLenis();
  const [loadingComplete, setLoadingComplete] = useState(false);

  return (
    <main className="relative min-h-screen bg-[#0A0406] text-[#F5EBE6] selection:bg-[#8B1E3F]/40 overflow-x-hidden">
      {/* 1. Cinematic Preloader Sequence */}
      <Preloader onComplete={() => setLoadingComplete(true)} />

      {/* 2. Tactile Grain Noise Overlay */}
      <GrainOverlay />

      {/* 3. Custom Magnetic Desktop Cursor */}
      <CustomCursor />

      {/* 4. Persistent 3D React Three Fiber Background Canvas */}
      <BackgroundCanvas />

      {/* 5. Fixed Editorial Navigation Header */}
      <Header />

      {/* 6. Page Content Structure */}
      <div className={`transition-opacity duration-1000 ${loadingComplete ? "opacity-100" : "opacity-0"}`}>
        {/* HERO SECTION */}
        <HeroSection />

        {/* WHAT I BUILD (CAPABILITIES) SECTION */}
        <CapabilitiesSection />

        {/* ABOUT & PHILOSOPHY SECTION */}
        <AboutSection />

        {/* SELECTED WORK & PROJECTS SECTION */}
        <ProjectsSection />

        {/* ACHIEVEMENTS & METRICS SECTION */}
        <MetricsSection />

        {/* PROCESS TIMELINE SECTION */}
        <ProcessSection />

        {/* CONTACT SECTION */}
        <ContactSection />

        {/* FOOTER */}
        <Footer />
      </div>
    </main>
  );
}
