export interface ProjectMedia {
  type: "video" | "image" | "placeholder";
  src?: string;
  gradient?: string;
}

export interface EvolutionPhase {
  id: string;
  label: string;
  date: string;
  title: string;
  description: string;
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
  brief?: string;
  objective?: string;
  detailVideo?: string;
  deckPdf?: string;
  slides?: string[];
  gallery?: string[];
  phases: EvolutionPhase[];
  accent: string;
  results?: { value: string; label: string }[];
  quote?: { text: string; author: string };
  beforeAfter?: {
    before: string;
    after: string;
    beforeLabel: string;
    afterLabel: string;
  };
}

export const projects: Project[] = [
  {
    slug: "mass-culture-dna",
    variant: "data",
    name: "Mass Culture DNA",
    title: "Mass Culture Canada — Data Narratives for the Arts",
    tagline: "Mass Culture Info Session · Data Platform & Visual Storytelling",
    categories: ["Communications", "Data Storytelling", "Project Coordination"],
    description:
      "Created and delivered an information session and presentation for Mass Culture at Brenau University, introducing the DNA platform and its role in supporting arts and cultural organisations through data. Developed a clear, engaging slide deck to translate complex information into an accessible data narrative, guiding the audience through the platform's purpose, insights and applications. Led the presentation and facilitated discussion, strengthening skills in visual storytelling, presentation design, stakeholder communication and data-driven communication.",
    media: {
      type: "image",
      src: "/assets/decks/slides/mass-culture-slide-1.jpg",
      gradient: "linear-gradient(135deg, #A8CBE8 0%, #C3C6E8 100%)",
    },
    role: "Project Coordinator & Digital Strategist",
    timeline: "Dec 2024 — Apr 2025",
    tools: "LinkedIn, MailerLite, Canva, PowerPoint, Data Analytics",
    client: "Mass Culture Canada · Brenau University",
    heroDescription:
      "Created and delivered an information session and presentation for Mass Culture at Brenau University, introducing the DNA platform and its role in supporting arts and cultural organisations through data.",
    brief: "Developed a clear, engaging slide deck to translate complex information into an accessible data narrative, guiding the audience through the platform's purpose, insights and applications.",
    objective: "Led the presentation and facilitated discussion, strengthening skills in visual storytelling, presentation design, stakeholder communication and data-driven communication.",
    accent: "#A8CBE8",
    deckPdf: "/assets/decks/mass-culture-slide-deck.pdf",
    slides: [
      "/assets/decks/slides/mass-culture-slide-1.jpg",
      "/assets/decks/slides/mass-culture-slide-3.jpg",
      "/assets/decks/slides/mass-culture-slide-4.jpg",
      "/assets/decks/slides/mass-culture-slide-5.jpg",
      "/assets/decks/slides/mass-culture-slide-8.jpg",
      "/assets/decks/slides/river-clyde-slide-1.jpg",
    ],
    gallery: [
      "/assets/social-campaigns/654651294_18520046998073873_8861659328534541782_n.jpg",
      "/assets/social-campaigns/657330996_18523546387073873_6501039019688977632_n.jpg",
      "/assets/social-campaigns/657940324_18524237413073873_4812515398533879252_n.jpg",
      "/assets/social-campaigns/658961156_18525005860073873_6256835132353504235_n.jpg",
      "/assets/social-campaigns/662825545_18525195049073873_5801258258147508811_n.jpg",
    ],
    results: [
      { value: "74K+", label: "Total Audience Reach" },
      { value: "+42%", label: "Engagement Rate Increase" },
      { value: "13K+", label: "Monthly Digital Views" },
      { value: "5+", label: "Partner Institutions" },
    ],
    quote: {
      text: "Shanesia possesses an extraordinary talent for translating dense research data and institutional goals into human-centred stories that captivate and convert.",
      author: "Project Leadership — Mass Culture Canada",
    },
    beforeAfter: {
      before: "url('/assets/social-campaigns/657330996_18523546387073873_6501039019688977632_n.jpg')",
      after: "url('/assets/decks/slides/mass-culture-slide-1.jpg')",
      beforeLabel: "Research Inputs",
      afterLabel: "DNA Visual Storytelling",
    },
    phases: [
      {
        id: "discovery",
        label: "Research & Audit",
        date: "Dec 2024",
        title: "Mapping Arts Sector Insights",
        description:
          "Conducted comprehensive content audits and reviewed Brenau University thesis research to distill key brand narratives for arts service organisations.",
      },
      {
        id: "strategy",
        label: "Campaign Strategy",
        date: "Jan — Feb 2025",
        title: "Multi-Platform Audience Framework",
        description:
          "Developed audience segmentation frameworks across LinkedIn, X, Instagram, and MailerLite newsletters with dedicated KPIs and data-coaching series.",
      },
      {
        id: "launch",
        label: "DNA Platform Launch",
        date: "Mar 2025",
        title: "Creative Champions Network Debut",
        description:
          "Led national debut of the Data Narrative for the Arts (DNA) platform at the Spring Social, coordinating presentation decks, press graphics, and live outreach.",
      },
      {
        id: "optimization",
        label: "KPI Analytics",
        date: "Apr 2025",
        title: "Performance Optimisation & River Clyde Rollout",
        description:
          "Established analytics dashboards tracking registration conversion, community feedback loops, and campaign amplification for River Clyde Arts.",
      },
    ],
  },
  {
    slug: "fifa-2026-challenge",
    variant: "sport",
    name: "FIFA World Cup Hackathon",
    title: "FIFA World Cup Hackathon",
    tagline: "Global Digital Marketing Hackathon · Creative Campaign Strategy",
    categories: ["Campaign Strategy", "International Marketing", "Creative Direction"],
    description:
      "Competed in a global digital marketing hackathon focused on developing a creative campaign strategy for the FIFA World Cup 2026. Working alongside students from the UK, Chile, Saudi Arabia and the Netherlands, I collaborated across cultures and disciplines to develop and pitch a marketing concept within a fast-paced, competitive environment. Strengthened my skills in creative strategy, international collaboration, audience engagement and digital marketing.",
    media: {
      type: "image",
      src: "/assets/decks/slides/fifa-slide-1.jpg",
      gradient: "linear-gradient(135deg, #E0AE62 0%, #EFAF8C 100%)",
    },
    role: "Digital Marketing & Creative Strategist",
    timeline: "Mar 2025",
    tools: "Figma, PowerPoint, Social Media Analytics, Brand Strategy",
    client: "Toronto Metropolitan University · FIFA World Cup Challenge",
    heroDescription:
      "Competed in a global digital marketing hackathon focused on developing a creative campaign strategy for the FIFA World Cup 2026 alongside international collaborators.",
    brief: "Working alongside students from the UK, Chile, Saudi Arabia and the Netherlands, collaborated across cultures and disciplines to develop and pitch a marketing concept within a fast-paced, competitive environment.",
    objective: "Build a high-energy creative strategy that strengthens international collaboration, audience engagement, and multicultural digital marketing.",
    accent: "#E0AE62",
    deckPdf: "/assets/decks/fifa-2026-slide-deck.pdf",
    slides: [
      "/assets/decks/slides/fifa-slide-1.jpg",
      "/assets/decks/slides/fifa-slide-2.jpg",
      "/assets/decks/slides/fifa-slide-5.jpg",
      "/assets/decks/slides/fifa-slide-7.jpg",
      "/assets/decks/slides/fifa-slide-10.jpg",
      "/assets/decks/slides/fifa-slide-15.jpg",
    ],
    gallery: [
      "/assets/decks/slides/fifa-slide-2.jpg",
      "/assets/decks/slides/fifa-slide-6.jpg",
      "/assets/decks/slides/fifa-slide-8.jpg",
      "/assets/decks/slides/fifa-slide-11.jpg",
      "/assets/decks/slides/fifa-slide-14.jpg",
    ],
    results: [
      { value: "Runner-Up", label: "Global Hackathon Award" },
      { value: "4 Hubs", label: "Cultural Neighbourhood Activations" },
      { value: "5 Countries", label: "Cross-Border Student Team" },
      { value: "360°", label: "Integrated Media Strategy" },
    ],
    quote: {
      text: "A forward-thinking marketing concept that showcases how football becomes an international language through authentic neighbourhood culture.",
      author: "FIFA Challenge Jury — TMU Global Marketing Initiative",
    },
    phases: [
      {
        id: "brief",
        label: "Context & Findings",
        date: "Stage 1",
        title: "Analysing Fan Demographics",
        description:
          "Explored fan behaviour patterns from previous World Cups and identified opportunities to leverage Canada's vibrant multicultural mosaic.",
      },
      {
        id: "concept",
        label: "Creative Ideation",
        date: "Stage 2",
        title: "Our Neighbourhood, Your Nation",
        description:
          "Formulated the core concept connecting visiting international supporters directly to corresponding diaspora communities in Toronto.",
      },
      {
        id: "broadcasting",
        label: "Activation Strategy",
        date: "Stage 3",
        title: "Immersive Cultural Viewing Hubs",
        description:
          "Designed broadcaster partnerships, digital travel content integrations, and localized community viewing hubs with real-time fan interaction.",
      },
      {
        id: "pitch",
        label: "Global Pitch",
        date: "Stage 4",
        title: "International Jury Presentation",
        description:
          "Presented the 17-slide pitch deck to an international panel of industry judges, securing runner-up honours among global competitors.",
      },
    ],
  },
  {
    slug: "mastercard-sustainability",
    variant: "eco",
    name: "Mastercard Eco-Rebrand",
    title: "Mastercard: Sustainable Rebranding Campaign",
    tagline: "RTA 902 Brand Strategy · Eco-Conscious Creative Direction",
    categories: ["Brand Strategy", "Sustainable Design", "Social Campaigns"],
    description:
      "As part of a brand strategy project, in my university course RTA 902 I was challenged to take an existing brand and reimagine its identity for a new direction. I chose Mastercard and developed a new brand concept focused on sustainability and environmental responsibility. I explored how Mastercard could communicate this shift through refreshed messaging, visual identity and brand imagery, bringing the concept together in a comprehensive slide deck and presentation. The project grew my ability to analyse an existing brand, develop a new creative direction and translate ideas into cohesive visual communications.",
    media: {
      type: "image",
      src: "/assets/decks/slides/mastercard-slide-1.jpg",
      gradient: "linear-gradient(135deg, #8FB6D8 0%, #A9C6A4 100%)",
    },
    role: "Brand Strategist & Creative Lead",
    timeline: "8 weeks",
    tools: "Adobe Illustrator, Photoshop, Figma, Social Mockup Kits",
    client: "RTA The Creative School · Academic Rebrand Initiative",
    heroDescription:
      "Reimagining Mastercard's global brand identity for a sustainable future through refreshed messaging, visual identity, and comprehensive presentation design.",
    brief: "Challenged in university course RTA 902 to take an existing brand and reimagine its identity for a new direction focused on sustainability and environmental responsibility.",
    objective: "Explore how Mastercard could communicate this shift through refreshed messaging, visual identity and brand imagery, bringing the concept together in a comprehensive slide deck and presentation.",
    accent: "#8FB6D8",
    deckPdf: "/assets/decks/rta-mastercard-slide-deck.pdf",
    slides: [
      "/assets/decks/slides/mastercard-slide-1.jpg",
      "/assets/decks/slides/mastercard-slide-3.jpg",
      "/assets/decks/slides/mastercard-slide-4.jpg",
      "/assets/decks/slides/mastercard-slide-6.jpg",
      "/assets/decks/slides/mastercard-slide-8.jpg",
    ],
    gallery: [
      "/assets/decks/slides/mastercard-slide-3.jpg",
      "/assets/decks/slides/mastercard-slide-5.jpg",
      "/assets/decks/slides/mastercard-slide-7.jpg",
      "/assets/decks/slides/mastercard-slide-9.jpg",
      "/assets/decks/slides/mastercard-slide-10.jpg",
    ],
    results: [
      { value: "100%", label: "Recycled Core Materials Concept" },
      { value: "#1", label: "Hashtag Campaign Strategy" },
      { value: "3 Channels", label: "Tailored Multi-Platform Rollouts" },
      { value: "A+", label: "Academic Distinction" },
    ],
    quote: {
      text: "A stellar, grounded campaign that proves sustainable branding can be aspirational, accessible, and commercially viable.",
      author: "Professor Chelsea Vernhout — RTA The Creative School",
    },
    phases: [
      {
        id: "strategy",
        label: "Strategic Positioning",
        date: "Phase 1",
        title: "Affordable Sustainability",
        description:
          "Formulated the core brand promise: making sustainability accessible to everyday cardholders through micro-rewards and carbon tracking.",
      },
      {
        id: "visual",
        label: "Visual Identity",
        date: "Phase 2",
        title: "Eco-Conscious Design Language",
        description:
          "Crafted a serene, nature-inspired palette (Teal #99C0C4, Forest tones), refreshed typography, and eco-certified emblem overlays.",
      },
      {
        id: "social",
        label: "Social Framework",
        date: "Phase 3",
        title: "Omnichannel Campaign Mockups",
        description:
          "Designed multi-format content suites across Instagram carousels, Twitter poll activations, and Facebook educational hubs.",
      },
      {
        id: "guidelines",
        label: "Brand Guidelines",
        date: "Phase 4",
        title: "Complete Style Guide & Pitch Deck",
        description:
          "Delivered the 11-page master deck complete with voice parameters, language hashtags, and implementation guidelines.",
      },
    ],
  },
  {
    slug: "cicu-creative-showcase",
    variant: "culture",
    name: "CICU Showcase '24",
    title: "Creative Industries student union end of Year Showcase",
    tagline: "Annual Event Campaign · Promotional Content & 35mm Photography",
    categories: ["Event Production", "Content Creation", "Event Photography"],
    description:
      "As part of the Creative Industries Course Union (CICU), supported the planning and promotion of the annual end of Year Showcase helping build excitement and drive attendance throughout the event campaign. Created promotional content and graphics, coordinated social media countdown posts, and supported ticket promotion and sales leading up to the event. During the showcase, captured event photography and helped document the student experience for use across CICU's digital channels.",
    media: {
      type: "image",
      src: "/assets/cicu/showcase/showcase-slide-1.jpg",
      gradient: "linear-gradient(135deg, #C3C6E8 0%, #EFAF8C 100%)",
    },
    role: "VP Marketing / Creative Director",
    timeline: "Annual 2023 — 2025",
    tools: "35mm Film, Adobe Premiere, After Effects, Canva, Instagram",
    client: "Creative Industries Course Union (CRI Union)",
    heroDescription:
      "Planning, promotion, and live media capture for the Creative Industries Course Union (CICU) annual end of Year Showcase.",
    brief: "Supported the planning and promotion of the annual end of Year Showcase, helping build excitement and drive attendance throughout the event campaign.",
    objective: "Create promotional graphics, coordinate social media countdown posts, support ticket sales, and capture live event photography documenting the student experience.",
    accent: "#C3C6E8",
    detailVideo: "/assets/cicu/showcase/showcase-reel.mp4",
    gallery: [
      "/assets/cicu/events/001152030003.jpg",
      "/assets/cicu/events/001152030006.jpg",
      "/assets/cicu/events/001152030008.jpg",
      "/assets/cicu/events/001152030023.jpg",
      "/assets/cicu/events/IMG_1071.JPG",
      "/assets/cicu/events/IMG_1082.JPG",
      "/assets/cicu/events/IMG_1087.JPG",
      "/assets/cicu/showcase/showcase-post-1.jpg",
      "/assets/cicu/alum/alum-graphic-1.jpg",
      "/assets/cicu/merch/cicu-merch.jpg",
    ],
    results: [
      { value: "500+", label: "Showcase Event Attendees" },
      { value: "+120%", label: "Instagram Reel Impressions" },
      { value: "9+", label: "Signature Events Executed" },
      { value: "100%", label: "Student Sold-Out Merch Drop" },
    ],
    quote: {
      text: "Shanesia brought unparalleled energy and visual artistry to every campaign. The 35mm photos and reels captured the spirit of our community flawlessly.",
      author: "Executive Board — Creative Industries Course Union",
    },
    phases: [
      {
        id: "concept",
        label: "Visual Direction",
        date: "Month 1",
        title: "Showcase Brand Identity",
        description:
          "Created retro-modern design assets and promotional typography for the annual student showcase across print and digital media.",
      },
      {
        id: "reels",
        label: "Motion & Teasers",
        date: "Month 2",
        title: "Short-Form Video Production",
        description:
          "Produced fast-paced Instagram reels and multi-card teaser carousels spotlighting student artists and industry guest speakers.",
      },
      {
        id: "events",
        label: "Event Execution",
        date: "Month 3",
        title: "Live Production & 35mm Coverage",
        description:
          "Managed live on-site media capture using analog 35mm film and digital rigs, documenting student performances and networking floors.",
      },
      {
        id: "recap",
        label: "Recap & Merch",
        date: "Month 4",
        title: "Post-Event Engagement & Merch Launch",
        description:
          "Launched the official CICU merchandise line and curated digital galleries to celebrate community creators.",
      },
    ],
  },
  {
    slug: "parks-canada-tmu",
    variant: "systems",
    name: "CRI Alumni Night",
    title: "Creative Industries Alumni Event",
    tagline: "CRI Alumni Night · Promotional Graphics, Social Curation & Video Recap",
    categories: ["Event Promotion", "Social Media Curation", "Video Production"],
    description:
      "Supported the planning and promotion of Creative Industries (CRI) Alumni Night, creating promotional graphics and informational materials to build awareness and engagement leading up to the event. During the event, captured and curated social media content, creating Instagram posts that highlighted key moments and the overall attendee experience. I also produced a short recap video to extend the event's reach across digital channels and showcase the community experience.",
    media: {
      type: "image",
      src: "/assets/cicu/alum/alum-graphic-1.jpg",
      gradient: "linear-gradient(135deg, #A9C6A4 0%, #8FB6D8 100%)",
    },
    role: "Digital Communications & Event Lead",
    timeline: "2023 — 2024",
    tools: "Canva, Adobe Illustrator, Premiere, Instagram, Event Marketing",
    client: "Creative Industries (CRI) Alumni Association",
    heroDescription:
      "Planning, promotional graphics, social media curation, and short recap video production for the Creative Industries (CRI) Alumni Night.",
    brief: "Supported the planning and promotion of Creative Industries (CRI) Alumni Night, creating promotional graphics and informational materials to build awareness and engagement leading up to the event.",
    objective: "Capture and curate social media content, highlight key moments, and produce a short recap video extending the event's reach across digital channels.",
    accent: "#A9C6A4",
    gallery: [
      "/assets/cicu/alum/alum-graphic-1.jpg",
      "/assets/cicu/alum/alum-graphic-2.jpg",
      "/assets/cicu/alum/alum-graphic-3.jpg",
      "/assets/cicu/events/IMG_1071.JPG",
      "/assets/cicu/events/IMG_1082.JPG",
    ],
    results: [
      { value: "300+", label: "Alumni & Student Attendees" },
      { value: "100%", label: "Panel Speaker Turnout" },
      { value: "15+", label: "Curated Social Media Assets" },
      { value: "High Reach", label: "Recap Video Engagement" },
    ],
    quote: {
      text: "Her promotional graphics and on-site video capture elevated Alumni Night into a signature networking celebration for the school.",
      author: "CRI Alumni Committee Lead",
    },
    phases: [
      {
        id: "promotion",
        label: "Promotional Graphics",
        date: "Phase 1",
        title: "Call for Alumni Speakers & Visuals",
        description:
          "Designed eye-catching promotional posters, call-for-speaker notices, and informational graphics across music, publishing, fashion, film, and graphic design.",
      },
      {
        id: "social-campaign",
        label: "Social Campaign",
        date: "Phase 2",
        title: "Audience Engagement & Countdown",
        description:
          "Coordinated multi-channel social media teasers and ticket promotion to drive registration and student excitement.",
      },
      {
        id: "live-curation",
        label: "Event Coverage",
        date: "Phase 3",
        title: "Live Social Curation & Photo Capture",
        description:
          "Documented the live networking event at The Catalyst, capturing attendee moments, speaker panels, and audience discussions.",
      },
      {
        id: "recap-video",
        label: "Recap Production",
        date: "Phase 4",
        title: "Short Recap Video & Archive",
        description:
          "Produced a high-energy short recap video to extend the event's digital reach and celebrate the creative alumni community.",
      },
    ],
  },
  {
    slug: "good-gift-visual",
    variant: "cinematic",
    name: "Motion Graphics & Editing",
    title: "Motion Graphics Video Animation/Editing",
    tagline: "CRI 300 Course Project · Adobe Illustrator & After Effects Animation",
    categories: ["Motion Graphics", "Video Animation", "Visual Design"],
    description:
      "Created a short flat motion graphics video as part of a CRI 300 course project, taking the concept from initial graphic development through to final animation. Designed the visual elements in Adobe Illustrator and animated them in Adobe After Effects, using movement, transitions and timing to create a cohesive video. Completed the project with open-source audio, demonstrating my ability to develop original graphics and transform them into engaging motion-based content.",
    media: {
      type: "video",
      src: "/assets/videos/good-gift-visual.mov",
      gradient: "linear-gradient(135deg, #EFD0B4 0%, #EFAF8C 100%)",
    },
    role: "Motion Designer & Animator",
    timeline: "CRI 300 Course Project",
    tools: "Adobe Illustrator, Adobe After Effects, Motion Timing, Audio Synchronization",
    client: "CRI 300 Course Project · The Creative School",
    heroDescription:
      "Flat motion graphics video taking concept from initial Illustrator graphic development through to After Effects animation and audio synchronization.",
    brief: "Created a short flat motion graphics video as part of a CRI 300 course project, taking the concept from initial graphic development through to final animation.",
    objective: "Design visual elements in Adobe Illustrator and animate them in Adobe After Effects, using movement, transitions, timing, and open-source audio to create an engaging motion-based piece.",
    accent: "#EFD0B4",
    detailVideo: "/assets/videos/good-gift-visual.mov",
    slides: [
      "/assets/cicu/alum/alum-graphic-1.jpg",
      "/assets/cicu/alum/alum-graphic-2.jpg",
      "/assets/cicu/alum/alum-graphic-3.jpg",
      "/assets/cicu/merch/cicu-merch.jpg",
    ],
    results: [
      { value: "100%", label: "Original Vector Graphics" },
      { value: "60fps", label: "Fluid Keyframe Animation" },
      { value: "A+", label: "Academic Evaluation" },
      { value: "Synced", label: "Open-Source Sound Design" },
    ],
    quote: {
      text: "Demonstrates exceptional craft in developing original vector illustrations and transforming them into kinetic, rhythmically timed animation.",
      author: "CRI 300 Course Faculty",
    },
    phases: [
      {
        id: "concept",
        label: "Visual Concept",
        date: "Phase 1",
        title: "Vector Graphic Development",
        description:
          "Developed flat design concept and illustrated bespoke vector assets in Adobe Illustrator tailored for 2D kinetic animation.",
      },
      {
        id: "animation",
        label: "Keyframe Motion",
        date: "Phase 2",
        title: "After Effects Animation & Choreography",
        description:
          "Rigged vector layers in Adobe After Effects, applying fluid easing curves, spatial movement, and seamless scene transitions.",
      },
      {
        id: "audio",
        label: "Sound Design",
        date: "Phase 3",
        title: "Audio Synchronization & Beat Alignment",
        description:
          "Curated open-source audio tracks and synchronized motion beats with sound cues to reinforce visual narrative pacing.",
      },
      {
        id: "render",
        label: "Final Export",
        date: "Phase 4",
        title: "High-Resolution Render & Delivery",
        description:
          "Rendered optimized high-definition video master formatted for web playback and multimedia presentation.",
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
