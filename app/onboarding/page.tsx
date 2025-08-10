"use client";

import { Box, Heading, Text } from "@chakra-ui/react";

export default function OnboardingPage() {
  return (
    <Box p={4}>
      <Heading size="md" mb={4}>
        Onboarding
      </Heading>
      <Text>Welcome! This page will guide new users through onboarding steps.</Text>
    </Box>
  );
}

