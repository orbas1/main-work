"use client";

import {
  Box,
  Heading,
  SimpleGrid,
  VStack,
  Link as ChakraLink,
} from "@chakra-ui/react";
import NextLink from "next/link";
import SummaryWidget from "@/components/SummaryWidget";
import CourseProgress from "@/components/CourseProgress";
import DashboardCard from "@/components/DashboardCard";

export default function DashboardPage() {
  return (
    <Box bg="slate.50" minH="100vh" p={4}>
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4} mb={8}>
        <SummaryWidget label="Courses Enrolled" value={3} />
        <SummaryWidget label="Jobs Applied" value={12} />
        <SummaryWidget label="Tasks Completed" value={8} />
      </SimpleGrid>

      <Heading size="md" mb={4}>
        Learning
      </Heading>
      <VStack align="stretch" spacing={4} mb={8}>
        <CourseProgress
          title="Intro to TypeScript"
          progress={0.6}
          nextSession="2024-08-01"
          recommendation="Generics Deep Dive"
        />
        <CourseProgress
          title="Next.js Fundamentals"
          progress={0.3}
          nextSession="2024-08-15"
          recommendation="Routing Tutorial"
        />
      </VStack>

      <DashboardCard title="Community">
        <ChakraLink as={NextLink} href="/live-feed" color="brand.500">
          View Live Feed
        </ChakraLink>
      </DashboardCard>
    </Box>
  );
}
