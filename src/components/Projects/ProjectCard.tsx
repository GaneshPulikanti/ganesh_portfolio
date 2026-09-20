"use client";

import React from "react";
import { Project } from "@/data/projects";
import { ArrowUpRight, CheckCircle2, Download } from "lucide-react";

interface ProjectCardProps {
  project: Project;
  onSelect: (project: Project) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onSelect }) => {
  return (
    <div
      data-cursor-view
      onClick={() => onSelect(project)}
      className="group relative w-full bg-[#16080E] border border-[#C43859]/25 rounded-3xl p-8 sm:p-12 transition-all duration-500 hover:border-[#C43859]/60 hover:shadow-2xl hover:shadow-[#8B1E3F]/30 cursor-pointer overflow-hidden"
    >
      {/* Background Subtle Gradient Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#8B1E3F]/10 rounded-full blur-3xl pointer-events-none group-hover:bg-[#C43859]/20 transition-all duration-700" />

      {/* Top Header Grid */}
      <div className="flex items-center justify-between font-code text-xs text-[#C43859] tracking-widest uppercase mb-6 relative z-10">
        <span className="text-xl font-display text-[#F5EBE6]">{project.number}</span>
        <span>{project.category}</span>
        <span>{project.year}</span>
      </div>

      {/* Title & Subtitle */}
      <div className="relative z-10 space-y-2 mb-6">
        <h3 className="font-display text-4xl sm:text-6xl md:text-7xl text-[#F5EBE6] font-light group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#F5EBE6] group-hover:to-[#C43859] transition-all duration-300">
          {project.title}
        </h3>
        <p className="font-sans text-base sm:text-lg text-[#C43859] font-medium">
          {project.subtitle}
        </p>
      </div>

      {/* Description */}
      <p className="font-sans text-base text-[#B8ADA8] font-light leading-relaxed mb-8 max-w-3xl relative z-10">
        {project.description}
      </p>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8 relative z-10">
        {project.metrics.map((m, idx) => (
          <div
            key={idx}
            className="p-3 rounded-xl bg-[#200B14] border border-[#C43859]/15 flex items-center gap-2 text-xs font-code text-[#F5EBE6]"
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-[#C43859] shrink-0" />
            <span className="truncate">{m}</span>
          </div>
        ))}
      </div>

      {/* Footer: Tech Stack & CTA Buttons */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-[#C43859]/15 relative z-10">
        <div className="flex flex-wrap gap-2">
          {project.techStack.map((tech, idx) => (
            <span
              key={idx}
              className="px-3 py-1 rounded-full text-xs font-code bg-[#200B14] text-[#B8ADA8] border border-[#C43859]/20"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {project.links.apkUrl && (
            <a
              href={project.links.apkUrl}
              download
              onClick={(e) => e.stopPropagation()}
              data-magnetic
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#C43859] text-[#F5EBE6] hover:bg-[#8B1E3F] transition-all duration-300 font-code text-xs tracking-wider uppercase font-semibold shadow-lg shadow-[#8B1E3F]/30"
            >
              <Download className="w-4 h-4" />
              <span>DOWNLOAD APK</span>
            </a>
          )}
          <button
            data-magnetic
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#200B14] border border-[#C43859]/40 text-[#F5EBE6] group-hover:bg-[#C43859] group-hover:border-[#C43859] transition-all duration-300 font-code text-xs tracking-wider uppercase font-semibold shadow-lg shadow-[#8B1E3F]/20"
          >
            <span>EXPLORE SPEC</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};
