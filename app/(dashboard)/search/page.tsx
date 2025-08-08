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
  Avatar,
  Text,
  VStack,
  HStack,
} from "@chakra-ui/react";
import api from "@/lib/api";
import styles from "./page.module.css";

interface User {
  id: number;
  name: string | null;
  email: string;
  location: string | null;
  expertise: string | null;
  image: string | null;
}

export default function SearchPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [location, setLocation] = useState(searchParams.get("location") || "");
  const [expertise, setExpertise] = useState(searchParams.get("expertise") || "");
  const [results, setResults] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const performSearch = async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      if (query) params.set("q", query);
      if (location) params.set("location", location);
      if (expertise) params.set("expertise", expertise);
      const data = await api.get<User[]>(`/search?${params.toString()}`);
      setResults(data);
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

  return (
    <Box className={styles.container}>
      <VStack as="form" spacing={4} align="stretch" onSubmit={(e) => e.preventDefault()}>
        <HStack spacing={4} flexWrap="wrap">
          <FormControl maxW="300px">
            <FormLabel>Query</FormLabel>
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search users"
            />
          </FormControl>
          <FormControl maxW="200px">
            <FormLabel>Location</FormLabel>
            <Input value={location} onChange={(e) => setLocation(e.target.value)} />
          </FormControl>
          <FormControl maxW="200px">
            <FormLabel>Expertise</FormLabel>
            <Input value={expertise} onChange={(e) => setExpertise(e.target.value)} />
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
          <HStack key={user.id} p={4} borderWidth="1px" borderRadius="md" bg="white">
            <Avatar name={user.name || user.email} src={user.image || undefined} />
            <Box>
              <Text fontWeight="bold">{user.name || "Unnamed"}</Text>
              <Text fontSize="sm" color="gray.600">
                {user.email}
              </Text>
              {user.location && (
                <Text fontSize="sm" color="gray.600">
                  {user.location}
                </Text>
              )}
              {user.expertise && (
                <Text fontSize="sm" color="gray.600">
                  {user.expertise}
                </Text>
              )}
            </Box>
          </HStack>
        ))}
      </SimpleGrid>
    </Box>
  );
}
