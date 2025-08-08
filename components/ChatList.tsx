"use client";

import { VStack, HStack, Avatar, Text, Box } from "@chakra-ui/react";
import styles from "./ChatList.module.css";

export interface ChatSummary {
  id: number;
  participants: { user: { id: number; name: string | null; image: string | null; email: string } }[];
  messages: { content: string; createdAt: string }[];
}

interface ChatListProps {
  chats: ChatSummary[];
  selectedId?: number;
  onSelect: (id: number) => void;
}

export default function ChatList({ chats, selectedId, onSelect }: ChatListProps) {
  return (
    <VStack align="stretch" spacing={0} className={styles.list}>
      {chats.map((chat) => {
        const other = chat.participants[0]?.user;
        const last = chat.messages[0];
        return (
          <HStack
            key={chat.id}
            p={3}
            spacing={3}
            onClick={() => onSelect(chat.id)}
            className={`${styles.item} ${selectedId === chat.id ? styles.active : ""}`}
          >
            <Avatar size="sm" name={other?.name || undefined} src={other?.image || undefined} />
            <Box>
              <Text fontWeight="bold">{other?.name || other?.email}</Text>
              {last && (
                <Text fontSize="sm" color="gray.500">
                  {last.content}
                </Text>
              )}
            </Box>
          </HStack>
        );
      })}
    </VStack>
  );
}
