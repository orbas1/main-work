"use client";

import { useState } from "react";
import {
  Box,
  Input,
  Stack,
  Heading,
  Button,
  Textarea,
  Progress,
  FormControl,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useSignup } from "@/components/SignupContext";
import { fileToBase64 } from "@/lib/utils/file";
import styles from "./page.module.css";

export default function FinancialPage() {
  const { data, setData } = useSignup();
  const [form, setForm] = useState({
    payment: data.payment || "",
    tax: data.taxId || "",
    bio: data.bio || "",
    portfolio: data.portfolio || "",
    title: data.title || "",
    image: data.image || "",
    video: data.introVideo || "",
  });
  const [cardError, setCardError] = useState("");

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (name === "payment") {
      const valid = /^\d{16}$/.test(value.replace(/\s+/g, ""));
      setCardError(valid || !value ? "" : "Invalid card number");
    }
  };

  const handleImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const base64 = await fileToBase64(file);
    setForm((prev) => ({ ...prev, image: base64 }));
  };

  const handleVideo = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const base64 = await fileToBase64(file);
    setForm((prev) => ({ ...prev, video: base64 }));
  };

  const canSubmit = form.payment && !cardError && form.title;

  const handleNext = () => {
    setData({
      payment: form.payment,
      taxId: form.tax,
      bio: form.bio,
      portfolio: form.portfolio,
      title: form.title,
      image: form.image,
      introVideo: form.video,
    });
    router.push("/signup/documents");
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
        Step 2 of 3
      </Heading>
      <Stack spacing={4}>
        <FormControl isInvalid={!!cardError}>
          <Input
            placeholder="Card Number"
            name="payment"
            value={form.payment}
            onChange={handleChange}
            inputMode="numeric"
            maxLength={16}
          />
          {cardError && <FormErrorMessage>{cardError}</FormErrorMessage>}
        </FormControl>
        <Input placeholder="Tax ID (optional)" name="tax" value={form.tax} onChange={handleChange} />
        <Input
          type="file"
          accept="image/*"
          name="picture"
          onChange={handleImage}
          className={styles.fileInput}
        />
        <Input
          type="file"
          accept="video/*"
          name="video"
          onChange={handleVideo}
          className={styles.fileInput}
        />
        <Textarea placeholder="Bio (250 chars)" name="bio" value={form.bio} onChange={handleChange} maxLength={250} />
        <Input placeholder="Portfolio Link" name="portfolio" value={form.portfolio} onChange={handleChange} />
        <Input placeholder="Profile Title" name="title" value={form.title} onChange={handleChange} />
        <Button onClick={handleNext} colorScheme="brand" isDisabled={!canSubmit}>
          Next
        </Button>
      </Stack>
    </Box>
  );
}
