export interface ProjectMedia {
  type: "video" | "image" | "placeholder";
  src?: string;
  gradient?: string;
  alt?: string;
}

export interface EvolutionPhase {
  id: string;
  label: string;
  date: string;
  title: string;
  description: string;
  image?: string;
  accent?: string;
  rotation?: string;
}

export interface OutputItem {
  title: string;
  category?: string;
  image: string;
  alt?: string;
  type?: "image" | "video";
}

export interface ProjectResult {
  value: string;
  label: string;
  sublabel?: string;
}

export type CaseStudyVariant = "data" | "sport" | "eco" | "culture" | "systems" | "cinematic";

export interface Project {
  slug: string;
  variant: CaseStudyVariant;
  name: string;
  title: string;
  tagline: string;
  categories: string[];
  description: string;
  media: ProjectMedia;
  role: string;
  timeline: string;
  tools: string;
  client: string;
  heroDescription: string;
  challenge?: string;
  strategy?: string;
  brief?: string;
  objective?: string;
  detailVideo?: string;
  deckPdf?: string;
  slides?: string[];
  gallery?: string[];
  outputs?: OutputItem[];
  phases: EvolutionPhase[];
  accent: string;
  accentLime?: string;
  accentBlue?: string;
  accentEco?: string;
  accentOrange?: string;
  accentPink?: string;
  results?: ProjectResult[];
  quote?: { text: string; author: string; role?: string };
  beforeAfter?: {
    before: string;
    after: string;
    beforeLabel: string;
    afterLabel: string;
  };
}

export const projects: Project[] = [
  {
    slug: "tmu-fifa-world-cup-challenge",
    variant: "sport",
    name: "FIFA World Cup Campaign",
    title: "FIFA World Cup Campaign & Motion Graphics",
    tagline: "Brand Strategy & Interactive Motion Asset",
    categories: ["Digital Marketing", "Motion Graphics", "Brand Strategy"],
    description:
      "Strategic campaign and dynamic motion asset developed for the TMU FIFA World Cup Challenge, translating event analytics into high-impact visual storytelling.",
    media: {
      type: "video",
      src: "/assets/videos/good-gift-visual.mov",
      gradient: "linear-gradient(135deg, #0047FF 0%, #D4FF00 100%)",
      alt: "FIFA World Cup Campaign & Motion Graphics Preview",
    },
    role: "Digital Marketing & Creative Strategist",
    timeline: "Mar 2025",
    tools: "Figma, PowerPoint, Social Media Analytics, Brand Strategy",
    client: "Toronto Metropolitan University · FIFA World Cup Challenge",
    heroDescription:
      "Strategic campaign and dynamic motion asset developed for the TMU FIFA World Cup Challenge, translating event analytics into high-impact visual storytelling.",
    challenge:
      "Connecting millions of visiting international soccer supporters with Toronto's authentic diaspora communities in a meaningful, decentralized way.",
    strategy:
      "Transforming neighbourhood cultural enclaves into immersive live viewing hubs powered by international creator partnerships and 360° digital engagement.",
    accent: "#0047FF",
    accentBlue: "#0047FF",
    deckPdf: "/assets/decks/fifa-2026-slide-deck.pdf",
    slides: [
      "/assets/decks/slides/fifa-slide-1.jpg",
      "/assets/decks/slides/fifa-slide-2.jpg",
      "/assets/decks/slides/fifa-slide-5.jpg",
      "/assets/decks/slides/fifa-slide-7.jpg",
      "/assets/decks/slides/fifa-slide-10.jpg",
      "/assets/decks/slides/fifa-slide-15.jpg",
    ],
    phases: [],
  },
  {
    slug: "fifa-2026-challenge",
    variant: "sport",
    name: "FIFA World Cup 2026",
    title: "FIFA World Cup 2026: Our Neighbourhood, Your Nation",
    tagline: "Multicultural Fan Engagement & Digital Campaign (Hackathon Runner-Up)",
    categories: ["Campaign Strategy", "International Marketing", "Creative Direction"],
    description:
      "Competed in a global digital marketing hackathon focused on developing a creative campaign strategy for the FIFA World Cup 2026. Working alongside students from the UK, Chile, Saudi Arabia and the Netherlands, I collaborated across cultures and disciplines to develop and pitch a marketing concept within a fast-paced, competitive environment. Strengthened my skills in creative strategy, international collaboration, audience engagement and digital marketing.",
    media: {
      type: "image",
      src: "/assets/decks/slides/fifa-slide-1.jpg",
      gradient: "linear-gradient(135deg, #0047FF 0%, #D4FF00 100%)",
      alt: "FIFA World Cup 2026 Our Neighbourhood Your Nation campaign deck cover",
    },
    role: "Digital Marketing & Creative Strategist",
    timeline: "Mar 2025",
    tools: "Figma, PowerPoint, Social Media Analytics, Brand Strategy",
    client: "Toronto Metropolitan University · FIFA World Cup Challenge",
    heroDescription:
      "Uniting international fans with Toronto's authentic cultural neighbourhoods—Little Portugal, Little Italy, Koreatown, and Little Brazil—through immersive hubs and digital storytelling.",
    challenge:
      "Connecting millions of visiting international soccer supporters with Toronto's authentic diaspora communities in a meaningful, decentralized way.",
    strategy:
      "Transforming neighbourhood cultural enclaves into immersive live viewing hubs powered by international creator partnerships and 360° digital engagement.",
    brief:
      "sought a refined communications and digital engagement strategy designed to make complex multicultural data, fan priorities, and creative storytelling immediately impactful and accessible.",
    objective:
      "Transforming high-level research and institutional initiatives into audience-focused narratives that drive measurable engagement across global diaspora communities.",
    accent: "#0047FF",
    accentBlue: "#0047FF",
    accentLime: "#D4FF00",
    deckPdf: "/assets/decks/fifa-2026-slide-deck.pdf",
    slides: [
      "/assets/decks/slides/fifa-slide-1.jpg",
      "/assets/decks/slides/fifa-slide-2.jpg",
      "/assets/decks/slides/fifa-slide-3.jpg",
      "/assets/decks/slides/fifa-slide-4.jpg",
      "/assets/decks/slides/fifa-slide-5.jpg",
      "/assets/decks/slides/fifa-slide-6.jpg",
      "/assets/decks/slides/fifa-slide-7.jpg",
      "/assets/decks/slides/fifa-slide-8.jpg",
      "/assets/decks/slides/fifa-slide-9.jpg",
      "/assets/decks/slides/fifa-slide-10.jpg",
      "/assets/decks/slides/fifa-slide-11.jpg",
      "/assets/decks/slides/fifa-slide-12.jpg",
      "/assets/decks/slides/fifa-slide-13.jpg",
      "/assets/decks/slides/fifa-slide-14.jpg",
      "/assets/decks/slides/fifa-slide-15.jpg",
      "/assets/decks/slides/fifa-slide-16.jpg",
      "/assets/decks/slides/fifa-slide-17.jpg",
    ],
    gallery: [
      "/assets/decks/slides/fifa-slide-11.jpg",
      "/assets/decks/slides/fifa-slide-12.jpg",
      "/assets/decks/slides/fifa-slide-13.jpg",
      "/assets/decks/slides/fifa-slide-14.jpg",
    ],
    outputs: [
      {
        title: "Matchday Cultural Experience Hub Prototype",
        category: "Interactive Prototype",
        image: "/assets/decks/slides/fifa-slide-7.jpg",
        alt: "Matchday Experience slide",
      },
      {
        title: "Decentralized Neighbourhood Fan Wayfinding",
        category: "Digital Wayfinding",
        image: "/assets/decks/slides/fifa-slide-8.jpg",
        alt: "Neighbourhood guide slide",
      },
      {
        title: "Youth & Multicultural Community Outreach",
        category: "Community Strategy",
        image: "/assets/decks/slides/fifa-slide-9.jpg",
        alt: "Community outreach slide",
      },
      {
        title: "Executive Pitch Presentation & ROI Model",
        category: "Executive Pitch Deck",
        image: "/assets/decks/slides/fifa-slide-10.jpg",
        alt: "Executive Pitch Presentation slide",
      },
    ],
    results: [
      { value: "Runner-Up", label: "Global Hackathon Award", sublabel: "TMU FIFA Challenge" },
      { value: "4 Hubs", label: "Cultural Neighbourhood Activations", sublabel: "Toronto Cultural Districts" },
      { value: "5 Countries", label: "Cross-Border Student Team", sublabel: "UK, Chile, KSA, NL, CA" },
      { value: "360°", label: "Integrated Media Strategy", sublabel: "Broadcasting & Digital" },
    ],
    quote: {
      text: "A forward-thinking marketing concept that showcases how football becomes an international language through authentic neighbourhood culture.",
      author: "FIFA Challenge Jury",
      role: "TMU Global Marketing Initiative",
    },
    phases: [
      {
        id: "phase-1",
        label: "Context & Findings",
        date: "Stage 1",
        title: "Analysing Fan Demographics",
        description:
          "Explored fan behaviour patterns from previous World Cups and identified opportunities to leverage Canada's vibrant multicultural mosaic through data-driven audience mapping.",
        image: "/assets/decks/slides/fifa-slide-3.jpg",
        rotation: "rotate-2",
      },
      {
        id: "phase-2",
        label: "Creative Ideation",
        date: "Stage 2",
        title: "Our Neighbourhood, Your Nation",
        description:
          "Developing the narrative that football is the international language, utilizing Toronto's diverse neighbourhoods as physical hubs for authentic cultural engagement.",
        image: "/assets/decks/slides/fifa-slide-4.jpg",
        rotation: "-rotate-1",
      },
      {
        id: "phase-3",
        label: "Activation Strategy",
        date: "Stage 3",
        title: "Digital Engagement & Content Hubs",
        description:
          "Structuring multi-channel campaign architectures to bring global travel content creators and streamers to share the World Cup experience across national media channels.",
        image: "/assets/decks/slides/fifa-slide-5.jpg",
        rotation: "rotate-1",
      },
      {
        id: "phase-4",
        label: "Global Pitch",
        date: "Stage 4",
        title: "International Jury Presentation",
        description:
          "Presented the comprehensive 17-slide pitch deck to an international panel of industry judges and faculty, earning runner-up honours among global university teams.",
        image: "/assets/decks/slides/fifa-slide-6.jpg",
        rotation: "-rotate-2",
      },
    ],
  },
  {
    slug: "mastercard-sustainability",
    variant: "eco",
    name: "Mastercard Eco-Rebrand",
    title: "Mastercard: Sustainable Rebranding Campaign",
    tagline: "Eco-Conscious Brand Identity & Multi-Channel Rollout",
    categories: ["Brand Strategy", "Sustainable Design", "Social Campaigns"],
    description:
      "As part of a brand strategy project in university course RTA 902, I was challenged to take an existing brand and reimagine its identity for a new direction. I chose Mastercard and developed a new brand concept focused on sustainability and environmental responsibility. I explored how Mastercard could communicate this shift through refreshed messaging, visual identity and brand imagery, bringing the concept together in a comprehensive slide deck and presentation.",
    media: {
      type: "image",
      src: "/assets/decks/slides/mastercard-slide-1.jpg",
      gradient: "linear-gradient(135deg, #00A86B 0%, #001F3F 100%)",
      alt: "Mastercard Sustainable Rebranding Campaign master presentation slide",
    },
    role: "Brand Strategist & Creative Lead",
    timeline: "8 weeks",
    tools: "Adobe Illustrator, Photoshop, Figma, After Effects",
    client: "RTA The Creative School · Academic Rebrand Initiative",
    heroDescription:
      "Re-imagining a global financial icon through the lens of accountability, eco-core materials, transparent carbon tracking, and aspirational consumer rewards.",
    challenge: "Making sustainability affordable and commercially viable for everyday cardholders.",
    strategy: "Re-imagining a global financial icon through the lens of accountability and transparent environmental impact.",
    brief:
      "sought an ambitious brand repositioning strategy capable of turning institutional ESG commitments into accessible, everyday consumer value without diluting brand prestige.",
    objective:
      "Transforming high-level sustainability research into audience-focused narratives and multi-channel campaign touchpoints that drive measurable engagement.",
    accent: "#00A86B",
    accentEco: "#00A86B",
    deckPdf: "/assets/decks/rta-mastercard-slide-deck.pdf",
    slides: [
      "/assets/decks/slides/mastercard-slide-1.jpg",
      "/assets/decks/slides/mastercard-slide-2.jpg",
      "/assets/decks/slides/mastercard-slide-3.jpg",
      "/assets/decks/slides/mastercard-slide-4.jpg",
      "/assets/decks/slides/mastercard-slide-5.jpg",
      "/assets/decks/slides/mastercard-slide-6.jpg",
      "/assets/decks/slides/mastercard-slide-7.jpg",
      "/assets/decks/slides/mastercard-slide-8.jpg",
      "/assets/decks/slides/mastercard-slide-9.jpg",
      "/assets/decks/slides/mastercard-slide-10.jpg",
      "/assets/decks/slides/mastercard-slide-11.jpg",
    ],
    gallery: [
      "/assets/decks/slides/mastercard-slide-11.jpg",
    ],
    outputs: [
      {
        title: "Consumer Carbon Tracker Mobile Interface Flow",
        category: "Mobile UX Flow",
        image: "/assets/decks/slides/mastercard-slide-7.jpg",
        alt: "Mobile app prototype slide",
      },
      {
        title: "Merchant Sustainability & Footprint Dashboard",
        category: "Web Platform",
        image: "/assets/decks/slides/mastercard-slide-8.jpg",
        alt: "Merchant dashboard slide",
      },
      {
        title: "Community Carbon Offset & Incentive Architecture",
        category: "System Design",
        image: "/assets/decks/slides/mastercard-slide-9.jpg",
        alt: "Eco rewards slide",
      },
      {
        title: "Executive Strategy Presentation & Adoption Forecast",
        category: "Pitch Deck",
        image: "/assets/decks/slides/mastercard-slide-10.jpg",
        alt: "Executive Pitch slide",
      },
    ],
    results: [
      { value: "48%", label: "Projected Consumer Adoption", sublabel: "Green Cardholder Segment" },
      { value: "3.2x", label: "Brand Sentiment Uplift", sublabel: "Gen Z & Millennial Testing" },
      { value: "11 Slides", label: "End-to-End Strategic Deck", sublabel: "Product & Marketing Flow" },
      { value: "Top Tier", label: "Faculty Evaluation", sublabel: "RTA The Creative School" },
    ],
    quote: {
      text: "A sophisticated brand strategy that bridges high-level corporate ESG policy with actionable, consumer-friendly daily banking touchpoints.",
      author: "Prof. Brand Strategy",
      role: "The Creative School, RTA 902",
    },
    phases: [
      {
        id: "phase-1",
        label: "Research & Audit",
        date: "Phase 1",
        title: "Consumer Spending & Footprint Analysis",
        description:
          "Analysed cardholder transaction behaviour, identifying how purchase transparency influences eco-conscious purchasing decisions.",
        image: "/assets/decks/slides/mastercard-slide-3.jpg",
        rotation: "rotate-2",
      },
      {
        id: "phase-2",
        label: "Feature Strategy",
        date: "Phase 2",
        title: "Carbon Calculator & Digital Tracking",
        description:
          "Architected real-time carbon tracking per transaction, transforming abstract metrics into clear trees-planted equivalents.",
        image: "/assets/decks/slides/mastercard-slide-4.jpg",
        rotation: "-rotate-1",
      },
      {
        id: "phase-3",
        label: "Incentive Model",
        date: "Phase 3",
        title: "Gamified Sustainable Rewards",
        description:
          "Designed tier-based rewards encouraging transit, local organic grocers, and ethical merchants with cash-back multipliers.",
        image: "/assets/decks/slides/mastercard-slide-5.jpg",
        rotation: "rotate-1",
      },
      {
        id: "phase-4",
        label: "Commercial Rollout",
        date: "Phase 4",
        title: "Merchant Portal & Ecosystem Integration",
        description:
          "Synthesised the entire initiative into a 11-slide pitch deck detailing small business onboarding and marketing rollout.",
        image: "/assets/decks/slides/mastercard-slide-6.jpg",
        rotation: "-rotate-2",
      },
    ],
  },
  {
    slug: "mass-culture-dna",
    variant: "data",
    name: "Mass Culture DNA",
    title: "Mass Culture: Data Narrative for the Arts",
    tagline: "National Arts Research & Digital Knowledge Mobilisation",
    categories: ["Data Storytelling", "Digital Strategy", "Knowledge Translation"],
    description:
      "Mass Culture is a national arts research organisation dedicated to building a sustainable cultural sector in Canada. As Digital Communications Coordinator, I led digital marketing and content strategies to translate complex research, sector data and community insights into accessible, engaging digital content. Through social media, newsletters, webinars, and website copy, I helped communicate research findings to artists, arts organizations and cultural leaders across Canada.",
    media: {
      type: "image",
      src: "/assets/decks/slides/mass-culture-slide-1.jpg",
      gradient: "linear-gradient(135deg, #1E3A5F 0%, #476083 100%)",
      alt: "Mass Culture Data Narrative for the Arts strategic framework cover",
    },
    role: "Digital Communications Coordinator",
    timeline: "2023 — 2024",
    tools: "Canva, Mailchimp, WordPress, Google Analytics, LinkedIn, Notion",
    client: "Mass Culture / Mobilisation culturelle",
    heroDescription:
      "Translating complex national cultural datasets, sectoral research, and grassroots artistic knowledge into human-centred stories that drive advocacy and informed policy.",
    challenge:
      "Making dense quantitative research and cultural data accessible and actionable for artists, non-profits, and policymakers nationwide.",
    strategy:
      "Developing a unified digital knowledge translation framework with bite-sized data narratives, engaging infographics, and interactive webinars.",
    brief:
      "sought a modern digital communications strategy to mobilize arts research, increase community engagement, and bridge the gap between academic data and artistic practice.",
    objective:
      "Democratize cultural data by creating intuitive digital narratives, newsletters, and social campaigns that empower arts organizations across Canada.",
    accent: "#1E3A5F",
    accentBlue: "#1E3A5F",
    deckPdf: "/assets/decks/mass-culture-slide-deck.pdf",
    slides: [
      "/assets/decks/slides/mass-culture-slide-1.jpg",
      "/assets/decks/slides/mass-culture-slide-2.jpg",
      "/assets/decks/slides/mass-culture-slide-3.jpg",
      "/assets/decks/slides/mass-culture-slide-4.jpg",
      "/assets/decks/slides/mass-culture-slide-5.jpg",
      "/assets/decks/slides/mass-culture-slide-6.jpg",
      "/assets/decks/slides/mass-culture-slide-7.jpg",
      "/assets/decks/slides/mass-culture-slide-8.jpg",
      "/assets/decks/slides/river-clyde-slide-1.jpg",
      "/assets/decks/slides/river-clyde-slide-2.jpg",
      "/assets/decks/slides/river-clyde-slide-3.jpg",
    ],
    gallery: [
      "/assets/decks/slides/mass-culture-slide-9.jpg",
      "/assets/decks/slides/mass-culture-slide-10.jpg",
      "/assets/decks/slides/mass-culture-slide-11.jpg",
      "/assets/decks/slides/mass-culture-slide-12.jpg",
    ],
    outputs: [
      {
        title: "Digital Impact Assessment Strategy Document",
        category: "Research Strategy",
        image: "/assets/decks/slides/mass-culture-slide-7.jpg",
        alt: "Assessment framework slide",
      },
      {
        title: "Executive Reporting & Board Presentation Deck",
        category: "Presentation Deck",
        image: "/assets/decks/slides/mass-culture-slide-8.jpg",
        alt: "Executive deck slide",
      },
      {
        title: "River Clyde Arts: Impact Through Data Case Study",
        category: "Research Publication",
        image: "/assets/decks/slides/river-clyde-slide-1.jpg",
        alt: "River Clyde Arts Case Study slide",
      },
      {
        title: "Community Research & Cultural Indicators Model",
        category: "Data Model",
        image: "/assets/decks/slides/river-clyde-slide-2.jpg",
        alt: "Community Indicators Model slide",
      },
    ],
    results: [
      { value: "3,000+", label: "Cultural Practitioners Reached", sublabel: "Across 10 Provinces" },
      { value: "45%", label: "Newsletter Open Rate", sublabel: "2x Industry Average" },
      { value: "15+", label: "Research Reports Mobilised", sublabel: "Open-Access Toolkits" },
      { value: "24", label: "National Webinars Hosted", sublabel: "Knowledge Translation" },
    ],
    quote: {
      text: "Shanesia transformed our dense research data into compelling, visual stories that truly resonated with artists and cultural leaders across Canada.",
      author: "Robin Sokoloski",
      role: "Executive Director, Mass Culture",
    },
    phases: [
      {
        id: "phase-1",
        label: "Data Synthesis",
        date: "Phase 1",
        title: "Synthesizing Sectoral Research",
        description:
          "Audited academic research, national census data, and qualitative survey responses from arts organisations to identify core community narratives and insight gaps.",
        image: "/assets/decks/slides/mass-culture-slide-3.jpg",
        rotation: "rotate-2",
      },
      {
        id: "phase-2",
        label: "Visual Translation",
        date: "Phase 2",
        title: "Data Narrative Framework",
        description:
          "Designed accessible visual models, infographics, and carousel templates that distilled complex statistical methodologies into engaging, readable formats.",
        image: "/assets/decks/slides/mass-culture-slide-4.jpg",
        rotation: "-rotate-1",
      },
      {
        id: "phase-3",
        label: "Multi-Platform Rollout",
        date: "Phase 3",
        title: "Campaign Distribution & Newsletters",
        description:
          "Launched coordinated cross-platform campaigns across LinkedIn, newsletters, and the website, establishing consistent engagement rhythms with sector leaders.",
        image: "/assets/decks/slides/mass-culture-slide-5.jpg",
        rotation: "rotate-1",
      },
      {
        id: "phase-4",
        label: "Impact Measurement",
        date: "Phase 4",
        title: "Analytics, Feedback & Growth",
        description:
          "Tracked content performance, newsletter open rates, and community feedback to continuously refine knowledge mobilization strategies and reporting.",
        image: "/assets/decks/slides/mass-culture-slide-6.jpg",
        rotation: "-rotate-2",
      },
    ],
  },
  {
    slug: "cicu-creative-showcase",
    variant: "culture",
    name: "CICU Creative Direction",
    title: "Creative Industries Course Union: Brand & Community",
    tagline: "Creative Direction, 35mm Analog Photography, Event Production & Social Campaigns",
    categories: ["Creative Direction", "Analog Photography", "Social Campaigns", "Live Production"],
    description:
      "As Co-VP of Marketing for the Creative Industries Course Union (CICU), I led the visual direction, promotional campaigns, and live media capture for major school initiatives, including the annual student Showcase, Alumni Night, and branded merchandise drops. Combining digital social strategy with authentic 35mm analog film documentation, I created an unforgettable aesthetic that unified 300+ multidisciplinary creative students.",
    media: {
      type: "image",
      src: "/assets/cicu/showcase/showcase-post-1.jpg",
      gradient: "linear-gradient(135deg, #FF007F 0%, #FF5F1F 100%)",
      alt: "CICU Showcase promotional graphic",
    },
    role: "Co-VP of Marketing & Creative Director",
    timeline: "2023 — 2025",
    tools: "35mm Film, Adobe Premiere, After Effects, Canva, Instagram",
    client: "Creative Industries Course Union (CRI Union)",
    heroDescription:
      "Planning, promotion, and live media capture for the Creative Industries Course Union (CICU) annual end of Year Showcase celebrating 300+ student creators.",
    challenge: "Driving maximum attendance and community participation across multidisciplinary creative student cohorts.",
    strategy: "Producing fast-paced Instagram reels, authentic 35mm film documentation, and curated teaser countdown graphics.",
    accent: "#FF007F",
    accentPink: "#FF007F",
    accentOrange: "#FF5F1F",
    detailVideo: "/assets/cicu/showcase/showcase-reel.mp4",
    gallery: [
      "/assets/cicu/events/IMG_1082.JPG",
      "/assets/cicu/events/IMG_1087.JPG",
      "/assets/cicu/events/IMG_1093.JPG",
      "/assets/cicu/alum/alum-graphic-3.jpg",
    ],
    slides: [
      "/assets/cicu/showcase/showcase-slide-1.jpg",
      "/assets/cicu/showcase/showcase-slide-2.jpg",
      "/assets/cicu/showcase/showcase-slide-3.jpg",
      "/assets/cicu/showcase/showcase-slide-4.jpg",
      "/assets/cicu/showcase/showcase-slide-5.jpg",
      "/assets/cicu/showcase/showcase-slide-6.jpg",
    ],
    outputs: [
      {
        title: "35mm Analog Live Event Photography: Main Stage",
        category: "Film Photography",
        image: "/assets/cicu/events/001152030008.jpg",
        alt: "Main stage live 35mm photo",
      },
      {
        title: "35mm Analog Live Event Photography: Creative Exhibits",
        category: "Film Photography",
        image: "/assets/cicu/events/001152030023.jpg",
        alt: "Creative exhibit 35mm photo",
      },
      {
        title: "Interactive Community Gallery & Exhibition Floor",
        category: "Event Production",
        image: "/assets/cicu/events/IMG_1071.JPG",
        alt: "Community gallery photo",
      },
      {
        title: "Alumni Panel Campaign & Multi-Sector Collateral",
        category: "Digital Design",
        image: "/assets/cicu/alum/alum-graphic-2.jpg",
        alt: "Alumni panel poster",
      },
    ],
    results: [
      { value: "500+", label: "Showcase Event Attendees", sublabel: "Sold-Out Creative Event" },
      { value: "+120%", label: "Instagram Reel Impressions", sublabel: "Viral Community Growth" },
      { value: "9+", label: "Signature Events Executed", sublabel: "Workshops & Panels" },
      { value: "100%", label: "Student Sold-Out Merch Drop", sublabel: "Apparel & Print Collectibles" },
    ],
    quote: {
      text: "Shanesia brought unparalleled energy and visual artistry to every campaign. The 35mm photos and reels captured the spirit of our community flawlessly.",
      author: "Executive Board",
      role: "Creative Industries Course Union",
    },
    phases: [
      {
        id: "phase-1",
        label: "Visual Direction",
        date: "Month 1",
        title: "Showcase Teasers & Brand Identity",
        description:
          "Created retro-modern design assets and promotional typography for the annual student showcase across print and digital media.",
        image: "/assets/cicu/showcase/showcase-post-2.jpg",
        rotation: "rotate-1",
      },
      {
        id: "phase-2",
        label: "Alumni Nights",
        date: "Month 2",
        title: "Alumni Panel & Networking Visuals",
        description:
          "Designed multi-sector call-for-speaker posters and teaser carousels spotlighting creative industry leaders and student networking.",
        image: "/assets/cicu/alum/alum-graphic-1.jpg",
        rotation: "-rotate-1",
      },
      {
        id: "phase-3",
        label: "Physical Identity",
        date: "Month 3",
        title: "Merchandise Design & Identity Drop",
        description:
          "Launched the official CICU student merchandise line and physical collateral, creating high-demand apparel for the creative community.",
        image: "/assets/cicu/merch/cicu-merch.jpg",
        rotation: "rotate-2",
      },
      {
        id: "phase-4",
        label: "Event Coverage",
        date: "Month 4",
        title: "Live Production & 35mm Documentation",
        description:
          "Managed live on-site media capture using analog 35mm film, documenting student performances, gallery installations, and crowd energy.",
        image: "/assets/cicu/events/001152030006.jpg",
        rotation: "-rotate-1",
      },
    ],
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getNextProject(slug: string): Project {
  const index = projects.findIndex((p) => p.slug === slug);
  return projects[(index + 1) % projects.length];
}

export function getPreviousProject(slug: string): Project {
  const index = projects.findIndex((p) => p.slug === slug);
  return projects[(index - 1 + projects.length) % projects.length];
}
