"use client";

import React, { useEffect } from "react";
import { SiteHeader } from "./SiteHeader";
import { CursorDot } from "./CursorDot";
import { initSmoothScroll } from "@/lib/smoothScroll";
import { initCursor } from "@/lib/cursor";
import { initAboutAnimations } from "@/lib/about";
import { siteConfig } from "@/lib/siteConfig";

const experience = [
  {
    role: "Independent Digital Designer & Developer",
    period: "2021 — Present",
  },
  {
    role: "Lead UI/UX Designer",
    period: "2019 — 2021",
  },
  {
    role: "Digital Art Director",
    period: "2017 — 2019",
  },
];

const stats = [
  { number: "7+", label: "Years experience" },
  { number: "30+", label: "Websites launched" },
  { number: "10+", label: "Industry awards" },
];

export function AboutPage() {
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
            Crafting digital experiences with character, clarity, and craft.
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
                src="/assets/title-selfie.jpg"
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
                I&apos;m a digital designer and developer based in Calgary, Canada.
                I help brands craft websites that feel alive — living, breathing
                experiences with warmth, motion, and a strong point of view.
              </p>
              <p>
                My practice sits at the intersection of design and development,
                so the work I make is both beautiful and built to last.
              </p>
            </div>

            <div className="about-intro__stats">
              {stats.map((stat) => (
                <div key={stat.label} className="about-intro__stat">
                  <div className="about-intro__stat-number">{stat.number}</div>
                  <div className="about-intro__stat-label">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Experience */}
        <section className="about-experience">
          <h2 className="about-experience__heading">Experience</h2>
          <div className="about-experience__grid">
            <div className="about-experience__column">
              {experience.slice(0, 2).map((item) => (
                <div key={item.period} className="about-experience__item">
                  <div className="about-experience__role">{item.role}</div>
                  <div className="about-experience__period">{item.period}</div>
                </div>
              ))}
            </div>
            <div className="about-experience__column">
              {experience.slice(2).map((item) => (
                <div key={item.period} className="about-experience__item">
                  <div className="about-experience__role">{item.role}</div>
                  <div className="about-experience__period">{item.period}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Education + skills + résumé */}
        <section className="about-education">
          <div className="about-education__content">
            <h2 className="about-education__heading">Education &amp; skills</h2>
            <div className="about-education__list">
              {siteConfig.education.map((entry) => (
                <div key={entry.school} className="about-education__item">
                  <div className="about-education__school">{entry.school}</div>
                  <div className="about-education__degree">{entry.degree}</div>
                  <div className="about-education__period">
                    {entry.period}
                    {entry.note ? ` · ${entry.note}` : ""}
                  </div>
                </div>
              ))}
            </div>
            <div className="about-skills">
              {siteConfig.skills.map((skill) => (
                <span key={skill} className="about-skills__chip">
                  {skill}
                </span>
              ))}
            </div>
            <div className="about-resume">
              <a
                className="about-resume__link"
                href={siteConfig.resumeUrl}
                download
              >
                Download résumé (PDF)
              </a>
            </div>
          </div>
        </section>

        {/* Interests */}
        <section className="about-interests">
          <h2 className="about-interests__heading">Design values</h2>
          <div className="about-interests__content">
            <p>
              Character — every project deserves a voice of its own, not a
              template. I sweat the details that make a brand feel authored.
            </p>
            <p>
              Clarity — good design gets out of the way. Structure, hierarchy,
              and restraint let the message land.
            </p>
            <p>
              Craft — from typography to motion, I care about the small moments
              that make an experience feel considered.
            </p>
            <p>
              When I&apos;m not at my desk I&apos;m usually outdoors — hiking the
              Rockies, chasing good light, and collecting ideas for the next
              project.
            </p>
          </div>
        </section>

        {/* Contact */}
        <section className="about-contact" id="contact">
          <h2 className="about-contact__heading">Let&apos;s work together</h2>
          <div className="about-contact__content">
            <a className="about-contact__email" href={`mailto:${siteConfig.email}`}>
              {siteConfig.email}
            </a>
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
    </>
  );
}

export default AboutPage;
