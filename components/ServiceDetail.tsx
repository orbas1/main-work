"use client";

import NextLink from "next/link";
import {
  Box,
  Heading,
  Text,
  VStack,
  HStack,
  Button,
  Avatar,
  Divider,
} from "@chakra-ui/react";
import { Service } from "@/lib/types/service";
import { formatCurrency } from "@/lib/utils/format";
import styles from "./ServiceDetail.module.css";

export default function ServiceDetail({ service }: { service: Service }) {
  return (
    <Box
      className={styles.container}
      bg="white"
      borderWidth="1px"
      borderRadius="md"
      overflow="hidden"
    >
      <VStack align="start" p={6} spacing={4}>
        <Heading size="lg">{service.title}</Heading>
        <HStack spacing={3}>
          <Avatar
            name={service.seller.name || "Seller"}
            src={service.seller.image || undefined}
            size="sm"
          />
          <Text fontWeight="medium">{service.seller.name}</Text>
        </HStack>
        <Text fontSize="xl" color="brand.500" fontWeight="bold">
          {formatCurrency(service.price)}
        </Text>
        <Text>{service.description}</Text>
        <Divider />
        <HStack spacing={4}>
          <Button
            as={NextLink}
            href={`/checkout?serviceId=${service.id}`}
            colorScheme="brand"
          >
            Book Service
          </Button>
          <Button
            as={NextLink}
            href={`/messages?recipient=${service.seller.id}`}
            variant="outline"
            colorScheme="brand"
          >
            Contact Seller
          </Button>
        </HStack>
      </VStack>
    </Box>
  );
}

