"use client";

import { useEffect, useState } from "react";
import { Box, Input, SimpleGrid } from "@chakra-ui/react";
import OpportunityCard, { Opportunity } from "@/components/OpportunityCard";
import { fetchJson } from "@/lib/fetcher";
import styles from "./page.module.css";

export default function VolunteerOpportunitiesPage() {
  const [keyword, setKeyword] = useState("");
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);

  useEffect(() => {
    fetchJson<Opportunity[]>(`/api/volunteer/opportunities?q=${encodeURIComponent(keyword)}`).then(setOpportunities);
  }, [keyword]);

  return (
    <Box className={styles.container}>
      <Input
        placeholder="Search opportunities"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        mb={4}
      />
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
        {opportunities.map((op) => (
          <OpportunityCard key={op.id} opportunity={op} />
        ))}
      </SimpleGrid>
    </Box>
  );
}
