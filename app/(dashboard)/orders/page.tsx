"use client";

import { useEffect, useState, useCallback } from "react";
import {
  Box,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Flex,
  HStack,
  Select,
  Spinner,
  Text,
  VStack,
  Button,
  Textarea,
  Heading,
} from "@chakra-ui/react";
import OrderCard, { Order } from "@/components/OrderCard";
import api from "@/lib/api";
import styles from "./page.module.css";

export default function OrderManagementPage() {
  const [role, setRole] = useState<"seller" | "buyer">("seller");
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState<Order | null>(null);
  const [statusFilter, setStatusFilter] = useState("");
  const [notes, setNotes] = useState("");

  const load = useCallback(async (r = role) => {
    setLoading(true);
    try {
      const data = await api.get<Order[]>(`/orders?role=${r}`);
      setOrders(data);
    } finally {
      setLoading(false);
    }
  }, [role]);

  useEffect(() => {
    load(role);
  }, [load, role]);

  useEffect(() => {
    if (selected) setNotes(selected.notes || "");
  }, [selected]);

  const filtered = statusFilter
    ? orders.filter((o) => o.status === statusFilter)
    : orders;

  const updateStatus = async (status: string) => {
    if (!selected) return;
    await api.put(`/orders/${selected.id}`, { status });
    await load();
  };

  const saveNotes = async () => {
    if (!selected) return;
    await api.put(`/orders/${selected.id}`, { notes });
    await load();
  };

  const list = (
    <>
      <HStack mb={4}>
        <Select
          placeholder="Filter by status"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="pending">Pending</option>
          <option value="in_progress">In Progress</option>
          <option value="delivered">Delivered</option>
          <option value="revision_requested">Revision Requested</option>
          <option value="completed">Completed</option>
        </Select>
      </HStack>
      {loading ? (
        <Spinner />
      ) : (
        <VStack align="stretch" spacing={2} className={styles.list}>
          {filtered.map((o) => (
            <OrderCard
              key={o.id}
              order={o}
              selected={selected?.id === o.id}
              onClick={() => setSelected(o)}
            />
          ))}
          {filtered.length === 0 && <Text>No orders found</Text>}
        </VStack>
      )}
    </>
  );

  const detail = selected ? (
    <VStack align="stretch" spacing={4} className={styles.detail}>
      <Heading size="md">{selected.gigTitle}</Heading>
      <Text>Buyer: {selected.buyerName}</Text>
      <Text>Seller: {selected.sellerName}</Text>
      <Text>Status: {selected.status}</Text>
      <Textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        placeholder="Order notes"
      />
      <HStack>
        <Button colorScheme="brand" onClick={saveNotes}>
          Save Notes
        </Button>
        <Button colorScheme="green" onClick={() => updateStatus("completed")}>
          Mark Completed
        </Button>
        <Button
          colorScheme="orange"
          onClick={() => updateStatus("revision_requested")}
        >
          Request Revision
        </Button>
      </HStack>
    </VStack>
  ) : (
    <Text>Select an order to view details</Text>
  );

  return (
    <Box className={styles.container}>
      <Tabs
        onChange={(i) => {
          setRole(i === 0 ? "seller" : "buyer");
          setSelected(null);
        }}
      >
        <TabList>
          <Tab>Seller</Tab>
          <Tab>Buyer</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Flex gap={4} direction={{ base: "column", md: "row" }}>
              {list}
              {detail}
            </Flex>
          </TabPanel>
          <TabPanel>
            <Flex gap={4} direction={{ base: "column", md: "row" }}>
              {list}
              {detail}
            </Flex>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}
