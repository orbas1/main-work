"use client";

import NextLink from "next/link";
import {
  Box,
  Image,
  Heading,
  Text,
  VStack,
  HStack,
  Button,
  Avatar,
  Divider,
} from "@chakra-ui/react";
import { GigDetails } from "@/lib/types/gig";
import { formatCurrency } from "@/lib/utils/format";
import styles from "./GigDetail.module.css";

export default function GigDetail({ gig }: { gig: GigDetails }) {
  return (
    <Box
      className={styles.container}
      bg="white"
      borderWidth="1px"
      borderRadius="md"
      overflow="hidden"
    >
      {gig.thumbnail && (
        <Image src={gig.thumbnail} alt={gig.title} w="100%" h="300px" objectFit="cover" />
      )}
      <VStack align="start" p={6} spacing={4}>
        <Heading size="lg">{gig.title}</Heading>
        <HStack spacing={3}>
          <Avatar name={gig.seller.name || "Seller"} src={gig.seller.image || undefined} size="sm" />
          <Text fontWeight="medium">{gig.seller.name}</Text>
        </HStack>
        <Text fontSize="xl" color="brand.500" fontWeight="bold">
          {formatCurrency(gig.price)}
        </Text>
        <Text>{gig.description}</Text>
        <Divider />
        <HStack spacing={4}>
          <Button as={NextLink} href={`/checkout?gigId=${gig.id}`} colorScheme="brand">
            Order Now
          </Button>
          <Button
            as={NextLink}
            href={`/messages?recipient=${gig.seller.id}`}
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
