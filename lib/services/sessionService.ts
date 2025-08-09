import { prisma } from "@/lib/prisma";

export async function getHostSessions(hostId: number) {
  return prisma.networkingSession.findMany({
    where: { hostId },
    include: { participants: { include: { user: true } } },
  });
}

export async function updateSession(
  id: number,
  data: { status?: string; duration?: number; title?: string }
) {
  return prisma.networkingSession.update({
    where: { id },
    data,
  });
}

export async function addParticipant(sessionId: number, userId: number) {
  return prisma.sessionParticipant.create({
    data: { sessionId, userId },
  });
}

export async function removeParticipant(sessionId: number, userId: number) {
  return prisma.sessionParticipant.deleteMany({
    where: { sessionId, userId },
  });
}
