"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  Box,
  Heading,
  Text,
  Stack,
  FormControl,
  FormLabel,
  NumberInput,
  NumberInputField,
  Textarea,
  Button,
  useToast,
  Spinner,
} from "@chakra-ui/react";
import api from "@/lib/api";
import { Task } from "@/lib/types/task";
import styles from "./page.module.css";

interface DetailedTask extends Task {
  bids: { id: number; amount: number; message?: string; bidder: { id: number; name: string | null } }[];
  creator: { id: number; name: string | null };
}

export default function TaskDetailPage() {
  const params = useParams<{ id: string }>();
  const [task, setTask] = useState<DetailedTask | null>(null);
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const toast = useToast();

  const loadTask = async () => {
    try {
      const data = await api.get<DetailedTask>(`/tasks/${params.id}`);
      setTask(data);
    } catch (err: any) {
      toast({ status: "error", title: err.message || "Failed to load task" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTask();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id]);

  const submitBid = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await api.post(`/tasks/${params.id}/bids`, {
        amount: Number(amount),
        message: message || undefined,
      });
      toast({ status: "success", title: "Bid submitted" });
      setAmount("");
      setMessage("");
      loadTask();
    } catch (err: any) {
      toast({ status: "error", title: err.message || "Failed to submit bid" });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading || !task) return <Spinner className={styles.spinner} />;

  return (
    <Box className={styles.container}>
      <Heading mb={4}>{task.title}</Heading>
      <Text mb={4}>{task.description}</Text>
      <Stack spacing={2} mb={6}>
        {(task.budgetMin || task.budgetMax) && (
          <Text>
            Budget: {task.budgetMin ? `$${task.budgetMin}` : ""} {task.budgetMax ? `- $${task.budgetMax}` : ""}
          </Text>
        )}
        {task.deadline && <Text>Deadline: {new Date(task.deadline).toLocaleDateString()}</Text>}
        <Text>Posted by: {task.creator?.name}</Text>
      </Stack>
      <form onSubmit={submitBid}>
        <Stack spacing={4}>
          <FormControl isRequired>
            <FormLabel>Bid Amount</FormLabel>
            <NumberInput min={0} value={amount} onChange={(v) => setAmount(v)}>
              <NumberInputField />
            </NumberInput>
          </FormControl>
          <FormControl>
            <FormLabel>Message</FormLabel>
            <Textarea value={message} onChange={(e) => setMessage(e.target.value)} />
          </FormControl>
          <Button type="submit" colorScheme="brand" isLoading={submitting}>
            Place Bid
          </Button>
        </Stack>
      </form>
      {task.bids.length > 0 && (
        <Box mt={10}>
          <Heading size="md" mb={4}>
            Bids
          </Heading>
          <Stack spacing={3}>
            {task.bids.map((bid) => (
              <Box key={bid.id} borderWidth="1px" borderRadius="md" p={3}>
                <Text fontWeight="bold">${bid.amount}</Text>
                {bid.message && <Text>{bid.message}</Text>}
                <Text fontSize="sm">By {bid.bidder?.name}</Text>
              </Box>
            ))}
          </Stack>
        </Box>
      )}
    </Box>
  );
}
