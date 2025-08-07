"use client";

import { useState } from "react";
import { Box, Input, Stack, Heading, Button, Textarea, Progress } from "@chakra-ui/react";
import NextLink from "next/link";

export default function FinancialPage() {
  const [form, setForm] = useState({
    payment: "",
    tax: "",
    bio: "",
    portfolio: "",
    title: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Box maxW="lg" mx="auto" mt={10} p={6} bg="white" shadow="md" borderRadius="lg">
      <Progress value={66} mb={6} />
      <Heading size="md" mb={6} textAlign="center">
        Step 2 of 3
      </Heading>
      <Stack spacing={4}>
        <Input placeholder="Payment Method" name="payment" value={form.payment} onChange={handleChange} />
        <Input placeholder="Tax ID (optional)" name="tax" value={form.tax} onChange={handleChange} />
        <Input type="file" accept="image/*" name="picture" />
        <Textarea placeholder="Bio (250 chars)" name="bio" value={form.bio} onChange={handleChange} maxLength={250} />
        <Input type="file" accept="video/*" name="video" />
        <Input placeholder="Portfolio Link" name="portfolio" value={form.portfolio} onChange={handleChange} />
        <Input placeholder="Profile Title" name="title" value={form.title} onChange={handleChange} />
        <Button as={NextLink} href="/signup/documents" colorScheme="brand">
          Next
        </Button>
      </Stack>
    </Box>
  );
}
