"use client";

import { Stack, Heading, Text, Image } from "@chakra-ui/react";
import styles from "./FeatureCard.module.css";

interface Props {
  title: string;
  description: string;
  imageUrl: string;
}

export default function FeatureCard({ title, description, imageUrl }: Props) {
  return (
    <Stack align="center" spacing={3} className={styles.card}>
      <Image src={imageUrl} alt={title} className={styles.image} />
      <Heading size="md">{title}</Heading>
      <Text textAlign="center">{description}</Text>
    </Stack>
  );
}
