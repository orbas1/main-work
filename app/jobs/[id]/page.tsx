'use client';

import { Box, Heading, Text } from "@chakra-ui/react";

export default function JobDetailPage({ params }: { params: { id: string } }) {
  return (
    <Box p={4}>
      <Heading size="md" mb={2}>
        Job {params.id}
      </Heading>
      <Text>Job details coming soon.</Text>
    </Box>
  );
}

