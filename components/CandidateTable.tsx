"use client";

import { Table, Thead, Tbody, Tr, Th, Td, Avatar, Box, Text } from "@chakra-ui/react";
import styles from "./CandidateTable.module.css";

export interface Candidate {
  id: number;
  name: string | null;
  email: string;
  location: string | null;
  expertise: string | null;
  image: string | null;
}

interface Props {
  candidates: Candidate[];
}

export default function CandidateTable({ candidates }: Props) {
  return (
    <Box className={styles.container} overflowX="auto">
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Candidate</Th>
            <Th>Email</Th>
            <Th>Location</Th>
            <Th>Expertise</Th>
          </Tr>
        </Thead>
        <Tbody>
          {candidates.map((c) => (
            <Tr key={c.id}>
              <Td>
                <Avatar size="sm" name={c.name || c.email} src={c.image || undefined} mr={2} />
                <Text as="span" ml={2}>{c.name || "Unnamed"}</Text>
              </Td>
              <Td>{c.email}</Td>
              <Td>{c.location || "-"}</Td>
              <Td>{c.expertise || "-"}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
}
