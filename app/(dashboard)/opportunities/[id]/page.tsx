"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  Box,
  Heading,
  Text,
  Badge,
  Button,
  Spinner,
  VStack,
} from "@chakra-ui/react";
import api from "@/lib/api";
import { Opportunity } from "@/lib/types/opportunity";
import styles from "./page.module.css";

export default function OpportunityDetailPage() {
  const params = useParams<{ id: string }>();
  const id = Number(params.id);
  const [opportunity, setOpportunity] = useState<Opportunity | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [applyLoading, setApplyLoading] = useState(false);
  const [applied, setApplied] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await api.get<Opportunity>(`/opportunities/${id}`);
        setOpportunity(data);
      } catch (err: any) {
        setError(err.message || "Failed to load opportunity");
      } finally {
        setLoading(false);
      }
    };
    if (id) {
      load();
    }
  }, [id]);

  const apply = async () => {
    setApplyLoading(true);
    try {
      await api.post(`/opportunities/${id}/apply`, {});
      setApplied(true);
    } catch (err: any) {
      setError(err.message || "Failed to apply");
    } finally {
      setApplyLoading(false);
    }
  };

  if (loading) return <Spinner />;
  if (error) return <Text color="red.500">{error}</Text>;
  if (!opportunity) return null;

  return (
    <Box className={styles.container}>
      <VStack align="start" spacing={4}>
        <Heading>{opportunity.title}</Heading>
        <Badge alignSelf="flex-start">{opportunity.status}</Badge>
        {typeof opportunity.compensation === "number" && (
          <Text fontWeight="bold">${opportunity.compensation}</Text>
        )}
        <Text>{opportunity.description}</Text>
        {!applied ? (
          <Button colorScheme="brand" onClick={apply} isLoading={applyLoading}>
            Apply Now
          </Button>
        ) : (
          <Text color="green.500">Application submitted</Text>
        )}
      </VStack>
    </Box>
  );
}
