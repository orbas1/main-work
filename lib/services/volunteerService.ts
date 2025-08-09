import prisma from "@/lib/prisma";

export async function listOpportunities(keyword?: string) {
  return prisma.volunteerOpportunity.findMany({
    where: keyword
      ? {
          OR: [
            { title: { contains: keyword, mode: "insensitive" } },
            { organization: { contains: keyword, mode: "insensitive" } },
          ],
        }
      : undefined,
    orderBy: { createdAt: "desc" },
  });
}

export async function getOpportunity(id: number) {
  return prisma.volunteerOpportunity.findUnique({ where: { id } });
}

export async function applyToOpportunity(opportunityId: number, volunteerId: number) {
  return prisma.volunteerApplication.create({
    data: { opportunityId, volunteerId },
  });
}

export async function getMyVolunteerApplications(userId: number) {
  return prisma.volunteerApplication.findMany({
    where: { volunteerId: userId },
    include: { opportunity: true },
  });
}

export async function getReceivedVolunteerApplications(userId: number) {
  return prisma.volunteerApplication.findMany({
    where: { opportunity: { creatorId: userId } },
    include: { volunteer: true, opportunity: true },
  });
}

export async function updateVolunteerApplicationStatus(id: number, status: string) {
  return prisma.volunteerApplication.update({
    where: { id },
    data: { status },
  });
}
import api from "@/lib/api";
import { VolunteerStats, EmployerStats } from "@/lib/types/volunteer";

export const volunteerService = {
  getVolunteerStats: () => api.get<VolunteerStats>("/volunteering/volunteer/stats"),
  getEmployerStats: () => api.get<EmployerStats>("/volunteering/employer/stats"),
};

export default volunteerService;
