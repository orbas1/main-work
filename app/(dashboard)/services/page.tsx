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
    </Box>
  );
}
