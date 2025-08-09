"use client";

import { useState, useEffect } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  SimpleGrid,
  Text,
  VStack,
  HStack,
  Card,
  CardBody,
  Heading,
} from "@chakra-ui/react";
import Link from "next/link";
import api from "@/lib/api";
import styles from "./page.module.css";

interface Service {
  id: number;
  title: string;
  description: string;
  price: number;
  location?: string | null;
}

export default function ServiceSearchPage() {
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [results, setResults] = useState<Service[]>([]);
  const [loading, setLoading] = useState(false);

  const performSearch = async () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (location) params.set("location", location);
    const data = await api.get<Service[]>(`/services?${params.toString()}`);
    setResults(data);
    setLoading(false);
  };

  useEffect(() => {
    performSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box className={styles.container}>
      <VStack as="form" spacing={4} align="stretch" onSubmit={(e) => e.preventDefault()}>
        <HStack spacing={4} flexWrap="wrap">
          <FormControl maxW="300px">
            <FormLabel>Search</FormLabel>
            <Input value={search} onChange={(e) => setSearch(e.target.value)} />
          </FormControl>
          <FormControl maxW="200px">
            <FormLabel>Location</FormLabel>
            <Input value={location} onChange={(e) => setLocation(e.target.value)} />
          </FormControl>
          <Button colorScheme="brand" onClick={performSearch} isLoading={loading} alignSelf="flex-end">
            Search
          </Button>
        </HStack>
      </VStack>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} mt={6}>
        {results.map((service) => (
          <Card key={service.id} as={Link} href={`/services/${service.id}`}> 
            <CardBody>
              <Heading size="md">{service.title}</Heading>
              <Text>${service.price}</Text>
              {service.location && <Text fontSize="sm">{service.location}</Text>}
            </CardBody>
          </Card>
        ))}
      </SimpleGrid>
import { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Text,
  SimpleGrid,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Stat,
  StatLabel,
  StatNumber,
  HStack,
  VStack,
  Spinner,
} from "@chakra-ui/react";
import api from "@/lib/api";
import { Service, ServiceOrder } from "@/lib/types/service";
import ServiceCard from "@/components/ServiceCard";
import styles from "./page.module.css";

export default function ServicesOverviewPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [sellerOrders, setSellerOrders] = useState<ServiceOrder[]>([]);
  const [buyerOrders, setBuyerOrders] = useState<ServiceOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const [svc, sOrders, bOrders] = await Promise.all([
          api.get<Service[]>("/services?mine=true"),
          api.get<ServiceOrder[]>("/service-orders?sellerId=mine"),
          api.get<ServiceOrder[]>("/service-orders?mine=true"),
        ]);
        setServices(svc);
        setSellerOrders(sOrders);
        setBuyerOrders(bOrders);
      } catch (err: any) {
        setError(err.message || "Failed to load data");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const activeServices = services.filter((s) => s.status === "active").length;
  const pendingOrders = sellerOrders.filter((o) => o.status === "pending").length;
  const totalEarnings = sellerOrders
    .filter((o) => o.status === "completed")
    .reduce((sum, o) => sum + o.service.price, 0);

  const upcomingBookings = buyerOrders.filter((o) => o.status === "pending").length;
  const totalSpend = buyerOrders
    .filter((o) => o.status === "completed")
    .reduce((sum, o) => sum + o.service.price, 0);

  if (loading) return <Spinner />;

  return (
    <Box className={styles.container}>
      <Heading size="lg" mb={6}>
        Local Services Overview
      </Heading>
      {error && (
        <Text color="red.500" mb={4}>
          {error}
        </Text>
      )}
      <Tabs variant="enclosed" colorScheme="brand">
        <TabList>
          <Tab>Seller</Tab>
          <Tab>Buyer</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4} mb={6}>
              <Stat>
                <StatLabel>Active Services</StatLabel>
                <StatNumber>{activeServices}</StatNumber>
              </Stat>
              <Stat>
                <StatLabel>Pending Orders</StatLabel>
                <StatNumber>{pendingOrders}</StatNumber>
              </Stat>
              <Stat>
                <StatLabel>Total Earnings</StatLabel>
                <StatNumber>${totalEarnings.toFixed(2)}</StatNumber>
              </Stat>
            </SimpleGrid>
            <Heading size="md" mb={4}>
              Your Services
            </Heading>
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
              {services.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </SimpleGrid>
          </TabPanel>
          <TabPanel>
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4} mb={6}>
              <Stat>
                <StatLabel>Upcoming Bookings</StatLabel>
                <StatNumber>{upcomingBookings}</StatNumber>
              </Stat>
              <Stat>
                <StatLabel>Total Spend</StatLabel>
                <StatNumber>${totalSpend.toFixed(2)}</StatNumber>
              </Stat>
              <Stat>
                <StatLabel>Orders</StatLabel>
                <StatNumber>{buyerOrders.length}</StatNumber>
              </Stat>
            </SimpleGrid>
            <Heading size="md" mb={4}>
              Active Orders
            </Heading>
            <VStack align="stretch" spacing={3}>
              {buyerOrders.map((order) => (
                <Box
                  key={order.id}
                  borderWidth="1px"
                  borderRadius="md"
                  p={3}
                  bg="white"
                >
                  <HStack justify="space-between">
                    <Text>{order.service.title}</Text>
                    <Text>{order.status}</Text>
                  </HStack>
                </Box>
              ))}
            </VStack>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}
