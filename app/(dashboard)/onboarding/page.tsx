"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Input,
  Stack,
  Heading,
  Textarea,
  Progress,
  Button,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import { useOnboarding } from "@/components/OnboardingContext";
import styles from "./page.module.css";

interface ProfileForm {
  name: string;
  phone: string;
  location: string;
  bio: string;
  expertise: string;
}

export default function OnboardingPage() {
  const { data, setData } = useOnboarding();
  const [form, setForm] = useState<ProfileForm>({
    name: data.name || "",
    phone: data.phone || "",
    location: data.location || "",
    bio: data.bio || "",
    expertise: data.expertise || "",
  });
  const router = useRouter();

  useEffect(() => {
    api
      .get<ProfileForm>("/profile")
      .then((res) =>
        setForm((prev) => ({
          ...prev,
          ...res,
        }))
      )
      .catch(() => {});
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    setData(form);
    router.push("/onboarding/financial");
  };

  const canSubmit = form.name && form.phone && form.location;

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
        Onboarding - Step 1 of 3
      </Heading>
      <Stack spacing={4}>
        <Input
          placeholder="Full Name"
          name="name"
          value={form.name}
          onChange={handleChange}
        />
        <Input
          placeholder="Phone Number"
          name="phone"
          value={form.phone}
          onChange={handleChange}
        />
        <Input
          placeholder="Location"
          name="location"
          value={form.location}
          onChange={handleChange}
        />
        <Textarea
          placeholder="Professional Bio"
          name="bio"
          value={form.bio}
          onChange={handleChange}
        />
        <Input
          placeholder="Areas of Expertise (optional)"
          name="expertise"
          value={form.expertise}
          onChange={handleChange}
        />
        <Button onClick={handleNext} colorScheme="brand" isDisabled={!canSubmit}>
          Next
        </Button>
      </Stack>
    </Box>
  );
}

