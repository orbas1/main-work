"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Heading,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import api from "@/lib/api";
import styles from "./page.module.css";

interface Session {
  id: number;
  title: string;
  description: string | null;
  date: string;
}

export default function NetworkingDashboard() {
  const [sessions, setSessions] = useState<Session[]>([]);

  useEffect(() => {
    api
      .get<Session[]>("/networking")
      .then(setSessions)
      .catch(console.error);
  }, []);

  return (
    <Box className={styles.container}>
      <Heading size="lg" mb={4}>
        Networking Dashboard
      </Heading>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
        {sessions.map((s) => (
          <Box key={s.id} p={4} borderWidth="1px" borderRadius="md" bg="white">
            <Heading size="md" mb={2}>
              {s.title}
            </Heading>
            {s.description && <Text mb={2}>{s.description}</Text>}
            <Text fontSize="sm">{new Date(s.date).toLocaleString()}</Text>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
}
