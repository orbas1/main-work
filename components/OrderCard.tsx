"use client";

import { Box, HStack, Text, Badge } from "@chakra-ui/react";
import styles from "./OrderCard.module.css";

export interface Order {
  id: number;
  gigTitle: string;
  sellerName: string | null;
  buyerName: string | null;
  status: string;
  dueDate: string;
  notes?: string;
}

interface Props {
  order: Order;
  selected?: boolean;
  onClick: () => void;
}

export default function OrderCard({ order, selected, onClick }: Props) {
  const color =
    order.status === "in_progress"
      ? "blue"
      : order.status === "delivered"
      ? "green"
      : order.status === "revision_requested"
      ? "orange"
      : order.status === "completed"
      ? "purple"
      : "gray";
  return (
    <Box
      onClick={onClick}
      className={`${styles.card} ${selected ? styles.selected : ""}`}
      borderWidth="1px"
      borderRadius="md"
      p={3}
      bg="white"
    >
      <HStack justify="space-between" align="start">
        <Text fontWeight="bold">{order.gigTitle}</Text>
        <Badge colorScheme={color}>{order.status}</Badge>
      </HStack>
      <Text fontSize="sm" color="gray.600" mt={1}>
        {order.buyerName} → {order.sellerName}
      </Text>
    </Box>
  );
}
