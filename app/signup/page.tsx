"use client";

import { useState } from "react";
import {
  Box,
  Input,
  Stack,
  Heading,
  Button,
  Textarea,
  Progress,
  HStack,
  FormControl,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import ReCAPTCHA from "react-google-recaptcha";
import { useSignup } from "@/components/SignupContext";
import styles from "./page.module.css";
import PhoneInput from "@/components/PhoneInput";
import { reverseGeocode } from "@/lib/utils/location";
import usersApi from "@/lib/users";

export default function SignUpPage() {
  const { data, setData } = useSignup();
  const [form, setForm] = useState({
    name: data.name || "",
    email: data.email || "",
    phone: data.phone || "",
    password: data.password || "",
    location: data.location || "",
    bio: data.bio || "",
    expertise: data.expertise || "",
  });
  const [emailError, setEmailError] = useState<string | null>(null);
  const [captcha, setCaptcha] = useState<string | null>(null);
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
  const recaptchaEnabled = Boolean(siteKey);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhoneChange = (value: string) => {
    setForm((prev) => ({ ...prev, phone: value }));
  };

  const handleDetectLocation = () => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(async (pos) => {
      try {
        const loc = await reverseGeocode(
          pos.coords.latitude,
          pos.coords.longitude
        );
        setForm((prev) => ({ ...prev, location: loc }));
      } catch (err) {
        console.error("Location lookup failed", err);
      }
    });
  };

  const checkEmail = async () => {
    if (!form.email) return;
    try {
      const res = await usersApi.checkEmail(form.email);
      setEmailError(res.exists ? "Email already registered" : null);
    } catch {
      setEmailError("Unable to verify email");
    }
  };

  const router = useRouter();
  const canSubmit =
    form.name &&
    form.email &&
    !emailError &&
    form.password &&
    (!recaptchaEnabled || captcha);

  const handleNext = () => {
    setData(form);
    router.push("/signup/financial");
  };

  return (
    <Box
      maxW="lg"
      mx="auto"
      mt={10}
      p={6}
      className={styles.container}
      shadow="md"
      borderRadius="lg"
    >
      <Progress value={33} mb={6} />
      <Heading size="md" mb={6} textAlign="center">
        Sign Up - Step 1 of 3
      </Heading>
      <Stack spacing={4}>
        <Input placeholder="Full Name" name="name" value={form.name} onChange={handleChange} />
        <FormControl isInvalid={!!emailError}>
          <Input
            placeholder="Email Address"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            onBlur={checkEmail}
          />
          {emailError && <FormErrorMessage>{emailError}</FormErrorMessage>}
        </FormControl>
        <PhoneInput value={form.phone} onChange={handlePhoneChange} />
        <Input
          placeholder="Password"
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
        />
        <HStack className={styles.locationRow}>
          <Input
            placeholder="Location"
            name="location"
            value={form.location}
            onChange={handleChange}
          />
          <Button onClick={handleDetectLocation} size="sm">
            Use My Location
          </Button>
        </HStack>
        <Textarea placeholder="Professional Bio" name="bio" value={form.bio} onChange={handleChange} />
        <Input
          placeholder="Areas of Expertise (optional)"
          name="expertise"
          value={form.expertise}
          onChange={handleChange}
        />
        {recaptchaEnabled && (
          <ReCAPTCHA sitekey={siteKey as string} onChange={setCaptcha} />
        )}
        <Button onClick={handleNext} colorScheme="brand" isDisabled={!canSubmit}>
          Next
        </Button>
      </Stack>
      <Stack mt={6} className={styles.socialButtons}>
        <Button onClick={() => signIn("google")} colorScheme="red">Sign up with Google</Button>
        <Button onClick={() => signIn("linkedin")} colorScheme="linkedin">Sign up with LinkedIn</Button>
        <Button onClick={() => signIn("apple")} colorScheme="black" color="white">Sign up with Apple</Button>
      </Stack>
    </Box>
  );
}
