"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  NumberInput,
  NumberInputField,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Tag,
  HStack,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import api from "@/lib/api";
import styles from "./page.module.css";

interface Gig {
  id: number;
  title: string;
  price: number;
  status: string;
  views: number;
}

interface Project {
  id: number;
  title: string;
  owner: string;
  status: string;
}

export default function GigManagementPage() {
  const [gigs, setGigs] = useState<Gig[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loadingGigs, setLoadingGigs] = useState(false);
  const [loadingProjects, setLoadingProjects] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("0");
  const [category, setCategory] = useState("");

  const loadGigs = async () => {
    setLoadingGigs(true);
    try {
      const data = await api.get<Gig[]>("/gigs?mine=true");
      setGigs(data);
    } finally {
      setLoadingGigs(false);
    }
  };

  const loadProjects = async () => {
    setLoadingProjects(true);
    try {
      const data = await api.get<Project[]>("/projects");
      setProjects(data);
    } finally {
      setLoadingProjects(false);
    }
  };

  useEffect(() => {
    loadGigs();
    loadProjects();
  }, []);

  const createGig = async () => {
    await api.post<Gig>("/gigs", {
      title,
      description,
      price: Number(price),
      category,
    });
    setTitle("");
    setDescription("");
    setPrice("0");
    setCategory("");
    loadGigs();
  };

  const toggleStatus = async (gig: Gig) => {
    const newStatus = gig.status === "active" ? "paused" : "active";
    await api.put(`/gigs/${gig.id}`, { status: newStatus });
    loadGigs();
  };

  const removeGig = async (gig: Gig) => {
    await api.delete(`/gigs/${gig.id}`);
    loadGigs();
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
            <VStack align="stretch" spacing={4} mb={6}>
              <FormControl>
                <FormLabel>Title</FormLabel>
                <Input value={title} onChange={(e) => setTitle(e.target.value)} />
              </FormControl>
              <FormControl>
                <FormLabel>Description</FormLabel>
                <Input value={description} onChange={(e) => setDescription(e.target.value)} />
              </FormControl>
              <HStack spacing={4}>
                <FormControl>
                  <FormLabel>Price</FormLabel>
                  <NumberInput min={0} value={price} onChange={(v) => setPrice(v)}>
                    <NumberInputField />
                  </NumberInput>
                </FormControl>
                <FormControl>
                  <FormLabel>Category</FormLabel>
                  <Input value={category} onChange={(e) => setCategory(e.target.value)} />
                </FormControl>
              </HStack>
              <Button colorScheme="brand" alignSelf="flex-start" onClick={createGig}>
                Create Gig
              </Button>
            </VStack>
            {loadingGigs ? (
              <Spinner />
            ) : gigs.length === 0 ? (
              <Text>No gigs found</Text>
            ) : (
              <Table size="sm">
                <Thead>
                  <Tr>
                    <Th>Title</Th>
                    <Th>Price</Th>
                    <Th>Status</Th>
                    <Th>Views</Th>
                    <Th>Actions</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {gigs.map((gig) => (
                    <Tr key={gig.id}>
                      <Td>{gig.title}</Td>
                      <Td>${gig.price}</Td>
                      <Td>
                        <Tag colorScheme={gig.status === "active" ? "green" : "yellow"}>
                          {gig.status}
                        </Tag>
                      </Td>
                      <Td>{gig.views}</Td>
                      <Td>
                        <HStack className={styles.actions}>
                          <Button size="xs" onClick={() => toggleStatus(gig)}>
                            {gig.status === "active" ? "Pause" : "Activate"}
                          </Button>
                          <Button size="xs" colorScheme="red" onClick={() => removeGig(gig)}>
                            Delete
                          </Button>
                        </HStack>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            )}
          </TabPanel>
          <TabPanel>
            {loadingProjects ? (
              <Spinner />
            ) : projects.length === 0 ? (
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
                  {projects.map((p) => (
                    <Tr key={p.id}>
                      <Td>{p.title}</Td>
                      <Td>{p.owner}</Td>
                      <Td>{p.status}</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            )}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}
