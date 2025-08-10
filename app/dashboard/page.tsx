"use client";

import { Box, Heading, SimpleGrid } from "@chakra-ui/react";
import LiveFeed from "@/components/LiveFeed";
import SessionCard from "@/components/SessionCard";
import { networkingSessions } from "@/lib/sessions";

export default function DashboardPage() {
  return (
    <Box bg="slate.50" minH="100vh">
      <LiveFeed />
      <Box p={4}>
        <Heading size="md" mb={4}>
          Upcoming Sessions
        </Heading>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
          {networkingSessions.slice(0, 2).map((session) => (
            <SessionCard key={session.id} session={session} />
          ))}
        </SimpleGrid>
      </Box>
    </Box>
  );
}

