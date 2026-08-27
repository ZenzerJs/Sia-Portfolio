import type { Metadata } from 'next';
import { SiteHeader } from '@/components/SiteHeader';
import { CampaignsMasthead } from '@/components/CampaignsMasthead';
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
        
        {/* Editorial Background Shapes from Home Page (Only astrixes spin ultra-slowly) */}
        <div className="absolute inset-0 pointer-events-none select-none overflow-hidden z-0" aria-hidden="true">
          {/* Top Left Astrix — Slow clockwise spin */}
          <div className="absolute top-24 -left-10 w-44 h-44 opacity-35 animate-spin-ultra-slow">
            <img src="/assets/shape-astrix.svg" alt="" className="w-full h-full object-contain" />
          </div>

          {/* Top Right Orange Circle — Static */}
          <div className="absolute top-16 -right-16 w-60 h-60 opacity-30">
            <img src="/assets/shape-circle2.webp" alt="" className="w-full h-full object-contain" />
          </div>

          {/* Mid Left Leaf — Static */}
          <div className="absolute top-[42%] -left-6 w-36 h-36 opacity-35 rotate-12">
            <img src="/assets/shape-leaf1.webp" alt="" className="w-full h-full object-contain" />
          </div>

          {/* Mid Right Starburst — Static */}
          <div className="absolute top-[38%] -right-8 w-40 h-40 opacity-35 -rotate-6">
            <img src="/assets/shape-star1.webp" alt="" className="w-full h-full object-contain" />
          </div>

          {/* Bottom Left Blue Circle — Static */}
          <div className="absolute -bottom-10 left-12 w-52 h-52 opacity-25">
            <img src="/assets/shape-circle1.webp" alt="" className="w-full h-full object-contain" />
          </div>

          {/* Bottom Right Large Astrix — Slow counter-clockwise spin */}
          <div className="absolute bottom-24 -right-10 w-48 h-48 opacity-35 animate-spin-ultra-slow-reverse">
            <img src="/assets/shape-astrix-2.svg" alt="" className="w-full h-full object-contain" />
          </div>
        </div>

        {/* Editorial Masthead with Work/About Signature Blur-to-Sharp Entrance */}
        <CampaignsMasthead />

        {/* Clean Full-Screen Campaign Viewer */}
        <section aria-label="Social Media Campaigns Showcase" className="relative z-10">
          <SocialCampaignViewer />
        </section>
      </main>

      <Footer />
    </>
  );
}
