"use client";

import { Box, Heading, Text, Button } from "@chakra-ui/react";
import Link from "next/link";
import styles from "./OpportunityCard.module.css";

export interface Opportunity {
  id: number;
  title: string;
  organization: string;
  location?: string | null;
  description: string;
}

export default function OpportunityCard({ opportunity }: { opportunity: Opportunity }) {
  return (
    <Box className={styles.card} p={4} bg="white" borderWidth="1px" borderRadius="md">
      <Heading size="md">{opportunity.title}</Heading>
      <Text fontSize="sm" color="gray.500">
        {opportunity.organization}
        {opportunity.location ? ` • ${opportunity.location}` : ""}
      </Text>
      <Text mt={2}>{opportunity.description.slice(0, 100)}...</Text>
      <Button as={Link} href={`/volunteer/opportunities/${opportunity.id}`} colorScheme="teal" mt={3}>
        View Details
      </Button>
import { Box, Heading, Text, Badge, VStack } from "@chakra-ui/react";
import Link from "next/link";
import { Opportunity } from "@/lib/types/opportunity";
import styles from "./OpportunityCard.module.css";

interface Props {
  opportunity: Opportunity;
}

export default function OpportunityCard({ opportunity }: Props) {
  const statusColor =
    opportunity.status === "open"
      ? "green"
      : opportunity.status === "in_progress"
      ? "yellow"
      : "gray";
  return (
    <Box
      as={Link}
      href={`/opportunities/${opportunity.id}`}
      borderWidth="1px"
      borderRadius="md"
      p={4}
      className={styles.card}
      _hover={{ shadow: "md" }}
    >
      <VStack align="start" spacing={2}>
        <Heading size="md">{opportunity.title}</Heading>
        <Text noOfLines={2}>{opportunity.description}</Text>
        {typeof opportunity.compensation === "number" && (
          <Text fontWeight="bold">${opportunity.compensation}</Text>
        )}
        <Badge colorScheme={statusColor}>{opportunity.status}</Badge>
        {opportunity.applicationStatus && (
          <Badge colorScheme="blue">{opportunity.applicationStatus}</Badge>
        )}
      </VStack>
    </Box>
  );
}
