"use client";

import { useEffect, useState } from "react";
import { Box, Select, VStack } from "@chakra-ui/react";
import VolunteerApplicationItem from "@/components/VolunteerApplicationItem";
import { fetchJson } from "@/lib/fetcher";
import styles from "./page.module.css";

interface Application {
  id: number;
  status: string;
  opportunity: {
    title: string;
    organization: string;
  };
  volunteer?: {
    name?: string | null;
  };
}

export default function VolunteerApplicationsPage() {
  const [type, setType] = useState("my");
  const [applications, setApplications] = useState<Application[]>([]);

  useEffect(() => {
    const query = type === "received" ? "?type=received" : "";
    fetchJson<Application[]>(`/api/volunteer/applications${query}`).then(setApplications);
  }, [type]);

  return (
    <Box className={styles.container}>
      <Select value={type} onChange={(e) => setType(e.target.value)} mb={4} w="xs">
        <option value="my">My Applications</option>
        <option value="received">Received</option>
      </Select>
      <VStack spacing={4} align="stretch">
        {applications.map((app) => (
          <VolunteerApplicationItem key={app.id} application={app} />
        ))}
      </VStack>
    </Box>
  );
}
