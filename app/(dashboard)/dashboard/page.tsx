"use client";

import { useEffect, useState } from "react";
import {
  Box,
  SimpleGrid,
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
  VStack,
} from "@chakra-ui/react";
import DashboardCard from "@/components/DashboardCard";
import LineChart from "@/components/LineChart";
import api from "@/lib/api";
import styles from "./page.module.css";

interface User {
  id: number;
  name: string | null;
  email: string;
}

interface Project {
  id: number;
  title: string;
  owner: string;
  status: string;
}

interface Notification {
  id: number;
  title: string;
  message: string;
  read: boolean;
}

export default function DashboardPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    api.get<User[]>("/users").then(setUsers).catch(console.error);
    api.get<Project[]>("/projects").then(setProjects).catch(console.error);
    api.get<Notification[]>("/notifications").then(setNotifications).catch(console.error);
  }, []);

  return (
    <Box className={styles.container}>
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
            <StatNumber>$0</StatNumber>
          </Stat>
        </DashboardCard>
      </SimpleGrid>

      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} mb={10}>
        <DashboardCard title="Performance">
          <LineChart />
        </DashboardCard>
        <DashboardCard title="Users">
          <Table variant="simple">
            <TableCaption>Users</TableCaption>
            <Thead>
              <Tr>
                <Th>ID</Th>
                <Th>Name</Th>
                <Th>Email</Th>
              </Tr>
            </Thead>
            <Tbody>
              {users.map((user) => (
                <Tr key={user.id}>
                  <Td>{user.id}</Td>
                  <Td>{user.name}</Td>
                  <Td>{user.email}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </DashboardCard>
      </SimpleGrid>

      <DashboardCard title="Recent Notifications">
        <VStack align="stretch">
          {notifications.slice(0, 3).map((n) => (
            <Box key={n.id}>{n.title}</Box>
          ))}
          {notifications.length === 0 && <Box>No notifications</Box>}
        </VStack>
      </DashboardCard>

      <DashboardCard title="Projects">
        <Table variant="simple">
          <TableCaption>Projects</TableCaption>
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
