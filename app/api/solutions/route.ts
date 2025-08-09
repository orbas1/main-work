import { NextResponse } from "next/server";

export async function GET() {
  const solutions = [
    {
      id: 1,
      title: "Recruitment Teams",
      description:
        "Source candidates, manage interviews, and collaborate with hiring managers in one workspace.",
      imageUrl:
        "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop",
      ctaText: "Request Demo",
    },
    {
      id: 2,
      title: "Freelance Marketplaces",
      description:
        "Launch a gig marketplace complete with escrow, reviews, and dispute resolution.",
      imageUrl:
        "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&auto=format&fit=crop",
      ctaText: "Learn More",
    },
    {
      id: 3,
      title: "Enterprise Analytics",
      description:
        "Visualize workforce data to make informed decisions and drive productivity.",
      imageUrl:
        "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&auto=format&fit=crop",
      ctaText: "Contact Sales",
    },
  ];

  return NextResponse.json(solutions);
}

