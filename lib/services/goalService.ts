import prisma from "@/lib/prisma";

export interface GoalData {
  title: string;
  target: number;
  current?: number;
  userId: number;
}

export async function getUserGoals(userId: number) {
  return prisma.goal.findMany({
    where: { userId },
    orderBy: { createdAt: "asc" },
  });
}

export async function createGoal(data: GoalData) {
  return prisma.goal.create({ data });
}

export async function updateGoal(id: number, userId: number, data: Partial<GoalData>) {
  const goal = await prisma.goal.findUnique({ where: { id } });
  if (!goal || goal.userId !== userId) {
    throw new Error("Unauthorized");
  }
  return prisma.goal.update({ where: { id }, data });
}

export async function deleteGoal(id: number, userId: number) {
  const goal = await prisma.goal.findUnique({ where: { id } });
  if (!goal || goal.userId !== userId) {
    throw new Error("Unauthorized");
  }
  return prisma.goal.delete({ where: { id } });
}

export type Goal = Awaited<ReturnType<typeof getUserGoals>>[number];
