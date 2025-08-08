import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { Avatar, Box, Heading, Text, Stack, Button } from "@chakra-ui/react";
import Link from "next/link";
import styles from "./page.module.css";
import { authOptions } from "../../lib/auth";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) redirect("/login");
  const { user } = session;
  return (
    <Box className={styles.container}>
      <Stack spacing={4} align="center">
        <Avatar name={user?.name || "User"} src={user?.image || undefined} size="xl" />
        <Heading size="md">{user?.name}</Heading>
        <Text>{user?.email}</Text>
        <Button as={Link} href="/profile/edit" colorScheme="brand">
          Edit Profile
        </Button>
      </Stack>
    </Box>
  );
}
