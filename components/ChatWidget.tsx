"use client";

import { useEffect, useState } from "react";
import {
  Box,
  IconButton,
  VStack,
  HStack,
  Input,
  Button,
  Text,
} from "@chakra-ui/react";
import { ChatIcon, CloseIcon } from "@chakra-ui/icons";
import MessageBubble from "./MessageBubble";
import styles from "./ChatWidget.module.css";
import NextLink from "next/link";

interface Message {
  id: number;
  senderId: number;
  content: string;
  createdAt: string;
}

interface Chat {
  id: number;
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [chat, setChat] = useState<Chat | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState("");

  useEffect(() => {
    if (!open) return;
    fetch("/api/chats")
      .then((res) => res.json())
      .then((chats) => {
        if (chats.length) {
          setChat(chats[0]);
          return fetch(`/api/chats/${chats[0].id}/messages`);
        }
      })
      .then((res) => res && res.json())
      .then((msgs) => msgs && setMessages(msgs))
      .catch(console.error);
  }, [open]);

  const send = async () => {
    if (!chat || !text.trim()) return;
    const res = await fetch(`/api/chats/${chat.id}/messages`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: text }),
    });
    if (res.ok) {
      const msg = await res.json();
      setMessages((m) => [...m, msg]);
      setText("");
    }
  };

  return (
    <Box className={styles.wrapper}>
      {open ? (
        <VStack className={styles.panel} spacing={2} align="stretch">
          <HStack justify="space-between">
            <Text fontWeight="bold">Chat</Text>
            <IconButton
              aria-label="Close chat"
              icon={<CloseIcon />}
              size="sm"
              onClick={() => setOpen(false)}
            />
          </HStack>
          <VStack flex="1" overflowY="auto" align="stretch">
            {messages.map((m) => (
              <MessageBubble key={m.id} content={m.content} />
            ))}
          </VStack>
          {chat && (
            <HStack>
              <Input
                size="sm"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Type..."
              />
              <Button size="sm" colorScheme="brand" onClick={send}>
                Send
              </Button>
            </HStack>
          )}
          <Button as={NextLink} href="/messages" size="xs" variant="link">
            Open Inbox
          </Button>
        </VStack>
      ) : (
        <IconButton
          className={styles.fab}
          aria-label="Open chat"
          colorScheme="brand"
          icon={<ChatIcon />}
          onClick={() => setOpen(true)}
        />
      )}
    </Box>
  );
}
