"use client";

import { useEffect, useState } from "react";
import { VStack, Box, Text, Button } from "@chakra-ui/react";
import styles from "./NotificationList.module.css";
import { formatDateTime } from "@/lib/utils/time";

interface Notification {
  id: number;
  message: string;
  type: string;
  read: boolean;
  createdAt: string;
}

export default function NotificationList() {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    async function load() {
      const res = await fetch("/api/notifications");
      if (res.ok) {
        const data = await res.json();
        setNotifications(data);
      }
    }
    load();
  }, []);

  const markRead = async (id: number) => {
    const res = await fetch(`/api/notifications/${id}`, { method: "PUT" });
    if (res.ok) {
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, read: true } : n))
      );
    }
  };

  return (
    <VStack spacing={4} align="stretch" className={styles.list}>
      {notifications.map((n) => (
        <Box
          key={n.id}
          p={4}
          borderWidth="1px"
          borderRadius="md"
          bg={n.read ? "gray.100" : "white"}
          className={styles.item}
        >
          <Text fontWeight="medium" mb={1}>
            {n.message}
          </Text>
          <Text fontSize="sm" color="gray.600" mb={2}>
            {formatDateTime(n.createdAt)}
          </Text>
          {!n.read && (
            <Button size="sm" onClick={() => markRead(n.id)} colorScheme="brand">
              Mark as read
            </Button>
          )}
        </Box>
      ))}
    </VStack>
  );
}
