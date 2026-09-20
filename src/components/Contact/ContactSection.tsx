"use client";

import React, { useState } from "react";
import { FileText, Copy, Check, Send } from "lucide-react";

export const ContactSection: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const emailAddress = "the.ganeshpulikanti@gmail.com";

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      // 1. Direct browser fetch to FormSubmit
      const res = await fetch("https://formsubmit.co/ajax/the.ganeshpulikanti@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          _subject: `[Portfolio Contact] New message from ${formData.name}`,
          _captcha: "false",
        }),
      });

      const data = await res.json();

      if (res.ok && (data.success === "true" || data.success === true)) {
        setSubmitted(true);
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => setSubmitted(false), 5000);
      } else {
        // 2. Direct fallback to user mail client
        const subject = encodeURIComponent(`Portfolio Message from ${formData.name}`);
        const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`);
        window.location.href = `mailto:the.ganeshpulikanti@gmail.com?subject=${subject}&body=${body}`;
        setSubmitted(true);
        setFormData({ name: "", email: "", message: "" });
      }
    } catch {
      // Direct fallback to user mail client
      const subject = encodeURIComponent(`Portfolio Message from ${formData.name}`);
      const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`);
      window.location.href = `mailto:the.ganeshpulikanti@gmail.com?subject=${subject}&body=${body}`;
      setSubmitted(true);
      setFormData({ name: "", email: "", message: "" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      className="relative w-full min-h-screen bg-transparent py-32 px-6 sm:px-12 flex flex-col justify-between z-10 border-t border-[#C43859]/15"
    >
      <div className="max-w-6xl mx-auto w-full space-y-20">
        {/* Section Header Tag */}
        <div className="font-code text-xs text-[#C43859] uppercase tracking-[0.3em]">
          06 / CONTACT & COLLABORATION
        </div>

        {/* Dramatic Oversized Editorial Heading */}
        <div className="space-y-2">
          <h2 className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-[#F5EBE6] font-light leading-[0.9] tracking-tight">
            LET&apos;S BUILD <br />
            <span className="italic text-[#B8ADA8]">SOMETHING</span> <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F5EBE6] via-[#C43859] to-[#8B1E3F]">
              DIFFERENT.
            </span>
          </h2>
        </div>

        {/* Two-Column Grid: Left Direct Links & Copy Button | Right Form */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 pt-12 border-t border-[#C43859]/15">
          {/* Left Column: Email & Social Channels */}
          <div className="space-y-8">
            <p className="font-sans text-base sm:text-lg text-[#B8ADA8] font-light leading-relaxed max-w-lg">
              Have an ambitious AI model to deploy, an interactive WebGL experience to architect, or a senior engineering role? Let&apos;s start a conversation.
            </p>

            {/* Email Copy Card */}
            <div className="p-6 rounded-3xl bg-[#16080E] border border-[#C43859]/25 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <div className="font-code text-[10px] text-[#C43859] uppercase tracking-widest mb-1">
                  DIRECT EMAIL INBOX
                </div>
                <div className="font-code text-base text-[#F5EBE6] font-medium">
                  {emailAddress}
                </div>
              </div>

              <button
                onClick={handleCopyEmail}
                data-magnetic
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#200B14] border border-[#C43859]/40 text-[#F5EBE6] hover:bg-[#C43859] transition-colors font-code text-xs tracking-wider uppercase font-semibold"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>COPIED TO CLIPBOARD</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>COPY EMAIL</span>
                  </>
                )}
              </button>
            </div>

            {/* Social Channels */}
            <div className="flex flex-wrap gap-4 pt-4">
              <a
                href="https://github.com/GaneshPulikanti"
                target="_blank"
                rel="noopener noreferrer"
                data-magnetic
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#16080E] border border-[#C43859]/20 text-[#F5EBE6] hover:border-[#C43859] hover:bg-[#200B14] transition-all font-code text-xs tracking-wider uppercase"
              >
                <svg className="w-4 h-4 fill-current text-[#C43859]" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
                <span>GITHUB</span>
              </a>

              <a
                href="https://linkedin.com/in/ganesh-pulikanti"
                target="_blank"
                rel="noopener noreferrer"
                data-magnetic
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#16080E] border border-[#C43859]/20 text-[#F5EBE6] hover:border-[#C43859] hover:bg-[#200B14] transition-all font-code text-xs tracking-wider uppercase"
              >
                <svg className="w-4 h-4 fill-current text-[#C43859]" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
                <span>LINKEDIN</span>
              </a>

              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                data-magnetic
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#16080E] border border-[#C43859]/20 text-[#F5EBE6] hover:border-[#C43859] hover:bg-[#200B14] transition-all font-code text-xs tracking-wider uppercase"
              >
                <FileText className="w-4 h-4 text-[#C43859]" />
                <span>CURRICULUM VITAE</span>
              </a>
            </div>
          </div>

          {/* Right Column: Direct Contact Form */}
          <form
            onSubmit={handleSubmit}
            className="p-8 sm:p-10 rounded-3xl bg-[#16080E] border border-[#C43859]/25 space-y-6 shadow-2xl shadow-[#8B1E3F]/15"
          >
            <div className="font-code text-xs text-[#C43859] uppercase tracking-widest mb-2">
              SEND DIRECT TRANSMISSION
            </div>

            <div>
              <label className="block font-code text-xs text-[#B8ADA8] uppercase tracking-wider mb-2">
                YOUR NAME
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Elena Rostova"
                className="w-full px-4 py-3 rounded-xl bg-[#200B14] border border-[#C43859]/20 text-[#F5EBE6] placeholder-[#6E635F] focus:outline-none focus:border-[#C43859] font-sans text-sm transition-colors"
              />
            </div>

            <div>
              <label className="block font-code text-xs text-[#B8ADA8] uppercase tracking-wider mb-2">
                YOUR EMAIL
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="e.g. elena@tech.io"
                className="w-full px-4 py-3 rounded-xl bg-[#200B14] border border-[#C43859]/20 text-[#F5EBE6] placeholder-[#6E635F] font-sans text-sm focus:outline-none focus:border-[#C43859] transition-colors"
              />
            </div>

            <div>
              <label className="block font-code text-xs text-[#B8ADA8] uppercase tracking-wider mb-2">
                PROJECT SCOPE OR MESSAGE
              </label>
              <textarea
                rows={4}
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Describe your vision, timeline, or engineering opportunity..."
                className="w-full px-4 py-3 rounded-xl bg-[#200B14] border border-[#C43859]/20 text-[#F5EBE6] placeholder-[#6E635F] font-sans text-sm focus:outline-none focus:border-[#C43859] transition-colors resize-none"
              />
            </div>

            {errorMsg && (
              <div className="font-code text-xs text-rose-400 bg-rose-950/40 p-3 rounded-xl border border-rose-500/30">
                {errorMsg}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              data-magnetic
              className="w-full py-4 rounded-xl bg-[#C43859] text-[#F5EBE6] font-code text-xs tracking-widest uppercase font-semibold hover:bg-[#8B1E3F] transition-colors shadow-lg shadow-[#8B1E3F]/40 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span>TRANSMITTING...</span>
              ) : submitted ? (
                <>
                  <Check className="w-4 h-4 text-emerald-300" />
                  <span>TRANSMISSION RECEIVED</span>
                </>
              ) : (
                <>
                  <span>TRANSMIT MESSAGE</span>
                  <Send className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};
