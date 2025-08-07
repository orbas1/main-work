"use client";

import { useEffect, useState } from "react";
import { Avatar, Box, Flex, Spinner, Text } from "@chakra-ui/react";
import { fetchJson } from "@/lib/fetcher";
import styles from "./TestimonialCarousel.module.css";

interface Testimonial {
  id: number;
  name: string;
  message: string;
  avatarUrl?: string | null;
}

export default function TestimonialCarousel() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await fetchJson<Testimonial[]>("/api/testimonials");
        setTestimonials(data);
      } catch (err) {
        console.error("Failed to load testimonials", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  useEffect(() => {
    if (!testimonials.length) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials]);

  if (loading) {
    return (
      <Flex justify="center" align="center" py={10}>
        <Spinner />
      </Flex>
    );
  }

  if (!testimonials.length) return null;

  const t = testimonials[index];

  return (
    <Box className={styles.carousel}>
      <Flex direction="column" align="center" maxW="xl" mx="auto" textAlign="center" px={4}>
        {t.avatarUrl && <Avatar src={t.avatarUrl || undefined} name={t.name} size="lg" mb={4} />}
        <Text fontStyle="italic" mb={2}>&quot;{t.message}&quot;</Text>
        <Text fontWeight="bold">- {t.name}</Text>
      </Flex>
    </Box>
  );
}
