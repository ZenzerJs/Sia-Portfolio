import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  webpack: (config, { dev }) => {
    // The webpack persistent filesystem cache (`PackFileCacheStrategy`) can
    // corrupt with "invalid distances set" when multiple `next dev` servers
    // or interrupted builds share the same `.next` directory. Dev-mode
    // rebuilds are fast enough without it, so use an in-memory cache in dev.
    // Production builds keep their on-disk cache (single run, no contention).
    if (dev) {
      config.cache = false;
    }
    return config;
  },
};

export default nextConfig;
