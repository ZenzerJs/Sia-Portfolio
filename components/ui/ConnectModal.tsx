"use client";

import React, { useEffect, useState, useRef } from "react";
import { siteConfig } from "@/lib/siteConfig";

interface ConnectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ConnectModal({ isOpen, onClose }: ConnectModalProps) {
  const [copied, setCopied] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(siteConfig.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    } catch {
      // Fallback
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[3000] flex items-center justify-center p-4 bg-[#0A1628]/80 backdrop-blur-md transition-opacity duration-300"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="connect-modal-title"
    >
      <div
        ref={modalRef}
        className="relative w-full max-w-lg bg-[#142A4A] border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl text-white transform transition-all duration-300 animate-in fade-in zoom-in-95"
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white/70 hover:text-white flex items-center justify-center transition-colors"
          aria-label="Close connect modal"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {/* Modal Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <img
              src="/assets/logo-monogram-light.png"
              alt=""
              className="w-8 h-8 object-contain"
            />
            <span className="text-xs font-mono tracking-widest uppercase text-[#A8CBE8] block">
              Start a Conversation
            </span>
          </div>
          <h2 id="connect-modal-title" className="text-2xl sm:text-3xl font-serif font-normal">
            Let&apos;s collaborate
          </h2>
          <p className="text-sm text-white/70 mt-2">
            Available for communications strategy, digital storytelling, and project coordination across London &amp; Toronto.
          </p>
        </div>

        {/* Copyable Email Box */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-4 mb-6">
          <div className="text-xs font-mono text-white/50 uppercase tracking-wider mb-1.5">
            Direct Email
          </div>
          <div className="flex items-center justify-between gap-3">
            <span className="font-mono text-sm text-white truncate select-all">
              {siteConfig.email}
            </span>
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={handleCopyEmail}
                className="px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-xs font-mono tracking-wider transition-colors"
                aria-label="Copy email address"
              >
                {copied ? "✓ Copied" : "Copy"}
              </button>
              <a
                href={`mailto:${siteConfig.email}`}
                className="px-3.5 py-1.5 rounded-full bg-[#1E3A5F] hover:bg-[#2A4D7A] border border-white/20 text-xs font-mono tracking-wider text-white transition-colors"
              >
                Send Email ↗
              </a>
            </div>
          </div>
        </div>

        {/* Professional & Social Links */}
        <div>
          <div className="text-xs font-mono text-white/50 uppercase tracking-wider mb-3">
            Professional Profiles &amp; Documents
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <a
              href={siteConfig.socials.linkedin.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors group"
            >
              <span className="text-xs font-medium text-white/90 group-hover:text-white">
                LinkedIn Profile
              </span>
              <span className="text-xs text-white/40 group-hover:text-white/80 transition-colors">
                ↗
              </span>
            </a>
            <a
              href={siteConfig.resumeUrl}
              download
              className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors group"
            >
              <span className="text-xs font-medium text-white/90 group-hover:text-white">
                Résumé (PDF)
              </span>
              <span className="text-xs text-white/40 group-hover:text-white/80 transition-colors">
                ↓
              </span>
            </a>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-white/50 font-mono">
          <span>{siteConfig.location}</span>
          <span>Response time: ~24h</span>
        </div>
      </div>
    </div>
  );
}

export default ConnectModal;
