"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { Box, VStack, HStack, Text, Input, Button, IconButton, Spinner } from "@chakra-ui/react";
import { FiSend } from "react-icons/fi";
import api from "@/lib/api";
import { getSocket } from "@/lib/socket";
import styles from "./ChatWindow.module.css";

interface Message {
  id: number;
  content: string;
  createdAt: string;
  sender: { id: number; name: string | null; email: string; image: string | null };
}

interface Props {
  chatId: number;
  onNewMessage: () => void;
}

export default function ChatWindow({ chatId, onNewMessage }: Props) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(true);
  const bottomRef = useRef<HTMLDivElement>(null);

  const fetchMessages = useCallback(() => {
    api.get<Message[]>(`/chats/${chatId}/messages`).then((data) => {
      setMessages(data);
      setLoading(false);
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    });
  }, [chatId]);

  useEffect(() => {
    fetchMessages();
    const ws = getSocket();
    const handler = (ev: MessageEvent) => {
      try {
        const data = JSON.parse(ev.data);
        if (data.chatId === chatId) {
          setMessages((prev) => [...prev, data.message]);
          bottomRef.current?.scrollIntoView({ behavior: "smooth" });
        }
      } catch {
        // ignore malformed messages
      }
    };
    ws.addEventListener("message", handler);
    return () => ws.removeEventListener("message", handler);
  }, [chatId, fetchMessages]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const message = await api.post<Message>(`/chats/${chatId}/messages`, { content: input });
    setMessages((prev) => [...prev, message]);
    setInput("");
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    onNewMessage();
  };

  const handleTalkToAI = async () => {
    if (!input.trim()) return;
    const res = await api.post<{ reply: string }>("/messages/nlp/interpret", { text: input });
    setMessages((prev) => [
      ...prev,
      { id: Date.now(), content: res.reply, createdAt: new Date().toISOString(), sender: { id: 0, name: "AI", email: "ai@orbas", image: null } },
    ]);
    setInput("");
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  if (loading) {
    return (
      <Box className={styles.loading}>
        <Spinner />
      </Box>
    );
  }

  return (
    <Box className={styles.container}>
      <VStack align="stretch" spacing={3} className={styles.messages}>
        {messages.map((msg) => (
          <Box key={msg.id} className={styles.message}>
            <Text fontWeight="bold">{msg.sender.name || msg.sender.email}</Text>
            <Text>{msg.content}</Text>
            <Text fontSize="xs" color="gray.500">
              {new Date(msg.createdAt).toLocaleString()}
            </Text>
          </Box>
        ))}
        <div ref={bottomRef} />
      </VStack>
      <HStack mt={4} spacing={2} className={styles.inputRow}>
        <Input
          placeholder="Type a message"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <IconButton aria-label="Send" icon={<FiSend />} colorScheme="brand" onClick={handleSend} />
        <Button onClick={handleTalkToAI} colorScheme="purple">
          Talk to AI
        </Button>
      </HStack>
    </Box>
  );
}
