'use client';

import { Box, Heading, SimpleGrid } from "@chakra-ui/react";
import GigCard from "@/components/GigCard";
import { Gig } from "@/lib/types/gig";

const gigs: Gig[] = [
  {
    id: 1,
    title: "Logo Design",
    price: 150,
    category: "Design",
    thumbnail: "/api/image",
    rating: 4,
    seller: { id: 1, name: "Jane Doe", image: "/next.svg" },
  },
  {
    id: 2,
    title: "Full Website Build",
    price: 1200,
    category: "Development",
    thumbnail: "/api/image",
    rating: 5,
    seller: { id: 2, name: "John Smith", image: "/next.svg" },
  },
];

export default function GigsPage() {
  return (
    <Box p={4}>
      <Heading size="md" mb={4}>
        Browse Gigs
      </Heading>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
        {gigs.map((gig) => (
          <GigCard key={gig.id} gig={gig} />
        ))}
      </SimpleGrid>
    </Box>
  );
}

