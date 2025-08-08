"use client";

import { useState, useEffect } from "react";
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  HStack,
  VStack,
  SimpleGrid,
  Text,
  useToast,
  Progress,
} from "@chakra-ui/react";
import api from "@/lib/api";
import CandidateTable, { Candidate } from "@/components/CandidateTable";
import styles from "./page.module.css";

interface Task {
  id: number;
  title: string;
  completed: boolean;
}

interface Allocation {
  id: number;
  job: string;
  budget: number;
}

export default function HeadhunterDashboard() {
  const [q, setQ] = useState("");
  const [location, setLocation] = useState("");
  const [expertise, setExpertise] = useState("");
  const [results, setResults] = useState<Candidate[]>([]);
  const [recs, setRecs] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskTitle, setTaskTitle] = useState("");
  const [allocations, setAllocations] = useState<Allocation[]>([]);
  const [jobTitle, setJobTitle] = useState("");
  const [budget, setBudget] = useState("");

  const search = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (q) params.set("q", q);
      if (location) params.set("location", location);
      if (expertise) params.set("expertise", expertise);
      const data = await api.get<Candidate[]>(`/headhunter/search?${params.toString()}`);
      setResults(data);
    } catch (err: any) {
      toast({ status: "error", description: err.message || "Search failed" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    api
      .get<Candidate[]>("/headhunter/recommendations")
      .then(setRecs)
      .catch((err) => console.error(err));
  }, []);

  const addTask = () => {
    if (!taskTitle) return;
    setTasks((t) => [...t, { id: Date.now(), title: taskTitle, completed: false }]);
    setTaskTitle("");
  };

  const toggleTask = (id: number) => {
    setTasks((t) => t.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)));
  };

  const addAllocation = () => {
    if (!jobTitle || !budget) return;
    setAllocations((a) => [...a, { id: Date.now(), job: jobTitle, budget: Number(budget) }]);
    setJobTitle("");
    setBudget("");
  };

  return (
    <Box className={styles.container}>
      <Heading mb={4}>Headhunter Dashboard</Heading>

      <Box className={styles.section}>
        <Heading size="md" mb={4}>
          Candidate Search
        </Heading>
        <HStack spacing={4} flexWrap="wrap" mb={4}>
          <FormControl maxW="200px">
            <FormLabel>Query</FormLabel>
            <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Name or keyword" />
          </FormControl>
          <FormControl maxW="200px">
            <FormLabel>Location</FormLabel>
            <Input value={location} onChange={(e) => setLocation(e.target.value)} />
          </FormControl>
          <FormControl maxW="200px">
            <FormLabel>Expertise</FormLabel>
            <Input value={expertise} onChange={(e) => setExpertise(e.target.value)} />
          </FormControl>
          <Button colorScheme="brand" onClick={search} isLoading={loading} alignSelf="flex-end">
            Search
          </Button>
        </HStack>
        {loading && <Progress size="xs" isIndeterminate />}
        {results.length > 0 && <CandidateTable candidates={results} />}
      </Box>

      <Box className={styles.section}>
        <Heading size="md" mb={4}>
          AI Recommendations
        </Heading>
        {recs.length > 0 ? (
          <CandidateTable candidates={recs} />
        ) : (
          <Text>No recommendations available.</Text>
        )}
      </Box>

      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} className={styles.section}>
        <Box>
          <Heading size="md" mb={4}>
            Task Management
          </Heading>
          <HStack mb={4}>
            <Input
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              placeholder="New task"
            />
            <Button onClick={addTask} colorScheme="brand">
              Add
            </Button>
          </HStack>
          <VStack align="stretch" spacing={2}>
            {tasks.map((task) => (
              <HStack
                key={task.id}
                p={2}
                borderWidth="1px"
                borderRadius="md"
                bg={task.completed ? "green.50" : "white"}
                onClick={() => toggleTask(task.id)}
                cursor="pointer"
              >
                <Text as={task.completed ? "s" : undefined}>{task.title}</Text>
              </HStack>
            ))}
          </VStack>
        </Box>

        <Box>
          <Heading size="md" mb={4}>
            Job Allocation
          </Heading>
          <HStack mb={4}>
            <Input
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              placeholder="Job title"
            />
            <Input
              type="number"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              placeholder="Budget"
            />
            <Button onClick={addAllocation} colorScheme="brand">
              Allocate
            </Button>
          </HStack>
          <VStack align="stretch" spacing={2}>
            {allocations.map((a) => (
              <HStack key={a.id} p={2} borderWidth="1px" borderRadius="md" bg="white">
                <Text>{a.job}</Text>
                <Text ml="auto" fontWeight="bold">
                  ${a.budget}
                </Text>
              </HStack>
            ))}
          </VStack>
        </Box>
      </SimpleGrid>
    </Box>
  );
}
