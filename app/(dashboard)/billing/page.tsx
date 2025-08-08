"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Text,
  Stack,
  Switch,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  useToast,
} from "@chakra-ui/react";
import styles from "./page.module.css";
import { formatCurrency, formatDate } from "@/lib/format";

interface Subscription {
  plan: string;
  status: string;
  autoRenew: boolean;
  renewalDate?: string | null;
}

interface PaymentMethod {
  id: number;
  brand: string;
  last4: string;
  expMonth: number;
  expYear: number;
  isDefault: boolean;
}

interface Transaction {
  id: number;
  amount: number;
  currency: string;
  description: string;
  status: string;
  createdAt: string;
}

interface BillingData {
  subscription: Subscription | null;
  paymentMethods: PaymentMethod[];
  transactions: Transaction[];
}

export default function BillingPage() {
  const [data, setData] = useState<BillingData | null>(null);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  useEffect(() => {
    fetch("/api/billing")
      .then((res) => res.json())
      .then(setData)
      .catch(() => setData(null))
      .finally(() => setLoading(false));
  }, []);

  const toggleAutoRenew = async (checked: boolean) => {
    try {
      await fetch("/api/billing", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ autoRenew: checked }),
      });
      setData((prev) =>
        prev && prev.subscription
          ? {
              ...prev,
              subscription: { ...prev.subscription, autoRenew: checked },
            }
          : prev
      );
      toast({ status: "success", description: "Subscription updated." });
    } catch {
      toast({ status: "error", description: "Update failed." });
    }
  };

  if (loading) return <Text>Loading...</Text>;
  if (!data) return <Text>Unable to load billing data.</Text>;

  return (
    <Stack spacing={8} className={styles.container}>
      <Box>
        <Heading size="md" className={styles.heading}>
          Subscription
        </Heading>
        {data.subscription ? (
          <Box p={4} bg="white" borderRadius="md" shadow="sm">
            <Text>
              <strong>Plan:</strong> {data.subscription.plan}
            </Text>
            <Text>
              <strong>Status:</strong> {data.subscription.status}
            </Text>
            {data.subscription.renewalDate && (
              <Text>
                <strong>Renews:</strong> {formatDate(data.subscription.renewalDate)}
              </Text>
            )}
            <Stack direction="row" align="center" mt={2}>
              <Switch
                isChecked={data.subscription.autoRenew}
                onChange={(e) => toggleAutoRenew(e.target.checked)}
              />
              <Text>Auto renew</Text>
            </Stack>
          </Box>
        ) : (
          <Text>No active subscription.</Text>
        )}
      </Box>

      <Box>
        <Heading size="md" className={styles.heading}>
          Payment Methods
        </Heading>
        {data.paymentMethods.length ? (
          <Stack spacing={2}>
            {data.paymentMethods.map((pm) => (
              <Box key={pm.id} p={4} bg="white" borderRadius="md" shadow="sm">
                <Text>
                  {pm.brand} ending in {pm.last4}
                </Text>
                <Text>
                  Expires {pm.expMonth}/{pm.expYear}
                </Text>
                {pm.isDefault && (
                  <Text fontSize="sm" color="green.600">
                    Default
                  </Text>
                )}
              </Box>
            ))}
          </Stack>
        ) : (
          <Text>No payment methods saved.</Text>
        )}
      </Box>

      <Box>
        <Heading size="md" className={styles.heading}>
          Transactions
        </Heading>
        {data.transactions.length ? (
          <Table bg="white" variant="simple">
            <Thead>
              <Tr>
                <Th>Date</Th>
                <Th>Description</Th>
                <Th>Amount</Th>
                <Th>Status</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data.transactions.map((tx) => (
                <Tr key={tx.id}>
                  <Td>{formatDate(tx.createdAt)}</Td>
                  <Td>{tx.description}</Td>
                  <Td>{formatCurrency(tx.amount, tx.currency)}</Td>
                  <Td>{tx.status}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        ) : (
          <Text>No transactions found.</Text>
        )}
      </Box>
    </Stack>
  );
}
