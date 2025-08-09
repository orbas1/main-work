import { NextResponse } from "next/server";

export async function GET() {
  const features = [
    {
      id: 1,
      title: "AI-Powered Matching",
      description:
        "Leverage machine learning to connect talent with the right opportunities faster.",
      imageUrl:
        "https://images.unsplash.com/photo-1551836022-4c4c79ecde33?w=800&auto=format&fit=crop",
    },
    {
      id: 2,
      title: "Unified Gig Management",
      description:
        "Track tasks, proposals, and payments from a single intuitive dashboard.",
      imageUrl:
        "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&auto=format&fit=crop",
    },
    {
      id: 3,
      title: "Real-Time Analytics",
      description:
        "Gain insight into performance with interactive charts and reports.",
      imageUrl:
        "https://images.unsplash.com/photo-1556157382-97eda2d62296?w=800&auto=format&fit=crop",
    },
  ];

  return NextResponse.json(features);
}

