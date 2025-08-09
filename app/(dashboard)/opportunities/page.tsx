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
    </Box>
  );
}
