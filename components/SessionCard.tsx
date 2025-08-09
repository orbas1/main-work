"use client";

import NextLink from "next/link";
import {
  Box,
  Text,
  HStack,
  VStack,
  Badge,
  Button,
  Avatar,
} from "@chakra-ui/react";
import { NetworkingSession } from "@/lib/types/session";
import styles from "./SessionCard.module.css";

export default function SessionCard({ session }: { session: NetworkingSession }) {
  return (
    <Box
      borderWidth="1px"
      borderRadius="md"
      p={4}
      bg="white"
      className={styles.card}
    >
      <HStack justify="space-between" mb={2}>
        <Text fontWeight="bold">{session.title}</Text>
        <Badge colorScheme={session.price > 0 ? "purple" : "green"}>
          {session.price > 0 ? `$${session.price}` : "Free"}
        </Badge>
      </HStack>
      <HStack mb={2} spacing={3}>
        <Avatar size="sm" name={session.host.name || "Host"} src={session.host.image || undefined} />
        <Text fontSize="sm">{session.host.name}</Text>
      </HStack>
      <VStack align="start" spacing={1} mb={3}>
        <Text fontSize="sm" color="gray.600">
          {new Date(session.date).toLocaleString()} • {session.duration} min
        </Text>
        <Text fontSize="sm" color="gray.600">
          {session.availableSeats} / {session.capacity} seats available
        </Text>
      </VStack>
      <HStack justify="flex-end">
        <Button
          as={NextLink}
          href={`/sessions/${session.id}`}
          size="sm"
          colorScheme="brand"
        >
          View Details
        </Button>
      </HStack>
    </Box>
  );
}
