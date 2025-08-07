"use client";

import {
  Box,
  SimpleGrid,
  Card,
  CardHeader,
  CardBody,
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
import AnalyticsChart from "../components/AnalyticsChart";

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
    <Box p={8}>
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6} mb={10}>
        <Card borderRadius="xl" boxShadow="md">
          <CardHeader>
            <Heading size="md">Users</Heading>
          </CardHeader>
          <CardBody>
            <Stat>
              <StatLabel>Total Users</StatLabel>
              <StatNumber>{users.length}</StatNumber>
            </Stat>
          </CardBody>
        </Card>
        <Card borderRadius="xl" boxShadow="md">
          <CardHeader>
            <Heading size="md">Projects</Heading>
          </CardHeader>
          <CardBody>
            <Stat>
              <StatLabel>Active Projects</StatLabel>
              <StatNumber>{projects.length}</StatNumber>
            </Stat>
          </CardBody>
        </Card>
        <Card borderRadius="xl" boxShadow="md">
          <CardHeader>
            <Heading size="md">Revenue</Heading>
          </CardHeader>
          <CardBody>
            <Stat>
              <StatLabel>Monthly</StatLabel>
              <StatNumber>$12,345</StatNumber>
            </Stat>
          </CardBody>
        </Card>
      </SimpleGrid>
      <Card mb={10} borderRadius="xl" boxShadow="md">
        <CardHeader>
          <Heading size="md">Traffic Overview</Heading>
        </CardHeader>
        <CardBody>
          <AnalyticsChart />
        </CardBody>
      </Card>

      <Card mb={10} borderRadius="xl" boxShadow="md">
        <CardHeader>
          <Heading size="md">Users</Heading>
        </CardHeader>
        <CardBody>
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
        </CardBody>
      </Card>

      <Card borderRadius="xl" boxShadow="md">
        <CardHeader>
          <Heading size="md">Projects</Heading>
        </CardHeader>
        <CardBody>
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
        </CardBody>
      </Card>
    </Box>
  );
}
