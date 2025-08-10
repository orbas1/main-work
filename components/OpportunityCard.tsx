"use client";

import {
  Box,
  Heading,
  Text,
  Badge,
  VStack,
  HStack,
  Avatar,
} from "@chakra-ui/react";
import Link from "next/link";
import { Opportunity } from "@/lib/types/opportunity";
import styles from "./OpportunityCard.module.css";

interface Props {
  opportunity: Opportunity;
}

export default function OpportunityCard({ opportunity }: Props) {
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
        {opportunity.provider && (
          <HStack spacing={2} align="center">
            {opportunity.provider.image && (
              <Avatar
                src={opportunity.provider.image}
                name={opportunity.provider.name}
                size="sm"
              />
            )}
            <Text fontWeight="medium">{opportunity.provider.name}</Text>
          </HStack>
        )}
        <Heading size="md">{opportunity.title}</Heading>
        <Text noOfLines={2}>{opportunity.description}</Text>
        {opportunity.location && (
          <Text fontSize="sm" color="gray.600">
            {opportunity.location}
          </Text>
        )}
        {typeof opportunity.compensation === "number" && (
          <Text fontWeight="bold">
            ${opportunity.compensation.toLocaleString()}
          </Text>
        )}
        <HStack spacing={2}>
          <Badge colorScheme="green">{opportunity.status}</Badge>
          {opportunity.category && <Badge>{opportunity.category}</Badge>}
          {opportunity.applicationStatus && (
            <Badge colorScheme="blue">{opportunity.applicationStatus}</Badge>
          )}
        </HStack>
      </VStack>
    </Box>
  );
}
