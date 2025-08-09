import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export interface SessionFilters {
  search?: string;
  industry?: string;
  topic?: string;
  date?: string;
  freeOnly?: boolean;
  sort?: "popular" | "upcoming" | "rated";
}

export async function getSessions(filters: SessionFilters = {}) {
  const { search, industry, topic, date, freeOnly, sort } = filters;
  const orderBy: Prisma.NetworkingSessionOrderByWithRelationInput =
    sort === "popular"
      ? { registrations: { _count: "desc" } }
      : sort === "rated"
      ? { price: "asc" }
      : { date: "asc" };
  return prisma.networkingSession.findMany({
    where: {
      ...(search ? { title: { contains: search, mode: "insensitive" } } : {}),
      ...(industry ? { industry } : {}),
      ...(topic ? { topic } : {}),
      ...(date ? { date: { gte: new Date(date) } } : {}),
      ...(freeOnly ? { price: 0 } : {}),
    },
    include: {
      host: { select: { id: true, name: true, image: true } },
      _count: { select: { registrations: true } },
    },
    orderBy,
  }).then((sessions) =>
    sessions.map((s) => ({
      ...s,
      availableSeats: s.capacity - s._count.registrations,
    }))
  );
}

export async function getSession(id: number) {
  const session = await prisma.networkingSession.findUnique({
    where: { id },
    include: {
      host: { select: { id: true, name: true, image: true } },
      registrations: { select: { participantId: true } },
    },
  });
  if (!session) return null;
  return {
    ...session,
    availableSeats: session.capacity - session.registrations.length,
  };
}

export async function registerForSession(sessionId: number, participantId: number) {
  return prisma.sessionRegistration.create({
    data: { sessionId, participantId },
  });
}
