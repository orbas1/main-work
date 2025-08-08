"use client";

import { useEffect, useState } from "react";
import { IconButton, Badge, Box } from "@chakra-ui/react";
import { FiBell } from "react-icons/fi";
import Link from "next/link";
import api from "@/lib/api";
import styles from "./NotificationBell.module.css";

interface Notification {
  id: number;
  read: boolean;
}

export default function NotificationBell() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    api
      .get<Notification[]>("/notifications")
      .then((data) => {
        setCount(data.filter((n) => !n.read).length);
      })
      .catch(console.error);
  }, []);

  return (
    <Box position="relative" className={styles.container}>
      <IconButton
        as={Link}
        href="/notifications"
        aria-label="Notifications"
        icon={<FiBell />}
        variant="ghost"
      />
      {count > 0 && (
        <Badge className={styles.badge} colorScheme="red" borderRadius="full">
          {count}
        </Badge>
      )}
    </Box>
  );
}
