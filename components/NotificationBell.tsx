"use client";

import { IconButton, Box, Link as ChakraLink } from "@chakra-ui/react";
import NextLink from "next/link";
import { FiBell } from "react-icons/fi";
import { useEffect, useState } from "react";
import styles from "./NotificationBell.module.css";

export default function NotificationBell() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/notifications");
        if (res.ok) {
          const data = await res.json();
          setCount(data.filter((n: any) => !n.read).length);
        }
      } catch (err) {
        console.error(err);
      }
    }
    load();
  }, []);

  return (
    <ChakraLink as={NextLink} href="/notifications" position="relative">
      <IconButton
        aria-label="Notifications"
        icon={<FiBell />}
        variant="ghost"
        size="md"
      />
      {count > 0 && (
        <Box
          className={styles.badge}
          bg="red.500"
          color="white"
          borderRadius="full"
          px={2}
          fontSize="xs"
        >
          {count}
        </Box>
      )}
    </ChakraLink>
  );
}
