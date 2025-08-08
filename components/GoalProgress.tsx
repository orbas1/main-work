"use client";

import { Box, Heading, Progress, Text } from "@chakra-ui/react";
import { useDashboard } from "@/components/DashboardContext";
import { calculateProgress } from "@/lib/utils/progress";
import styles from "./GoalProgress.module.css";

export default function GoalProgress() {
  const dashboard = useDashboard();
  const goals = dashboard?.goals || [];
  if (!goals.length) return null;
  return (
    <Box className={styles.container} mt={6}>
      <Heading size="md" mb={4}>
        Your Goals
      </Heading>
      {goals.map((goal) => {
        const percent = calculateProgress(goal.current, goal.target);
        return (
          <Box key={goal.id} mb={4}>
            <Text mb={1}>
              {goal.title} ({goal.current}/{goal.target})
            </Text>
            <Progress value={percent} colorScheme="brand" borderRadius="md" />
          </Box>
        );
      })}
    </Box>
  );
}
