"use client";

import { Box, Heading, Text } from "@chakra-ui/react";

export default function UnderConstruction({ title }: { title: string }) {
  return (
    <Box p={8} textAlign="center">
      <Heading size="lg" mb={4}>
        {title}
      </Heading>
      <Text>This page is under construction.</Text>
    </Box>
  );
}
