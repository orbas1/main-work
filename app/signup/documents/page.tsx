"use client";

import { useState } from "react";
import { Box, Input, Stack, Heading, Button, Textarea, Progress } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useSignup } from "@/components/SignupContext";
import styles from "./page.module.css";

export default function DocumentsPage() {
  const { data, setData } = useSignup();
  const [resume, setResume] = useState<string>(data.resume || "");
  const [coverLetter, setCoverLetter] = useState(data.coverLetter || "");
  const router = useRouter();

  const handleResume = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setResume(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleSubmit = async () => {
    const payload = { ...data, resume, coverLetter };
    setData({ resume, coverLetter });
    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (res.ok) router.push("/login");
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
        <Input type="file" accept=".pdf,.doc,.docx" onChange={handleResume} />
        <Textarea placeholder="Cover Letter" value={coverLetter} onChange={(e) => setCoverLetter(e.target.value)} />
        <Button colorScheme="brand" onClick={handleSubmit} isDisabled={!canSubmit}>
          Submit
        </Button>
      </Stack>
    </Box>
  );
}
