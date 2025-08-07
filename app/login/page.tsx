"use client";

import { useState } from "react";
import { Box, Button, Input, Stack, Heading } from "@chakra-ui/react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    if (res?.ok) router.push("/");
  };

  return (
    <Box maxW="md" mx="auto" mt={20} p={6} bg="white" shadow="md" borderRadius="lg">
      <Heading size="md" mb={6} textAlign="center">
        Login
      </Heading>
      <form onSubmit={handleSubmit}>
        <Stack spacing={4}>
          <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} type="email" />
          <Input placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} type="password" />
          <Button type="submit" colorScheme="brand">
            Sign In
          </Button>
        </Stack>
      </form>
    </Box>
  );
}
