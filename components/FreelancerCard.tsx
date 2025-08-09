"use client";

import {
  Box,
  Avatar,
  Text,
  HStack,
  VStack,
  Tag,
  Button,
  Badge,
  Link,
} from "@chakra-ui/react";
import styles from "./FreelancerCard.module.css";
import NextLink from "next/link";

export interface Freelancer {
  id: number;
  name: string | null;
  email: string;
  location?: string | null;
  expertise?: string | null;
  image?: string | null;
  portfolio?: string | null;
  aiScore?: number;
}

interface Props {
  freelancer: Freelancer;
  onToggleShortlist: (freelancer: Freelancer) => void;
  isShortlisted: boolean;
}

export default function FreelancerCard({
  freelancer,
  onToggleShortlist,
  isShortlisted,
}: Props) {
  const skills = freelancer.expertise
    ? freelancer.expertise.split(",").map((s) => s.trim()).filter(Boolean)
    : [];

  return (
    <Box
      borderWidth="1px"
      borderRadius="md"
      p={4}
      bg="white"
      className={styles.card}
    >
      <HStack spacing={4} align="start">
        <Avatar
          name={freelancer.name || freelancer.email}
          src={freelancer.image || undefined}
          size="lg"
        />
        <VStack align="start" spacing={1} flex={1}>
          <HStack>
            <Text fontWeight="bold">{freelancer.name || "Unnamed"}</Text>
            {freelancer.aiScore && freelancer.aiScore > 0.8 && (
              <Badge colorScheme="purple">Recommended</Badge>
            )}
          </HStack>
          {freelancer.location && (
            <Text fontSize="sm" color="gray.600">
              {freelancer.location}
            </Text>
          )}
          {skills.length > 0 && (
            <HStack spacing={1} flexWrap="wrap">
              {skills.map((skill) => (
                <Tag key={skill} size="sm" colorScheme="brand">
                  {skill}
                </Tag>
              ))}
            </HStack>
          )}
          {freelancer.portfolio && (
            <Link
              as={NextLink}
              href={freelancer.portfolio}
              fontSize="sm"
              color="brand.500"
              isExternal
            >
              Portfolio
            </Link>
          )}
          <Button
            size="sm"
            mt={2}
            alignSelf="flex-start"
            onClick={() => onToggleShortlist(freelancer)}
            colorScheme={isShortlisted ? "green" : "brand"}
          >
            {isShortlisted ? "Shortlisted" : "Add to Shortlist"}
          </Button>
        </VStack>
      </HStack>
    </Box>
  );
}
