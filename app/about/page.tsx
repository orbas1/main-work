"use client";

import { Container, Heading, Text } from "@chakra-ui/react";

export default function AboutPage() {
  return (
    <Container maxW="4xl" py={20}>
      <Heading mb={4}>About Orbas</Heading>
      <Text mb={2}>
        Orbas is dedicated to empowering professionals and organizations with tools that simplify
        collaboration and unlock opportunity.
      </Text>
      <Text>
        Our platform blends advanced matching, workflow automation, and insightful analytics to help
        teams hire, manage gigs, and grow with confidence.
      </Text>
    </Container>
  );
}
