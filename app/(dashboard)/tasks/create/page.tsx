"use client";

import { useState } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  Stack,
  HStack,
  NumberInput,
  NumberInputField,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import styles from "./page.module.css";

export default function TaskCreatePage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [budgetMin, setBudgetMin] = useState("");
  const [budgetMax, setBudgetMax] = useState("");
  const [deadline, setDeadline] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/tasks", {
        title,
        description,
        budgetMin: budgetMin ? Number(budgetMin) : undefined,
        budgetMax: budgetMax ? Number(budgetMax) : undefined,
        deadline: deadline || undefined,
      });
      toast({ status: "success", title: "Task created" });
      router.push("/tasks");
    } catch (err: any) {
      toast({ status: "error", title: err.message || "Failed to create task" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box className={styles.container}>
      <form onSubmit={handleSubmit}>
        <Stack spacing={4}>
          <FormControl isRequired>
            <FormLabel>Title</FormLabel>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Description</FormLabel>
            <Textarea value={description} onChange={(e) => setDescription(e.target.value)} />
          </FormControl>
          <HStack spacing={4}>
            <FormControl>
              <FormLabel>Min Budget</FormLabel>
              <NumberInput min={0} value={budgetMin} onChange={(v) => setBudgetMin(v)}>
                <NumberInputField />
              </NumberInput>
            </FormControl>
            <FormControl>
              <FormLabel>Max Budget</FormLabel>
              <NumberInput min={0} value={budgetMax} onChange={(v) => setBudgetMax(v)}>
                <NumberInputField />
              </NumberInput>
            </FormControl>
          </HStack>
          <FormControl>
            <FormLabel>Deadline</FormLabel>
            <Input type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} />
          </FormControl>
          <Button type="submit" colorScheme="brand" isLoading={loading}>
            Publish Task
          </Button>
        </Stack>
      </form>
    </Box>
  );
}
