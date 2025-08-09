"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  Box,
  HStack,
  VStack,
  Text,
  Textarea,
  Button,
  IconButton,
  useToast,
} from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import styles from "./page.module.css";

const domain = process.env.NEXT_PUBLIC_JITSI_DOMAIN || "https://meet.jit.si";

export default function NetworkingSessionPage() {
  const { id } = useParams<{ id: string }>();
  const [messages, setMessages] = useState<string[]>([]);
  const [message, setMessage] = useState("");
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
  const toast = useToast();

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft((t) => (t > 0 ? t - 1 : 0)), 1000);
    return () => clearInterval(timer);
  }, []);

  const sendMessage = () => {
    if (!message.trim()) return;
    setMessages((m) => [...m, message.trim()]);
    setMessage("");
  };

  const nextConnection = () => {
    toast({ title: "Shuffling participants...", status: "info" });
    setTimeLeft(300);
  };

  return (
    <Box className={styles.container}>
      <Box className={styles.videoContainer}>
        <iframe
          src={`${domain}/${id}`}
          allow="camera; microphone; fullscreen; display-capture"
          className={styles.video}
        />
        <HStack className={styles.timer} spacing={2}>
          <Text>{Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, "0")}</Text>
          <IconButton aria-label="Next" icon={<ArrowForwardIcon />} onClick={nextConnection} size="sm" />
        </HStack>
      </Box>
      <VStack className={styles.chat} align="stretch" spacing={2}>
        <Box className={styles.messages}>
          {messages.map((m, i) => (
            <Text key={i} className={styles.message}>{m}</Text>
          ))}
        </Box>
        <Textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message"
          size="sm"
        />
        <Button onClick={sendMessage} colorScheme="brand" size="sm">
          Send
        </Button>
      </VStack>
    </Box>
  );
}
