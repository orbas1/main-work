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
  RadioGroup,
  Radio,
  HStack,
  Text,
  useToast,
} from "@chakra-ui/react";
import CoverLetterTemplates from "@/components/CoverLetterTemplates";
import { useRouter } from "next/navigation";
import { useSignup } from "@/components/SignupContext";
import styles from "./page.module.css";

export default function DocumentsPage() {
  const { data, setData } = useSignup();
  const [resume, setResume] = useState<string>(data.resume || "");
  const [resumeMode, setResumeMode] = useState("upload");
  const [coverLetter, setCoverLetter] = useState(data.coverLetter || "");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const toast = useToast();

  const handleResume = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setResume(reader.result as string);
    reader.readAsText(file);
  };

  const generateCv = async () => {
    try {
      const res = await fetch("/api/ai/cv", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ profile: data }),
      });
      const json = await res.json();
      setResume(json.cv);
      toast({ status: "success", title: "CV generated" });
    } catch (e) {
      toast({ status: "error", title: "Failed to generate CV" });
    }
  };

  const generateCoverLetter = async () => {
    try {
      const res = await fetch("/api/ai/cover-letter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ profile: data, template: coverLetter }),
      });
      const json = await res.json();
      setCoverLetter(json.coverLetter);
      toast({ status: "success", title: "Cover letter generated" });
    } catch (e) {
      toast({ status: "error", title: "Failed to generate cover letter" });
    }
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

  const canSubmit = !!resume && !!coverLetter;

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
      <Stack spacing={6}>
        {error && (
          <Alert status="error">
            <AlertIcon />
            {error}
          </Alert>
        )}

        <Box className={styles.section}>
          <Heading size="sm" mb={2}>
            Upload or Generate Your CV
          </Heading>
          <RadioGroup
            onChange={setResumeMode}
            value={resumeMode}
            mb={3}
          >
            <HStack spacing={4}>
              <Radio value="upload">Upload</Radio>
              <Radio value="ai">Generate with AI</Radio>
            </HStack>
          </RadioGroup>
          {resumeMode === "upload" ? (
            <Input type="file" accept=".pdf,.doc,.docx,.txt" onChange={handleResume} />
          ) : (
            <Button onClick={generateCv} colorScheme="brand" mb={2}>
              Generate CV
            </Button>
          )}
          <Textarea
            placeholder="CV Content"
            value={resume}
            onChange={(e) => setResume(e.target.value)}
            minH="150px"
          />
          {resume && (
            <Text fontSize="sm" color="gray.600" mt={1}>
              Word Count: {resume.split(/\s+/).filter(Boolean).length}
            </Text>
          )}
        </Box>

        <Box className={styles.section}>
          <Heading size="sm" mb={2}>
            Cover Letter
          </Heading>
          <CoverLetterTemplates value={coverLetter} onChange={setCoverLetter} />
          <Textarea
            mt={3}
            placeholder="Cover Letter"
            value={coverLetter}
            onChange={(e) => setCoverLetter(e.target.value)}
            minH="150px"
          />
          <Button mt={2} onClick={generateCoverLetter} colorScheme="brand">
            Generate Cover Letter
          </Button>
        </Box>

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
