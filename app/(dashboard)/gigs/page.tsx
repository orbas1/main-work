"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Grid,
  GridItem,
  Input,
  Select,
  Stack,
  Heading,
  Button,
} from "@chakra-ui/react";
import api from "@/lib/api";
import GigCard, { Gig } from "@/components/GigCard";
import styles from "./page.module.css";

interface GigResponse extends Gig {}

export default function GigSearchPage() {
  const [gigs, setGigs] = useState<GigResponse[]>([]);
  const [recommended, setRecommended] = useState<GigResponse[]>([]);

  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState("" as string);
  const [maxPrice, setMaxPrice] = useState("" as string);
  const [deliveryTime, setDeliveryTime] = useState("");
  const [rating, setRating] = useState("");
  const [sort, setSort] = useState("Most Relevant");

  const fetchData = () => {
    const params = new URLSearchParams();
    if (query) params.append("q", query);
    if (category) params.append("category", category);
    if (minPrice) params.append("minPrice", minPrice);
    if (maxPrice) params.append("maxPrice", maxPrice);
    if (deliveryTime) params.append("deliveryTime", deliveryTime);
    if (rating) params.append("rating", rating);
    if (sort) params.append("sort", sort);
    api
      .get<GigResponse[]>(`/gigs?${params.toString()}`)
      .then(setGigs)
      .catch(console.error);
  };

  useEffect(() => {
    fetchData();
    api
      .get<GigResponse[]>("/gigs?sort=Highest%20Rated")
      .then(setRecommended)
      .catch(console.error);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box className={styles.container}>
      <Heading mb={4}>Browse Gigs</Heading>
      <Stack direction={{ base: "column", md: "row" }} spacing={4} mb={6}>
        <Input
          placeholder="Search gigs"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Select
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="Design">Design</option>
          <option value="Programming">Programming</option>
          <option value="Writing">Writing</option>
        </Select>
        <Input
          placeholder="Min Price"
          type="number"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
        />
        <Input
          placeholder="Max Price"
          type="number"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />
        <Select
          placeholder="Delivery"
          value={deliveryTime}
          onChange={(e) => setDeliveryTime(e.target.value)}
        >
          <option value="1">24 Hours</option>
          <option value="3">3 Days</option>
          <option value="7">1 Week</option>
        </Select>
        <Select
          placeholder="Rating"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        >
          <option value="3">3+ stars</option>
          <option value="4">4+ stars</option>
          <option value="4.5">4.5+ stars</option>
        </Select>
        <Select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option>Most Relevant</option>
          <option>Highest Rated</option>
          <option>Newest</option>
        </Select>
        <Button colorScheme="brand" onClick={fetchData}>
          Apply
        </Button>
      </Stack>

      <Grid templateColumns="repeat(auto-fill, minmax(250px, 1fr))" gap={6}>
        {gigs.map((gig) => (
          <GridItem key={gig.id}>
            <GigCard gig={gig} />
          </GridItem>
        ))}
      </Grid>

      {recommended.length > 0 && (
        <Box mt={10}>
          <Heading size="md" mb={4}>
            Recommended for You
          </Heading>
          <Grid templateColumns="repeat(auto-fill, minmax(250px, 1fr))" gap={6}>
            {recommended.map((gig) => (
              <GridItem key={`rec-${gig.id}`}>
                <GigCard gig={gig} />
              </GridItem>
            ))}
          </Grid>
        </Box>
      )}
    </Box>
  );
}
