"use client";

import { Box, Heading, SimpleGrid } from "@chakra-ui/react";
import SessionCard from "@/components/SessionCard";
import { networkingSessions } from "@/lib/sessions";

export default function SessionsPage() {
  return (
    <Box p={4} bg="slate.50" minH="100vh">
      <Heading mb={4}>Networking Sessions</Heading>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
        {networkingSessions.map((session) => (
          <SessionCard key={session.id} session={session} />
        ))}
      </SimpleGrid>
    </Box>
  );
}

