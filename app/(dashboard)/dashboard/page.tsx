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
  Button,
  HStack,
} from "@chakra-ui/react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import DashboardCard from "@/components/DashboardCard";
import LineChart from "@/components/LineChart";
import RoleSwitcher, { Role } from "@/components/RoleSwitcher";
import api from "@/lib/api";
import styles from "./page.module.css";
import type { Contract } from "@/components/ContractCard";

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

interface ClientSummary {
  activeContracts: number;
  totalSpend: number;
}

interface FreelancerSummary {
  activeContracts: number;
  totalEarnings: number;
}

export default function DashboardPage() {
  const { data: session } = useSession();
  const [users, setUsers] = useState<User[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [role, setRole] = useState<Role>("client");
  const [clientSummary, setClientSummary] = useState<ClientSummary | null>(null);
  const [freelancerSummary, setFreelancerSummary] =
    useState<FreelancerSummary | null>(null);

  useEffect(() => {
    api.get<User[]>("/users").then(setUsers).catch(console.error);
    api.get<Project[]>("/projects").then(setProjects).catch(console.error);
    api
      .get<Contract[]>("/contracts?status=ACTIVE")
      .then(setContracts)
      .catch(console.error);
  }, []);

  useEffect(() => {
    const userId = session?.user.id;
    if (!userId) return;
    const path = role === "client" ? "/dashboard/client" : "/dashboard/freelancer";
    api
      .get<ClientSummary | FreelancerSummary>(`${path}?userId=${userId}`)
      .then((data) => {
        if (role === "client") {
          setClientSummary(data as ClientSummary);
        } else {
          setFreelancerSummary(data as FreelancerSummary);
        }
      })
      .catch(console.error);
  }, [role, session]);

  const summary = role === "client" ? clientSummary : freelancerSummary;

  return (
    <Box className={styles.container}>
      <HStack spacing={4} mb={4} justify="space-between" align="center">
        <RoleSwitcher role={role} onChange={setRole} />
        <HStack spacing={4}>
          <Button as={Link} href="/onboarding" colorScheme="brand">
            Complete Onboarding
          </Button>
          <Button as={Link} href="/gigs" colorScheme="brand" variant="outline">
            Browse Gigs
          </Button>
          <Button as={Link} href="/messages" colorScheme="brand" variant="outline">
            Messages
          </Button>
        </HStack>
      <HStack spacing={4} mb={4}>
        <Button as={Link} href="/onboarding" colorScheme="brand">
          Complete Onboarding
        </Button>
        <Button as={Link} href="/feed" colorScheme="brand" variant="outline">
          Live Feed
        </Button>
        <Button as={Link} href="/gigs" colorScheme="brand" variant="outline">
          Browse Gigs
        </Button>
        <Button as={Link} href="/employment" colorScheme="brand" variant="outline">
          Employment
        <Button as={Link} href="/gig-management" colorScheme="brand" variant="outline">
          Manage Gigs
        </Button>
        <Button as={Link} href="/services" colorScheme="brand" variant="outline">
          Browse Services
        </Button>
        <Button as={Link} href="/services/create" colorScheme="brand" variant="outline">
          Create Service
        <Button as={Link} href="/sessions" colorScheme="brand" variant="outline">
          Sessions
        <Button as={Link} href="/tasks" colorScheme="brand" variant="outline">
          Tasks
        </Button>
        <Button as={Link} href="/messages" colorScheme="brand" variant="outline">
          Messages
        </Button>
        <Button as={Link} href="/applications" colorScheme="brand" variant="outline">
          Applications
        </Button>
        <Button as={Link} href="/session-management" colorScheme="brand" variant="outline">
          Session Management
        </Button>
        <Button as={Link} href="/connections" colorScheme="brand" variant="outline">
          Connections
        <Button as={Link} href="/progress" colorScheme="brand" variant="outline">
          Progress
        </Button>
        <Button as={Link} href="/volunteering" colorScheme="brand" variant="outline">
          Volunteering
        <Button as={Link} href="/tasks" colorScheme="brand" variant="outline">
          Tasks
        </Button>
        <Button as={Link} href="/experience" colorScheme="brand" variant="outline">
          Experience
        </Button>
      </HStack>
      <SimpleGrid columns={{ base: 1, md: 4 }} spacing={6} mb={10}>
        <DashboardCard title="Users">
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6} mb={10}>
        <DashboardCard title="Contracts">
          <Stat>
            <StatLabel>Active</StatLabel>
            <StatNumber>{summary?.activeContracts ?? 0}</StatNumber>
          </Stat>
        </DashboardCard>
        <DashboardCard title="Projects">
          <Stat>
            <StatLabel>Total Projects</StatLabel>
            <StatNumber>{projects.length}</StatNumber>
          </Stat>
        </DashboardCard>
        <DashboardCard title="Financials">
          <Stat>
            <StatLabel>{role === "client" ? "Total Spend" : "Total Earnings"}</StatLabel>
            <StatNumber>
              {role === "client"
                ? `$${(summary as ClientSummary)?.totalSpend ?? 0}`
                : `$${(summary as FreelancerSummary)?.totalEarnings ?? 0}`}
            </StatNumber>
          </Stat>
        </DashboardCard>
        <DashboardCard title="Contracts">
          <Stat>
            <StatLabel>Active Contracts</StatLabel>
            <StatNumber>{contracts.length}</StatNumber>
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
