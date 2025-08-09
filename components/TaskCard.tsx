"use client";

import { Box, Heading, Text, Stack, Button } from "@chakra-ui/react";
import Link from "next/link";
import { Task } from "@/lib/types/task";
import styles from "./TaskCard.module.css";

export default function TaskCard({ task }: { task: Task }) {
  return (
    <Box borderWidth="1px" borderRadius="md" p={4} className={styles.card}>
      <Stack spacing={2}>
        <Heading size="md">{task.title}</Heading>
        <Text noOfLines={2}>{task.description}</Text>
        {(task.budgetMin || task.budgetMax) && (
          <Text className={styles.budget}>
            Budget:
            {task.budgetMin ? ` $${task.budgetMin}` : ""}
            {task.budgetMax ? ` - $${task.budgetMax}` : ""}
          </Text>
        )}
        {task.deadline && (
          <Text>Deadline: {new Date(task.deadline).toLocaleDateString()}</Text>
        )}
        <Button as={Link} href={`/tasks/${task.id}`} colorScheme="brand" size="sm">
          View Details
        </Button>
      </Stack>
    </Box>
  );
}
