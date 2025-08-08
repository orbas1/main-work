"use client";

import NextLink from "next/link";
import { Box, Text, VStack, HStack, Button } from "@chakra-ui/react";
import styles from "./ServiceCard.module.css";
import { Service } from "@/lib/types/service";
import { formatCurrency } from "@/lib/utils/format";

export default function ServiceCard({ service }: { service: Service }) {
  return (
    <Box
      borderWidth="1px"
      borderRadius="md"
      p={4}
      bg="white"
      className={styles.card}
    >
      <VStack align="start" spacing={2}>
        <Text fontWeight="bold" fontSize="lg">
          {service.title}
        </Text>
        <Text fontSize="sm" color="gray.600">
          {service.description}
        </Text>
        <HStack justify="space-between" w="full">
          <Text color="brand.500" fontWeight="bold">
            {formatCurrency(service.price)}
          </Text>
          <Button
            as={NextLink}
            href={`/services/${service.id}`}
            size="sm"
            colorScheme="brand"
          >
            Details
          </Button>
        </HStack>
      </VStack>
    </Box>
  );
}
