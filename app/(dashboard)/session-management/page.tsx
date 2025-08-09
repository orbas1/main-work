"use client";

import { useEffect, useState, useCallback } from "react";
import {
  Box,
  Heading,
  Flex,
  Button,
  Text,
  useToast,
} from "@chakra-ui/react";
import SessionParticipantList from "@/components/SessionParticipantList";
import api from "@/lib/api";
import styles from "./page.module.css";

interface Session {
  id: number;
  title: string;
  status: string;
  duration: number;
  participants: { id: number; user: { id: number; name: string | null; image?: string | null; title?: string | null } }[];
}

export default function SessionManagementPage() {
  const [sessionData, setSessionData] = useState<Session | null>(null);
  const toast = useToast();

  const load = useCallback(() => {
    api
      .get<Session[]>("/sessions")
      .then((res) => setSessionData(res[0] || null))
      .catch(() => toast({ status: "error", title: "Failed to load" }));
  }, [toast]);

  useEffect(() => {
    load();
  }, [load]);

  const update = (data: any) =>
    api.put<Session>("/sessions", { id: sessionData?.id, ...data }).then((res) => {
      setSessionData(res);
    });

  const extend = () => update({ duration: (sessionData?.duration || 0) + 5 });
  const togglePause = () =>
    update({ status: sessionData?.status === "paused" ? "live" : "paused" });

  const removeParticipant = (userId: number) => {
    if (!sessionData) return;
    api
      .delete(`/sessions/${sessionData.id}/participants?userId=${userId}`)
      .then(load)
      .catch(() => toast({ status: "error", title: "Failed to remove" }));
  };

  if (!sessionData) {
    return (
      <Box className={styles.container}>
        <Text> No active sessions.</Text>
      </Box>
    );
  }

  return (
    <Box className={styles.container}>
      <Heading mb={4}>{sessionData.title}</Heading>
      <Flex mb={4} gap={2} align="center">
        <Text>Status: {sessionData.status}</Text>
        <Text>Duration: {sessionData.duration} mins</Text>
        <Button size="sm" onClick={extend} colorScheme="brand">
          Extend 5 min
        </Button>
        <Button size="sm" onClick={togglePause} variant="outline">
          {sessionData.status === "paused" ? "Resume" : "Pause"}
        </Button>
      </Flex>
      <SessionParticipantList
        participants={sessionData.participants}
        onRemove={removeParticipant}
      />
    </Box>
  );
}
