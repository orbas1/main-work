"use client";

import { Box, Heading, Text, Stat, StatLabel, StatNumber } from "@chakra-ui/react";
import styles from "./OrderCard.module.css";
import { Order } from "@/lib/services/gigService";

interface Props {
  order: Order;
}

export default function OrderCard({ order }: Props) {
  return (
    <Box className={styles.card} borderWidth="1px" borderRadius="md" p={4} bg="white" shadow="sm">
      <Heading size="md" mb={2}>
        {order.gig.title}
      </Heading>
      <Text mb={2}>Seller: {order.gig.seller?.name}</Text>
      <Stat>
        <StatLabel>Status</StatLabel>
        <StatNumber>{order.status}</StatNumber>
      </Stat>
      <Text mt={2}>Price: ${order.price.toFixed(2)}</Text>
    </Box>
  );
}
