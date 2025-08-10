"use client";

import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Link as ChakraLink,
} from "@chakra-ui/react";
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
    <Accordion
      as="nav"
      w={{ base: "full", md: "60" }}
      bg="white"
      h="calc(100vh - 64px)"
      p={4}
      allowMultiple
      className={styles.nav}
      borderRightWidth="1px"
      borderColor="gray.200"
    >
      {sections.map((section) => (
        <AccordionItem key={section.title} border="none">
          <h2>
            <AccordionButton className={styles.sectionTitle}>
              <Box flex="1" textAlign="left">
                {section.title}
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel className={styles.section}>
            {section.links.map((link) => (
              <ChakraLink
                key={link.href}
                as={NextLink}
                href={link.href}
                className={`${styles.link} ${
                  pathname === link.href ? styles.active : ""
                }`}
              >
                {link.label}
              </ChakraLink>
            ))}
          </AccordionPanel>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
