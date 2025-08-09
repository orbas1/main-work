"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Heading,
  Text,
  VStack,
  HStack,
  Select,
  Spinner,
  Button,
  Divider,
  Stack,
} from "@chakra-ui/react";
import api from "@/lib/api";
import ContractCard, { Contract } from "@/components/ContractCard";
import styles from "./page.module.css";

export default function ContractsPage() {
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [selected, setSelected] = useState<Contract | null>(null);
  const [status, setStatus] = useState("");
  const [role, setRole] = useState<"client" | "freelancer">("client");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadContracts = async () => {
    setLoading(true);
    setError("");
    try {
      const params = new URLSearchParams();
      if (status) params.set("status", status);
      if (role) params.set("role", role);
      const data = await api.get<Contract[]>(`/contracts?${params.toString()}`);
      setContracts(data);
    } catch (err: any) {
      setError(err.message || "Failed to load contracts");
    } finally {
      setLoading(false);
    }
  };

  const loadContract = async (id: number) => {
    setLoading(true);
    setError("");
    try {
      const data = await api.get<Contract>(`/contracts/${id}`);
      setSelected(data);
    } catch (err: any) {
      setError(err.message || "Failed to load contract");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadContracts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, role]);

  return (
    <Flex className={styles.wrapper} direction={{ base: "column", md: "row" }}>
      <Box flex="1" mr={{ md: 4 }}>
        <VStack align="stretch" spacing={4}>
          <Heading size="lg">Contracts</Heading>
          <HStack spacing={4} flexWrap="wrap">
            <Select
              placeholder="Filter by Status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              maxW="200px"
            >
              <option value="PENDING">Pending</option>
              <option value="ACTIVE">Active</option>
              <option value="COMPLETED">Completed</option>
              <option value="TERMINATED">Terminated</option>
            </Select>
            <Select
              value={role}
              onChange={(e) => setRole(e.target.value as "client" | "freelancer")}
              maxW="200px"
            >
              <option value="client">Client View</option>
              <option value="freelancer">Freelancer View</option>
            </Select>
            <Button colorScheme="brand" onClick={loadContracts}>
              Refresh
            </Button>
          </HStack>
          {error && (
            <Text color="red.500">{error}</Text>
          )}
          {loading ? (
            <Spinner />
          ) : (
            <VStack align="stretch" spacing={4}>
              {contracts.map((c) => (
                <ContractCard key={c.id} contract={c} onSelect={loadContract} />
              ))}
              {contracts.length === 0 && (
                <Text>No contracts found.</Text>
              )}
            </VStack>
          )}
        </VStack>
      </Box>
      <Box flex="1" mt={{ base: 8, md: 0 }} className={styles.detail}>
        {selected ? (
          <VStack align="stretch" spacing={4}>
            <Heading size="md">{selected.title}</Heading>
            <Text>Status: {selected.status}</Text>
            <Text>Total Value: ${selected.totalValue}</Text>
            <Divider />
            <Heading size="sm">Milestones</Heading>
            <Stack spacing={3}>
              {selected.milestones && selected.milestones.length > 0 ? (
                selected.milestones.map((m) => (
                  <Box key={m.id} p={3} borderWidth="1px" borderRadius="md" bg="white">
                    <Text fontWeight="bold">{m.title}</Text>
                    <Text>Amount: ${m.amount}</Text>
                    <Text>Status: {m.status}</Text>
                  </Box>
                ))
              ) : (
                <Text>No milestones defined.</Text>
              )}
            </Stack>
          </VStack>
        ) : (
          <Text>Select a contract to view details.</Text>
        )}
      </Box>
    </Flex>
  );
}
