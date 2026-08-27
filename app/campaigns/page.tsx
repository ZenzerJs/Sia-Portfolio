import type { Metadata } from 'next';
import { SiteHeader } from '@/components/SiteHeader';
import { BroadcastTVConsole } from '@/components/BroadcastTVConsole';
import { Footer } from '@/components/Footer';
import { siteConfig } from '@/lib/siteConfig';

export const metadata: Metadata = {
  title: `Social Campaigns & Broadcast Monitor | ${siteConfig.name}`,
  description:
    'Interactive broadcast console showcasing multi-platform campaigns, student community spotlights, and data narrative translations for Mass Culture Canada and Creative Industries Course Union.',
};

export default function CampaignsPage() {
  return (
    <>
      <SiteHeader />

      <main id="main-content" className="min-h-screen pt-32 pb-16 bg-[#0e1013] text-neutral-100 relative overflow-hidden">
        {/* Subtle Ambient Studio Background Glow */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[80vw] h-[500px] bg-radial from-emerald-500/10 via-sky-500/5 to-transparent blur-3xl pointer-events-none"
          aria-hidden="true"
        />

        {/* Editorial Section Masthead */}
        <section className="max-w-4xl mx-auto px-6 text-center mb-8 sm:mb-12 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/70 border border-emerald-700/60 text-emerald-400 font-mono text-[11px] uppercase tracking-widest mb-4">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Broadcast Console // 13 Live Channels</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif text-white tracking-tight mb-4">
            Social Campaigns &amp; Research Translation
          </h1>

          <p className="text-base sm:text-lg text-neutral-400 max-w-2xl mx-auto leading-relaxed font-sans">
            Tune into multi-platform digital campaigns, motion teasers, and research translation posts created for{' '}
            <strong className="text-neutral-200 font-medium">Mass Culture Canada</strong> and{' '}
            <strong className="text-neutral-200 font-medium">Creative Industries Course Union (CICU)</strong>.
          </p>
        </section>

        {/* Interactive Retro Broadcast Monitor Unit */}
        <section aria-label="Broadcast TV Social Console" className="relative z-10">
          <BroadcastTVConsole />
        </section>
      </main>

      <Footer />
    </>
  );
}
