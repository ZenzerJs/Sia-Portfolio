"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { SiteHeader } from "./SiteHeader";
import { CursorDot } from "./CursorDot";
import { Footer } from "./Footer";
import { siteConfig } from "@/lib/siteConfig";
import { initSmoothScroll } from "@/lib/smoothScroll";
import { initCursor } from "@/lib/cursor";

export function ContactPage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const { cleanup: cleanupScroll } = initSmoothScroll();
    const cleanupCursor = initCursor();
    return () => {
      cleanupScroll();
      cleanupCursor();
    };
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(siteConfig.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <SiteHeader />
      <CursorDot />

      <main id="main-content" className="w-full max-w-[1380px] mx-auto px-6 md:px-12 pt-32 pb-20 relative z-10">
        {/* Editorial Hero Header */}
        <section className="min-h-[35vh] flex flex-col justify-center items-center text-center pb-12 border-b border-gray-100/80 mb-14">
          <span className="text-xs font-mono tracking-widest uppercase text-[#718096] block mb-3 text-center">
            Let&apos;s Connect
          </span>
          <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-normal leading-[1.1] tracking-tight text-[#1E3A5F] mb-6">
            Get in Touch
          </h1>
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto font-light leading-relaxed">
            Whether you have an upcoming project, freelance inquiry, or want to discuss strategic communications, marketing, and digital media — I&apos;d love to hear from you.
          </p>
        </section>

        {/* Contact Info & Interactive Inquiry Form Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-20">
          {/* Left Column: Direct Channels & Resources */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <h2 className="font-serif text-2xl sm:text-3xl text-[#1E3A5F] mb-4">
                Direct Channels
              </h2>
              <p className="text-sm text-slate-600 font-light leading-relaxed mb-6">
                Feel free to reach out directly via email, connect on LinkedIn, or review my official résumé documentation.
              </p>
            </div>

            {/* Email Card */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-sm transition-all hover:shadow-md hover:border-[#1E3A5F]/40">
              <span className="text-xs font-mono uppercase tracking-widest text-slate-400 block mb-1">
                Email Address
              </span>
              <div className="flex items-center justify-between gap-4 mt-2">
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="font-mono text-sm sm:text-base text-[#1E3A5F] hover:underline font-medium break-all"
                >
                  {siteConfig.email}
                </a>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-mono uppercase tracking-wider transition-colors flex-shrink-0"
                >
                  {copied ? "Copied!" : "Copy"}
                </button>
              </div>
            </div>

            {/* Location & Timezone Card */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-sm">
              <span className="text-xs font-mono uppercase tracking-widest text-slate-400 block mb-1">
                Location &amp; Availability
              </span>
              <p className="font-serif text-lg text-[#1E3A5F] mt-1 mb-1">
                {siteConfig.location}
              </p>
              <p className="text-xs text-slate-500 font-sans">
                Available for remote global engagements, hybrid, and in-person opportunities.
              </p>
            </div>

            {/* Résumé & Profiles Strip */}
            <div className="pt-4 border-t border-slate-200/80">
              <span className="text-xs font-mono uppercase tracking-widest text-slate-400 block mb-3">
                Downloads &amp; Links
              </span>
              <div className="flex flex-wrap gap-3">
                <a
                  href={siteConfig.socials.linkedin.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-full border border-slate-300 bg-white hover:border-[#1E3A5F] text-[#1E3A5F] text-xs font-mono tracking-wider uppercase transition-all shadow-xs hover:scale-105"
                >
                  LinkedIn Profile ↗
                </a>
                <a
                  href={siteConfig.resumeUrl}
                  download
                  className="px-5 py-2.5 rounded-full bg-[#1E3A5F] text-white hover:bg-[#142A4A] text-xs font-mono tracking-wider uppercase transition-all shadow-sm hover:scale-105"
                >
                  Download Résumé (PDF) ↓
                </a>
                <a
                  href={siteConfig.resumeDocxUrl}
                  download
                  className="px-5 py-2.5 rounded-full border border-slate-300 bg-white hover:border-[#1E3A5F] text-[#1E3A5F] text-xs font-mono tracking-wider uppercase transition-all shadow-xs hover:scale-105"
                >
                  Résumé (DOCX) ↓
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Contact Form */}
          <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-3xl border border-slate-200/90 shadow-sm relative">
            <h2 className="font-serif text-2xl sm:text-3xl text-[#1E3A5F] mb-2">
              Send a Message
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-sans mb-8">
              Fill out the form below and I will get back to you within 24–48 hours.
            </p>

            {submitted ? (
              <div className="p-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center text-xl">
                  ✓
                </div>
                <h3 className="font-serif text-2xl text-emerald-900">Message Received!</h3>
                <p className="text-sm text-emerald-700 font-sans">
                  Thank you for reaching out, {formState.name || "friend"}. I will review your note and respond shortly.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setFormState({ name: "", email: "", subject: "", message: "" });
                  }}
                  className="mt-4 px-5 py-2 rounded-full bg-emerald-700 text-white text-xs font-mono uppercase tracking-wider hover:bg-emerald-800 transition-all"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-xs font-mono uppercase tracking-widest text-[#1E3A5F] mb-2 font-semibold">
                      Your Name *
                    </label>
                    <input
                      id="name"
                      type="text"
                      required
                      placeholder="Jane Doe"
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E3A5F]/20 focus:border-[#1E3A5F] transition-all"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-xs font-mono uppercase tracking-widest text-[#1E3A5F] mb-2 font-semibold">
                      Email Address *
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      placeholder="jane@example.com"
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E3A5F]/20 focus:border-[#1E3A5F] transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-xs font-mono uppercase tracking-widest text-[#1E3A5F] mb-2 font-semibold">
                    Project / Subject
                  </label>
                  <input
                    id="subject"
                    type="text"
                    placeholder="e.g. Communications Strategy & Branding Collaboration"
                    value={formState.subject}
                    onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E3A5F]/20 focus:border-[#1E3A5F] transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs font-mono uppercase tracking-widest text-[#1E3A5F] mb-2 font-semibold">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={5}
                    placeholder="Tell me about your goals, timeline, or what you'd like to collaborate on..."
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E3A5F]/20 focus:border-[#1E3A5F] transition-all resize-y"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-10 py-4 rounded-full bg-[#1E3A5F] text-white hover:bg-[#142A4A] text-xs font-mono tracking-widest uppercase shadow-md hover:shadow-lg transition-all hover:scale-105 active:scale-95 cursor-pointer font-semibold inline-flex items-center justify-center gap-2"
                  >
                    <span>Send Message</span>
                    <span>→</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </main>

      {/* Sliding Blue Theme Footer */}
      <Footer />
    </>
  );
}

export default ContactPage;
