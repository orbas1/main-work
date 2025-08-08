"use client";

import { VStack, Box, Text, HStack, Button, Badge } from "@chakra-ui/react";
import styles from "./NotificationList.module.css";

export interface Notification {
  id: number;
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
}

interface Props {
  notifications: Notification[];
  onMarkRead: (id: number) => void;
}

export default function NotificationList({ notifications, onMarkRead }: Props) {
  return (
    <VStack spacing={4} align="stretch" className={styles.list}>
      {notifications.map((n) => (
        <Box key={n.id} p={4} bg="white" borderRadius="md" shadow="sm" className={styles.item}>
          <HStack justify="space-between" align="start">
            <Box>
              <Text fontWeight="bold">{n.title}</Text>
              <Text>{n.message}</Text>
            </Box>
            <HStack>
              {!n.read && <Badge colorScheme="blue">New</Badge>}
              {!n.read && (
                <Button size="sm" onClick={() => onMarkRead(n.id)}>
                  Mark read
                </Button>
              )}
            </HStack>
          </HStack>
        </Box>
      ))}
    </VStack>
  );
}
