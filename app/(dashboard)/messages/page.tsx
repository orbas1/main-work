"use client";

import { useEffect, useState } from "react";
import {
  HStack,
  VStack,
  Box,
  Input,
  Button,
  Heading,
  Text,
} from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import MessageBubble from "@/components/MessageBubble";
import styles from "./page.module.css";

interface Chat {
  id: number;
  participants: { user: { id: number; name: string | null } }[];
  messages: { content: string }[];
}

interface Message {
  id: number;
  senderId: number;
  content: string;
  createdAt: string;
}

export default function MessagesPage() {
  const { data: session } = useSession();
  const [chats, setChats] = useState<Chat[]>([]);
  const [selected, setSelected] = useState<Chat | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState("");

  useEffect(() => {
    fetch("/api/chats")
      .then((res) => res.json())
      .then(setChats)
      .catch(console.error);
  }, []);

  const openChat = async (chat: Chat) => {
    setSelected(chat);
    const res = await fetch(`/api/chats/${chat.id}/messages`);
    if (res.ok) {
      const msgs = await res.json();
      setMessages(msgs);
    }
  };

  const send = async () => {
    if (!selected || !text.trim()) return;
    const res = await fetch(`/api/chats/${selected.id}/messages`, {
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

  const talkToAI = async () => {
    if (!text.trim()) return;
    const res = await fetch("/api/messages/ai", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: text }),
    });
    if (res.ok) {
      const data = await res.json();
      setMessages((m) => [
        ...m,
        {
          id: Date.now(),
          senderId: 0,
          content: data.message,
          createdAt: new Date().toISOString(),
        },
      ]);
      setText("");
    }
  };

  return (
    <HStack align="start" spacing={4} className={styles.container}>
      <VStack w="30%" spacing={2} align="stretch" className={styles.sidebar}>
        <Heading size="md">Conversations</Heading>
        {chats.map((chat) => {
          const other = chat.participants.find(
            (p) => p.user.id !== Number(session?.user?.id)
          );
          return (
            <Box
              key={chat.id}
              p={2}
              borderWidth="1px"
              borderRadius="md"
              bg={selected?.id === chat.id ? "gray.200" : "white"}
              cursor="pointer"
              onClick={() => openChat(chat)}
            >
              <Text fontWeight="medium">{other?.user.name || "Chat"}</Text>
              <Text fontSize="sm" color="gray.500">
                {chat.messages[0]?.content || "No messages"}
              </Text>
            </Box>
          );
        })}
      </VStack>
      <VStack flex="1" align="stretch" className={styles.chat}>
        <Heading size="md">{selected ? "Chat" : "Select a conversation"}</Heading>
        <VStack flex="1" overflowY="auto" align="stretch">
          {messages.map((m) => (
            <MessageBubble
              key={m.id}
              content={m.content}
              mine={m.senderId === Number(session?.user?.id)}
            />
          ))}
        </VStack>
        {selected && (
          <HStack>
            <Input
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Type a message"
            />
            <Button colorScheme="brand" onClick={send}>
              Send
            </Button>
            <Button variant="outline" onClick={talkToAI}>
              Talk to AI
            </Button>
          </HStack>
        )}
      </VStack>
    </HStack>
  );
}
