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
} from "@chakra-ui/react";
import NextLink from "next/link";
import TestimonialCarousel from "@/components/TestimonialCarousel";
import styles from "./page.module.css";

export default function LandingPage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const heroImages = [
    "https://raw.githubusercontent.com/ServiceStack/images/master/hero/photo-1462331940025-496dfbfc7564.jpg",
    "https://raw.githubusercontent.com/ServiceStack/images/master/hero/photo-1495431088732-09e59535d241.jpg",
    "https://raw.githubusercontent.com/ServiceStack/images/master/hero/photo-1503435980610-a51f3ddfee50.jpg",
  ];
  const [heroIndex, setHeroIndex] = useState(0);

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
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
            <Stack align="center" spacing={3} className={styles.featureCard}>
              <Image
                src="https://raw.githubusercontent.com/ServiceStack/images/master/hero/photo-1456244440184-1d494704a505.jpg"
                alt="AI matching"
                className={styles.featureImage}
              />
              <Heading size="md">AI-Powered Matching</Heading>
              <Text textAlign="center">
                Connect with the right opportunities using intelligent algorithms.
              </Text>
            </Stack>
            <Stack align="center" spacing={3} className={styles.featureCard}>
              <Image
                src="https://raw.githubusercontent.com/ServiceStack/images/master/hero/photo-1500393734221-584dd6dbf92a.jpg"
                alt="Gig management"
                className={styles.featureImage}
              />
              <Heading size="md">Integrated Gig Management</Heading>
              <Text textAlign="center">
                Manage tasks and projects seamlessly in one place.
              </Text>
            </Stack>
            <Stack align="center" spacing={3} className={styles.featureCard}>
              <Image
                src="https://raw.githubusercontent.com/ServiceStack/images/master/hero/photo-1462332420958-a05d1e002413.jpg"
                alt="Analytics dashboard"
                className={styles.featureImage}
              />
              <Heading size="md">Real-Time Analytics</Heading>
              <Text textAlign="center">
                Gain insights with up-to-the-minute data and reports.
              </Text>
            </Stack>
          </SimpleGrid>
        </Container>
      </Box>

      <Box py={20} px={4} bg="gray.50" id="solutions">
        <Container maxW="6xl">
          <Heading size="lg" textAlign="center" mb={10}>
            Enterprise Solutions
          </Heading>
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
            <Stack
              spacing={4}
              p={6}
              bg="white"
              borderRadius="md"
              boxShadow="md"
              align="center"
              className={styles.solutionCard}
            >
              <Image
                src="https://raw.githubusercontent.com/ServiceStack/images/master/hero/photo-1489343511429-5482f78c15cf.jpg"
                alt="Recruiting suite"
                className={styles.solutionImage}
              />
              <Heading size="md">Recruiting Suite</Heading>
              <Text textAlign="center">
                Automate sourcing and streamline applicant tracking with one unified hub.
              </Text>
              <Button colorScheme="brand" variant="outline">
                Learn More
              </Button>
            </Stack>
            <Stack
              spacing={4}
              p={6}
              bg="white"
              borderRadius="md"
              boxShadow="md"
              align="center"
              className={styles.solutionCard}
            >
              <Image
                src="https://raw.githubusercontent.com/ServiceStack/images/master/hero/photo-1494253188410-ff0cdea5499e.jpg"
                alt="Gig marketplace"
                className={styles.solutionImage}
              />
              <Heading size="md">Gig Marketplace</Heading>
              <Text textAlign="center">
                Connect freelancers and employers with secure contracts and messaging.
              </Text>
              <Button colorScheme="brand" variant="outline">
                Explore
              </Button>
            </Stack>
            <Stack
              spacing={4}
              p={6}
              bg="white"
              borderRadius="md"
              boxShadow="md"
              align="center"
              className={styles.solutionCard}
            >
              <Image
                src="https://raw.githubusercontent.com/ServiceStack/images/master/hero/photo-1504888302758-9adb6780e7c8.jpg"
                alt="Analytics portal"
                className={styles.solutionImage}
              />
              <Heading size="md">Analytics Portal</Heading>
              <Text textAlign="center">
                Visualize performance trends and make data-driven decisions instantly.
              </Text>
              <Button colorScheme="brand" variant="outline">
                View Dashboard
              </Button>
            </Stack>
          </SimpleGrid>
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
