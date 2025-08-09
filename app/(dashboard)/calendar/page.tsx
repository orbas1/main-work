"use client";

import { useEffect, useState } from "react";
import { Box, Heading, Select, HStack, Spinner, useToast } from "@chakra-ui/react";
import api from "@/lib/api";
import CalendarView from "@/components/CalendarView";
import { CalendarEvent } from "@/lib/types/calendar";
import styles from "./page.module.css";

export default function CalendarPage() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [role, setRole] = useState<"seller" | "buyer">("seller");
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const loadEvents = async () => {
    setLoading(true);
    try {
      const data = await api.get<CalendarEvent[]>(`/calendar?role=${role}`);
      setEvents(data);
    } catch (err: any) {
      toast({ status: "error", description: err.message || "Failed to load" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEvents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [role]);

  return (
    <Box className={styles.container}>
      <HStack mb={4} spacing={4} align="center">
        <Heading size="md">Calendar</Heading>
        <Select w="150px" value={role} onChange={(e) => setRole(e.target.value as any)}>
          <option value="seller">Seller</option>
          <option value="buyer">Buyer</option>
        </Select>
      </HStack>
      {loading ? <Spinner /> : <CalendarView events={events} date={new Date()} />}
    </Box>
  );
}
