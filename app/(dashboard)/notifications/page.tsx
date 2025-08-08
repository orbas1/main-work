"use client";

import { useEffect, useState } from "react";
import { Heading, Box } from "@chakra-ui/react";
import api from "@/lib/api";
import NotificationList, { Notification } from "@/components/NotificationList";
import styles from "./page.module.css";

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const load = () => {
    api
      .get<Notification[]>("/notifications")
      .then(setNotifications)
      .catch(console.error);
  };

  useEffect(() => {
    load();
  }, []);

  const markRead = async (id: number) => {
    try {
      await api.patch(`/notifications/${id}`, { read: true });
      load();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Box className={styles.container}>
      <Heading mb={4}>Notifications</Heading>
      <NotificationList notifications={notifications} onMarkRead={markRead} />
    </Box>
  );
}
