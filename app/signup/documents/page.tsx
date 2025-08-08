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
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useSignup } from "@/components/SignupContext";
import styles from "./page.module.css";

export default function DocumentsPage() {
  const { data, setData } = useSignup();
  const [resume, setResume] = useState<string>(data.resume || "");
  const [coverLetter, setCoverLetter] = useState(data.coverLetter || "");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleResume = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setResume(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    setError("");
    try {
      const payload = { ...data, resume, coverLetter };
      setData({ resume, coverLetter });
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const { error: message } = await res.json();
        setError(message || "Registration failed");
        return;
      }
      router.push("/login");
    } catch (e) {
      setError("Registration failed");
    } finally {
      setSubmitting(false);
    }
  };

  const canSubmit = !!resume;

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
      <Progress value={100} mb={6} />
      <Heading size="md" mb={6} textAlign="center">
        Step 3 of 3
      </Heading>
      <Stack spacing={4}>
        {error && (
          <Alert status="error">
            <AlertIcon />
            {error}
          </Alert>
        )}
        <Input type="file" accept=".pdf,.doc,.docx" onChange={handleResume} />
        <Textarea
          placeholder="Cover Letter"
          value={coverLetter}
          onChange={(e) => setCoverLetter(e.target.value)}
        />
        <Button
          colorScheme="brand"
          onClick={handleSubmit}
          isDisabled={!canSubmit || submitting}
          isLoading={submitting}
        >
          Submit
        </Button>
      </Stack>
    </Box>
  );
}
