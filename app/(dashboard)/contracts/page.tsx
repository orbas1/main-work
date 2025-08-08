"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  HStack,
} from "@chakra-ui/react";
import Link from "next/link";
import api from "@/lib/api";
import styles from "./page.module.css";

interface Contract {
  id: number;
  title: string;
  status: string;
}

export default function ContractsPage() {
  const [contracts, setContracts] = useState<Contract[]>([]);

  useEffect(() => {
    api.get<Contract[]>("/contracts").then(setContracts).catch(console.error);
  }, []);

  return (
    <Box className={styles.container}>
      <HStack justify="flex-end" mb={4}>
        <Button as={Link} href="/contracts/new" colorScheme="brand">
          New Contract
        </Button>
      </HStack>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Title</Th>
            <Th>Status</Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {contracts.map((c) => (
            <Tr key={c.id}>
              <Td>{c.title}</Td>
              <Td>{c.status}</Td>
              <Td>
                <Button
                  as={Link}
                  href={`/contracts/${c.id}`}
                  size="sm"
                  variant="outline"
                >
                  Edit
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
}
