"use client";

import { Box, Heading, Text, Badge } from "@chakra-ui/react";
import { Task } from "@/lib/types/task";
import styles from "./TaskCard.module.css";

export default function TaskCard({ task }: { task: Task }) {
  return (
    <Box className={styles.card} borderWidth="1px" borderRadius="md" p={4} bg="white">
      <Heading size="sm">{task.title}</Heading>
      <Text fontSize="sm" mt={2}>
        {task.description}
      </Text>
      <Badge
        mt={2}
        colorScheme={
          task.status === "open"
            ? "green"
            : task.status === "in_progress"
            ? "yellow"
            : "gray"
        }
      >
        {task.status}
      </Badge>
    </Box>
  );
}
