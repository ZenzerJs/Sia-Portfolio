import type { Metadata, Viewport } from "next";
import { Fraunces, Geist, Roboto_Mono } from "next/font/google";
import { SmoothScrollProvider } from "@/components/SmoothScrollProvider";
import { PageTransitionProvider } from "@/components/PageTransitionProvider";
import { siteConfig } from "@/lib/siteConfig";
import "./globals.css";

// Display / headlines: Fraunces — a distinctive, high-contrast editorial serif
// with optical sizing (opsz) and the SOFT/WONK variable axes for a designed,
// non-default look. Loaded as a single variable font (one file, all weights).
const fraunces = Fraunces({
  subsets: ["latin"],
  axes: ["opsz", "SOFT", "WONK"],
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
      className={`${fraunces.variable} ${geist.variable} ${robotoMono.variable}`}
    >
      <body
        suppressHydrationWarning
        className="bg-[#F0EFE9] text-[#3A4A16] font-sans antialiased selection:bg-[#3A4A16] selection:text-[#F0EFE9]"
      >
        <SmoothScrollProvider>
          <PageTransitionProvider>{children}</PageTransitionProvider>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}