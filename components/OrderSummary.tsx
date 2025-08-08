"use client";

import { Box, Heading, Stack, Text } from "@chakra-ui/react";
import { calculateOrderTotals } from "@/lib/utils/payment";
import { formatCurrency } from "@/lib/utils/format";
import styles from "./OrderSummary.module.css";

interface OrderSummaryProps {
  title: string;
  price: number;
  discount?: number;
}

export default function OrderSummary({ title, price, discount = 0 }: OrderSummaryProps) {
  const totals = calculateOrderTotals(price, 0.1, discount);
  return (
    <Box className={styles.summary}>
      <Heading size="md" mb={4}>
        Order Summary
      </Heading>
      <Stack spacing={1} fontSize="sm">
        <Text>{title}</Text>
        <Text>Subtotal: {formatCurrency(totals.subtotal)}</Text>
        <Text>Tax: {formatCurrency(totals.tax)}</Text>
        {totals.discount > 0 && (
          <Text color="green.600">Discount: -{formatCurrency(totals.discount)}</Text>
        )}
        <Text fontWeight="bold" pt={2}>
          Total: {formatCurrency(totals.total)}
        </Text>
      </Stack>
    </Box>
  );
}
