"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  VStack,
  HStack,
  Heading,
  StackDivider,
} from "@chakra-ui/react";
import api from "@/lib/api";
import styles from "./page.module.css";

interface Opportunity {
  id: number;
  title: string;
  description: string;
  startDate: string | null;
  endDate: string | null;
  skills: string | null;
}

export default function OpportunityManagementPage() {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    skills: "",
  });

  const load = () => {
    api
      .get<Opportunity[]>("/opportunities")
      .then(setOpportunities)
      .catch(console.error);
  Select,
  SimpleGrid,
  VStack,
  HStack,
  Spinner,
  Text,
} from "@chakra-ui/react";
import api from "@/lib/api";
import { Opportunity } from "@/lib/types/opportunity";
import OpportunityCard from "@/components/OpportunityCard";
import styles from "./page.module.css";

export default function OpportunityBrowsePage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      const params = new URLSearchParams();
      if (search) params.set("search", search);
      if (category) params.set("category", category);
      if (status) params.set("status", status);
      const data = await api.get<Opportunity[]>(`/opportunities?${params.toString()}`);
      setOpportunities(data);
    } catch (err: any) {
      setError(err.message || "Failed to load opportunities");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await api.post("/opportunities", form);
    setForm({ title: "", description: "", startDate: "", endDate: "", skills: "" });
    load();
  };

  return (
    <Box className={styles.container}>
      <Heading size="lg" mb={4}>
        Opportunity Management
      </Heading>
      <form onSubmit={handleSubmit} className={styles.form}>
        <VStack spacing={4} align="stretch">
          <FormControl isRequired>
            <FormLabel>Title</FormLabel>
            <Input name="title" value={form.title} onChange={handleChange} />
          </FormControl>
          <FormControl>
            <FormLabel>Description</FormLabel>
            <Textarea
              name="description"
              value={form.description}
              onChange={handleChange}
            />
          </FormControl>
          <HStack spacing={4}>
            <FormControl>
              <FormLabel>Start Date</FormLabel>
              <Input
                type="date"
                name="startDate"
                value={form.startDate}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>End Date</FormLabel>
              <Input
                type="date"
                name="endDate"
                value={form.endDate}
                onChange={handleChange}
              />
            </FormControl>
          </HStack>
          <FormControl>
            <FormLabel>Skills</FormLabel>
            <Input name="skills" value={form.skills} onChange={handleChange} />
          </FormControl>
          <Button type="submit" colorScheme="brand" alignSelf="flex-start">
            Create Opportunity
          </Button>
        </VStack>
      </form>

      <VStack mt={10} spacing={4} align="stretch" divider={<StackDivider />}>
        {opportunities.map((opp) => (
          <Box key={opp.id} p={4} bg="white" borderWidth="1px" borderRadius="md">
            <Heading size="md" mb={2}>
              {opp.title}
            </Heading>
            <p>{opp.description}</p>
          </Box>
        ))}
      </VStack>
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box className={styles.container}>
      <VStack as="form" spacing={4} align="stretch" onSubmit={(e) => e.preventDefault()}>
        <HStack spacing={4} flexWrap="wrap">
          <FormControl maxW="300px">
            <FormLabel>Search</FormLabel>
            <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search opportunities" />
          </FormControl>
          <FormControl maxW="200px">
            <FormLabel>Category</FormLabel>
            <Input value={category} onChange={(e) => setCategory(e.target.value)} />
          </FormControl>
          <FormControl maxW="200px">
            <FormLabel>Status</FormLabel>
            <Select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="">All</option>
              <option value="open">Open</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
            </Select>
          </FormControl>
          <Button colorScheme="brand" alignSelf="flex-end" onClick={load}>
            Apply
          </Button>
        </HStack>
      </VStack>
      {error && (
        <Text color="red.500" mt={4}>
          {error}
        </Text>
      )}
      {loading ? (
        <Spinner mt={8} />
      ) : (
        <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={4} mt={6}>
          {opportunities.map((opp) => (
            <OpportunityCard key={opp.id} opportunity={opp} />
          ))}
        </SimpleGrid>
      )}
    </Box>
  );
}
