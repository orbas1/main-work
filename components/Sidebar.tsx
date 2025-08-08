"use client";

import { VStack, Link as ChakraLink } from "@chakra-ui/react";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Sidebar.module.css";

export default function Sidebar() {
  const pathname = usePathname();
  const links = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/search", label: "Search" },
    { href: "/onboarding", label: "Onboarding" },
    { href: "/profile", label: "Profile" },
    { href: "/profile/edit", label: "Edit Profile" },
    { href: "/billing", label: "Billing" },
    { href: "/notifications", label: "Notifications" },
    { href: "/messages", label: "Messages" },
    { href: "/applications", label: "Applications" },
    { href: "/gigs", label: "Browse Gigs" },
    { href: "/gig-management", label: "Manage Gigs" },
  ];

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
      className={styles.nav}
    >
      {links.map((link) => (
        <ChakraLink
          key={link.href}
          as={NextLink}
          href={link.href}
          p={2}
          borderRadius="md"
          _hover={{ bg: "gray.100" }}
          className={`${styles.link} ${pathname === link.href ? styles.active : ""}`}
        >
          {link.label}
        </ChakraLink>
      ))}
    </VStack>
  );
}
