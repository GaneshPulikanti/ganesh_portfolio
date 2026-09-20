"use client";

import React, { useState, useEffect, useRef } from "react";
import { PROJECTS, Project } from "@/data/projects";
import { ProjectCard } from "./ProjectCard";
import { ProjectModal } from "@/components/UI/ProjectModal";
import { FolderGit2 } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export const ProjectsSection: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const projectRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      projectRefs.current.forEach((el, index) => {
        if (!el) return;

        // Cinematic staggered entrance variations per project
        const directionY = index % 2 === 0 ? 60 : 40;
        const scaleVal = 0.94;

        gsap.fromTo(
          el,
          {
            y: directionY,
            scale: scaleVal,
            opacity: 0,
            filter: "blur(6px)",
          },
          {
            y: 0,
            scale: 1,
            opacity: 1,
            filter: "blur(0px)",
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 80%",
              end: "top 40%",
              scrub: 0.5,
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="projects"
      ref={containerRef}
      className="relative w-full min-h-screen bg-transparent py-32 px-6 sm:px-12 z-10 border-t border-[#C43859]/15"
    >
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-[#C43859]/15 pb-8">
          <div>
            <div className="flex items-center gap-3 font-code text-xs text-[#C43859] uppercase tracking-[0.3em] mb-2">
              <FolderGit2 className="w-4 h-4" />
              <span>03 / SELECTED WORK & DEPLOYMENTS</span>
            </div>
            <h2 className="font-display text-4xl sm:text-6xl text-[#F5EBE6] font-light">
              FEATURED <span className="italic text-[#B8ADA8]">SYSTEMS</span>
            </h2>
          </div>
          <p className="font-code text-xs text-[#B8ADA8] tracking-widest uppercase max-w-xs">
            SELECT ANY CASE STUDY TO INSPECT ARCHITECTURAL SPECIFICATIONS AND LIVE DEPLOYMENTS.
          </p>
        </div>

        {/* Project Cards Stack */}
        <div className="space-y-16">
          {PROJECTS.map((project, index) => (
            <div
              key={project.id}
              ref={(el) => {
                if (el) projectRefs.current[index] = el;
              }}
              className="will-change-transform"
            >
              <ProjectCard project={project} onSelect={setSelectedProject} />
            </div>
          ))}
        </div>
      </div>

      {/* Deep Technical Spec Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};
