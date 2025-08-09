"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  HStack,
  FormControl,
  FormLabel,
  Input,
  VStack,
  useToast,
} from "@chakra-ui/react";
import api from "@/lib/api";
import styles from "./page.module.css";

interface Interview {
  id: number;
  candidateEmail: string;
  scheduledAt: string;
  meetingLink: string;
}

export default function InterviewsPage() {
  const [interviews, setInterviews] = useState<Interview[]>([]);
  const [candidateEmail, setCandidateEmail] = useState("");
  const [scheduledAt, setScheduledAt] = useState("");
  const toast = useToast();

  const loadInterviews = () => {
    api
      .get<Interview[]>("/interviews")
      .then(setInterviews)
      .catch((e) => console.error(e));
  };

  useEffect(() => {
    loadInterviews();
  }, []);

  const scheduleInterview = async () => {
    try {
      await api.post<Interview>("/interviews", { candidateEmail, scheduledAt });
      toast({ status: "success", title: "Interview scheduled" });
      setCandidateEmail("");
      setScheduledAt("");
      loadInterviews();
    } catch (e: any) {
      toast({ status: "error", title: e.message || "Error scheduling" });
    }
  };

  const deleteInterview = async (id: number) => {
    try {
      await api.delete(`/interviews/${id}`);
      toast({ status: "success", title: "Interview canceled" });
      loadInterviews();
    } catch (e: any) {
      toast({ status: "error", title: e.message || "Error" });
    }
  };

  const joinInterview = (link: string) => {
    window.open(link, "_blank");
  };

  return (
    <Box className={styles.container}>
      <Heading size="lg" mb={4}>
        Virtual Interviews
      </Heading>

      <VStack align="stretch" className={styles.form}>
        <FormControl>
          <FormLabel>Candidate Email</FormLabel>
          <Input
            type="email"
            value={candidateEmail}
            onChange={(e) => setCandidateEmail(e.target.value)}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Scheduled At</FormLabel>
          <Input
            type="datetime-local"
            value={scheduledAt}
            onChange={(e) => setScheduledAt(e.target.value)}
          />
        </FormControl>
        <Button colorScheme="brand" onClick={scheduleInterview}>
          Schedule Interview
        </Button>
      </VStack>

      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Candidate</Th>
            <Th>Time</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {interviews.map((int) => (
            <Tr key={int.id}>
              <Td>{int.candidateEmail}</Td>
              <Td>{new Date(int.scheduledAt).toLocaleString()}</Td>
              <Td>
                <HStack spacing={2}>
                  <Button
                    size="sm"
                    colorScheme="brand"
                    onClick={() => joinInterview(int.meetingLink)}
                  >
                    Join
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    colorScheme="red"
                    onClick={() => deleteInterview(int.id)}
                  >
                    Cancel
                  </Button>
                </HStack>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
}
