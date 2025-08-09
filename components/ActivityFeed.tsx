"use client";

import { Box, Heading, List, ListItem } from "@chakra-ui/react";
import { useDashboard } from "@/components/DashboardContext";
import styles from "./ActivityFeed.module.css";

export default function ActivityFeed() {
  const dashboard = useDashboard();
  const updates = dashboard?.updates.slice(0, 5) || [];
  if (!updates.length) return null;
  return (
    <Box className={styles.feed} mt={6}>
      <Heading size="md" mb={4}>
        Recent Activity
      </Heading>
      <List spacing={2}>
        {updates.map((n) => (
          <ListItem key={n.id}>
            {n.message} - {new Date(n.createdAt).toLocaleString()}
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
