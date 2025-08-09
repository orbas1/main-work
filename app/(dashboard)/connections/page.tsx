"use client";

import { useEffect, useState, useCallback } from "react";
import { Box, Heading, SimpleGrid, useToast } from "@chakra-ui/react";
import ConnectionCard from "@/components/ConnectionCard";
import api from "@/lib/api";
import styles from "./page.module.css";

interface Connection {
  id: number;
  target: { id: number; name: string | null; image?: string | null; title?: string | null };
  status: string;
}

export default function ConnectionsPage() {
  const [connections, setConnections] = useState<Connection[]>([]);
  const toast = useToast();

  const load = useCallback(() => {
    api
      .get<Connection[]>("/connections")
      .then(setConnections)
      .catch(() => toast({ status: "error", title: "Failed to load" }));
  }, [toast]);

  useEffect(() => {
    load();
  }, [load]);

  const changeStatus = (id: number, status: string) =>
    api.put("/connections", { id, status }).then(load);

  return (
    <Box className={styles.container}>
      <Heading mb={4}>My Connections</Heading>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
        {connections.map((c) => (
          <ConnectionCard
            key={c.id}
            connection={c}
            onStatusChange={changeStatus}
          />
        ))}
      </SimpleGrid>
    </Box>
  );
}
