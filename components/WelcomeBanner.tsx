"use client";

import { Box, Heading, Text } from "@chakra-ui/react";
import { useDashboard } from "@/components/DashboardContext";
import { useEffect, useState } from "react";
import styles from "./WelcomeBanner.module.css";

interface Quote { content: string; author: string }

export default function WelcomeBanner() {
  const dashboard = useDashboard();
  const [quote, setQuote] = useState<Quote | null>(null);

  useEffect(() => {
    const url = process.env.NEXT_PUBLIC_QUOTE_API;
    if (!url) return;
    fetch(url)
      .then((res) => res.json())
      .then((data) => setQuote({ content: data.content, author: data.author }))
      .catch(() => undefined);
  }, []);

  return (
    <Box className={styles.banner} p={6} borderRadius="md" color="white">
      <Heading size="lg">Welcome back, {dashboard?.greeting || "User"}!</Heading>
      {quote && (
        <Text mt={2} fontStyle="italic">
          &ldquo;{quote.content}&rdquo; — {quote.author}
        </Text>
      )}
    </Box>
  );
}
