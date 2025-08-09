"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Button,
  ButtonGroup,
  SimpleGrid,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Text,
} from "@chakra-ui/react";
import DashboardCard from "@/components/DashboardCard";
import StatWidget from "@/components/StatWidget";
import JobMatchList from "@/components/JobMatchList";
import api from "@/lib/api";
import styles from "./page.module.css";

type Mode = "jobseeker" | "employer";

interface JobSeekerData {
  applications: number;
  interviews: number;
  jobMatches: { id: number; title: string; company: string }[];
}

interface EmployerData {
  jobPostingInsights: { id: number; title: string; applications: number }[];
  candidateInsights: { id: number; applicant: { name: string | null }; job: { title: string } }[];
  funnel: { applied: number; accepted: number; rejected: number };
}

export default function EmploymentDashboardPage() {
  const [mode, setMode] = useState<Mode>("jobseeker");
  const [jobSeekerData, setJobSeekerData] = useState<JobSeekerData | null>(null);
  const [employerData, setEmployerData] = useState<EmployerData | null>(null);

  useEffect(() => {
    api
      .get<JobSeekerData | EmployerData>(`/employment/dashboard?mode=${mode}`)
      .then((data) => {
        if (mode === "jobseeker") setJobSeekerData(data as JobSeekerData);
        else setEmployerData(data as EmployerData);
      })
      .catch(console.error);
  }, [mode]);

  return (
    <Box className={styles.container}>
      <ButtonGroup mb={6} className={styles.toggle}>
        <Button
          colorScheme={mode === "jobseeker" ? "brand" : undefined}
          onClick={() => setMode("jobseeker")}
        >
          Job Seeker
        </Button>
        <Button
          colorScheme={mode === "employer" ? "brand" : undefined}
          onClick={() => setMode("employer")}
        >
          Employer
        </Button>
      </ButtonGroup>

      {mode === "jobseeker" && jobSeekerData && (
        <>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} mb={6}>
            <DashboardCard title="Applications Sent">
              <StatWidget label="Total" value={jobSeekerData.applications} />
            </DashboardCard>
            <DashboardCard title="Interviews Scheduled">
              <StatWidget label="Upcoming" value={jobSeekerData.interviews} />
            </DashboardCard>
          </SimpleGrid>
          <DashboardCard title="Job Matches">
            {jobSeekerData.jobMatches.length > 0 ? (
              <JobMatchList jobs={jobSeekerData.jobMatches} />
            ) : (
              <Text>No matches found.</Text>
            )}
          </DashboardCard>
        </>
      )}

      {mode === "employer" && employerData && (
        <>
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6} mb={6}>
            <DashboardCard title="Applied">
              <StatWidget label="Applications" value={employerData.funnel.applied} />
            </DashboardCard>
            <DashboardCard title="Accepted">
              <StatWidget label="Accepted" value={employerData.funnel.accepted} />
            </DashboardCard>
            <DashboardCard title="Rejected">
              <StatWidget label="Rejected" value={employerData.funnel.rejected} />
            </DashboardCard>
          </SimpleGrid>
          <DashboardCard title="Job Posting Insights" className={styles.tableCard}>
            <Table size="sm">
              <Thead>
                <Tr>
                  <Th>Job</Th>
                  <Th isNumeric>Applications</Th>
                </Tr>
              </Thead>
              <Tbody>
                {employerData.jobPostingInsights.map((job) => (
                  <Tr key={job.id}>
                    <Td>{job.title}</Td>
                    <Td isNumeric>{job.applications}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </DashboardCard>
          <DashboardCard title="Recent Applicants">
            <Table size="sm">
              <Thead>
                <Tr>
                  <Th>Applicant</Th>
                  <Th>Job</Th>
                </Tr>
              </Thead>
              <Tbody>
                {employerData.candidateInsights.map((c) => (
                  <Tr key={c.id}>
                    <Td>{c.applicant.name}</Td>
                    <Td>{c.job.title}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </DashboardCard>
        </>
      )}
    </Box>
  );
}
