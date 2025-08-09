"use client";

import { useEffect, useState } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  SimpleGrid,
  Button,
  Text,
  Spinner,
  HStack,
} from "@chakra-ui/react";
import Link from "next/link";
import api from "@/lib/api";
import TaskCard from "@/components/TaskCard";
import { Task } from "@/lib/types/task";
import styles from "./page.module.css";

export default function TaskBrowsePage() {
  const [search, setSearch] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadTasks = async () => {
    setLoading(true);
    setError("");
    try {
      const params = new URLSearchParams();
      if (search) params.set("search", search);
      const data = await api.get<Task[]>(`/tasks?${params.toString()}`);
      setTasks(data);
    } catch (err: any) {
      setError(err.message || "Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box className={styles.container}>
      <HStack justify="space-between" align="flex-end" mb={4}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            loadTasks();
          }}
          className={styles.searchForm}
        >
          <FormControl>
            <FormLabel>Search</FormLabel>
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search tasks"
            />
          </FormControl>
        </form>
        <Button colorScheme="brand" onClick={loadTasks}>
          Apply
        </Button>
        <Button as={Link} href="/tasks/create" colorScheme="brand" variant="outline">
          New Task
        </Button>
      </HStack>
      {error && (
        <Text color="red.500" mt={4}>
          {error}
        </Text>
      )}
      {loading ? (
        <Spinner mt={4} />
      ) : (
        <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={4} mt={4}>
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </SimpleGrid>
      )}
    </Box>
  );
}
