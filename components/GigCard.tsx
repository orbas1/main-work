"use client";

import { Box, Image, Text, Badge, Stack, Flex } from "@chakra-ui/react";
import styles from "./GigCard.module.css";

export interface Gig {
  id: number;
  title: string;
  price: number;
  rating: number;
  category: string;
  deliveryTime: number;
  image?: string | null;
  seller: { id: number; name: string | null };
}

export default function GigCard({ gig }: { gig: Gig }) {
  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden" className={styles.card}>
      {gig.image && (
        <Image src={gig.image} alt={gig.title} className={styles.image} />
      )}
      <Box p={4}>
        <Stack spacing={2}>
          <Text fontWeight="bold" fontSize="lg">
            {gig.title}
          </Text>
          <Flex justify="space-between" align="center">
            <Badge colorScheme="green">${gig.price}</Badge>
            <Text fontSize="sm" color="gray.600">
              {gig.rating.toFixed(1)} ★
            </Text>
          </Flex>
          <Text fontSize="sm" color="gray.500">
            {gig.seller.name}
          </Text>
          <Text fontSize="sm" color="gray.500">
            {gig.deliveryTime} day{gig.deliveryTime !== 1 ? "s" : ""} delivery
          </Text>
        </Stack>
      </Box>
    </Box>
  );
}
