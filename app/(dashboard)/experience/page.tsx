"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Heading,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  VStack,
  Text,
  Button,
} from "@chakra-ui/react";
import Link from "next/link";
import api from "@/lib/api";
import { ExperienceSummary } from "@/lib/types/experience";
import { Gig } from "@/lib/types/gig";
import styles from "./page.module.css";

export default function ExperienceDashboard() {
  const [summary, setSummary] = useState<ExperienceSummary | null>(null);
  const [gigs, setGigs] = useState<Gig[]>([]);

  useEffect(() => {
    api.get<ExperienceSummary>("/experience").then(setSummary).catch(console.error);
    api.get<Gig[]>("/gigs").then(setGigs).catch(console.error);
  }, []);

  return (
    <Box className={styles.container}>
      <Heading size="md" mb={6}>
        Experience Dashboard
      </Heading>
      {summary && (
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} className={styles.stats}>
          <Stat>
            <StatLabel>Tasks Completed</StatLabel>
            <StatNumber>{summary.participant.totalCompleted}</StatNumber>
          </Stat>
          <Stat>
            <StatLabel>Average Rating</StatLabel>
            <StatNumber>{summary.participant.avgRating.toFixed(2)}</StatNumber>
          </Stat>
          <Stat>
            <StatLabel>Active Opportunities</StatLabel>
            <StatNumber>{summary.provider.activeOpportunities}</StatNumber>
          </Stat>
          <Stat>
            <StatLabel>Applications</StatLabel>
            <StatNumber>{summary.provider.applications}</StatNumber>
          </Stat>
        </SimpleGrid>
      )}

      <VStack align="stretch" spacing={4} mb={6}>
        <Heading size="sm">Recommended Gigs</Heading>
        {gigs.slice(0, 3).map((gig) => (
          <Box key={gig.id} p={3} borderWidth="1px" borderRadius="md">
            <Text fontWeight="bold">{gig.title}</Text>
            <Text>${gig.price}</Text>
          </Box>
        ))}
      </VStack>

      <Button as={Link} href="/gigs" colorScheme="brand">
        View All Gigs
      </Button>
    </Box>
  );
}
