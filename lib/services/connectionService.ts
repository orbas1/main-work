import { prisma } from "@/lib/prisma";

export async function getConnections(ownerId: number) {
  return prisma.connection.findMany({
    where: { ownerId },
    include: { target: true },
  });
}

export async function addConnection(ownerId: number, targetId: number) {
  return prisma.connection.create({
    data: { ownerId, targetId },
  });
}

export async function updateConnectionStatus(id: number, status: string) {
  return prisma.connection.update({
    where: { id },
    data: { status },
  });
}
