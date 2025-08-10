export interface Feature {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  type: "feature";
}

export interface Solution {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  ctaText: string;
  type: "solution";
}

export type SearchItem = Feature | Solution;

export const features: Feature[] = [
  {
    id: 1,
    title: "AI-Powered Matching",
    description:
      "Leverage machine learning to connect talent with the right opportunities faster.",
    imageUrl: "/api/image",
    type: "feature",
  },
  {
    id: 2,
    title: "Unified Gig Management",
    description:
      "Track tasks, proposals, and payments from a single intuitive dashboard.",
    imageUrl: "/api/image",
    type: "feature",
  },
  {
    id: 3,
    title: "Real-Time Analytics",
    description:
      "Gain insight into performance with interactive charts and reports.",
    imageUrl: "/api/image",
    type: "feature",
  },
];

export const solutions: Solution[] = [
  {
    id: 1,
    title: "Recruitment Teams",
    description:
      "Source candidates, manage interviews, and collaborate with hiring managers in one workspace.",
    imageUrl: "/api/image",
    ctaText: "Request Demo",
    type: "solution",
  },
  {
    id: 2,
    title: "Freelance Marketplaces",
    description:
      "Launch a gig marketplace complete with escrow, reviews, and dispute resolution.",
    imageUrl: "/api/image",
    ctaText: "Learn More",
    type: "solution",
  },
  {
    id: 3,
    title: "Enterprise Analytics",
    description:
      "Visualize workforce data to make informed decisions and drive productivity.",
    imageUrl: "/api/image",
    ctaText: "Contact Sales",
    type: "solution",
  },
];

export const searchItems: SearchItem[] = [...features, ...solutions];
