import { notFound } from "next/navigation";
import { Box, Heading, Text, Stack, Button } from "@chakra-ui/react";
import Link from "next/link";
import api from "@/lib/api";
import styles from "./page.module.css";

interface Service {
  id: number;
  title: string;
  description: string;
  price: number;
  location?: string | null;
  seller: { id: number; name: string | null };
}

async function fetchService(id: string): Promise<Service | null> {
  try {
    return await api.get<Service>(`/services/${id}`);
  } catch {
    return null;
  }
}

export default async function ServiceDetails({ params }: { params: { id: string } }) {
  const service = await fetchService(params.id);
  if (!service) return notFound();
  return (
    <Box className={styles.container}>
      <Stack spacing={4}>
        <Heading>{service.title}</Heading>
        <Text>{service.description}</Text>
        <Text fontWeight="bold">${service.price}</Text>
        {service.location && <Text>Location: {service.location}</Text>}
        <Text>Seller: {service.seller.name || `User ${service.seller.id}`}</Text>
        <Button as={Link} href={`/services/${service.id}/edit`} colorScheme="brand" variant="outline">
          Edit Service
        </Button>
      </Stack>
    </Box>
  );
}
