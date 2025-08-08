"use client";

import { Container, Heading, Text } from "@chakra-ui/react";

export default function PrivacyPage() {
  return (
    <Container maxW="4xl" py={20}>
      <Heading mb={4}>Privacy Policy</Heading>
      <Text>
        We are committed to protecting your personal information and ensuring transparency about how
        your data is used within the Orbas platform.
      </Text>
    </Container>
  );
}
