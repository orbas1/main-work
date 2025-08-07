"use client";

import { VStack, Link as ChakraLink } from "@chakra-ui/react";
import NextLink from "next/link";

export default function Sidebar() {
  return (
    <VStack
      as="nav"
      w={{ base: "full", md: "60" }}
      bg="white"
      h="calc(100vh - 64px)"
      p={4}
      spacing={2}
      align="stretch"
      borderRightWidth="1px"
      borderColor="gray.200"
    >
      <ChakraLink as={NextLink} href="/dashboard" p={2} borderRadius="md" _hover={{ bg: "gray.100" }} fontWeight="medium">
        Dashboard
      </ChakraLink>
      <ChakraLink as={NextLink} href="/profile" p={2} borderRadius="md" _hover={{ bg: "gray.100" }} fontWeight="medium">
        Profile
      </ChakraLink>
    </VStack>
  );
}
