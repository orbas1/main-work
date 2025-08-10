'use client';

import { Box, Heading, SimpleGrid } from "@chakra-ui/react";
import GigCard from "@/components/GigCard";
import { Gig } from "@/lib/types/gig";

const myGigs: Gig[] = [
  {
    id: 1,
    title: "Marketing Consultation",
    price: 300,
    category: "Marketing",
    thumbnail: "/api/image",
    rating: 5,
    seller: { id: 1, name: "You", image: "/next.svg" },
  },
];

export default function GigManagementPage() {
  return (
    <Box p={4}>
      <Heading size="md" mb={4}>
        Manage Gigs
      </Heading>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
        {myGigs.map((gig) => (
          <GigCard key={gig.id} gig={gig} />
        ))}
      </SimpleGrid>
    </Box>
  );
}

