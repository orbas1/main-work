'use client';

import { Box, Heading, Text } from "@chakra-ui/react";
import { use } from "react";

export default function JobDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  return (
    <Box p={4}>
      <Heading size="md" mb={2}>
        Job {id}
      </Heading>
      <Text>Job details coming soon.</Text>
    </Box>
  );
}

