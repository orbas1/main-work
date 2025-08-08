"use client";

import { Container, Heading, Text } from "@chakra-ui/react";

export default function TermsPage() {
  return (
    <Container maxW="4xl" py={20}>
      <Heading mb={4}>Terms and Conditions</Heading>
      <Text>
        By accessing or using Orbas, you agree to our terms and conditions. Please review them
        carefully to understand your rights and obligations when using our services.
      </Text>
    </Container>
  );
}
