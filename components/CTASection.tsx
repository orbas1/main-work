"use client";

import { Box, HStack, Button } from "@chakra-ui/react";
import Link from "next/link";
import styles from "./CTASection.module.css";

export default function CTASection() {
  return (
    <Box className={styles.cta} mt={6}>
      <HStack spacing={4} justify="center">
        <Button as={Link} href="/gigs" colorScheme="brand">
          Browse Gigs
        </Button>
        <Button as={Link} href="/onboarding" variant="outline" colorScheme="brand">
          Complete Profile
        </Button>
        <Button as={Link} href="/messages" variant="outline" colorScheme="brand">
          Messages
        </Button>
      </HStack>
    </Box>
  );
}
