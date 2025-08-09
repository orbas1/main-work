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
  Image,
  Link,
  Container,
  Spinner,
} from "@chakra-ui/react";
import NextLink from "next/link";
import TestimonialCarousel from "@/components/TestimonialCarousel";
import FeatureCard from "@/components/FeatureCard";
import SolutionCard from "@/components/SolutionCard";
import { fetchJson } from "@/lib/fetcher";
import styles from "./page.module.css";

export default function LandingPage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const heroImages = [
    "https://raw.githubusercontent.com/ServiceStack/images/master/hero/photo-1462331940025-496dfbfc7564.jpg",
    "https://raw.githubusercontent.com/ServiceStack/images/master/hero/photo-1495431088732-09e59535d241.jpg",
    "https://raw.githubusercontent.com/ServiceStack/images/master/hero/photo-1503435980610-a51f3ddfee50.jpg",
  ];
  const [heroIndex, setHeroIndex] = useState(0);
  interface Feature {
    id: number;
    title: string;
    description: string;
    imageUrl: string;
  }
  interface Solution {
    id: number;
    title: string;
    description: string;
    imageUrl: string;
    ctaText?: string | null;
  }
  const [features, setFeatures] = useState<Feature[]>([]);
  const [solutions, setSolutions] = useState<Solution[]>([]);
  const [loadingContent, setLoadingContent] = useState(true);

  useEffect(() => {
    const handler = () => setIsScrolled(window.scrollY > 10);
    handler();
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    const id = setInterval(
      () => setHeroIndex((i) => (i + 1) % heroImages.length),
      5000
    );
    return () => clearInterval(id);
  }, [heroImages.length]);

  useEffect(() => {
    async function loadContent() {
      try {
        const [featData, solData] = await Promise.all([
          fetchJson<Feature[]>("/api/features"),
          fetchJson<Solution[]>("/api/solutions"),
        ]);
        setFeatures(featData);
        setSolutions(solData);
      } catch (err) {
        console.error("Failed to load landing content", err);
      } finally {
        setLoadingContent(false);
      }
    }
    loadContent();
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
          <Link as={NextLink} href="#solutions">Solutions</Link>
          <Link as={NextLink} href="/about">About</Link>
          <Button as={NextLink} href="/login" variant="ghost">
            Login
          </Button>
          <Button as={NextLink} href="/signup" colorScheme="brand">
            Sign Up
          </Button>
        </Stack>
      </Flex>

      <Box className={styles.hero}>
        <Image
          src={heroImages[heroIndex]}
          alt="Inspiring workplace"
          className={styles.heroImage}
        />
        <Box className={styles.heroOverlay}>
          <Container maxW="4xl" textAlign="center">
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
      </Box>

      <Box py={20} px={4} id="features">
        <Container maxW="6xl">
          <Heading size="lg" textAlign="center" mb={10}>
            Platform Highlights
          </Heading>
          {loadingContent ? (
            <Flex justify="center" py={10}>
              <Spinner />
            </Flex>
          ) : (
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
              {features.map((f) => (
                <FeatureCard
                  key={f.id}
                  title={f.title}
                  description={f.description}
                  imageUrl={f.imageUrl}
                />
              ))}
            </SimpleGrid>
          )}
        </Container>
      </Box>

      <Box py={20} px={4} bg="gray.50" id="solutions">
        <Container maxW="6xl">
          <Heading size="lg" textAlign="center" mb={10}>
            Enterprise Solutions
          </Heading>
          {loadingContent ? (
            <Flex justify="center" py={10}>
              <Spinner />
            </Flex>
          ) : (
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
              {solutions.map((s) => (
                <SolutionCard
                  key={s.id}
                  title={s.title}
                  description={s.description}
                  imageUrl={s.imageUrl}
                  ctaText={s.ctaText || undefined}
                />
              ))}
            </SimpleGrid>
          )}
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

      <Box py={20} px={4} id="pricing">
        <Container maxW="6xl">
          <Heading size="lg" textAlign="center" mb={10}>
            Flexible Pricing
          </Heading>
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
            <Stack
              spacing={4}
              p={6}
              bg="white"
              borderRadius="md"
              boxShadow="lg"
              align="center"
              className={styles.pricingCard}
            >
              <Heading size="md">Starter</Heading>
              <Text fontSize="2xl" fontWeight="bold">Free</Text>
              <Stack spacing={1}>
                <Text>Basic job matching</Text>
                <Text>Community support</Text>
              </Stack>
              <Button colorScheme="brand" variant="outline">
                Get Starter
              </Button>
            </Stack>
            <Stack
              spacing={4}
              p={6}
              bg="white"
              borderRadius="md"
              boxShadow="lg"
              align="center"
              className={styles.pricingCard}
            >
              <Heading size="md">Pro</Heading>
              <Text fontSize="2xl" fontWeight="bold">$29/mo</Text>
              <Stack spacing={1}>
                <Text>Advanced analytics</Text>
                <Text>Priority support</Text>
              </Stack>
              <Button colorScheme="brand" variant="outline">
                Choose Pro
              </Button>
            </Stack>
            <Stack
              spacing={4}
              p={6}
              bg="white"
              borderRadius="md"
              boxShadow="lg"
              align="center"
              className={styles.pricingCard}
            >
              <Heading size="md">Enterprise</Heading>
              <Text fontSize="2xl" fontWeight="bold">Contact Us</Text>
              <Stack spacing={1}>
                <Text>Custom integrations</Text>
                <Text>Dedicated manager</Text>
              </Stack>
              <Button colorScheme="brand" variant="outline">
                Talk to Sales
              </Button>
            </Stack>
          </SimpleGrid>
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
            <Link as={NextLink} href="#solutions">
              Solutions
            </Link>
            <Link as={NextLink} href="/about">
              About
            </Link>
            <Link as={NextLink} href="#pricing">
              Pricing
            </Link>
            <Link as={NextLink} href="/privacy">
              Privacy
            </Link>
            <Link as={NextLink} href="/terms">
              Terms
            </Link>
          </Stack>
          <Text fontSize="sm">© {new Date().getFullYear()} Orbas</Text>
        </Container>
      </Box>
    </Box>
  );
}
