"use client";

import { Box, SimpleGrid, Text, VStack, Badge } from "@chakra-ui/react";
import { CalendarEvent } from "@/lib/types/calendar";
import styles from "./CalendarView.module.css";

interface Props {
  events: CalendarEvent[];
  date: Date;
}

export default function CalendarView({ events, date }: Props) {
  const year = date.getFullYear();
  const month = date.getMonth();
  const firstDay = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const startDay = firstDay.getDay();
  const cells: (Date | null)[] = [];
  for (let i = 0; i < startDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(year, month, d));
  const eventsByDay = events.reduce<Record<number, CalendarEvent[]>>((acc, ev) => {
    const day = new Date(ev.start).getDate();
    acc[day] = acc[day] || [];
    acc[day].push(ev);
    return acc;
  }, {});

  return (
    <SimpleGrid columns={7} spacing={2} className={styles.grid}>
      {cells.map((dateObj, idx) => (
        <Box key={idx} className={styles.cell}>
          {dateObj && (
            <VStack align="start" spacing={1}>
              <Text fontWeight="bold">{dateObj.getDate()}</Text>
              {(eventsByDay[dateObj.getDate()] || []).map((ev) => (
                <Badge
                  key={ev.id}
                  colorScheme={ev.status === "booked" ? "red" : "gray"}
                >
                  {ev.title}
                </Badge>
              ))}
            </VStack>
          )}
        </Box>
      ))}
    </SimpleGrid>
  );
}
