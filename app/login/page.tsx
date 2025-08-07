"use client";

import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Input,
  Stack,
  Heading,
  Checkbox,
  Link,
  Divider,
  Text,
  FormControl,
  FormLabel,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { FaGoogle, FaLinkedin } from "react-icons/fa";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import ReCAPTCHA from "react-google-recaptcha";
import styles from "./page.module.css";

export default function LoginPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);

  useEffect(() => {
    if (session) router.replace("/dashboard");
  }, [session, router]);

  useEffect(() => {
    const saved = localStorage.getItem("rememberedEmail");
    if (saved) {
      setEmail(saved);
      setRememberMe(true);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    if (res?.error) {
      setError("Invalid email or password");
      return;
    }
    if (rememberMe) {
      localStorage.setItem("rememberedEmail", email);
    } else {
      localStorage.removeItem("rememberedEmail");
    }
    router.push("/dashboard");
  };

  return (
    <Box maxW="md" mx="auto" mt={20} p={6} className={styles.container} shadow="md" borderRadius="lg">
      <Heading size="md" mb={6} textAlign="center">
        Login
      </Heading>
      {error && (
        <Alert status="error" mb={4}>
          <AlertIcon />
          {error}
        </Alert>
      )}
      <form onSubmit={handleSubmit}>
        <Stack spacing={4}>
          <FormControl isRequired>
            <FormLabel>Email</FormLabel>
            <Input
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Password</FormLabel>
            <Input
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
            />
          </FormControl>
          <ReCAPTCHA
            sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
            onChange={(token) => setCaptchaToken(token)}
          />
          <Stack direction="row" justify="space-between" align="center">
            <Checkbox isChecked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)}>
              Remember Me
            </Checkbox>
            <Link as={NextLink} href="#" fontSize="sm">
              Forgot Password?
            </Link>
          </Stack>
          <Button type="submit" colorScheme="brand" isDisabled={!captchaToken}>
            Sign In
          </Button>
        </Stack>
      </form>
      <Divider my={6} />
      <Stack spacing={3}>
        <Text textAlign="center" fontSize="sm">
          Or log in with
        </Text>
        <Button leftIcon={<FaGoogle />} variant="outline" onClick={() => signIn("google")}>Google</Button>
        <Button leftIcon={<FaLinkedin />} variant="outline" onClick={() => signIn("linkedin")}>LinkedIn</Button>
      </Stack>
      <Text mt={4} textAlign="center" fontSize="sm">
        Don&apos;t have an account? <Link as={NextLink} href="/signup">Sign up</Link>
      </Text>
    </Box>
  );
}
