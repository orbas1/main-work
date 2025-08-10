'use client';

import { Box } from "@chakra-ui/react";
import GigDetail from "@/components/GigDetail";
import { GigDetails } from "@/lib/types/gig";
import { use } from "react";

export default function GigDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const gig: GigDetails = {
    id: Number(id),
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

