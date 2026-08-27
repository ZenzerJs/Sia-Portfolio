// data/socialPosts.ts

export type Platform = 'linkedin' | 'instagram';
export type Organization = 'Mass Culture Canada' | 'Creative Industries Course Union (CICU)';

export interface SocialPost {
  id: string;
  platform: Platform;
  organization: Organization;
  title: string;
  topicTag: string;
  embedUrl: string;
  postUrl: string;
  aspectRatioHeight?: number;
}

export const SOCIAL_POSTS: SocialPost[] = [
  // --- INSTAGRAM (CICU) ---
  {
    id: 'cicu-ig-1',
    platform: 'instagram',
    organization: 'Creative Industries Course Union (CICU)',
    title: 'Showcase Highlights & Community Feature',
    topicTag: 'Student Showcase',
    embedUrl: 'https://www.instagram.com/p/DWEu1GPjeSg/embed',
    postUrl: 'https://www.instagram.com/criunion/p/DWEu1GPjeSg/',
    aspectRatioHeight: 580,
  },
  {
    id: 'cicu-ig-2',
    platform: 'instagram',
    organization: 'Creative Industries Course Union (CICU)',
    title: 'Creative Industry Campaign & Event Visuals',
    topicTag: 'Brand Strategy',
    embedUrl: 'https://www.instagram.com/p/DGrV6n5NeIn/embed',
    postUrl: 'https://www.instagram.com/criunion/p/DGrV6n5NeIn/',
    aspectRatioHeight: 580,
  },
  {
    id: 'cicu-ig-3',
    platform: 'instagram',
    organization: 'Creative Industries Course Union (CICU)',
    title: 'Creative Direction & Visual Teaser',
    topicTag: 'Digital Media',
    embedUrl: 'https://www.instagram.com/p/DWEt4wHjRHA/embed',
    postUrl: 'https://www.instagram.com/criunion/p/DWEt4wHjRHA/',
    aspectRatioHeight: 580,
  },

  // --- LINKEDIN (Mass Culture Canada) ---
  {
    id: 'mc-li-1',
    platform: 'linkedin',
    organization: 'Mass Culture Canada',
    title: 'Last Chance to Register: Learn from River Clyde Arts',
    topicTag: 'Event Promotion',
    embedUrl: 'https://www.linkedin.com/embed/feed/update/urn:li:share:7320495457640620032',
    postUrl: 'https://www.linkedin.com/posts/mass-culture_last-chance-to-register-learn-from-river-activity-7320498031886286848-1sN6',
    aspectRatioHeight: 1069,
  },
  {
    id: 'mc-li-2',
    platform: 'linkedin',
    organization: 'Mass Culture Canada',
    title: 'ArtsData & Data Coaching Campaign',
    topicTag: 'Data Literacy',
    embedUrl: 'https://www.linkedin.com/embed/feed/update/urn:li:share:7322919715524214784',
    postUrl: 'https://www.linkedin.com/posts/mass-culture_artsdata-massculture-datacoaching-activity-7322986775751155714-_HuT',
    aspectRatioHeight: 1300,
  },
  {
    id: 'mc-li-3',
    platform: 'linkedin',
    organization: 'Mass Culture Canada',
    title: 'Register Now: Learn from River Clyde Arts',
    topicTag: 'Workshop Series',
    embedUrl: 'https://www.linkedin.com/embed/feed/update/urn:li:share:7317987411316137986',
    postUrl: 'https://www.linkedin.com/posts/mass-culture_register-now-learn-from-river-clyde-arts-activity-7318664578320486401-k2N',
    aspectRatioHeight: 1069,
  },
  {
    id: 'mc-li-4',
    platform: 'linkedin',
    organization: 'Mass Culture Canada',
    title: 'Community Arts & Data with Heart (ArtsPEI)',
    topicTag: 'Community Research',
    embedUrl: 'https://www.linkedin.com/embed/feed/update/urn:li:share:7315459955183034369',
    postUrl: 'https://www.linkedin.com/posts/mass-culture_communityarts-datawithheart-artspei-activity-7315459956449648640-f5kF',
    aspectRatioHeight: 1174,
  },
  {
    id: 'mc-li-5',
    platform: 'linkedin',
    organization: 'Mass Culture Canada',
    title: 'Community Arts & Research Insights',
    topicTag: 'Storytelling',
    embedUrl: 'https://www.linkedin.com/embed/feed/update/urn:li:share:7313256575324823554',
    postUrl: 'https://www.linkedin.com/posts/mass-culture_communityarts-datawithheart-artspei-activity-7313256576516009984-_cuB',
    aspectRatioHeight: 1090,
  },
  {
    id: 'mc-li-6',
    platform: 'linkedin',
    organization: 'Mass Culture Canada',
    title: 'Cultural Evaluation & Evaluative Thinking',
    topicTag: 'Impact Strategy',
    embedUrl: 'https://www.linkedin.com/embed/feed/update/urn:li:share:7308189837445017602',
    postUrl: 'https://www.linkedin.com/posts/mass-culture_culturalevaluation-evaluativethinking-measuringimpact-activity-7308189838573215744-v1Ie',
    aspectRatioHeight: 1069,
  },
  {
    id: 'mc-li-7',
    platform: 'linkedin',
    organization: 'Mass Culture Canada',
    title: 'Arts-Based Evaluation & Creativity in Research',
    topicTag: 'Research Methodologies',
    embedUrl: 'https://www.linkedin.com/embed/feed/update/urn:li:share:7307439121986199553',
    postUrl: 'https://www.linkedin.com/posts/mass-culture_artsbasedevaluation-evaluativethinking-creativityinresearch-activity-7307439123450011650-Hwyw',
    aspectRatioHeight: 1153,
  },
  {
    id: 'mc-li-8',
    platform: 'linkedin',
    organization: 'Mass Culture Canada',
    title: 'Youth Workers Matter & Equitable Evaluation',
    topicTag: 'Advocacy & Social Impact',
    embedUrl: 'https://www.linkedin.com/embed/feed/update/urn:li:share:7302374899526901762',
    postUrl: 'https://www.linkedin.com/posts/mass-culture_youthworkersmatter-communityengagement-equitableevaluation-activity-7302374902362226688-LxVC',
    aspectRatioHeight: 1174,
  },
  {
    id: 'mc-li-9',
    platform: 'linkedin',
    organization: 'Mass Culture Canada',
    title: 'Arts Education & Artist Training Programs',
    topicTag: 'Capacity Building',
    embedUrl: 'https://www.linkedin.com/embed/feed/update/urn:li:share:7283141490644557827',
    postUrl: 'https://www.linkedin.com/posts/mass-culture_artseducation-communityengagement-artisttraining-activity-7283141492016103424-PCbR',
    aspectRatioHeight: 901,
  },
  {
    id: 'mc-li-10',
    platform: 'linkedin',
    organization: 'Mass Culture Canada',
    title: 'Mass Culture Governance & AGM Announcements',
    topicTag: 'Governance & Leadership',
    embedUrl: 'https://www.linkedin.com/embed/feed/update/urn:li:share:7201581469452935168',
    postUrl: 'https://www.linkedin.com/posts/mass-culture_massculture-massculturegovernance-activity-7201581472456056832-ulT8',
    aspectRatioHeight: 775,
  },
];
