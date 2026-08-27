import type { Metadata } from 'next';
import { SiteHeader } from '@/components/SiteHeader';
import { SocialCampaignViewer } from '@/components/SocialCampaignViewer';
import { Footer } from '@/components/Footer';
import { siteConfig } from '@/lib/siteConfig';

export const metadata: Metadata = {
  title: `Campaigns & Social Media | ${siteConfig.name}`,
  description:
    'Multi-platform digital campaigns, motion teasers, and data narrative research translation for Mass Culture Canada and Creative Industries Course Union.',
};

export default function CampaignsPage() {
  return (
    <>
      <SiteHeader />

      <main id="main-content" className="min-h-screen pt-32 pb-20 bg-[var(--bg-light)] text-[#1E3A5F] relative overflow-hidden">
        
        {/* Subtle Editorial Background Shapes from Home Page */}
        <div className="absolute inset-0 pointer-events-none select-none overflow-hidden z-0" aria-hidden="true">
          {/* Top Left Astrix */}
          <div className="absolute top-24 -left-10 w-44 h-44 opacity-35 animate-spin-slow">
            <img src="/assets/shape-astrix.svg" alt="" className="w-full h-full object-contain" />
          </div>

          {/* Top Right Orange Circle */}
          <div className="absolute top-16 -right-16 w-60 h-60 opacity-30">
            <img src="/assets/shape-circle2.webp" alt="" className="w-full h-full object-contain" />
          </div>

          {/* Mid Left Leaf */}
          <div className="absolute top-[42%] -left-6 w-36 h-36 opacity-35 rotate-12">
            <img src="/assets/shape-leaf1.webp" alt="" className="w-full h-full object-contain" />
          </div>

          {/* Mid Right Starburst */}
          <div className="absolute top-[38%] -right-8 w-40 h-40 opacity-35 -rotate-6">
            <img src="/assets/shape-star1.webp" alt="" className="w-full h-full object-contain" />
          </div>

          {/* Bottom Left Blue Circle */}
          <div className="absolute -bottom-10 left-12 w-52 h-52 opacity-25">
            <img src="/assets/shape-circle1.webp" alt="" className="w-full h-full object-contain" />
          </div>

          {/* Bottom Right Large Astrix */}
          <div className="absolute bottom-24 -right-10 w-48 h-48 opacity-35">
            <img src="/assets/shape-astrix-2.svg" alt="" className="w-full h-full object-contain" />
          </div>
        </div>

        {/* Editorial Masthead */}
        <section className="max-w-4xl mx-auto px-6 text-center mb-6 sm:mb-8 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/90 backdrop-blur-xs border border-slate-200/90 text-slate-600 font-mono text-[11px] uppercase tracking-widest mb-3 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-[#1E3A5F]" />
            <span>Digital Media &amp; Campaign Showcase</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif text-[#1E3A5F] tracking-tight mb-3 font-normal">
            Social Campaigns &amp; Research Translation
          </h1>

          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed font-sans">
            Campaign strategy, digital assets, and research translation for{' '}
            <strong className="text-[#1E3A5F] font-medium">Mass Culture Canada</strong> and{' '}
            <strong className="text-[#1E3A5F] font-medium">Creative Industries Course Union (CICU)</strong>.
          </p>
        </section>

        {/* Clean Full-Screen Campaign Viewer */}
        <section aria-label="Social Media Campaigns Showcase" className="relative z-10">
          <SocialCampaignViewer />
        </section>
      </main>

      <Footer />
    </>
  );
}
