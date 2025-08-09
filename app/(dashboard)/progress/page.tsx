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
import { ParticipantProgress, ProviderProgress } from "@/lib/types/progress";
import progressService from "@/lib/services/progressService";
import styles from "./page.module.css";

export default function ProgressPage() {
  const [view, setView] = useState<"participant" | "provider">("participant");
  const [participant, setParticipant] = useState<ParticipantProgress>();
  const [provider, setProvider] = useState<ProviderProgress>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadData = async () => {
    setLoading(true);
    setError("");
    try {
      if (view === "participant") {
        const data = await progressService.getParticipant();
        setParticipant(data);
      } else {
        const data = await progressService.getProvider();
        setProvider(data);
      }
    } catch (e: any) {
      setError(e.message || "Failed to load progress");
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
        Progress Dashboard
      </Heading>
      <ButtonGroup mb={4}>
        <Button
          colorScheme={view === "participant" ? "brand" : "gray"}
          onClick={() => setView("participant")}
        >
          Participant View
        </Button>
        <Button
          colorScheme={view === "provider" ? "brand" : "gray"}
          onClick={() => setView("provider")}
        >
          Provider View
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
          {view === "participant" && participant && (
            <>
              <DashboardCard title="Completed Tasks">
                <Text fontSize="2xl">{participant.completedTasks}</Text>
              </DashboardCard>
              <DashboardCard title="Average Rating">
                <Text fontSize="2xl">{participant.averageRating.toFixed(1)}</Text>
              </DashboardCard>
              <DashboardCard title="Badges Earned">
                <Text fontSize="2xl">{participant.badges}</Text>
              </DashboardCard>
            </>
          )}
          {view === "provider" && provider && (
            <>
              <DashboardCard title="Participants Tracked">
                <Text fontSize="2xl">{provider.participants}</Text>
              </DashboardCard>
              <DashboardCard title="Average Feedback">
                <Text fontSize="2xl">{provider.averageFeedback.toFixed(1)}</Text>
              </DashboardCard>
              <DashboardCard title="Projects Managed">
                <Text fontSize="2xl">{provider.projectsManaged}</Text>
              </DashboardCard>
            </>
          )}
        </SimpleGrid>
      )}
    </Box>
  );
}
