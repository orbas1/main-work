"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  NumberInput,
  NumberInputField,
  Button,
  SimpleGrid,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import api from "@/lib/api";
import { Opportunity } from "@/lib/types/opportunity";
import OpportunityCard from "@/components/OpportunityCard";
import styles from "./page.module.css";

export default function OpportunityManagementPage() {
  const [myOpps, setMyOpps] = useState<Opportunity[]>([]);
  const [applications, setApplications] = useState<Opportunity[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    location: "",
    skills: "",
    compensation: "",
  });

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      const [provider, participant] = await Promise.all([
        api.get<Opportunity[]>("/opportunities?mine=provider"),
        api.get<Opportunity[]>("/opportunities?mine=participant"),
      ]);
      setMyOpps(provider);
      setApplications(participant);
    } catch (err: any) {
      setError(err.message || "Failed to load opportunities");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const create = async () => {
    setLoading(true);
    setError("");
    try {
      await api.post("/opportunities", {
        title: form.title,
        description: form.description,
        category: form.category || undefined,
        location: form.location || undefined,
        skills: form.skills || undefined,
        compensation: form.compensation ? Number(form.compensation) : undefined,
      });
      setForm({ title: "", description: "", category: "", location: "", skills: "", compensation: "" });
      await load();
    } catch (err: any) {
      setError(err.message || "Failed to create opportunity");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box className={styles.container}>
      {error && (
        <Text color="red.500" mb={4}>
          {error}
        </Text>
      )}
      <Tabs variant="enclosed">
        <TabList>
          <Tab>My Opportunities</Tab>
          <Tab>Applications</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <VStack as="form" spacing={4} align="stretch" maxW="600px" onSubmit={(e) => e.preventDefault()}>
              <FormControl>
                <FormLabel>Title</FormLabel>
                <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
              </FormControl>
              <FormControl>
                <FormLabel>Description</FormLabel>
                <Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
              </FormControl>
              <FormControl>
                <FormLabel>Category</FormLabel>
                <Input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} />
              </FormControl>
              <FormControl>
                <FormLabel>Location</FormLabel>
                <Input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} />
              </FormControl>
              <FormControl>
                <FormLabel>Skills</FormLabel>
                <Input value={form.skills} onChange={(e) => setForm({ ...form, skills: e.target.value })} />
              </FormControl>
              <FormControl>
                <FormLabel>Compensation</FormLabel>
                <NumberInput min={0} value={form.compensation} onChange={(v) => setForm({ ...form, compensation: v })}>
                  <NumberInputField />
                </NumberInput>
              </FormControl>
              <Button colorScheme="brand" onClick={create} isLoading={loading} alignSelf="flex-start">
                Create Opportunity
              </Button>
            </VStack>
            <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={4} mt={8}>
              {myOpps.map((opp) => (
                <OpportunityCard key={opp.id} opportunity={opp} />
              ))}
            </SimpleGrid>
          </TabPanel>
          <TabPanel>
            {loading ? (
              <Spinner />
            ) : (
              <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={4}>
                {applications.map((opp) => (
                  <OpportunityCard key={opp.id} opportunity={opp} />
                ))}
              </SimpleGrid>
            )}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}
