"use client";

import { VStack, Box, Text, Link as ChakraLink } from "@chakra-ui/react";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Sidebar.module.css";

export default function Sidebar() {
  const pathname = usePathname();
  const sections = [
    {
      title: "Home",
      links: [
        { href: "/dashboard", label: "Dashboard" },
        { href: "/feed", label: "Live Feed" },
        { href: "/search", label: "Search" },
      ],
    },
    {
      title: "Work",
      links: [
        { href: "/jobs", label: "Jobs" },
        { href: "/applications", label: "Applications" },
        { href: "/gigs", label: "Browse Gigs" },
        { href: "/gig-management", label: "Manage Gigs" },
        { href: "/interviews", label: "Interviews" },
        { href: "/tasks", label: "Tasks" },
        { href: "/contracts", label: "Contracts" },
      ],
    },
    {
      title: "Learning",
      links: [
        { href: "/education", label: "Education" },
        { href: "/course-management", label: "Courses" },
        { href: "/sessions", label: "Sessions" },
        { href: "/session-management", label: "Session Management" },
      ],
    },
    {
      title: "Services",
      links: [
        { href: "/services", label: "Services" },
        { href: "/service-management", label: "Manage Services" },
      ],
    },
    {
      title: "Opportunities",
      links: [
        { href: "/opportunities", label: "Opportunities" },
        { href: "/opportunity-management", label: "Manage Opportunities" },
        { href: "/volunteer/opportunities", label: "Volunteer Opportunities" },
        { href: "/volunteer/applications", label: "Volunteer Tracking" },
        { href: "/progress", label: "Progress" },
      ],
    },
    {
      title: "Profile",
      links: [
        { href: "/profile", label: "Profile" },
        { href: "/profile/edit", label: "Edit Profile" },
        { href: "/connections", label: "Connections" },
        { href: "/onboarding", label: "Onboarding" },
        { href: "/billing", label: "Billing" },
        { href: "/notifications", label: "Notifications" },
        { href: "/messages", label: "Messages" },
      ],
    },
  ];

  return (
    <VStack
      as="nav"
      w={{ base: "full", md: "60" }}
      bg="white"
      h="calc(100vh - 64px)"
      p={4}
      spacing={0}
      align="stretch"
      borderRightWidth="1px"
      borderColor="gray.200"
      className={styles.nav}
    >
      {sections.map((section) => (
        <Box key={section.title} className={styles.section}>
          <Text className={styles.sectionTitle}>{section.title}</Text>
          {section.links.map((link) => (
            <ChakraLink
              key={link.href}
              as={NextLink}
              href={link.href}
              className={`${styles.link} ${pathname === link.href ? styles.active : ""}`}
            >
              {link.label}
            </ChakraLink>
          ))}
        </Box>
      ))}
    </VStack>
  );
}
