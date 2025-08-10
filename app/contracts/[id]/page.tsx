'use client';

import { Box, Heading, Text } from "@chakra-ui/react";
import { use } from "react";

export default function ContractDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  return (
    <Box p={4}>
      <Heading size="md" mb={2}>
        Contract {id}
      </Heading>
      <Text>Contract details will be available soon.</Text>
    </Box>
  );
}

