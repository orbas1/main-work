"use client";

import { useEffect, useState } from "react";
import { VStack, Heading } from "@chakra-ui/react";
import NotificationItem from "@/components/NotificationItem";
import styles from "./page.module.css";
import type { NotificationItemProps } from "@/components/NotificationItem";

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<NotificationItemProps[]>([]);

  useEffect(() => {
    fetch("/api/notifications")
      .then((res) => res.json())
      .then((data) => setNotifications(data))
      .catch((err) => console.error("Failed to load notifications", err));
  }, []);

  const markRead = async (id: number) => {
    await fetch("/api/notifications", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ notificationId: id }),
    });
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  return (
    <VStack align="stretch" spacing={4} className={styles.container}>
      <Heading size="lg">Notifications</Heading>
      {notifications.map((n) => (
        <NotificationItem key={n.id} {...n} onRead={markRead} />
      ))}
    </VStack>
  );
}

