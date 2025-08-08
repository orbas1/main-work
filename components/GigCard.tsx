"use client";

import { Box, Image, Text, HStack, Icon, VStack, IconButton, Button } from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import { FaHeart } from "react-icons/fa";
import styles from "./GigCard.module.css";
import { formatCurrency } from "@/lib/utils/format";
import { useFavorites } from "@/components/FavoritesContext";
import NextLink from "next/link";

export interface Gig {
  id: number;
  title: string;
  price: number;
  category?: string | null;
  thumbnail?: string | null;
  rating?: number | null;
  seller: { name: string | null };
}

export default function GigCard({ gig }: { gig: Gig }) {
  const { toggleFavorite, isFavorite } = useFavorites();
  const stars = Array.from({ length: 5 }, (_, i) => (
    <Icon
      as={StarIcon}
      key={i}
      color={gig.rating && gig.rating > i ? "yellow.400" : "gray.300"}
    />
  ));

  return (
    <Box
      borderWidth="1px"
      borderRadius="md"
      overflow="hidden"
      bg="white"
      position="relative"
      className={styles.card}
    >
      <IconButton
        aria-label="favorite"
        icon={<FaHeart />}
        position="absolute"
        top={2}
        right={2}
        variant="ghost"
        color={isFavorite(gig.id) ? "red.500" : "gray.300"}
        onClick={() => toggleFavorite(gig)}
      />
      {gig.thumbnail && (
        <Image
          src={gig.thumbnail}
          alt={gig.title}
          w="100%"
          h="160px"
          objectFit="cover"
        />
      )}
      <VStack align="start" p={4} spacing={1}>
        <Text fontWeight="bold">{gig.title}</Text>
        {gig.category && (
          <Text color="gray.600" fontSize="sm">
            {gig.category}
          </Text>
        )}
        <HStack spacing={1}>{stars}</HStack>
        <Text fontSize="lg" color="brand.500" fontWeight="bold">
          {formatCurrency(gig.price)}
        </Text>
        <Text fontSize="sm" color="gray.500">
          by {gig.seller.name}
        </Text>
        <Button
          as={NextLink}
          href={`/gigs/${gig.id}/payment`}
          colorScheme="brand"
          size="sm"
          className={styles.buyButton}
        >
          Buy Now
        </Button>
      </VStack>
    </Box>
  );
}
