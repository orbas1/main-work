"use client";

import { useEffect, useState } from "react";
import { Box, Flex, Spinner } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import ChatList, { ChatSummary } from "@/components/ChatList";
import ChatWindow from "@/components/ChatWindow";
import api from "@/lib/api";
import styles from "./page.module.css";

export default function MessagesPage() {
  const { data: session } = useSession();
  const [chats, setChats] = useState<ChatSummary[]>([]);
  const [active, setActive] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  const loadChats = () => {
    api.get<ChatSummary[]>("/chats").then((data) => {
      setChats(data);
      setLoading(false);
    });
  };

  useEffect(() => {
    loadChats();
  }, [session]);

  if (!session) {
    return (
      <Box className={styles.center}>
        <Spinner />
      </Box>
    );
  }

  if (loading) {
    return (
      <Box className={styles.center}>
        <Spinner />
      </Box>
    );
  }

  return (
    <Flex className={styles.container}>
      <Box w={{ base: "full", md: "300px" }} borderRightWidth="1px" className={styles.list}>
        <ChatList chats={chats} selectedId={active ?? undefined} onSelect={setActive} />
      </Box>
      <Box flex="1" className={styles.window}>
        {active ? (
          <ChatWindow chatId={active} onNewMessage={loadChats} />
        ) : (
          <Box p={4}>Select a conversation</Box>
        )}
      </Box>
    </Flex>
  );
}
