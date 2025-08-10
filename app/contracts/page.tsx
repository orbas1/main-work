'use client';

import { Box, Heading, VStack } from "@chakra-ui/react";
import ContractCard, { Contract } from "@/components/ContractCard";

const contracts: Contract[] = [
  {
    id: 1,
    title: "Web App Development",
    status: "IN_PROGRESS",
    totalValue: 5000,
    milestones: [
      { id: 1, title: "Design", amount: 1000, status: "PAID" },
      { id: 2, title: "Development", amount: 3000, status: "APPROVED" },
      { id: 3, title: "Launch", amount: 1000, status: "PENDING" },
    ],
  },
];

export default function ContractsPage() {
  return (
    <Box p={4}>
      <Heading size="md" mb={4}>
        Contracts
      </Heading>
      <VStack spacing={4} align="stretch">
        {contracts.map((contract) => (
          <ContractCard key={contract.id} contract={contract} />
        ))}
      </VStack>
    </Box>
  );
}

