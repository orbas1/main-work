'use client';

import { Box, Heading, Text } from "@chakra-ui/react";

export default function ContractDetailPage({ params }: { params: { id: string } }) {
  return (
    <Box p={4}>
      <Heading size="md" mb={2}>
        Contract {params.id}
      </Heading>
      <Text>Contract details will be available soon.</Text>
    </Box>
  );
}

