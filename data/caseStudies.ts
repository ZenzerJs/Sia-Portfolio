// data/caseStudies.ts

export interface CaseStudy {
  id: string;
  title: string;
  client: string;
  role: string;
  timeline: string;
  scope: string;
  keyMetric: string;
  type: 'slides' | 'video';
  mediaCount?: number; // e.g., 8 for 8 slides
  videoSrc?: string;
  posterSrc?: string;
  challenge: string;
  process: string[];
  outcome: string;
  reflection: string;
  tags: string[];
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'mass-culture',
    title: 'Data Narrative for the Arts & Cross-Border Partnership',
    client: 'Mass Culture Canada × U.S. Academic Partner',
    role: 'Lead Project Coordinator & Information Designer',
    timeline: 'Dec 2024 – Apr 2025 (5 Months)',
    scope: 'Cross-institutional initiative spanning academic and non-profit sectors',
    keyMetric: '100% on-time delivery · Adopted as permanent institutional framework',
    type: 'slides',
    mediaCount: 8,
    challenge: 'Cultural research data was dense, siloed, and failing to engage non-technical institutional partners and cross-border university leadership.',
    process: [
      'Distilled 40+ pages of academic findings into an 8-part modular presentation framework',
      'Designed responsive data visualizations and slide hierarchies in Canva and PowerPoint',
      'Facilitated weekly stakeholder reviews across two national research organizations'
    ],
    outcome: 'Delivered an interactive info session deck that secured cross-border partnership approval and established the permanent visual asset system for the Data Narrative platform.',
    reflection: 'In future multi-organization initiatives, establishing a shared design token system earlier would streamline cross-institutional review cycles.',
    tags: ['Project Coordination', 'Data Visualization', 'Stakeholder Management']
  },
  {
    id: 'cicu-showcase',
    title: 'Creative Industries Annual Showcase Campaign',
    client: 'Creative Industries Course Union (CICU)',
    role: 'VP Marketing & Creative Director',
    timeline: 'Apr 2023 – Apr 2025',
    scope: 'Led 5-person creative team supporting 300+ creative students and alumni',
    keyMetric: 'Record digital engagement · 300+ live event attendees · Sold-out merch run',
    type: 'video',
    videoSrc: '/assets/cicu/showcase/showcase-reel.mp4',
    posterSrc: '/assets/cicu/showcase/showcase-slide-1.jpg',
    challenge: 'Annual flagship event needed a cohesive cross-channel brand identity to unify live exhibition showcases, speaker announcements, and merchandise.',
    process: [
      'Directed multi-channel digital campaign spanning Instagram motion teasers and 35mm photography',
      'Produced dynamic showreels and managed live physical exhibition signage',
      'Designed and coordinated logistics for a sold-out custom student apparel line'
    ],
    outcome: 'Generated peak cross-channel engagement for the organization, culminating in over 300 live attendees and complete sell-out of the limited-edition merchandise run.',
    reflection: 'Balancing digital motion teasers with analog 35mm film photography proved to be the key aesthetic differentiator that resonated with student creators.',
    tags: ['Creative Direction', 'Motion Graphics', 'Event Branding']
  }
];
