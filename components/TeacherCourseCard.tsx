"use client";

import { Box, Heading, Text, Stat, StatLabel, StatNumber, VStack } from "@chakra-ui/react";
import styles from "./TeacherCourseCard.module.css";

interface Props {
  title: string;
  studentCount: number;
  avgProgress: number;
  nextSession?: string | null;
  recommendation?: string | null;
}

export default function TeacherCourseCard({
  title,
  studentCount,
  avgProgress,
  nextSession,
  recommendation,
}: Props) {
  return (
    <Box className={styles.card} p={4} borderWidth="1px" borderRadius="md" bg="white">
      <Heading size="md" mb={2}>
        {title}
      </Heading>
      <VStack align="stretch" spacing={2}>
        <Stat>
          <StatLabel>Students</StatLabel>
          <StatNumber>{studentCount}</StatNumber>
        </Stat>
        <Text fontSize="sm" color="gray.600">
          Avg progress: {(avgProgress * 100).toFixed(0)}%
        </Text>
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
