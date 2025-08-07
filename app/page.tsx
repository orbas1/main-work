"use client";

import {
  Box,
  SimpleGrid,
  Heading,
  Stat,
  StatLabel,
  StatNumber,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
} from "@chakra-ui/react";
import DashboardCard from "../components/DashboardCard";
import LineChart from "../components/LineChart";

const users = [
  { id: 1, name: "Alice", email: "alice@example.com", role: "admin" },
  { id: 2, name: "Bob", email: "bob@example.com", role: "user" },
  { id: 3, name: "Charlie", email: "charlie@example.com", role: "editor" },
];

const projects = [
  { id: 101, title: "Neon Launch", owner: "Alice", status: "Active" },
  { id: 102, title: "Marketing Site", owner: "Bob", status: "Planning" },
];

export default function Home() {
  return (
    <Box>
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6} mb={10}>
        <DashboardCard title="Users">
          <Stat>
            <StatLabel>Total Users</StatLabel>
            <StatNumber>{users.length}</StatNumber>
          </Stat>
        </DashboardCard>
        <DashboardCard title="Projects">
          <Stat>
            <StatLabel>Active Projects</StatLabel>
            <StatNumber>{projects.length}</StatNumber>
          </Stat>
        </DashboardCard>
        <DashboardCard title="Revenue">
          <Stat>
            <StatLabel>Monthly</StatLabel>
            <StatNumber>$12,345</StatNumber>
          </Stat>
        </DashboardCard>
      </SimpleGrid>

      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} mb={10}>
        <DashboardCard title="Performance">
          <LineChart />
        </DashboardCard>
        <DashboardCard title="Users">
          <Table variant="simple">
            <TableCaption>Users from Neon backend (placeholder)</TableCaption>
            <Thead>
              <Tr>
                <Th>ID</Th>
                <Th>Name</Th>
                <Th>Email</Th>
                <Th>Role</Th>
              </Tr>
            </Thead>
            <Tbody>
              {users.map((user) => (
                <Tr key={user.id}>
                  <Td>{user.id}</Td>
                  <Td>{user.name}</Td>
                  <Td>{user.email}</Td>
                  <Td>{user.role}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </DashboardCard>
      </SimpleGrid>

      <DashboardCard title="Projects">
        <Table variant="simple">
          <TableCaption>Projects stored in Neon (placeholder)</TableCaption>
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Title</Th>
              <Th>Owner</Th>
              <Th>Status</Th>
            </Tr>
          </Thead>
          <Tbody>
            {projects.map((project) => (
              <Tr key={project.id}>
                <Td>{project.id}</Td>
                <Td>{project.title}</Td>
                <Td>{project.owner}</Td>
                <Td>{project.status}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </DashboardCard>
    </Box>
  );
}
