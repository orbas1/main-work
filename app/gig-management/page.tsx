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

const fuse = new Fuse(myGigs, {
  keys: ["title", "category"],
  threshold: 0.3,
});

export default function GigManagementPage() {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    if (!query) return myGigs;
    return fuse.search(query).map((res) => res.item);
  }, [query]);

  return (
    <Box p={4}>
      <Heading size="md" mb={4}>
        Manage Gigs
      </Heading>
      <InputGroup mb={4}>
        <InputLeftElement pointerEvents="none">
          <SearchIcon color="gray.400" />
        </InputLeftElement>
        <Input
          placeholder="Search my gigs"
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

