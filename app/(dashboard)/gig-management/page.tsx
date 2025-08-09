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
  SimpleGrid,
  Select,
} from "@chakra-ui/react";
import GigCard, { Gig as GigCardType } from "@/components/GigCard";
import api from "@/lib/api";
import styles from "./page.module.css";

interface Gig {
  id: number;
  title: string;
  description: string;
  price: number;
  status: string;
  views: number;
  category?: string;
  thumbnail?: string;
  rating?: number | null;
  seller: { name: string | null };
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
  const [thumbnail, setThumbnail] = useState("");
  const [status, setStatus] = useState("active");
  const [editing, setEditing] = useState<Gig | null>(null);

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

  const resetForm = () => {
    setEditing(null);
    setTitle("");
    setDescription("");
    setPrice("0");
    setCategory("");
    setThumbnail("");
    setStatus("active");
  };

  const saveGig = async () => {
    const payload = {
      title,
      description,
      price: Number(price),
      category,
      thumbnail,
      status,
    };
    if (editing) {
      await api.put(`/gigs/${editing.id}`, payload);
    } else {
      await api.post<Gig>("/gigs", payload);
    }
    resetForm();
    loadGigs();
  };

  const startEdit = (gig: Gig) => {
    setEditing(gig);
    setTitle(gig.title);
    setDescription(gig.description);
    setPrice(String(gig.price));
    setCategory(gig.category || "");
    setThumbnail(gig.thumbnail || "");
    setStatus(gig.status);
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
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} mb={6} className={styles.editor}>
              <VStack align="stretch" spacing={4}>
                <FormControl>
                  <FormLabel>Title</FormLabel>
                  <Input value={title} onChange={(e) => setTitle(e.target.value)} />
                </FormControl>
                <FormControl>
                  <FormLabel>Description</FormLabel>
                  <Input value={description} onChange={(e) => setDescription(e.target.value)} />
                </FormControl>
                <FormControl>
                  <FormLabel>Thumbnail URL</FormLabel>
                  <Input value={thumbnail} onChange={(e) => setThumbnail(e.target.value)} />
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
                <FormControl>
                  <FormLabel>Status</FormLabel>
                  <Select value={status} onChange={(e) => setStatus(e.target.value)}>
                    <option value="active">Active</option>
                    <option value="paused">Paused</option>
                  </Select>
                </FormControl>
                <HStack>
                  <Button colorScheme="brand" onClick={saveGig}>
                    {editing ? "Update Gig" : "Create Gig"}
                  </Button>
                  {editing && (
                    <Button variant="ghost" onClick={resetForm}>
                      Cancel
                    </Button>
                  )}
                </HStack>
              </VStack>
              <GigCard
                gig={{
                  id: editing?.id || 0,
                  title: title || "Untitled Gig",
                  price: Number(price),
                  category: category || undefined,
                  thumbnail: thumbnail || undefined,
                  rating: editing?.rating || null,
                  seller: { name: "You" },
                } as GigCardType}
              />
            </SimpleGrid>
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
                          <Button size="xs" onClick={() => startEdit(gig)}>
                            Edit
                          </Button>
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
