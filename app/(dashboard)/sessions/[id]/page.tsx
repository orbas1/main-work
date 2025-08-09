"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Box,
  Heading,
  Text,
  HStack,
  Avatar,
  VStack,
  Button,
  Spinner,
  Badge,
} from "@chakra-ui/react";
import { fetchSession, registerSession } from "@/lib/services/sessionClient";
import { NetworkingSession } from "@/lib/types/session";
import styles from "./page.module.css";

export default function SessionDetailsPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const id = Number(params.id);
  const [session, setSession] = useState<NetworkingSession | null>(null);
  const [loading, setLoading] = useState(true);
  const [registering, setRegistering] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchSession(id)
      .then((data) => setSession(data))
      .catch((err) => setError(err.message || "Failed to load session"))
      .finally(() => setLoading(false));
  }, [id]);

  const register = async () => {
    setRegistering(true);
    try {
      await registerSession(id);
      router.push(`/sessions/${id}/networking`);
    } catch (err: any) {
      setError(err.message || "Registration failed");
    } finally {
      setRegistering(false);
    }
  };

  if (loading) return <Spinner />;
  if (!session) return <Text>{error || "Session not found"}</Text>;

  return (
    <Box className={styles.container}>
      <Heading mb={2}>{session.title}</Heading>
      <HStack mb={4} spacing={3}>
        <Avatar size="md" name={session.host.name || "Host"} src={session.host.image || undefined} />
        <VStack align="start" spacing={0}>
          <Text fontWeight="bold">{session.host.name}</Text>
          <Text fontSize="sm" color="gray.600">
            {new Date(session.date).toLocaleString()} • {session.duration} min
          </Text>
        </VStack>
        <Badge colorScheme={session.price > 0 ? "purple" : "green"} ml="auto">
          {session.price > 0 ? `$${session.price}` : "Free"}
        </Badge>
      </HStack>
      {session.description && (
        <Text mb={4}>{session.description}</Text>
      )}
      <Text mb={2}>
        {session.availableSeats} of {session.capacity} seats remaining
      </Text>
      <Button colorScheme="brand" onClick={register} isLoading={registering} disabled={session.availableSeats <= 0}>
        {session.availableSeats > 0 ? "Register" : "Full"}
      </Button>
    </Box>
  );
}
