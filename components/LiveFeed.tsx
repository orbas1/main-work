"use client";

import { Box, Heading, VStack, Text } from "@chakra-ui/react";
import { useDashboard } from "@/components/DashboardContext";
import styles from "./LiveFeed.module.css";

export default function LiveFeed() {
  const dashboard = useDashboard();
  const notifications = dashboard?.updates || [];
  if (!notifications.length)
    return <Text>No live updates</Text>;
  return (
    <Box className={styles.feed}>
      <Heading size="md" mb={4}>
        Live Feed
      </Heading>
      <VStack spacing={4} align="stretch">
        {notifications.map((n) => (
          <Box key={n.id} p={4} bg="white" borderRadius="md" boxShadow="sm">
            <Text>{n.message}</Text>
            <Text fontSize="sm" color="gray.500">
              {new Date(n.createdAt).toLocaleString()}
            </Text>
          </Box>
        ))}
      </VStack>
    </Box>
  );
}
