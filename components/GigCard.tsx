"use client";

import { Box, HStack, Heading, Text, Button, Stat, StatLabel, StatNumber } from "@chakra-ui/react";
import styles from "./GigCard.module.css";
import { Gig } from "@/lib/services/gigService";

interface Props {
  gig: Gig;
  onToggle: (gig: Gig) => void;
}

export default function GigCard({ gig, onToggle }: Props) {
  return (
    <Box className={styles.card} borderWidth="1px" borderRadius="md" p={4} bg="white" shadow="sm">
      <HStack justify="space-between" mb={2}>
        <Heading size="md">{gig.title}</Heading>
        <Button size="sm" onClick={() => onToggle(gig)} colorScheme={gig.active ? "red" : "green"}>
          {gig.active ? "Pause" : "Activate"}
        </Button>
      </HStack>
      <Text mb={2}>Price: ${gig.price.toFixed(2)}</Text>
      <HStack spacing={4}>
        <Stat>
          <StatLabel>Views</StatLabel>
          <StatNumber>{gig.views}</StatNumber>
        </Stat>
        <Stat>
          <StatLabel>Clicks</StatLabel>
          <StatNumber>{gig.clicks}</StatNumber>
        </Stat>
        <Stat>
          <StatLabel>Orders</StatLabel>
          <StatNumber>{gig.orders}</StatNumber>
        </Stat>
        <Stat>
          <StatLabel>Earnings</StatLabel>
          <StatNumber>${gig.earnings.toFixed(2)}</StatNumber>
        </Stat>
      </HStack>
    </Box>
  );
}
