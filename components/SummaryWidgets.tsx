"use client";

import { SimpleGrid } from "@chakra-ui/react";
import SummaryWidget from "./SummaryWidget";
import { useDashboard } from "@/components/DashboardContext";
import styles from "./SummaryWidgets.module.css";

export default function SummaryWidgets() {
  const dashboard = useDashboard();
  if (!dashboard) return null;
  const { projects, gigs, unreadNotifications } = dashboard.stats;
  return (
    <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6} className={styles.grid}>
      <SummaryWidget label="Active Projects" value={projects} />
      <SummaryWidget label="My Gigs" value={gigs} />
      <SummaryWidget label="Unread Notifications" value={unreadNotifications} />
    </SimpleGrid>
  );
}
