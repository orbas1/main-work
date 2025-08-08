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
  FormErrorMessage,
  Alert,
  AlertIcon,
  HStack,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { FaGoogle, FaLinkedin, FaFacebook } from "react-icons/fa";
import { MdSecurity } from "react-icons/md";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import ReCAPTCHA from "react-google-recaptcha";
import SocialButton from "@/components/SocialButton";
import styles from "./page.module.css";

export default function LoginPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [useTwoFA, setUseTwoFA] = useState(false);
  const [code, setCode] = useState("");
  const [twoFARequired, setTwoFARequired] = useState(false);
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
  const recaptchaEnabled = Boolean(siteKey);

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
    setEmailError("");
    setPasswordError("");

    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      setEmailError("Invalid email format");
      return;
    }
    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      return;
    }

    setSubmitting(true);
    const res = await signIn("credentials", {
      email,
      password,
      code: useTwoFA ? code : undefined,
      redirect: false,
    });
    if (res?.error) {
      if (res.error === "2FA_REQUIRED") {
        setTwoFARequired(true);
        setUseTwoFA(true);
        setError("Two-factor authentication required");
      } else if (res.error === "INVALID_2FA") {
        setUseTwoFA(true);
        setError("Invalid two-factor authentication code");
      } else {
        setError("Invalid email or password");
      }
      setSubmitting(false);
      return;
    }
    if (rememberMe) {
      localStorage.setItem("rememberedEmail", email);
    } else {
      localStorage.removeItem("rememberedEmail");
    }
    router.push("/dashboard");
    setSubmitting(false);
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
          <FormControl isRequired isInvalid={!!emailError}>
            <FormLabel>Email</FormLabel>
            <Input
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
            />
            {emailError && <FormErrorMessage>{emailError}</FormErrorMessage>}
          </FormControl>
          <FormControl isRequired isInvalid={!!passwordError}>
            <FormLabel>Password</FormLabel>
            <Input
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
            />
            {passwordError && <FormErrorMessage>{passwordError}</FormErrorMessage>}
          </FormControl>
          {useTwoFA && (
            <FormControl isRequired>
              <FormLabel>2FA Code</FormLabel>
              <Input
                placeholder="Enter 6-digit code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                maxLength={6}
              />
            </FormControl>
          )}
          {recaptchaEnabled && (
            <ReCAPTCHA
              sitekey={siteKey as string}
              onChange={(token) => setCaptchaToken(token)}
            />
          )}
          <Stack direction="row" justify="space-between" align="center">
            <Checkbox isChecked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)}>
              Remember Me
            </Checkbox>
            <Link as={NextLink} href="#" fontSize="sm">
              Forgot Password?
            </Link>
          </Stack>
          {twoFARequired && (
            <Checkbox
              isChecked={useTwoFA}
              onChange={(e) => setUseTwoFA(e.target.checked)}
            >
              <HStack spacing={2}>
                <MdSecurity />
                <Text>Enable 2FA for enhanced security</Text>
              </HStack>
            </Checkbox>
          )}
          <Button
            type="submit"
            colorScheme="brand"
            isDisabled={(recaptchaEnabled && !captchaToken) || submitting}
            isLoading={submitting}
          >
            Sign In
          </Button>
        </Stack>
      </form>
      <Divider my={6} />
      <Stack spacing={3}>
        <Text textAlign="center" fontSize="sm">
          Or log in with
        </Text>
        <SocialButton
          icon={<FaGoogle />}
          label="Google"
          onClick={() => signIn("google")}
        />
        <SocialButton
          icon={<FaLinkedin />}
          label="LinkedIn"
          onClick={() => signIn("linkedin")}
        />
        <SocialButton
          icon={<FaFacebook />}
          label="Facebook"
          onClick={() => signIn("facebook")}
        />
      </Stack>
      <Text mt={4} textAlign="center" fontSize="sm">
        Don&apos;t have an account? <Link as={NextLink} href="/signup">Sign up</Link>
      </Text>
    </Box>
  );
}
