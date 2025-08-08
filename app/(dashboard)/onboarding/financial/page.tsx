"use client";

import { useState } from "react";
import {
  Box,
  Input,
  Stack,
  Heading,
  Textarea,
  Progress,
  Button,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useOnboarding } from "@/components/OnboardingContext";
import styles from "./page.module.css";

export default function FinancialOnboardingPage() {
  const { data, setData } = useOnboarding();
  const [form, setForm] = useState({
    payment: data.payment || "",
    taxId: data.taxId || "",
    bio: data.bio || "",
    portfolio: data.portfolio || "",
    title: data.title || "",
    image: data.image || "",
  });
  const router = useRouter();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setForm((prev) => ({ ...prev, image: reader.result as string }));
    };
    reader.readAsDataURL(file);
  };

  const canSubmit = form.payment && form.title;

  const handleNext = () => {
    setData(form);
    router.push("/onboarding/documents");
  };

  return (
    <Box
      maxW="lg"
      mx="auto"
      mt={10}
      p={6}
      className={styles.container}
      shadow="md"
      borderRadius="lg"
    >
      <Progress value={66} mb={6} />
      <Heading size="md" mb={6} textAlign="center">
        Onboarding - Step 2 of 3
      </Heading>
      <Stack spacing={4}>
        <Input
          placeholder="Payment Method"
          name="payment"
          value={form.payment}
          onChange={handleChange}
        />
        <Input
          placeholder="Tax ID (optional)"
          name="taxId"
          value={form.taxId}
          onChange={handleChange}
        />
        <Input type="file" accept="image/*" onChange={handleImage} />
        <Textarea
          placeholder="Bio (250 chars)"
          name="bio"
          value={form.bio}
          onChange={handleChange}
          maxLength={250}
        />
        <Input
          placeholder="Portfolio Link"
          name="portfolio"
          value={form.portfolio}
          onChange={handleChange}
        />
        <Input
          placeholder="Profile Title"
          name="title"
          value={form.title}
          onChange={handleChange}
        />
        <Button onClick={handleNext} colorScheme="brand" isDisabled={!canSubmit}>
          Next
        </Button>
      </Stack>
    </Box>
  );
}

