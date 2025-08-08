"use client";

import { useState } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  HStack,
  Button,
  Icon,
  Text,
  useToast,
} from "@chakra-ui/react";
import { FaLock } from "react-icons/fa";
import api from "@/lib/api";
import styles from "./PaymentForm.module.css";

interface PaymentFormProps {
  gigId: number;
  onSuccess: () => void;
}

export default function PaymentForm({ gigId, onSuccess }: PaymentFormProps) {
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [promo, setPromo] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/payments", {
        gigId,
        cardNumber,
        expiry,
        cvv,
        promo,
      });
      toast({ status: "success", description: "Payment successful" });
      setCardNumber("");
      setExpiry("");
      setCvv("");
      setPromo("");
      onSuccess();
    } catch (err: any) {
      toast({ status: "error", description: err.message || "Payment failed" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box as="form" onSubmit={handleSubmit} className={styles.form}>
      <FormControl isRequired>
        <FormLabel>Card Number</FormLabel>
        <Input
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
          placeholder="1234 1234 1234 1234"
        />
      </FormControl>
      <HStack spacing={4}>
        <FormControl isRequired>
          <FormLabel>Expiry</FormLabel>
          <Input
            value={expiry}
            onChange={(e) => setExpiry(e.target.value)}
            placeholder="MM/YY"
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>CVV</FormLabel>
          <Input
            type="password"
            value={cvv}
            onChange={(e) => setCvv(e.target.value)}
            placeholder="123"
            maxW="100px"
          />
        </FormControl>
      </HStack>
      <FormControl>
        <FormLabel>Promo Code</FormLabel>
        <Input
          value={promo}
          onChange={(e) => setPromo(e.target.value)}
          placeholder="SAVE20"
        />
      </FormControl>
      <Button
        type="submit"
        colorScheme="brand"
        isLoading={loading}
        className={styles.payButton}
      >
        Pay Now
      </Button>
      <HStack mt={2} spacing={2} color="gray.500" fontSize="sm">
        <Icon as={FaLock} />
        <Text>Your payment information is encrypted and secure.</Text>
      </HStack>
    </Box>
  );
}
