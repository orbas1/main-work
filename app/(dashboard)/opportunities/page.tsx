"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  SimpleGrid,
  VStack,
  HStack,
  Spinner,
  Text,
} from "@chakra-ui/react";
import api from "@/lib/api";
import { Opportunity } from "@/lib/types/opportunity";
import OpportunityCard from "@/components/OpportunityCard";
import styles from "./page.module.css";

export default function OpportunityBrowsePage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      const params = new URLSearchParams();
      if (search) params.set("search", search);
      if (category) params.set("category", category);
      if (status) params.set("status", status);
      const data = await api.get<Opportunity[]>(`/opportunities?${params.toString()}`);
      setOpportunities(data);
    } catch (err: any) {
      setError(err.message || "Failed to load opportunities");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box className={styles.container}>
      <VStack as="form" spacing={4} align="stretch" onSubmit={(e) => e.preventDefault()}>
        <HStack spacing={4} flexWrap="wrap">
          <FormControl maxW="300px">
            <FormLabel>Search</FormLabel>
            <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search opportunities" />
          </FormControl>
          <FormControl maxW="200px">
            <FormLabel>Category</FormLabel>
            <Input value={category} onChange={(e) => setCategory(e.target.value)} />
          </FormControl>
          <FormControl maxW="200px">
            <FormLabel>Status</FormLabel>
            <Select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="">All</option>
              <option value="open">Open</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
            </Select>
          </FormControl>
          <Button colorScheme="brand" alignSelf="flex-end" onClick={load}>
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
        <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={4} mt={6}>
          {opportunities.map((opp) => (
            <OpportunityCard key={opp.id} opportunity={opp} />
          ))}
        </SimpleGrid>
      )}
    </Box>
  );
}
