"use client";

import { Box, HStack, Text, Badge } from "@chakra-ui/react";
import styles from "./NotificationItem.module.css";

export interface NotificationItemProps {
  id: number;
  message: string;
  read: boolean;
  createdAt: string;
  onRead?: (id: number) => void;
}

export default function NotificationItem({
  id,
  message,
  read,
  createdAt,
  onRead,
}: NotificationItemProps) {
  return (
    <Box
      p={4}
      bg={read ? "gray.100" : "white"}
      borderWidth="1px"
      borderRadius="md"
      className={styles.item}
      onClick={() => !read && onRead?.(id)}
      cursor={read ? "default" : "pointer"}
    >
      <HStack justify="space-between">
        <Text>{message}</Text>
        {!read && <Badge colorScheme="blue">New</Badge>}
      </HStack>
      <Text fontSize="sm" color="gray.500" mt={2}>
        {new Date(createdAt).toLocaleString()}
      </Text>
    </Box>
  );
}

