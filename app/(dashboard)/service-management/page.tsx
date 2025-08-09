"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Heading,
  SimpleGrid,
  VStack,
  FormControl,
  FormLabel,
  Input,
  NumberInput,
  NumberInputField,
  Button,
  Select,
  HStack,
  Text,
  Spinner,
} from "@chakra-ui/react";
import api from "@/lib/api";
import { Service, ServiceOrder } from "@/lib/types/service";
import styles from "./page.module.css";

export default function ServiceManagementPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [orders, setOrders] = useState<ServiceOrder[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<string | number>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      const [svc, ord] = await Promise.all([
        api.get<Service[]>("/services?mine=true"),
        api.get<ServiceOrder[]>("/service-orders?sellerId=mine"),
      ]);
      setServices(svc);
      setOrders(ord);
    } catch (err: any) {
      setError(err.message || "Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const create = async () => {
    try {
      await api.post<Service>("/services", {
        title,
        description,
        price: Number(price),
      });
      setTitle("");
      setDescription("");
      setPrice("");
      await load();
    } catch (err: any) {
      setError(err.message || "Failed to create service");
    }
  };

  const updateStatus = async (id: number, status: string) => {
    try {
      await api.put<Service>(`/services/${id}`, { status });
      setServices((prev) =>
        prev.map((s) => (s.id === id ? { ...s, status } : s))
      );
    } catch (err: any) {
      setError(err.message || "Failed to update service");
    }
  };

  if (loading) return <Spinner />;

  return (
    <Box className={styles.container}>
      <Heading size="lg" mb={6}>
        Service & Order Management
      </Heading>
      {error && (
        <Text color="red.500" mb={4}>
          {error}
        </Text>
      )}
      <Heading size="md" mb={4}>
        Create Service
      </Heading>
      <SimpleGrid
        as="form"
        columns={{ base: 1, md: 3 }}
        spacing={4}
        mb={8}
        onSubmit={(e) => {
          e.preventDefault();
          create();
        }}
      >
        <FormControl isRequired>
          <FormLabel>Title</FormLabel>
          <Input value={title} onChange={(e) => setTitle(e.target.value)} />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Description</FormLabel>
          <Input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Price</FormLabel>
          <NumberInput min={0} value={price} onChange={(v) => setPrice(v)}>
            <NumberInputField />
          </NumberInput>
        </FormControl>
        <Button type="submit" colorScheme="brand" alignSelf="end">
          Create
        </Button>
      </SimpleGrid>

      <Heading size="md" mb={4}>
        Your Services
      </Heading>
      <VStack align="stretch" spacing={3} mb={10}>
        {services.map((service) => (
          <HStack
            key={service.id}
            borderWidth="1px"
            borderRadius="md"
            p={3}
            bg="white"
            justify="space-between"
          >
            <Text>{service.title}</Text>
            <Select
              value={service.status}
              onChange={(e) => updateStatus(service.id, e.target.value)}
              maxW="150px"
            >
              <option value="active">active</option>
              <option value="paused">paused</option>
              <option value="inactive">inactive</option>
            </Select>
          </HStack>
        ))}
      </VStack>

      <Heading size="md" mb={4}>
        Orders
      </Heading>
      <VStack align="stretch" spacing={3}>
        {orders.map((order) => (
          <Box
            key={order.id}
            borderWidth="1px"
            borderRadius="md"
            p={3}
            bg="white"
          >
            <HStack justify="space-between">
              <Text>
                {order.service.title} - {order.buyer.name}
              </Text>
              <Text>{order.status}</Text>
            </HStack>
          </Box>
        ))}
      </VStack>
    </Box>
  );
}
