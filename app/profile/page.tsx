import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import {
  Avatar,
  Box,
  Heading,
  Text,
  Stack,
  Button,
  SimpleGrid,
} from "@chakra-ui/react";
import Link from "next/link";
import styles from "./page.module.css";
import { authOptions } from "../../lib/auth";
import DashboardCard from "../../components/DashboardCard";
import StatWidget from "../../components/StatWidget";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) redirect("/login");
  const { user } = session;
  return (
    <Box className={styles.container}>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
        <DashboardCard title="Profile">
          <Stack spacing={4} align="center">
            <Avatar
              name={user?.name || "User"}
              src={user?.image || undefined}
              size="xl"
            />
            <Heading size="md">{user?.name}</Heading>
            <Text>{user?.email}</Text>
          </Stack>
        </DashboardCard>
        <DashboardCard title="Stats">
          <SimpleGrid columns={3} spacing={4}>
            <StatWidget label="Posts" value={0} />
            <StatWidget label="Followers" value={0} />
            <StatWidget label="Following" value={0} />
          </SimpleGrid>
        </DashboardCard>
        <DashboardCard title="Actions">
          <Stack spacing={3}>
            <Button
              as={Link}
              href="/profile/edit"
              colorScheme="brand"
              width="full"
            >
              Edit Profile
            </Button>
            <Button variant="outline" colorScheme="brand" width="full">
              Settings
            </Button>
          </Stack>
        </DashboardCard>
      </SimpleGrid>
    </Box>
  );
}
