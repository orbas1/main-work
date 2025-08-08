import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { Avatar, Box, Heading, Text, Stack } from "@chakra-ui/react";
import { authOptions } from "../../lib/auth";
import prisma from "@/lib/prisma";
import styles from "./page.module.css";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) redirect("/login");
  const dbUser = await prisma.user.findUnique({ where: { email: session.user.email as string } });
  if (!dbUser) redirect("/login");
  return (
    <Box maxW="md" mx="auto" mt={10} p={6} className={styles.container} shadow="md" borderRadius="lg">
      <Stack spacing={4} align="center">
        <Avatar name={dbUser.name || "User"} src={dbUser.image || undefined} size="xl" />
        <Heading size="md">{dbUser.name}</Heading>
        <Text>{dbUser.email}</Text>
        {dbUser.introVideo && (
          <Box w="full">
            <video src={dbUser.introVideo} className={styles.video} controls />
          </Box>
        )}
      </Stack>
    </Box>
  );
}
