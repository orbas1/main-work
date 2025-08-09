"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Select,
  HStack,
  SimpleGrid,
  Spinner,
  Text,
  useToast,
} from "@chakra-ui/react";
import api from "@/lib/api";
import TaskCard from "@/components/TaskCard";
import { Task } from "@/lib/types/task";
import styles from "./page.module.css";

export default function TaskDashboard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [role, setRole] = useState<"creator" | "tasker">("creator");
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const loadTasks = async () => {
    setLoading(true);
    try {
      const data = await api.get<Task[]>(`/tasks?role=${role}`);
      setTasks(data);
    } catch (err: any) {
      toast({ status: "error", description: err.message || "Failed to load tasks" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [role]);

  return (
    <Box className={styles.container}>
      <HStack mb={4} spacing={4} align="center">
        <Heading size="md">Tasks</Heading>
        <Select w="150px" value={role} onChange={(e) => setRole(e.target.value as any)}>
          <option value="creator">Creator</option>
          <option value="tasker">Tasker</option>
        </Select>
      </HStack>
      {loading ? (
        <Spinner />
      ) : tasks.length === 0 ? (
        <Text>No tasks found</Text>
      ) : (
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
          {tasks.map((t) => (
            <TaskCard key={t.id} task={t} />
          ))}
        </SimpleGrid>
      )}
    </Box>
  );
}
