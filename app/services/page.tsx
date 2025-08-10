'use client';

import { Box, Heading, SimpleGrid } from "@chakra-ui/react";
import ServiceCard from "@/components/ServiceCard";
import { Service } from "@/lib/types/service";

const services: Service[] = [
  {
    id: 1,
    title: "House Cleaning",
    description: "Professional house cleaning service.",
    price: 80,
    status: "active",
    seller: { id: 1, name: "Alice Johnson", image: "/next.svg" },
    createdAt: new Date().toISOString(),
  },
  {
    id: 2,
    title: "Dog Walking",
    description: "Daily dog walking in your neighborhood.",
    price: 20,
    status: "active",
    seller: { id: 2, name: "Bob Smith", image: "/next.svg" },
    createdAt: new Date().toISOString(),
  },
];

export default function ServicesPage() {
  return (
    <Box p={4}>
      <Heading size="md" mb={4}>
        Browse Services
      </Heading>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
        {services.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </SimpleGrid>
    </Box>
  );
}

