import prisma from "@/lib/prisma";

export async function getTasks(userId: number, role: "creator" | "tasker") {
  if (role === "creator") {
    return prisma.task.findMany({ where: { creatorId: userId } });
  }
  return prisma.task.findMany({ where: { assigneeId: userId } });
}

export async function createTask(data: {
  creatorId: number;
  title: string;
  description: string;
  budget: number;
  assigneeId?: number;
  status?: string;
}) {
  return prisma.task.create({ data });
}

export async function updateTask(id: number, data: Partial<{
  title: string;
  description: string;
  budget: number;
  status: string;
  assigneeId: number | null;
}>) {
  return prisma.task.update({ where: { id }, data });
}

export async function deleteTask(id: number) {
  return prisma.task.delete({ where: { id } });
}
