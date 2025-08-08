"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Flex,
  Heading,
  Text,
  Stack,
  SimpleGrid,
  Icon,
  Image,
  Link,
  Container,
} from "@chakra-ui/react";
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
        bg="white"
        zIndex={10}
      >
        <Heading size="md">Orbas</Heading>
        <Stack direction="row" spacing={6} align="center">
          <Link as={NextLink} href="#features">Features</Link>
          <Link as={NextLink} href="#about">About</Link>
          <Button as={NextLink} href="/login" variant="ghost">
            Login
          </Button>
          <Button as={NextLink} href="/signup" colorScheme="brand">
            Sign Up
          </Button>
        </Stack>
      </Flex>

      <Box textAlign="center" py={24} px={4} bg="gray.50">
        <Container maxW="4xl">
          <Heading size="2xl" mb={4}>
            Empowering Talent with AI and Insight
          </Heading>
          <Text fontSize="lg" mb={8}>
            Streamline recruiting, manage gigs, and track performance with one integrated platform.
          </Text>
          <Button colorScheme="brand" size="lg" as={NextLink} href="/signup">
            Get Started
          </Button>
        </Container>
      </Box>

      <Box py={20} px={4} id="features">
        <Container maxW="6xl">
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
        </Container>
      </Box>

      <Box py={20} px={4} bg="white" id="about">
        <Container maxW="4xl" textAlign="center">
          <Heading size="lg" mb={4}>About Us</Heading>
          <Text mb={6}>
            Orbas brings job seekers, freelancers, and employers together. Our mission is to simplify talent discovery
            and collaboration through intuitive tools and smart automation.
          </Text>
          <Image src="/globe.svg" alt="About Orbas" mx="auto" boxSize={{ base: "150px", md: "200px" }} />
        </Container>
      </Box>

      <Box py={20} px={4} bg="gray.50" textAlign="center">
        <Container maxW="6xl">
          <Heading size="lg" mb={6}>
            What people are saying
          </Heading>
          <TestimonialCarousel />
          <Stack direction="row" spacing={10} justify="center" align="center" mt={10}>
            <Image src="/next.svg" alt="Partner" boxSize="60px" opacity={0.6} />
            <Image src="/vercel.svg" alt="Partner" boxSize="60px" opacity={0.6} />
          </Stack>
        </Container>
      </Box>

      <Box py={20} px={4} textAlign="center">
        <Container maxW="4xl">
          <Heading size="lg" mb={4}>Ready to get started?</Heading>
          <Button colorScheme="brand" size="lg" as={NextLink} href="/signup">
            Join Now
          </Button>
        </Container>
      </Box>

      <Box as="footer" py={10} px={4} bg="gray.800" color="gray.200">
        <Container maxW="6xl" textAlign="center">
          <Image src="/next.svg" alt="Orbas logo" mx="auto" mb={4} boxSize="50px" />
          <Stack direction="row" spacing={6} justify="center" mb={4}>
            <Link as={NextLink} href="#">
              Home
            </Link>
            <Link as={NextLink} href="#features">
              Features
            </Link>
            <Link as={NextLink} href="#about">
              About
            </Link>
            <Link as={NextLink} href="#">
              Contact
            </Link>
            <Link as={NextLink} href="#">
              Privacy
            </Link>
            <Link as={NextLink} href="#">
              Terms
            </Link>
          </Stack>
          <Text fontSize="sm">© {new Date().getFullYear()} Orbas</Text>
        </Container>
      </Box>
    </Box>
  );
}
