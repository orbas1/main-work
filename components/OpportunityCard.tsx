"use client";

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
