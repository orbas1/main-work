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
    imageUrl:
      "https://images.unsplash.com/photo-1551836022-4c4c79ecde33?w=800&auto=format&fit=crop",
    type: "feature",
  },
  {
    id: 2,
    title: "Unified Gig Management",
    description:
      "Track tasks, proposals, and payments from a single intuitive dashboard.",
    imageUrl:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&auto=format&fit=crop",
    type: "feature",
  },
  {
    id: 3,
    title: "Real-Time Analytics",
    description:
      "Gain insight into performance with interactive charts and reports.",
    imageUrl:
      "https://images.unsplash.com/photo-1556157382-97eda2d62296?w=800&auto=format&fit=crop",
    type: "feature",
  },
];

export const solutions: Solution[] = [
  {
    id: 1,
    title: "Recruitment Teams",
    description:
      "Source candidates, manage interviews, and collaborate with hiring managers in one workspace.",
    imageUrl:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop",
    ctaText: "Request Demo",
    type: "solution",
  },
  {
    id: 2,
    title: "Freelance Marketplaces",
    description:
      "Launch a gig marketplace complete with escrow, reviews, and dispute resolution.",
    imageUrl:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&auto=format&fit=crop",
    ctaText: "Learn More",
    type: "solution",
  },
  {
    id: 3,
    title: "Enterprise Analytics",
    description:
      "Visualize workforce data to make informed decisions and drive productivity.",
    imageUrl:
      "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&auto=format&fit=crop",
    ctaText: "Contact Sales",
    type: "solution",
  },
];

export const searchItems: SearchItem[] = [...features, ...solutions];
