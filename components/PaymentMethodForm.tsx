"use client";

import { useState } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  HStack,
  Button,
  Checkbox,
} from "@chakra-ui/react";
import api from "@/lib/api";
import styles from "./PaymentMethodForm.module.css";

interface Props {
  onSuccess: () => void;
}

export default function PaymentMethodForm({ onSuccess }: Props) {
  const [cardNumber, setCardNumber] = useState("");
  const [expMonth, setExpMonth] = useState("");
  const [expYear, setExpYear] = useState("");
  const [cvc, setCvc] = useState("");
  const [isDefault, setIsDefault] = useState(true);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await api.post("/payment-methods", {
      cardNumber,
      expMonth: Number(expMonth),
      expYear: Number(expYear),
      isDefault,
    });
    setCardNumber("");
    setExpMonth("");
    setExpYear("");
    setCvc("");
    setIsDefault(false);
    onSuccess();
  };

  return (
    <Box as="form" onSubmit={handleSubmit} className={styles.form}>
      <FormControl mb={3} isRequired>
        <FormLabel>Card Number</FormLabel>
        <Input
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
          placeholder="1234 1234 1234 1234"
        />
      </FormControl>
      <HStack mb={3} align="start">
        <FormControl isRequired>
          <FormLabel>Exp. Month</FormLabel>
          <Input
            value={expMonth}
            onChange={(e) => setExpMonth(e.target.value)}
            placeholder="MM"
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Exp. Year</FormLabel>
          <Input
            value={expYear}
            onChange={(e) => setExpYear(e.target.value)}
            placeholder="YYYY"
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>CVC</FormLabel>
          <Input
            value={cvc}
            onChange={(e) => setCvc(e.target.value)}
            placeholder="CVC"
          />
        </FormControl>
      </HStack>
      <FormControl mb={4}>
        <Checkbox
          isChecked={isDefault}
          onChange={(e) => setIsDefault(e.target.checked)}
        >
          Set as default
        </Checkbox>
      </FormControl>
      <Button type="submit" colorScheme="brand">
        Save Payment Method
      </Button>
    </Box>
  );
}

