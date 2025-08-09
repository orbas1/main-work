"use client";

import { Box, Heading, Text, Progress, VStack } from "@chakra-ui/react";
import styles from "./CourseProgress.module.css";

interface Props {
  title: string;
  progress: number; // 0-1
  nextSession?: string | null;
  recommendation?: string | null;
}

export default function CourseProgress({ title, progress, nextSession, recommendation }: Props) {
  return (
    <Box className={styles.card} p={4} borderWidth="1px" borderRadius="md" bg="white">
      <Heading size="md" mb={2}>
        {title}
      </Heading>
      <VStack align="stretch" spacing={2}>
        <Progress value={progress * 100} colorScheme="brand" />
        {nextSession && (
          <Text fontSize="sm" color="gray.600">
            Next session: {new Date(nextSession).toLocaleDateString()}
          </Text>
        )}
        {recommendation && (
          <Text fontSize="sm" color="gray.600">
            Suggested reading: {recommendation}
          </Text>
        )}
      </VStack>
    </Box>
  );
}
