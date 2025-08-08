"use client";

import { useState } from "react";
import {
  Box,
  Input,
  Stack,
  Heading,
  Textarea,
  Progress,
  Button,
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
import api from "@/lib/api";
import { useOnboarding } from "@/components/OnboardingContext";
import styles from "./page.module.css";

export default function DocumentsOnboardingPage() {
  const { data, setData } = useOnboarding();
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
      const res = await api.post<{ cv: string }>(
        "/user/profile/ai-cv",
        {}
      );
      setResume(res.cv);
      toast({ status: "success", title: "CV generated" });
    } catch (e) {
      toast({ status: "error", title: "Failed to generate CV" });
    }
  };

  const generateCoverLetter = async () => {
    try {
      const res = await api.post<{ coverLetter: string }>(
        "/user/profile/ai-cover-letter",
        { template: coverLetter }
      );
      setCoverLetter(res.coverLetter);
      toast({ status: "success", title: "Cover letter generated" });
    } catch (e) {
      toast({ status: "error", title: "Failed to generate cover letter" });
    }
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    setError("");
    try {
      setData({ resume, coverLetter });
      await api.post("/user/cv/upload", { cv: resume });
      await api.post("/user/cover-letter/upload", { coverLetter });
      router.push("/dashboard");
    } catch (e) {
      setError("Onboarding failed");
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
        Onboarding - Step 3 of 3
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
          Finish
        </Button>
      </Stack>
    </Box>
  );
}

