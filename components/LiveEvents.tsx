"use client";

import { useEffect, useState } from "react";
import { Box, Heading, VStack, Text } from "@chakra-ui/react";
import { LiveEvent, getLiveEvents } from "@/lib/services/liveFeedService";
import styles from "./LiveEvents.module.css";

export default function LiveEvents() {
  const [events, setEvents] = useState<LiveEvent[]>([]);

  useEffect(() => {
    getLiveEvents().then(setEvents).catch(() => setEvents([]));
  }, []);

  return (
    <Box className={styles.container} bg="white" p={4} borderWidth="1px" borderRadius="md">
      <Heading size="md" mb={2}>
        Live Now
      </Heading>
      <VStack align="stretch" spacing={2}>
        {events.map((event) => (
          <Box key={event.id} p={2} borderWidth="1px" borderRadius="md">
            <Text fontWeight="bold">{event.title}</Text>
            <Text fontSize="sm" color="gray.500">
              {event.status}
            </Text>
          </Box>
        ))}
        {events.length === 0 && (
          <Text fontSize="sm" color="gray.500">
            No live events
          </Text>
        )}
      </VStack>
    </Box>
  );
}
