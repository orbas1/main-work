"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  SimpleGrid,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  HStack,
  Spinner,
  Text,
  Heading,
} from "@chakra-ui/react";
import Link from "next/link";
import api from "@/lib/api";
import GigCard, { Gig as GigType } from "@/components/GigCard";
import GigStatCard from "@/components/GigStatCard";
import styles from "./page.module.css";

interface DashboardGig extends GigType {
  status: string;
  views?: number;
  clicks?: number;
  orders?: number;
  earnings?: number;
}

interface Order {
  id: number;
  title: string;
  owner: string;
  status: string;
  price?: number;
}

export default function GigsDashboardPage() {
  const [sellerGigs, setSellerGigs] = useState<DashboardGig[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [recommended, setRecommended] = useState<GigType[]>([]);
  const [loadingSeller, setLoadingSeller] = useState(false);
  const [loadingBuyer, setLoadingBuyer] = useState(false);
  const [errorSeller, setErrorSeller] = useState("");
  const [errorBuyer, setErrorBuyer] = useState("");

  const loadSellerData = async () => {
    setLoadingSeller(true);
    setErrorSeller("");
    try {
      const data = await api.get<DashboardGig[]>("/gigs?mine=true");
      setSellerGigs(data);
    } catch (err: any) {
      setErrorSeller(err.message || "Failed to load gigs");
    } finally {
      setLoadingSeller(false);
    }
  };

  const loadBuyerData = async () => {
    setLoadingBuyer(true);
    setErrorBuyer("");
    try {
      const [ordersData, gigsData] = await Promise.all([
        api.get<Order[]>("/projects"),
        api.get<GigType[]>("/gigs"),
      ]);
      setOrders(ordersData);
      setRecommended(gigsData.filter((g) => g.rating && g.rating >= 4.7));
    } catch (err: any) {
      setErrorBuyer(err.message || "Failed to load orders");
    } finally {
      setLoadingBuyer(false);
    }
  };

  useEffect(() => {
    loadSellerData();
    loadBuyerData();
  }, []);

  const toggleStatus = async (gig: DashboardGig) => {
    const newStatus = gig.status === "active" ? "paused" : "active";
    await api.put(`/gigs/${gig.id}`, { status: newStatus });
    loadSellerData();
  };

  const promoteGig = async (gig: DashboardGig) => {
    try {
      await api.post(`/gigs/${gig.id}/promote`, {});
    } catch (err) {
      console.error(err);
    }
  };

  const sellerStats = {
    views: sellerGigs.reduce((sum, g) => sum + (g.views || 0), 0),
    clicks: sellerGigs.reduce((sum, g) => sum + ((g as any).clicks || 0), 0),
    orders: sellerGigs.reduce((sum, g) => sum + ((g as any).orders || 0), 0),
    earnings: sellerGigs.reduce((sum, g) => sum + ((g as any).earnings || 0), 0),
  };

  const orderCounts = {
    active: orders.filter((o) => o.status === "active").length,
    pending: orders.filter((o) => o.status === "pending").length,
    completed: orders.filter((o) => o.status === "completed").length,
  };

  return (
    <Box className={styles.container}>
      <Tabs variant="enclosed">
        <TabList>
          <Tab>Seller</Tab>
          <Tab>Buyer</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            {errorSeller && (
              <Text color="red.500" mb={4}>
                {errorSeller}
              </Text>
            )}
            {loadingSeller ? (
              <Spinner />
            ) : (
              <>
                <SimpleGrid columns={{ base: 1, md: 4 }} spacing={4} mb={6}>
                  <GigStatCard label="Views" value={sellerStats.views} />
                  <GigStatCard label="Clicks" value={sellerStats.clicks} />
                  <GigStatCard label="Orders" value={sellerStats.orders} />
                  <GigStatCard label="Earnings" value={`$${sellerStats.earnings.toFixed(2)}`} />
                </SimpleGrid>
                <Heading size="md" mb={4}>
                  Your Gigs
                </Heading>
                {sellerGigs.length === 0 ? (
                  <Text>No gigs found</Text>
                ) : (
                  <Table size="sm">
                    <Thead>
                      <Tr>
                        <Th>Title</Th>
                        <Th>Status</Th>
                        <Th>Price</Th>
                        <Th>Actions</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {sellerGigs.map((gig) => (
                        <Tr key={gig.id}>
                          <Td>{gig.title}</Td>
                          <Td>{gig.status}</Td>
                          <Td>${gig.price}</Td>
                          <Td>
                            <HStack spacing={2} className={styles.actions}>
                              <Button size="xs" as={Link} href={`/gig-management?edit=${gig.id}`}>
                                Edit
                              </Button>
                              <Button size="xs" onClick={() => toggleStatus(gig)}>
                                {gig.status === "active" ? "Pause" : "Activate"}
                              </Button>
                              <Button size="xs" onClick={() => promoteGig(gig)}>
                                Promote
                              </Button>
                            </HStack>
                          </Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                )}
              </>
            )}
          </TabPanel>
          <TabPanel>
            {errorBuyer && (
              <Text color="red.500" mb={4}>
                {errorBuyer}
              </Text>
            )}
            {loadingBuyer ? (
              <Spinner />
            ) : (
              <>
                <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4} mb={6}>
                  <GigStatCard label="Active" value={orderCounts.active} />
                  <GigStatCard label="Pending" value={orderCounts.pending} />
                  <GigStatCard label="Completed" value={orderCounts.completed} />
                </SimpleGrid>
                <Heading size="md" mb={4}>
                  Orders
                </Heading>
                {orders.length === 0 ? (
                  <Text>No orders found</Text>
                ) : (
                  <Table size="sm">
                    <Thead>
                      <Tr>
                        <Th>Title</Th>
                        <Th>Owner</Th>
                        <Th>Status</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {orders.map((o) => (
                        <Tr key={o.id}>
                          <Td>{o.title}</Td>
                          <Td>{o.owner}</Td>
                          <Td>{o.status}</Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                )}
                {recommended.length > 0 && (
                  <>
                    <Heading size="md" mt={10} mb={4}>
                      Recommended for You
                    </Heading>
                    <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={4}>
                      {recommended.map((gig) => (
                        <GigCard key={`rec-${gig.id}`} gig={gig} />
                      ))}
                    </SimpleGrid>
                  </>
                )}
              </>
            )}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}

