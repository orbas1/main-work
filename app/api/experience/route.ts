import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import prisma from "@/lib/prisma";
import { authOptions } from "@/lib/auth";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const userId = parseInt(session.user.id);

  const completedTasks = await prisma.task.findMany({
    where: { taskerId: userId, status: "completed" },
  });
  const avgRating =
    completedTasks.reduce((sum, t) => sum + (t.rating || 0), 0) /
    (completedTasks.length || 1);

  const activeOpportunities = await prisma.project.count({
    where: { ownerId: userId },
  });
  const applications = await prisma.application.count({
    where: { applicantId: userId },
  });

  return NextResponse.json({
    participant: {
      totalCompleted: completedTasks.length,
      avgRating,
    },
    provider: {
      activeOpportunities,
      applications,
    },
  });
}
