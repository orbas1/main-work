"use client";

import NextLink from "next/link";
import { Box, Image, Text, HStack, Icon, VStack, IconButton } from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import { FaHeart } from "react-icons/fa";
import styles from "./GigCard.module.css";
import { formatCurrency } from "@/lib/utils/format";
import { useFavorites } from "@/components/FavoritesContext";
import { Gig } from "@/lib/types/gig";

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
      as={NextLink}
      href={`/gigs/${gig.id}`}
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      bg="white"
      position="relative"
      boxShadow="sm"
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
        onClick={(e) => {
          e.preventDefault();
          toggleFavorite(gig);
        }}
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
      </VStack>
    </Box>
  );
}
