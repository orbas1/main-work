"use client";

import { Box, IconButton, Badge } from "@chakra-ui/react";
import Link from "next/link";
import { FiBell } from "react-icons/fi";
import { useNotifications } from "./NotificationContext";
import styles from "./NotificationBell.module.css";

export default function NotificationBell() {
  const { unreadCount } = useNotifications();
  return (
    <Box position="relative" className={styles.wrapper}>
      <IconButton
        as={Link}
        href="/notifications"
        aria-label="Notifications"
        icon={<FiBell />}
        variant="ghost"
      />
      {unreadCount > 0 && (
        <Badge
          colorScheme="red"
          position="absolute"
          top="0"
          right="0"
          borderRadius="full"
          className={styles.badge}
        >
          {unreadCount}
        </Badge>
      )}
    </Box>
  );
}

