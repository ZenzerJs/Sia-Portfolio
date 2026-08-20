import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Geist, Roboto_Mono, Bodoni_Moda, Hanken_Grotesk, JetBrains_Mono } from "next/font/google";
import { SmoothScrollProvider } from "@/components/SmoothScrollProvider";
import { PageTransitionProvider } from "@/components/PageTransitionProvider";
import { AuroraGlow } from "@/components/ui/AuroraGlow";
import { siteConfig } from "@/lib/siteConfig";
import "./globals.css";

// Display / headlines: Instrument Serif — a high-contrast editorial serif with
// a sharp, magazine-style voice that pairs cleanly with Geist and the navy
// palette.
const instrumentSerif = Instrument_Serif({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const robotoMono = Roboto_Mono({
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

// Editorial (case-study) typefaces — the Stitch "Narrative Studio" system.
// Kept separate from the global Instrument Serif / Geist / Roboto Mono so the
// case-study pages can adopt the high-contrast editorial look without touching
// the home/about typography.
const bodoniModa = Bodoni_Moda({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
  variable: "--font-editorial-display",
  display: "swap",
});

const hankenGrotesk = Hanken_Grotesk({
  weight: ["400", "600"],
  subsets: ["latin"],
  variable: "--font-editorial-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--font-editorial-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: siteConfig.metadataBase,
  title: {
    default: `${siteConfig.name} | ${siteConfig.role}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [...siteConfig.keywords],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: siteConfig.name,
    title: `${siteConfig.name} | ${siteConfig.role}`,
    description: siteConfig.description,
    url: siteConfig.domain,
  },
  twitter: {
    card: "summary",
    title: `${siteConfig.name} | ${siteConfig.role}`,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/assets/asset 0.svg",
  },
};

export const viewport: Viewport = {
  themeColor: siteConfig.theme.canvas,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${instrumentSerif.variable} ${geist.variable} ${robotoMono.variable} ${bodoniModa.variable} ${hankenGrotesk.variable} ${jetbrainsMono.variable}`}
    >
      <body
        suppressHydrationWarning
        className="text-[#1E3A5F] font-sans antialiased selection:bg-[#1E3A5F] selection:text-[#FFFFFF]"
      >
        <AuroraGlow />
        <SmoothScrollProvider>
          <PageTransitionProvider>{children}</PageTransitionProvider>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}