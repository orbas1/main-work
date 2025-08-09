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
    </Box>
  );
}
