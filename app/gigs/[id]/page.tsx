'use client';

import { Box } from "@chakra-ui/react";
import GigDetail from "@/components/GigDetail";
import { GigDetails } from "@/lib/types/gig";

export default function GigDetailPage({ params }: { params: { id: string } }) {
  const gig: GigDetails = {
    id: Number(params.id),
    title: "Sample Gig",
    price: 200,
    description: "Detailed description coming soon.",
    views: 0,
    seller: { id: 1, name: "Jane Doe", image: "/next.svg" },
    thumbnail: "https://source.unsplash.com/random/800x600?project",
  };

  return (
    <Box p={4}>
      <GigDetail gig={gig} />
    </Box>
  );
}

