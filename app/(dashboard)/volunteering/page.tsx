"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Button,
  ButtonGroup,
  Heading,
  SimpleGrid,
  Spinner,
  Text,
} from "@chakra-ui/react";
import DashboardCard from "@/components/DashboardCard";
import { VolunteerStats, EmployerStats } from "@/lib/types/volunteer";
import volunteerService from "@/lib/services/volunteerService";
import styles from "./page.module.css";

export default function VolunteeringDashboard() {
  const [view, setView] = useState<"volunteer" | "employer">("volunteer");
  const [volunteer, setVolunteer] = useState<VolunteerStats>();
  const [employer, setEmployer] = useState<EmployerStats>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadData = async () => {
    setLoading(true);
    setError("");
    try {
      if (view === "volunteer") {
        const data = await volunteerService.getVolunteerStats();
        setVolunteer(data);
      } else {
        const data = await volunteerService.getEmployerStats();
        setEmployer(data);
      }
    } catch (e: any) {
      setError(e.message || "Failed to load stats");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [view]);

  return (
    <Box className={styles.container}>
      <Heading size="lg" mb={4}>
        Volunteering Dashboard
      </Heading>
      <ButtonGroup mb={4}>
        <Button
          colorScheme={view === "volunteer" ? "brand" : "gray"}
          onClick={() => setView("volunteer")}
        >
          Volunteer View
        </Button>
        <Button
          colorScheme={view === "employer" ? "brand" : "gray"}
          onClick={() => setView("employer")}
        >
          Employer View
        </Button>
      </ButtonGroup>
      {error && (
        <Text color="red.500" mb={4}>
          {error}
        </Text>
      )}
      {loading ? (
        <Spinner />
      ) : (
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
          {view === "volunteer" && volunteer && (
            <>
              <DashboardCard title="Total Hours">
                <Text fontSize="2xl">{volunteer.totalHours}</Text>
              </DashboardCard>
              <DashboardCard title="Active Applications">
                <Text fontSize="2xl">{volunteer.activeApplications}</Text>
              </DashboardCard>
              <DashboardCard title="Feedback Score">
                <Text fontSize="2xl">{volunteer.feedbackScore.toFixed(1)}</Text>
              </DashboardCard>
            </>
          )}
          {view === "employer" && employer && (
            <>
              <DashboardCard title="Active Volunteers">
                <Text fontSize="2xl">{employer.activeVolunteers}</Text>
              </DashboardCard>
              <DashboardCard title="Active Opportunities">
                <Text fontSize="2xl">{employer.activeOpportunities}</Text>
              </DashboardCard>
              <DashboardCard title="Pending Applications">
                <Text fontSize="2xl">{employer.pendingApplications}</Text>
              </DashboardCard>
            </>
          )}
        </SimpleGrid>
      )}
    </Box>
  );
}
