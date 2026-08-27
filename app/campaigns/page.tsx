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

      <main id="main-content" className="min-h-screen pt-32 pb-16 bg-[var(--bg-light)] text-[#1E3A5F] relative">
        {/* Editorial Section Masthead */}
        <section className="max-w-4xl mx-auto px-6 text-center mb-6 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200/90 text-slate-600 font-mono text-[11px] uppercase tracking-widest mb-4 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-[#1E3A5F]" />
            <span>Digital Media &amp; Campaign Directory</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif text-[#1E3A5F] tracking-tight mb-4 font-normal">
            Social Campaigns &amp; Research Translation
          </h1>

          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed font-sans">
            Multi-platform campaign strategy, motion teasers, and research translation posts for{' '}
            <strong className="text-[#1E3A5F] font-medium">Mass Culture Canada</strong> and{' '}
            <strong className="text-[#1E3A5F] font-medium">Creative Industries Course Union (CICU)</strong>.
          </p>
        </section>

        {/* Full-Screen Light-Themed Campaign Viewer */}
        <section aria-label="Social Media Campaigns Showcase">
          <SocialCampaignViewer />
        </section>
      </main>

      <Footer />
    </>
  );
}
