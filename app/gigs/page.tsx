'use client';

import {
  Box,
  Heading,
  SimpleGrid,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { useMemo, useState } from "react";
import Fuse from "fuse.js";
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

const fuse = new Fuse(gigs, {
  keys: ["title", "category"],
  threshold: 0.3,
});

export default function GigsPage() {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    if (!query) return gigs;
    return fuse.search(query).map((res) => res.item);
  }, [query]);

  return (
    <Box p={4}>
      <Heading size="md" mb={4}>
        Browse Gigs
      </Heading>
      <InputGroup mb={4}>
        <InputLeftElement pointerEvents="none">
          <SearchIcon color="gray.400" />
        </InputLeftElement>
        <Input
          placeholder="Search gigs"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          bg="white"
        />
      </InputGroup>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
        {results.map((gig) => (
          <GigCard key={gig.id} gig={gig} />
        ))}
      </SimpleGrid>
    </Box>
  );
}

