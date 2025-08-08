"use client";

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
