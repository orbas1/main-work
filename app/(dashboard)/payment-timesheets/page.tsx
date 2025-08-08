"use client";

import { useState } from "react";
import {
  Box,
  Button,
  Heading,
  Input,
  Stack,
  Table,
  Tbody,
  Td,
  Text,
  Textarea,
  Th,
  Thead,
  Tr,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import styles from "./page.module.css";
import { formatCurrency, formatDate } from "@/lib/format";

interface TimesheetEntry {
  id: number;
  date: string;
  hours: number;
  notes: string;
}

interface Invoice {
  id: number;
  period: string;
  amount: number;
  status: "approved" | "pending" | "disputed";
}

export default function PaymentTimesheetsPage() {
  const [entries, setEntries] = useState<TimesheetEntry[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([
    { id: 1, period: "Jan 1-7, 2024", amount: 400, status: "pending" },
    { id: 2, period: "Jan 8-14, 2024", amount: 450, status: "approved" },
  ]);

  const [date, setDate] = useState("");
  const [hours, setHours] = useState("");
  const [notes, setNotes] = useState("");

  const addEntry = () => {
    if (!date || !hours) return;
    const newEntry: TimesheetEntry = {
      id: Date.now(),
      date,
      hours: parseFloat(hours),
      notes,
    };
    setEntries((prev) => [...prev, newEntry]);
    setDate("");
    setHours("");
    setNotes("");
  };

  const updateInvoiceStatus = (id: number, status: Invoice["status"]) => {
    setInvoices((prev) =>
      prev.map((inv) => (inv.id === id ? { ...inv, status } : inv))
    );
  };

  return (
    <Stack spacing={8} className={styles.container}>
      <Box>
        <Heading size="md" className={styles.heading}>
          Timesheets
        </Heading>
        <Stack
          as="form"
          onSubmit={(e) => {
            e.preventDefault();
            addEntry();
          }}
          spacing={4}
          mb={4}
        >
          <FormControl isRequired>
            <FormLabel>Date</FormLabel>
            <Input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Hours</FormLabel>
            <Input
              type="number"
              value={hours}
              onChange={(e) => setHours(e.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Notes</FormLabel>
            <Textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </FormControl>
          <Button type="submit" colorScheme="blue" alignSelf="flex-start">
            Submit
          </Button>
        </Stack>
        {entries.length ? (
          <Table bg="white" variant="simple">
            <Thead>
              <Tr>
                <Th>Date</Th>
                <Th>Hours</Th>
                <Th>Notes</Th>
              </Tr>
            </Thead>
            <Tbody>
              {entries.map((entry) => (
                <Tr key={entry.id}>
                  <Td>{formatDate(entry.date)}</Td>
                  <Td>{entry.hours}</Td>
                  <Td>{entry.notes}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        ) : (
          <Text>No timesheet entries yet.</Text>
        )}
      </Box>

      <Box>
        <Heading size="md" className={styles.heading}>
          Invoices
        </Heading>
        {invoices.length ? (
          <Table bg="white" variant="simple">
            <Thead>
              <Tr>
                <Th>Period</Th>
                <Th>Amount</Th>
                <Th>Status</Th>
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody>
              {invoices.map((inv) => (
                <Tr key={inv.id}>
                  <Td>{inv.period}</Td>
                  <Td>{formatCurrency(inv.amount)}</Td>
                  <Td textTransform="capitalize">{inv.status}</Td>
                  <Td>
                    {inv.status === "pending" && (
                      <Stack direction="row" spacing={2}>
                        <Button
                          size="sm"
                          onClick={() => updateInvoiceStatus(inv.id, "approved")}
                        >
                          Approve
                        </Button>
                        <Button
                          size="sm"
                          colorScheme="red"
                          onClick={() => updateInvoiceStatus(inv.id, "disputed")}
                        >
                          Dispute
                        </Button>
                      </Stack>
                    )}
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        ) : (
          <Text>No invoices found.</Text>
        )}
      </Box>
    </Stack>
  );
}

