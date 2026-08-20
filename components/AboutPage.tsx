"use client";

import React, { useEffect, useState } from "react";
import { SiteHeader } from "./SiteHeader";
import { CursorDot } from "./CursorDot";
import { ConnectModal } from "@/components/ui/ConnectModal";
import { initSmoothScroll } from "@/lib/smoothScroll";
import { initCursor } from "@/lib/cursor";
import { initAboutAnimations } from "@/lib/about";
import { siteConfig } from "@/lib/siteConfig";
import { CountUp } from "@/components/ui/CountUp";

const experience = [
  {
    role: "Project Coordinator",
    company: "Mass Culture Canada",
    period: "Dec 2024 — Apr 2025",
    desc: "Led digital communications strategy, DNA platform launch, and Brenau University partnership. Expanded national reach to 74K+ readers.",
  },
  {
    role: "Communications & Digital Content Creator",
    company: "Toronto Metropolitan University · Bridging Divides",
    period: "Aug 2023 — Apr 2024",
    desc: "Designed and launched centralized LMS platform for academic researchers, managing content architecture and accessibility compliance.",
  },
  {
    role: "Digital Communications Assistant",
    company: "Government of Canada · Parks Canada",
    period: "Jun 2022 — Dec 2022",
    desc: "Coordinated digital knowledge repositories and staff tutorial resources during agency-wide Microsoft 365 migration.",
  },
  {
    role: "VP Marketing & Creative Director",
    company: "Creative Industries Course Union (CICU)",
    period: "2023 — 2025",
    desc: "Directed multichannel promotional campaigns, live 35mm film photography, and annual showcase events for 500+ attendees.",
  },
];

const stats = [
  { end: 74, suffix: "K+", label: "Audience Campaign Reach" },
  { end: 4.0, decimals: 1, suffix: "/4.2", label: "CGPA · Graduated with Distinction" },
  { end: 10, suffix: "+", label: "Cross-Institutional Projects" },
  { end: 500, suffix: "+", label: "Showcase Event Attendees" },
];

export function AboutPage() {
  const [connectModalOpen, setConnectModalOpen] = useState(false);

  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);

    const { cleanup: cleanupScroll } = initSmoothScroll();
    const cleanupCursor = initCursor();
    const cleanupAbout = initAboutAnimations();

    return () => {
      cleanupScroll();
      cleanupCursor();
      cleanupAbout();
    };
  }, []);

  return (
    <>
      <SiteHeader />
      <CursorDot />

      <main id="main-content" className="about-page">
        {/* Hero */}
        <section className="about-hero">
          <img
            src="/assets/shape-star1.webp"
            alt=""
            className="about-hero__star"
            aria-hidden="true"
          />
          <h1 className="about-hero__heading">
            Connecting ideas, data, and people through intentional communication.
          </h1>
        </section>

        {/* Intro */}
        <section className="about-intro">
          <div className="about-intro__content">
            <div className="about-intro__image-wrapper">
              <img
                src="/assets/shape-circle2.webp"
                alt=""
                className="about-intro__image-shape-ring"
                aria-hidden="true"
              />
              <img
                src="/assets/social-campaigns/654651294_18520046998073873_8861659328534541782_n.jpg"
                alt={siteConfig.person.portraitAlt}
                className="about-intro__image-selfie-2"
              />
              <img
                src="/assets/shape-star1.webp"
                alt=""
                className="about-intro__image-shape-burst"
                aria-hidden="true"
              />
            </div>

            <div className="about-intro__text">
              <h2 className="about-intro__title">Hi, I&apos;m {siteConfig.person.firstName}.</h2>
              <p>
                I&apos;m a Communications, Marketing &amp; Project Coordination professional based between
                London, United Kingdom and Toronto, Canada. I specialise in turning complex research, institutional
                goals, and creative briefs into clear, compelling campaigns.
              </p>
              <p>
                My background spans public sector digital rollouts, higher education knowledge hubs, non-profit
                arts platforms, and international marketing challenges. I bring analytical rigour, eye for visual craft,
                and structured workflow management to every partnership.
              </p>
            </div>

            <div className="about-intro__stats">
              {stats.map((stat, idx) => (
                <div key={idx} className="about-intro__stat">
                  <div className="about-intro__stat-number">
                    <CountUp end={stat.end} decimals={stat.decimals || 0} suffix={stat.suffix} />
                  </div>
                  <div className="about-intro__stat-label">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Experience */}
        <section className="about-experience">
          <h2 className="about-experience__heading">Professional Experience</h2>
          <div className="about-experience__grid">
            <div className="about-experience__column">
              {experience.slice(0, 2).map((item, idx) => (
                <div key={idx} className="about-experience__item">
                  <div className="about-experience__role">{item.role}</div>
                  <div className="about-experience__period">
                    {item.company} · {item.period}
                  </div>
                  <p className="text-sm text-gray-500 mt-1">{item.desc}</p>
                </div>
              ))}
            </div>
            <div className="about-experience__column">
              {experience.slice(2).map((item, idx) => (
                <div key={idx} className="about-experience__item">
                  <div className="about-experience__role">{item.role}</div>
                  <div className="about-experience__period">
                    {item.company} · {item.period}
                  </div>
                  <p className="text-sm text-gray-500 mt-1">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Education & Skills */}
        <section className="about-education">
          <div className="about-education__content">
            <h2 className="about-education__heading">Education &amp; Credentials</h2>
            <div className="about-education__list">
              {siteConfig.education.map((entry) => (
                <div key={entry.school} className="about-education__item">
                  <div className="about-education__school">{entry.school}</div>
                  <div className="about-education__degree">{entry.degree}</div>
                  <div className="about-education__period">
                    {entry.period} {entry.note ? `· ${entry.note}` : ""}
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <h3 className="text-xl font-serif text-[var(--text-dark)] mb-3">Key Competencies</h3>
              <div className="about-skills">
                {siteConfig.skills.map((skill) => (
                  <span key={skill} className="about-skills__chip">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="about-resume">
              <a
                className="about-resume__link"
                href={siteConfig.resumeUrl}
                download
              >
                Download Complete Résumé (PDF)
              </a>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="about-interests">
          <h2 className="about-interests__heading">Core Values</h2>
          <div className="about-interests__content">
            <p>
              <strong>Data with Heart</strong> — Numbers only make an impact when they connect with people.
              I believe in translating analytics and research into empathetic narratives that inspire action.
            </p>
            <p>
              <strong>Cross-Institutional Collaboration</strong> — The best outcomes happen when diverse perspectives
              unite. Having coordinated projects across Canada, the US, and the UK, I thrive in bridging multidisciplinary teams.
            </p>
            <p>
              <strong>Craft &amp; Accessibility</strong> — From typography and motion pacing to WCAG compliance,
              I ensure every deliverable is both beautiful and accessible to all audiences.
            </p>
            <p>
              When I&apos;m not coordinating campaigns, you&apos;ll find me exploring contemporary art galleries,
              experimenting with analog 35mm film photography, or exploring emerging AI creative tools.
            </p>
          </div>
        </section>

        {/* Contact */}
        <section className="about-contact" id="contact">
          <h2 className="about-contact__heading">Let&apos;s connect</h2>
          <div className="about-contact__content">
            <a className="about-contact__email" href={`mailto:${siteConfig.email}`}>
              {siteConfig.email}
            </a>
            <div className="my-5 text-center">
              <button
                type="button"
                onClick={() => setConnectModalOpen(true)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[var(--text-dark)] text-white hover:opacity-90 text-xs font-mono tracking-widest uppercase transition-all shadow-md"
                aria-label="Open contact and collaboration pop-out modal"
              >
                <span>Open Connect Pop-out</span>
                <span>↗</span>
              </button>
            </div>
            <div className="about-contact__social">
              {Object.values(siteConfig.socials).map((social) => (
                <a
                  key={social.href}
                  className="about-contact__link"
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {social.label}
                </a>
              ))}
            </div>
          </div>
        </section>

        <footer className="footer">
          <p>
            © {siteConfig.copyrightStartYear} {siteConfig.legalName}
          </p>
        </footer>
      </main>

      <ConnectModal
        isOpen={connectModalOpen}
        onClose={() => setConnectModalOpen(false)}
      />
    </>
  );
}

export default AboutPage;
