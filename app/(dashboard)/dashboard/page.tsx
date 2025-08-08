"use client";

import { Box, Button, ButtonGroup } from "@chakra-ui/react";
import { useState } from "react";
import { DashboardProvider } from "@/components/DashboardContext";
import WelcomeBanner from "@/components/WelcomeBanner";
import SummaryWidgets from "@/components/SummaryWidgets";
import CTASection from "@/components/CTASection";
import RecommendationList from "@/components/RecommendationList";
import ActivityFeed from "@/components/ActivityFeed";
import GoalProgress from "@/components/GoalProgress";
import LiveFeed from "@/components/LiveFeed";
import styles from "./page.module.css";

function DashboardContent() {
  const [view, setView] = useState<"home" | "feed">("home");
  return (
    <Box className={styles.container}>
      <ButtonGroup isAttached variant="outline" mb={6} className={styles.toggle}>
        <Button
          onClick={() => setView("home")}
          colorScheme={view === "home" ? "brand" : undefined}
        >
          Dashboard
        </Button>
        <Button
          onClick={() => setView("feed")}
          colorScheme={view === "feed" ? "brand" : undefined}
        >
          Live Feed
        </Button>
      </ButtonGroup>

      {view === "home" ? (
        <>
          <WelcomeBanner />
          <SummaryWidgets />
          <CTASection />
          <RecommendationList />
          <ActivityFeed />
          <GoalProgress />
        </>
      ) : (
        <LiveFeed />
      )}
    </Box>
  );
}

export default function DashboardPage() {
  return (
    <DashboardProvider>
      <DashboardContent />
    </DashboardProvider>
  );
}
