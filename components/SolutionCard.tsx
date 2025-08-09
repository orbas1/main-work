"use client";

import { Stack, Image, Heading, Text, Button } from "@chakra-ui/react";
import styles from "./SolutionCard.module.css";

interface Props {
  title: string;
  description: string;
  imageUrl: string;
  ctaText?: string;
}

export default function SolutionCard({ title, description, imageUrl, ctaText }: Props) {
  return (
    <Stack
      spacing={4}
      p={6}
      bg="white"
      borderRadius="md"
      boxShadow="md"
      align="center"
      className={styles.card}
    >
      <Image src={imageUrl} alt={title} className={styles.image} />
      <Heading size="md">{title}</Heading>
      <Text textAlign="center">{description}</Text>
      {ctaText && (
        <Button colorScheme="brand" variant="outline">
          {ctaText}
        </Button>
      )}
    </Stack>
  );
}
