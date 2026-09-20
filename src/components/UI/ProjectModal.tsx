"use client";

import React, { useEffect, useRef } from "react";
import { Project } from "@/data/projects";
import { X, ExternalLink, CheckCircle2, Download } from "lucide-react";
import { gsap } from "gsap";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (project) {
      document.body.style.overflow = "hidden";
      const ctx = gsap.context(() => {
        gsap.fromTo(
          overlayRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.4, ease: "power2.out" }
        );
        gsap.fromTo(
          modalRef.current,
          { y: 40, opacity: 0, scale: 0.96 },
          { y: 0, opacity: 1, scale: 1, duration: 0.5, ease: "power3.out", delay: 0.1 }
        );
      });
      return () => ctx.revert();
    } else {
      document.body.style.overflow = "unset";
    }
  }, [project]);

  if (!project) return null;

  const handleClose = () => {
    gsap.to(modalRef.current, {
      y: 20,
      opacity: 0,
      duration: 0.3,
      ease: "power2.in",
    });
    gsap.to(overlayRef.current, {
      opacity: 0,
      duration: 0.3,
      ease: "power2.in",
      onComplete: onClose,
    });
  };

  return (
    <div
      ref={overlayRef}
      data-lenis-prevent
      className="fixed inset-0 z-[9990] flex items-center justify-center p-4 sm:p-6 md:p-8 bg-[#0A0406]/90 backdrop-blur-md"
      onClick={handleClose}
    >
      <div
        ref={modalRef}
        data-lenis-prevent
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl max-h-[85vh] flex flex-col justify-between bg-[#16080E] border border-[#C43859]/30 rounded-3xl p-6 sm:p-8 text-[#F5EBE6] shadow-2xl shadow-[#8B1E3F]/40 overflow-hidden"
      >
        {/* Fixed Top Header Bar */}
        <div className="flex items-center justify-between pb-4 border-b border-[#C43859]/20 shrink-0">
          <div className="flex items-center gap-3 font-code text-xs text-[#C43859] uppercase tracking-widest">
            <span className="font-display text-lg text-[#F5EBE6]">{project.number}</span>
            <span>•</span>
            <span>{project.category}</span>
            <span>•</span>
            <span>{project.year}</span>
          </div>

          <button
            onClick={handleClose}
            data-magnetic
            className="p-2.5 rounded-full bg-[#C43859] text-[#F5EBE6] hover:bg-[#8B1E3F] transition-all border border-[#F5EBE6]/30 shadow-lg shadow-[#8B1E3F]/40 shrink-0 cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Main Content Body */}
        <div data-lenis-prevent className="flex-1 overflow-y-auto py-4 space-y-6 pr-2 no-scrollbar">
          {/* Title & Subtitle */}
          <div>
            <h2 className="font-display text-3xl sm:text-5xl text-[#F5EBE6] mb-1 font-light">
              {project.title}
            </h2>
            <p className="font-sans text-base sm:text-lg text-[#C43859] font-medium">
              {project.subtitle}
            </p>
          </div>

          {/* Description */}
          <div className="text-sm sm:text-base text-[#B8ADA8] leading-relaxed border-b border-[#C43859]/15 pb-6 font-light">
            <p>{project.longDescription}</p>
          </div>

          {/* Key Metrics */}
          <div>
            <h3 className="font-code text-xs uppercase tracking-widest text-[#B8ADA8] mb-3">
              VERIFIED IMPACT & METRICS
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {project.metrics.map((metric, i) => (
                <div
                  key={i}
                  className="p-3.5 rounded-xl bg-[#200B14] border border-[#C43859]/20 flex items-center gap-3"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#C43859] shrink-0" />
                  <span className="font-code text-xs font-semibold text-[#F5EBE6]">
                    {metric}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Tech Stack */}
          <div>
            <h3 className="font-code text-xs uppercase tracking-widest text-[#B8ADA8] mb-3">
              TECHNOLOGY STACK
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech, i) => (
                <span
                  key={i}
                  className="px-3 py-1 rounded-full text-xs font-code bg-[#200B14] border border-[#C43859]/30 text-[#F5EBE6]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Fixed Always-Visible Bottom Actions Bar */}
        <div className="pt-4 border-t border-[#C43859]/20 shrink-0 flex flex-wrap items-center gap-3 justify-between bg-[#16080E]">
          <div className="flex flex-wrap items-center gap-3">
            {project.links.apkUrl && (
              <a
                href={project.links.apkUrl}
                download
                data-magnetic
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#C43859] text-[#F5EBE6] hover:bg-[#8B1E3F] transition-colors font-code text-xs tracking-wider uppercase font-semibold shadow-lg shadow-[#8B1E3F]/40"
              >
                <Download className="w-4 h-4" />
                <span>DOWNLOAD APK</span>
              </a>
            )}
            {project.links.github && (
              <a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                data-magnetic
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#200B14] border border-[#C43859]/40 text-[#F5EBE6] hover:bg-[#8B1E3F] transition-colors font-code text-xs tracking-wider uppercase font-medium"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
                <span>GITHUB REPO</span>
              </a>
            )}
          </div>

          {project.links.live && (
            <a
              href={project.links.live}
              target="_blank"
              rel="noopener noreferrer"
              data-magnetic
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#C43859] text-[#F5EBE6] hover:bg-[#8B1E3F] transition-colors font-code text-xs tracking-wider uppercase font-semibold shadow-lg shadow-[#8B1E3F]/40"
            >
              <span>LAUNCH VERCEL APP</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
