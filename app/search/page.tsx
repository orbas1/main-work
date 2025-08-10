"use client";

import { Box, Heading, Text, VStack, Image } from "@chakra-ui/react";
import { useSearchParams } from "next/navigation";
import { Suspense, useMemo } from "react";
import { search } from "@/lib/search";

function SearchContent() {
  const params = useSearchParams();
  const q = params.get("q") || "";
  const results = useMemo(() => search(q), [q]);

  if (!q) {
    return (
      <Box p={6}>
        <Heading mb={4}>Search</Heading>
        <Text>Enter a term in the search bar to begin.</Text>
      </Box>
    );
  }

  return (
    <Box p={6}>
      <Heading mb={4}>Search Results for &quot;{q}&quot;</Heading>
      {results.length === 0 ? (
        <Text>No results found.</Text>
      ) : (
        <VStack spacing={4} align="stretch">
          {results.map((item) => (
            <Box
              key={`${item.type}-${item.id}`}
              borderWidth="1px"
              borderRadius="md"
              p={4}
            >
              <Heading size="md" mb={2}>
                {item.title}
              </Heading>
              <Text mb={2}>{item.description}</Text>
              {item.imageUrl && (
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  maxH="200px"
                  objectFit="cover"
                />
              )}
            </Box>
          ))}
        </VStack>
      )}
    </Box>
  );
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <Box p={6}>
          <Text>Loading...</Text>
        </Box>
      }
    >
      <SearchContent />
    </Suspense>
  );
}
