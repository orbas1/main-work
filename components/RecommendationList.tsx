"use client";

import { Box, Heading, SimpleGrid } from "@chakra-ui/react";
import { useDashboard } from "@/components/DashboardContext";
import GigCard from "./GigCard";
import styles from "./RecommendationList.module.css";

export default function RecommendationList() {
  const dashboard = useDashboard();
  const gigs = dashboard?.recommendations || [];
  if (!gigs.length) return null;
  return (
    <Box className={styles.container} mt={6}>
      <Heading size="md" mb={4}>
        Recommended Gigs
      </Heading>
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
        {gigs.map((gig) => (
          <GigCard key={gig.id} gig={gig} />
        ))}
      </SimpleGrid>
    </Box>
  );
}
