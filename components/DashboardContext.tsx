"use client";

import { createContext, useContext, useEffect, useState } from "react";
import api from "@/lib/api";
import type { Notification } from "@/lib/services/notificationService";
import type { Gig } from "@/components/GigCard";
import type { Goal } from "@/lib/services/goalService";

interface DashboardSummary {
  greeting: string;
  stats: { projects: number; gigs: number; unreadNotifications: number };
  recommendations: Gig[];
  updates: Notification[];
  goals: Goal[];
}

const DashboardContext = createContext<DashboardSummary | null>(null);

export function DashboardProvider({ children }: { children: React.ReactNode }) {
  const [summary, setSummary] = useState<DashboardSummary | null>(null);

  useEffect(() => {
    api
      .get<DashboardSummary>("/dashboard/summary")
      .then(setSummary)
      .catch(console.error);
  }, []);

  return (
    <DashboardContext.Provider value={summary}>{children}</DashboardContext.Provider>
  );
}

export function useDashboard() {
  return useContext(DashboardContext);
}
