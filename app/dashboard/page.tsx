"use client";

import { Box, Heading, SimpleGrid } from "@chakra-ui/react";
import LiveFeed from "@/components/LiveFeed";
import SessionCard from "@/components/SessionCard";
import CalendarWidget from "@/components/CalendarWidget";
import WeatherWidget from "@/components/WeatherWidget";
import { networkingSessions } from "@/lib/sessions";

export default function DashboardPage() {
  return (
    <Box bg="gray.900" minH="100vh" p={6} color="white">
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
        <WeatherWidget />
        <CalendarWidget />
        <LiveFeed />
        <Box>
          <Heading size="md" mb={4}>
            Upcoming Sessions
          </Heading>
          {networkingSessions.slice(0, 2).map((session) => (
            <SessionCard key={session.id} session={session} />
          ))}
        </Box>
      </SimpleGrid>
    </Box>
  );
}

