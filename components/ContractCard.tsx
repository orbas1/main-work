"use client";

import { Box, Heading, Text, Button, Stack, Progress } from "@chakra-ui/react";
import NextLink from "next/link";
import styles from "./ContractCard.module.css";

export interface Milestone {
  id: number;
  title: string;
  amount: number;
  status: string;
}

export interface Contract {
  id: number;
  title: string;
  status: string;
  totalValue: number;
  startDate?: string;
  endDate?: string;
  milestones?: Milestone[];
}

interface Props {
  contract: Contract;
  onSelect?: (id: number) => void;
}

export default function ContractCard({ contract, onSelect }: Props) {
  const completed =
    contract.milestones?.filter((m) => m.status === "APPROVED" || m.status === "PAID")
      .length || 0;
  const total = contract.milestones?.length || 0;
  const progress = total ? (completed / total) * 100 : 0;

  return (
    <Box className={styles.card} p={4} borderWidth="1px" borderRadius="md" bg="white">
      <Stack spacing={2}>
        <Heading size="md">{contract.title}</Heading>
        <Text>Status: {contract.status}</Text>
        <Text>Total Value: ${contract.totalValue}</Text>
        {total > 0 && (
          <Progress value={progress} size="sm" colorScheme="green" />
        )}
        <Button
          as={NextLink}
          href={`/contracts/${contract.id}`}
          onClick={() => onSelect?.(contract.id)}
          colorScheme="brand"
          size="sm"
          alignSelf="start"
        >
          View Details
        </Button>
      </Stack>
    </Box>
  );
}
