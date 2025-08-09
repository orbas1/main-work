"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Box, Heading, Text, Button } from "@chakra-ui/react";
import { fetchJson } from "@/lib/fetcher";
import styles from "./page.module.css";
import { Opportunity } from "@/components/OpportunityCard";

export default function OpportunityDetailsPage() {
  const params = useParams();
  const id = Array.isArray(params?.id) ? params.id[0] : params?.id;
  const [opportunity, setOpportunity] = useState<Opportunity | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      fetchJson<Opportunity>(`/api/volunteer/opportunities/${id}`).then(setOpportunity);
    }
  }, [id]);

  const apply = async () => {
    if (!id) return;
    setLoading(true);
    try {
      await fetchJson(`/api/volunteer/applications`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ opportunityId: Number(id) }),
      });
    } finally {
      setLoading(false);
    }
  };

  if (!opportunity) return null;

  return (
    <Box className={styles.container}>
      <Heading>{opportunity.title}</Heading>
      <Text color="gray.500">
        {opportunity.organization}
        {opportunity.location ? ` • ${opportunity.location}` : ""}
      </Text>
      <Text mt={4}>{opportunity.description}</Text>
      <Button colorScheme="teal" mt={6} onClick={apply} isLoading={loading}>
        Apply Now
      </Button>
    </Box>
  );
}
