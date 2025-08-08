"use client";

import { VStack, Heading, Button } from "@chakra-ui/react";
import NotificationItem from "@/components/NotificationItem";
import styles from "./page.module.css";
import { useNotifications } from "@/components/NotificationContext";

export default function NotificationsPage() {
  const { notifications, markRead, markAllRead } = useNotifications();

  return (
    <VStack align="stretch" spacing={4} className={styles.container}>
      <Heading size="lg">Notifications</Heading>
      {notifications.length > 0 ? (
        <Button alignSelf="flex-end" size="sm" onClick={markAllRead}>
          Mark all as read
        </Button>
      ) : null}
      {notifications.map((n) => (
        <NotificationItem key={n.id} {...n} onRead={markRead} />
      ))}
    </VStack>
  );
}

