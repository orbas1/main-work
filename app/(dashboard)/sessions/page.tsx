"use client";

import { useEffect, useState } from "react";
import {
  Box,
  HStack,
  VStack,
  Input,
  Select,
  Button,
  SimpleGrid,
  Heading,
  Switch,
  FormControl,
  FormLabel,
  Spinner,
  Text,
} from "@chakra-ui/react";
import SessionCard from "@/components/SessionCard";
import { fetchSessions } from "@/lib/services/sessionClient";
import { NetworkingSession } from "@/lib/types/session";
import styles from "./page.module.css";

export default function SessionListingsPage() {
  const [sessions, setSessions] = useState<NetworkingSession[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [industry, setIndustry] = useState("");
  const [topic, setTopic] = useState("");
  const [sort, setSort] = useState("upcoming");
  const [freeOnly, setFreeOnly] = useState(false);
  const [companyView, setCompanyView] = useState(false);

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await fetchSessions({ search, industry, topic, sort, freeOnly: freeOnly ? "true" : undefined });
      setSessions(data);
    } catch (err: any) {
      setError(err.message || "Failed to load sessions");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sort, freeOnly, companyView]);

  return (
    <Box className={styles.container}>
      <HStack mb={4} spacing={4} flexWrap="wrap">
        <Input
          placeholder="Search sessions"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          maxW="300px"
        />
        <Input
          placeholder="Industry"
          value={industry}
          onChange={(e) => setIndustry(e.target.value)}
          maxW="200px"
        />
        <Input
          placeholder="Topic"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          maxW="200px"
        />
        <Select value={sort} onChange={(e) => setSort(e.target.value)} maxW="200px">
          <option value="upcoming">Upcoming</option>
          <option value="popular">Most Popular</option>
          <option value="rated">Lowest Price</option>
        </Select>
        <FormControl display="flex" alignItems="center" w="auto">
          <FormLabel htmlFor="free" mb="0">
            Free Only
          </FormLabel>
          <Switch id="free" isChecked={freeOnly} onChange={(e) => setFreeOnly(e.target.checked)} />
        </FormControl>
        <Button colorScheme="brand" onClick={load}>
          Apply
        </Button>
        <FormControl display="flex" alignItems="center" w="auto" ml="auto">
          <FormLabel htmlFor="view" mb="0">
            Company View
          </FormLabel>
          <Switch id="view" isChecked={companyView} onChange={(e) => setCompanyView(e.target.checked)} />
        </FormControl>
      </HStack>

      {error && (
        <Text color="red.500" mb={4}>
          {error}
        </Text>
      )}

      {loading ? (
        <Spinner />
      ) : sessions.length === 0 ? (
        <Text>No sessions found.</Text>
      ) : (
        <VStack align="stretch" spacing={4}>
          <Heading size="md">{companyView ? "Hosted Sessions" : "Available Sessions"}</Heading>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
            {sessions.map((s) => (
              <SessionCard key={s.id} session={s} />
            ))}
          </SimpleGrid>
        </VStack>
      )}
    </Box>
  );
}
