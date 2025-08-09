"use client";

import { useState, useEffect } from "react";
import {
  Box,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  VStack,
  useToast,
} from "@chakra-ui/react";
import ApplicationItem from "@/components/ApplicationItem";
import InterviewItem from "@/components/InterviewItem";
import api from "@/lib/api";
import styles from "./page.module.css";

interface Interview {
  id: number;
  scheduledAt: string;
  location?: string;
  link?: string;
  status: string;
}

interface Application {
  id: number;
  status: string;
  job: { title: string };
  applicant?: { name: string };
  interviews: Interview[];
}

export default function ApplicationsPage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const toast = useToast();

  useEffect(() => {
    api
      .get<Application[]>("/applications")
      .then(setApplications)
      .catch(() =>
        toast({ status: "error", title: "Failed to load applications" })
      );
  }, [toast]);

  const handleStatusChange = async (id: number, status: string) => {
    await api.put(`/applications/${id}/status`, { status });
    setApplications((apps) =>
      apps.map((a) => (a.id === id ? { ...a, status } : a))
    );
  };

  const handleSchedule = async (id: number) => {
    const scheduledAt = new Date(Date.now() + 3600 * 1000).toISOString();
    const interview = await api.post(`/applications/${id}/interviews`, {
      scheduledAt,
    });
    setApplications((apps) =>
      apps.map((a) =>
        a.id === id ? { ...a, interviews: [...a.interviews, interview] } : a
      )
    );
  };

  const interviews = applications.flatMap((app) =>
    app.interviews.map((i) => ({ ...i, jobTitle: app.job.title }))
  );

  return (
    <Box className={styles.container}>
      <Tabs>
        <TabList>
          <Tab>Applications</Tab>
          <Tab>Interviews</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <VStack spacing={4} align="stretch">
              {applications.map((app) => (
                <ApplicationItem
                  key={app.id}
                  id={app.id}
                  jobTitle={app.job.title}
                  status={app.status}
                  onStatusChange={(s) => handleStatusChange(app.id, s)}
                  onSchedule={() => handleSchedule(app.id)}
                />
              ))}
            </VStack>
          </TabPanel>
          <TabPanel>
            <VStack spacing={4} align="stretch">
              {interviews.map((inter) => (
                <InterviewItem
                  key={inter.id}
                  jobTitle={(inter as any).jobTitle}
                  scheduledAt={inter.scheduledAt}
                  location={inter.location}
                  link={inter.link}
                  status={inter.status}
                />
              ))}
            </VStack>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}
