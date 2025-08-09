"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  SimpleGrid,
  Text,
  VStack,
  HStack,
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  NumberInput,
  NumberInputField,
  Heading,
} from "@chakra-ui/react";
import api from "@/lib/api";
import styles from "./page.module.css";
import FreelancerCard, { Freelancer } from "@/components/FreelancerCard";

export default function FreelancerSearchPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [location, setLocation] = useState(searchParams.get("location") || "");
  const [skills, setSkills] = useState(searchParams.get("skills") || "");
  const [budget, setBudget] = useState<[number, number]>([
    Number(searchParams.get("minRate")) || 0,
    Number(searchParams.get("maxRate")) || 100,
  ]);
  const [experience, setExperience] = useState(searchParams.get("experience") || "");
  const [results, setResults] = useState<Freelancer[]>([]);
  const [shortlist, setShortlist] = useState<Freelancer[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const performSearch = async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      if (query) params.set("q", query);
      if (location) params.set("location", location);
      if (skills) params.set("skills", skills);
      if (budget[0]) params.set("minRate", budget[0].toString());
      if (budget[1]) params.set("maxRate", budget[1].toString());
      if (experience) params.set("experience", experience);
      const data = await api.get<Freelancer[]>(`/search?${params.toString()}`);
      const withScores = data.map((u) => ({ ...u, aiScore: Math.random() }));
      setResults(withScores);
      router.replace(`/search?${params.toString()}`);
    } catch (err: any) {
      setError(err.message || "Search failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (searchParams.toString()) {
      performSearch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleShortlist = (freelancer: Freelancer) => {
    setShortlist((prev) =>
      prev.find((f) => f.id === freelancer.id)
        ? prev.filter((f) => f.id !== freelancer.id)
        : [...prev, freelancer]
    );
  };

  const isShortlisted = (id: number) => shortlist.some((f) => f.id === id);

  const recommended = results.filter((r) => r.aiScore && r.aiScore > 0.8);

  return (
    <Box className={styles.container}>
      <VStack as="form" spacing={4} align="stretch" onSubmit={(e) => e.preventDefault()}>
        <HStack spacing={4} flexWrap="wrap">
          <FormControl maxW="300px">
            <FormLabel>Search</FormLabel>
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search freelancers"
            />
          </FormControl>
          <FormControl maxW="200px">
            <FormLabel>Location</FormLabel>
            <Input value={location} onChange={(e) => setLocation(e.target.value)} />
          </FormControl>
          <FormControl maxW="250px">
            <FormLabel>Skills</FormLabel>
            <Input
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              placeholder="e.g. React, Node"
            />
          </FormControl>
          <FormControl maxW="250px">
            <FormLabel>Budget ($/hr)</FormLabel>
            <RangeSlider
              min={0}
              max={200}
              step={5}
              value={budget}
              onChange={(v) => setBudget(v as [number, number])}
            >
              <RangeSliderTrack>
                <RangeSliderFilledTrack />
              </RangeSliderTrack>
              <RangeSliderThumb index={0} />
              <RangeSliderThumb index={1} />
            </RangeSlider>
            <Text fontSize="sm">{`$${budget[0]} - $${budget[1]}`}</Text>
          </FormControl>
          <FormControl maxW="150px">
            <FormLabel>Experience (yrs)</FormLabel>
            <NumberInput
              min={0}
              value={experience}
              onChange={(v) => setExperience(v)}
            >
              <NumberInputField />
            </NumberInput>
          </FormControl>
          <Button
            colorScheme="brand"
            onClick={performSearch}
            isLoading={loading}
            alignSelf="flex-end"
          >
            Search
          </Button>
        </HStack>
      </VStack>
      {error && (
        <Text color="red.500" mt={4}>
          {error}
        </Text>
      )}
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} mt={6}>
        {results.map((user) => (
          <FreelancerCard
            key={user.id}
            freelancer={user}
            onToggleShortlist={toggleShortlist}
            isShortlisted={isShortlisted(user.id)}
          />
        ))}
      </SimpleGrid>
      {recommended.length > 0 && (
        <>
          <Heading size="md" mt={10} mb={4}>
            Recommended for You
          </Heading>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
            {recommended.map((user) => (
              <FreelancerCard
                key={`rec-${user.id}`}
                freelancer={user}
                onToggleShortlist={toggleShortlist}
                isShortlisted={isShortlisted(user.id)}
              />
            ))}
          </SimpleGrid>
        </>
      )}
    </Box>
  );
}
