"use client";

import { useEffect, useState } from "react";
import { Box, Button, Flex, Heading, Text, Stack, SimpleGrid, Icon, Image, Link } from "@chakra-ui/react";
import NextLink from "next/link";
import { FaBrain, FaTasks, FaChartLine } from "react-icons/fa";
import TestimonialCarousel from "@/components/TestimonialCarousel";
import styles from "./page.module.css";

export default function LandingPage() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setIsScrolled(window.scrollY > 10);
    handler();
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <Box>
      <Flex
        as="header"
        justify="space-between"
        align="center"
        p={4}
        position="sticky"
        top={0}
        className={`${styles.header} ${isScrolled ? styles.scrolled : ""}`}
      >
        <Heading size="md">Orbas</Heading>
        <Stack direction="row" spacing={4} align="center">
          <Button as={NextLink} href="/login" variant="ghost">Login</Button>
          <Button as={NextLink} href="/signup" colorScheme="brand">Sign Up</Button>
        </Stack>
      </Flex>

      <Box textAlign="center" py={24} px={4} bg="gray.50">
        <Heading size="2xl" mb={4}>Revolutionize Your Recruitment & Gig Management</Heading>
        <Text fontSize="lg" mb={8}>AI-powered matching, integrated gig management and real-time analytics.</Text>
        <Button colorScheme="brand" size="lg" as={NextLink} href="/signup">Get Started</Button>
      </Box>

      <Box py={20} px={4}>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
          <Stack align="center" spacing={3}>
            <Icon as={FaBrain} boxSize={8} color="brand.500" />
            <Heading size="md">AI-Powered Matching</Heading>
            <Text textAlign="center">Connect with the right opportunities using intelligent algorithms.</Text>
          </Stack>
          <Stack align="center" spacing={3}>
            <Icon as={FaTasks} boxSize={8} color="brand.500" />
            <Heading size="md">Integrated Gig Management</Heading>
            <Text textAlign="center">Manage tasks and projects seamlessly in one place.</Text>
          </Stack>
          <Stack align="center" spacing={3}>
            <Icon as={FaChartLine} boxSize={8} color="brand.500" />
            <Heading size="md">Real-Time Analytics</Heading>
            <Text textAlign="center">Gain insights with up-to-the-minute data and reports.</Text>
          </Stack>
        </SimpleGrid>
      </Box>

      <Box py={20} px={4} bg="gray.50" textAlign="center">
        <Heading size="lg" mb={6}>What people are saying</Heading>
        <TestimonialCarousel />
        <Stack direction="row" spacing={10} justify="center" align="center" mt={10}>
          <Image src="/next.svg" alt="Partner" boxSize="60px" opacity={0.6} />
          <Image src="/vercel.svg" alt="Partner" boxSize="60px" opacity={0.6} />
        </Stack>
      </Box>

      <Box py={20} px={4} textAlign="center">
        <Heading size="lg" mb={4}>Ready to get started?</Heading>
        <Button colorScheme="brand" size="lg" as={NextLink} href="/signup">Join Now</Button>
      </Box>

      <Box as="footer" py={10} px={4} bg="gray.800" color="gray.200" textAlign="center">
        <Stack direction="row" spacing={6} justify="center" mb={4}>
          <Link as={NextLink} href="#">Privacy Policy</Link>
          <Link as={NextLink} href="#">Terms of Service</Link>
          <Link as={NextLink} href="#">Help Center</Link>
        </Stack>
        <Text fontSize="sm">© {new Date().getFullYear()} Orbas</Text>
      </Box>
    </Box>
  );
}
