import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: "#FFFFFF",
        surface: "#F9F9F9",
        "surface-bright": "#F9F9F9",
        "surface-container": "#EEEEEE",
        "surface-container-high": "#E8E8E8",
        "surface-container-low": "#F3F3F4",
        "grid-line": "#E5E5E5",
        "meta-text": "#666666",
        navy: {
          DEFAULT: "#1E3A5F",
          dark: "#142A4A",
          muted: "rgba(30, 58, 95, 0.35)",
        },
        "accent-blue": "#0047FF",
        "accent-lime": "#D4FF00",
        "accent-eco": "#00A86B",
        "accent-orange": "#FF5F1F",
        "accent-pink": "#FF007F",
      },
      fontFamily: {
        serif: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
        "display-xl": ["var(--font-editorial-display)", "Bodoni Moda", "Georgia", "serif"],
        "headline-lg": ["var(--font-editorial-display)", "Bodoni Moda", "Georgia", "serif"],
        label: ["var(--font-editorial-sans)", "Hanken Grotesk", "sans-serif"],
        "body-md": ["var(--font-editorial-sans)", "Hanken Grotesk", "sans-serif"],
        "body-lg": ["var(--font-editorial-sans)", "Hanken Grotesk", "sans-serif"],
        metadata: ["var(--font-editorial-mono)", "JetBrains Mono", "monospace"],
      },
      spacing: {
        "grid-margin": "48px",
        "grid-gutter": "24px",
        "section-gap": "96px",
      },
    },
  },
  plugins: [],
};

export default config;

