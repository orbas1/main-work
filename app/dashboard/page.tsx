"use client";

import { Box } from "@chakra-ui/react";
import LiveFeed from "@/components/LiveFeed";

export default function DashboardPage() {
  return (
    <Box bg="slate.50" minH="100vh">
      <LiveFeed />
    </Box>
  );
}
