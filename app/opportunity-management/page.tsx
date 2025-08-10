"use client";

import { useState } from "react";
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  SimpleGrid,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import OpportunityCard from "@/components/OpportunityCard";
import { opportunities as initialData } from "@/lib/opportunities";
import { Opportunity } from "@/lib/types/opportunity";

export default function OpportunityManagement() {
  const [items, setItems] = useState<Opportunity[]>(initialData);
  const [form, setForm] = useState({
    title: "",
    description: "",
    compensation: "",
    status: "Open",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addOpportunity = (e: React.FormEvent) => {
    e.preventDefault();
    const newItem: Opportunity = {
      id: items.length + 1,
      title: form.title,
      description: form.description,
      compensation: form.compensation
        ? Number(form.compensation)
        : undefined,
      status: form.status,
      providerId: 0,
    };
    setItems([...items, newItem]);
    setForm({ title: "", description: "", compensation: "", status: "Open" });
  };

  return (
    <Container maxW="6xl" py={8}>
      <Heading mb={6}>Opportunity Management</Heading>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
        <Box as="form" onSubmit={addOpportunity}>
          <VStack spacing={4} align="stretch">
            <FormControl isRequired>
              <FormLabel>Title</FormLabel>
              <Input name="title" value={form.title} onChange={handleChange} />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Description</FormLabel>
              <Textarea
                name="description"
                value={form.description}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Compensation</FormLabel>
              <Input
                type="number"
                name="compensation"
                value={form.compensation}
                onChange={handleChange}
              />
            </FormControl>
            <Button type="submit" alignSelf="flex-start">
              Add Opportunity
            </Button>
          </VStack>
        </Box>
        <VStack align="stretch" spacing={4}>
          {items.map((op) => (
            <OpportunityCard key={op.id} opportunity={op} />
          ))}
        </VStack>
      </SimpleGrid>
    </Container>
  );
}
