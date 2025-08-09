import prisma from "@/lib/prisma";
import { getTopGigs } from "./gigService";
import { getUserNotifications } from "./notificationService";
import { getUserGoals } from "./goalService";

export async function getDashboardSummary(userId: number) {
  const [user, notifications, goals, recommendations] = await Promise.all([
    prisma.user.findUnique({
      where: { id: userId },
      select: {
        name: true,
        projects: { select: { status: true } },
        gigs: { select: { id: true } },
      },
    }),
    getUserNotifications(userId),
    getUserGoals(userId),
    getTopGigs(3),
  ]);

  const activeProjects = user?.projects.filter((p) => p.status === "Active").length || 0;
  const stats = {
    projects: activeProjects,
    gigs: user?.gigs.length || 0,
    unreadNotifications: notifications.filter((n) => !n.read).length,
  };

  return {
    greeting: user?.name || "User",
    stats,
    recommendations,
    updates: notifications,
    goals,
  };
}
