"use client";

import { useState } from "react";
import { Box, Button, Input, Stack, Heading, Checkbox, Link, Divider, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import { FaGoogle, FaLinkedin } from "react-icons/fa";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";

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
    if (res?.ok) router.push("/dashboard");
  };

  return (
    <Box maxW="md" mx="auto" mt={20} p={6} className={styles.container} shadow="md" borderRadius="lg">
      <Heading size="md" mb={6} textAlign="center">
        Login
      </Heading>
      <form onSubmit={handleSubmit}>
        <Stack spacing={4}>
          <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} type="email" />
          <Input placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} type="password" />
          <Stack direction="row" justify="space-between" align="center">
            <Checkbox>Remember Me</Checkbox>
            <Link as={NextLink} href="#" fontSize="sm">Forgot Password?</Link>
          </Stack>
          <Button type="submit" colorScheme="brand">
            Sign In
          </Button>
        </Stack>
      </form>
      <Divider my={6} />
      <Stack spacing={3}>
        <Text textAlign="center" fontSize="sm">Or log in with</Text>
        <Button leftIcon={<FaGoogle />} variant="outline" onClick={() => signIn("google")}>Google</Button>
        <Button leftIcon={<FaLinkedin />} variant="outline" onClick={() => signIn("linkedin")}>LinkedIn</Button>
      </Stack>
      <Text mt={4} textAlign="center" fontSize="sm">
        Don&apos;t have an account? <Link as={NextLink} href="/signup">Sign up</Link>
      </Text>
    </Box>
  );
}
