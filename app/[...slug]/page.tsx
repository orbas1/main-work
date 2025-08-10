"use client";

import { Box, Heading, Text } from "@chakra-ui/react";

export default function PlaceholderPage({ params }: { params: { slug: string[] } }) {
  const path = `/${params.slug.join("/")}`;
  return (
    <Box p={8} textAlign="center">
      <Heading size="lg" mb={4}>
        Page Under Construction
      </Heading>
      <Text>The page <strong>{path}</strong> is coming soon.</Text>
    </Box>
  );
}
