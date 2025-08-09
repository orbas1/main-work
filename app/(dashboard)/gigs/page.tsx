"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  NumberInput,
  NumberInputField,
  Select,
  SimpleGrid,
  VStack,
  HStack,
  Spinner,
  Text,
  Heading,
} from "@chakra-ui/react";
import api from "@/lib/api";
import GigCard from "@/components/GigCard";
import { Gig } from "@/lib/types/gig";
import styles from "./page.module.css";

export default function GigBrowsePage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sort, setSort] = useState("newest");
  const [gigs, setGigs] = useState<Gig[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadGigs = async () => {
    setLoading(true);
    setError("");
    try {
      const params = new URLSearchParams();
      if (search) params.set("search", search);
      if (category) params.set("category", category);
      if (minPrice) params.set("minPrice", minPrice);
      if (maxPrice) params.set("maxPrice", maxPrice);
      if (sort) params.set("sort", sort);
      const data = await api.get<Gig[]>(`/gigs?${params.toString()}`);
      setGigs(data);
    } catch (err: any) {
      setError(err.message || "Failed to load gigs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadGigs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sort]);

  return (
    <Box className={styles.container}>
      <VStack as="form" spacing={4} align="stretch" onSubmit={(e) => e.preventDefault()}>
        <HStack spacing={4} flexWrap="wrap">
          <FormControl maxW="300px">
            <FormLabel>Search</FormLabel>
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search gigs"
            />
          </FormControl>
          <FormControl maxW="200px">
            <FormLabel>Category</FormLabel>
            <Input value={category} onChange={(e) => setCategory(e.target.value)} />
          </FormControl>
          <FormControl maxW="150px">
            <FormLabel>Min Price</FormLabel>
            <NumberInput min={0} value={minPrice} onChange={(v) => setMinPrice(v)}>
              <NumberInputField />
            </NumberInput>
          </FormControl>
          <FormControl maxW="150px">
            <FormLabel>Max Price</FormLabel>
            <NumberInput min={0} value={maxPrice} onChange={(v) => setMaxPrice(v)}>
              <NumberInputField />
            </NumberInput>
          </FormControl>
          <FormControl maxW="200px">
            <FormLabel>Sort By</FormLabel>
            <Select value={sort} onChange={(e) => setSort(e.target.value)}>
              <option value="newest">Newest</option>
              <option value="price">Lowest Price</option>
              <option value="rating">Highest Rating</option>
            </Select>
          </FormControl>
          <Button colorScheme="brand" alignSelf="flex-end" onClick={loadGigs}>
            Apply
          </Button>
        </HStack>
      </VStack>
      {error && (
        <Text color="red.500" mt={4}>
          {error}
        </Text>
      )}
      {loading ? (
        <Spinner mt={8} />
      ) : (
        <>
          <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={4} mt={6}>
            {gigs.map((gig) => (
              <GigCard key={gig.id} gig={gig} />
            ))}
          </SimpleGrid>
          {gigs.filter((g) => g.rating && g.rating >= 4.7).length > 0 && (
            <>
              <Heading size="md" mt={10} mb={4}>
                Recommended for You
              </Heading>
              <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={4}>
                {gigs
                  .filter((g) => g.rating && g.rating >= 4.7)
                  .map((gig) => (
                    <GigCard key={`rec-${gig.id}`} gig={gig} />
                  ))}
              </SimpleGrid>
            </>
          )}
        </>
      )}
    </Box>
  );
}
