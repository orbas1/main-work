import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { Avatar, Box, Heading, Text, Stack } from "@chakra-ui/react";
import { authOptions } from "../../lib/auth";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) redirect("/login");
  const { user } = session;
  return (
    <Box maxW="md" mx="auto" mt={10} p={6} bg="white" shadow="md" borderRadius="lg">
      <Stack spacing={4} align="center">
        <Avatar name={user?.name || "User"} src={user?.image || undefined} size="xl" />
        <Heading size="md">{user?.name}</Heading>
        <Text>{user?.email}</Text>
      </Stack>
    </Box>
  );
}
