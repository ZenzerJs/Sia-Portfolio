/**
 * Public component surface — everything here is wired into a route.
 *
 * Note: `Header`, `HeroSection`, `MarimbaPortfolio`, etc. (the alternate
 * framer-motion build) are kept in this folder but intentionally NOT
 * re-exported here; the live site uses `MarimbaExactPortfolio` + `lib/*`.
 */
export * from "./types";
export * from "./MarimbaExactPortfolio";
export { default } from "./MarimbaExactPortfolio";
export * from "./AboutPage";
export * from "./WorkPage";
export * from "./CaseStudyPage";
export * from "./SiteHeader";
export * from "./CursorDot";
export * from "./SmoothScrollProvider";
export * from "./PageTransitionProvider";