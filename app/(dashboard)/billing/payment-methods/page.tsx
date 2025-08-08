"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Heading,
  VStack,
  Text,
  HStack,
  Button,
} from "@chakra-ui/react";
import PaymentMethodForm from "@/components/PaymentMethodForm";
import api from "@/lib/api";
import styles from "./page.module.css";

interface PaymentMethod {
  id: number;
  brand: string;
  last4: string;
  expMonth: number;
  expYear: number;
  isDefault: boolean;
}

export default function PaymentMethodsPage() {
  const [methods, setMethods] = useState<PaymentMethod[]>([]);

  const loadMethods = () => {
    api.get<PaymentMethod[]>("/payment-methods")
      .then(setMethods)
      .catch(console.error);
  };

  useEffect(() => {
    loadMethods();
  }, []);

  const handleSetDefault = async (id: number) => {
    await api.put(`/payment-methods/${id}`, {});
    loadMethods();
  };

  const handleRemove = async (id: number) => {
    await api.delete(`/payment-methods/${id}`);
    loadMethods();
  };

  return (
    <Box className={styles.container}>
      <Heading mb={4}>Payment Methods</Heading>
      <VStack spacing={4} align="stretch" mb={8}>
        {methods.map((m) => (
          <HStack
            key={m.id}
            justify="space-between"
            className={styles.method}
          >
            <Text>
              {m.brand} ****{m.last4} (exp {m.expMonth}/{m.expYear})
              {m.isDefault && " - Default"}
            </Text>
            <HStack>
              {!m.isDefault && (
                <Button size="sm" onClick={() => handleSetDefault(m.id)}>
                  Set Default
                </Button>
              )}
              <Button
                size="sm"
                colorScheme="red"
                onClick={() => handleRemove(m.id)}
              >
                Remove
              </Button>
            </HStack>
          </HStack>
        ))}
        {methods.length === 0 && <Text>No payment methods saved.</Text>}
      </VStack>
      <PaymentMethodForm onSuccess={loadMethods} />
    </Box>
  );
}

