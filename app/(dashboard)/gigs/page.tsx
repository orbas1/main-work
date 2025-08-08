"use client";

import { useEffect, useState } from "react";
import {
  Box,
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
  List,
  ListItem,
} from "@chakra-ui/react";
import api from "@/lib/api";
import GigCard, { Gig } from "@/components/GigCard";
import styles from "./page.module.css";
import { useDebounce } from "@/lib/utils/useDebounce";
import { getSearchHistory, addSearchTerm } from "@/lib/utils/searchHistory";

export default function GigBrowsePage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [maxDelivery, setMaxDelivery] = useState("");
  const [minRating, setMinRating] = useState("");
  const [location, setLocation] = useState("");
  const [sort, setSort] = useState("newest");
  const [gigs, setGigs] = useState<Gig[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [recommended, setRecommended] = useState<Gig[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [searchFocused, setSearchFocused] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const debouncedSearch = useDebounce(search, 300);

  const loadGigs = async () => {
    setLoading(true);
    setError("");
    try {
      const params = new URLSearchParams();
      if (debouncedSearch) params.set("search", debouncedSearch);
      if (category) params.set("category", category);
      if (minPrice) params.set("minPrice", minPrice);
      if (maxPrice) params.set("maxPrice", maxPrice);
      if (maxDelivery) params.set("maxDelivery", maxDelivery);
      if (minRating) params.set("minRating", minRating);
      if (location) params.set("location", location);
      if (sort) params.set("sort", sort);
      const data = await api.get<Gig[]>(`/gigs?${params.toString()}`);
      setGigs(data);
      if (debouncedSearch) addSearchTerm(debouncedSearch);
    } catch (err: any) {
      setError(err.message || "Failed to load gigs");
    } finally {
      setLoading(false);
    }
  };

  const loadCategories = async () => {
    try {
      const data = await api.get<string[]>("/gigs/categories");
      setCategories(data);
    } catch {
      // ignore
    }
  };

  const loadRecommended = async () => {
    try {
      const params = new URLSearchParams();
      if (category) params.set("category", category);
      const data = await api.get<Gig[]>(`/gigs/recommended?${params.toString()}`);
      setRecommended(data);
    } catch {
      // ignore
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  useEffect(() => {
    loadGigs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch, category, minPrice, maxPrice, maxDelivery, minRating, location, sort]);

  useEffect(() => {
    loadRecommended();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

  useEffect(() => {
    setSuggestions(
      getSearchHistory().filter(
        (t) => t.toLowerCase().startsWith(search.toLowerCase()) && t !== search
      )
    );
  }, [search]);

  return (
    <Box className={styles.container}>
      <VStack as="form" spacing={4} align="stretch" onSubmit={(e) => e.preventDefault()}>
        <HStack spacing={4} flexWrap="wrap">
          <FormControl maxW="300px" position="relative">
            <FormLabel>Search</FormLabel>
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setTimeout(() => setSearchFocused(false), 100)}
              placeholder="Search gigs"
            />
            {searchFocused && suggestions.length > 0 && (
              <List className={styles.suggestions}>
                {suggestions.map((s) => (
                  <ListItem
                    key={s}
                    onMouseDown={() => setSearch(s)}
                    className={styles.suggestionItem}
                  >
                    {s}
                  </ListItem>
                ))}
              </List>
            )}
          </FormControl>
          <FormControl maxW="200px">
            <FormLabel>Category</FormLabel>
            <Select
              placeholder="All"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </Select>
          </FormControl>
          <FormControl maxW="200px">
            <FormLabel>Location</FormLabel>
            <Input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Any"
            />
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
          <FormControl maxW="180px">
            <FormLabel>Max Delivery (days)</FormLabel>
            <Select
              placeholder="Any"
              value={maxDelivery}
              onChange={(e) => setMaxDelivery(e.target.value)}
            >
              <option value="1">1</option>
              <option value="3">3</option>
              <option value="7">7</option>
            </Select>
          </FormControl>
          <FormControl maxW="180px">
            <FormLabel>Min Rating</FormLabel>
            <Select
              placeholder="Any"
              value={minRating}
              onChange={(e) => setMinRating(e.target.value)}
            >
              <option value="3">3+</option>
              <option value="4">4+</option>
              <option value="4.5">4.5+</option>
            </Select>
          </FormControl>
          <FormControl maxW="200px">
            <FormLabel>Sort By</FormLabel>
            <Select value={sort} onChange={(e) => setSort(e.target.value)}>
              <option value="newest">Newest</option>
              <option value="price">Lowest Price</option>
              <option value="rating">Highest Rating</option>
            </Select>
          </FormControl>
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
          {recommended.length > 0 && (
            <>
              <Heading size="md" mt={10} mb={4}>
                Recommended for You
              </Heading>
              <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={4}>
                {recommended.map((gig) => (
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
