"use client";

import { Box, Input, Stack, Heading, Button, Textarea, Progress } from "@chakra-ui/react";

export default function DocumentsPage() {
  return (
    <Box maxW="lg" mx="auto" mt={10} p={6} bg="white" shadow="md" borderRadius="lg">
      <Progress value={100} mb={6} />
      <Heading size="md" mb={6} textAlign="center">
        Step 3 of 3
      </Heading>
      <Stack spacing={4}>
        <Input type="file" accept=".pdf,.doc,.docx" />
        <Textarea placeholder="Cover Letter" />
        <Button colorScheme="brand">Submit</Button>
      </Stack>
    </Box>
  );
}
