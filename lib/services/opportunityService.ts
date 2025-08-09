import prisma from "@/lib/prisma";
import type { Prisma } from "@prisma/client";

export interface OpportunityFilters {
  search?: string;
  category?: string;
  status?: string;
  providerId?: number;
  participantId?: number;
}

export async function getOpportunities(filters: OpportunityFilters = {}) {
  const { search, category, status, providerId, participantId } = filters;
  if (participantId) {
    const applications = await prisma.opportunityApplication.findMany({
      where: {
        applicantId: participantId,
        ...(status ? { status } : {}),
      },
      include: { opportunity: true },
    });
    return applications.map((a) => ({
      ...a.opportunity,
      applicationStatus: a.status,
      applicationId: a.id,
    }));
  }

  return prisma.opportunity.findMany({
    where: {
      ...(search ? { title: { contains: search, mode: "insensitive" } } : {}),
      ...(category ? { category } : {}),
      ...(status ? { status } : {}),
      ...(providerId ? { providerId } : {}),
    },
    include: {
      provider: { select: { id: true, name: true, image: true } },
    },
    orderBy: { createdAt: "desc" },
  });
}

export interface CreateOpportunityData {
  title: string;
  description: string;
  category?: string;
  location?: string;
  skills?: string;
  compensation?: number;
  status?: string;
  providerId: number;
}

export async function createOpportunity(data: CreateOpportunityData) {
  return prisma.opportunity.create({ data });
}

export async function getOpportunity(id: number) {
  return prisma.opportunity.findUnique({
    where: { id },
    include: {
      provider: { select: { id: true, name: true, image: true } },
      applications: {
        include: {
          applicant: { select: { id: true, name: true, image: true } },
        },
      },
    },
  });
}

export async function updateOpportunity(
  id: number,
  data: Partial<CreateOpportunityData> & { status?: string }
) {
  return prisma.opportunity.update({ where: { id }, data });
}

export async function deleteOpportunity(id: number) {
  return prisma.opportunity.delete({ where: { id } });
}

export async function applyToOpportunity(opportunityId: number, applicantId: number) {
  return prisma.opportunityApplication.create({
    data: { opportunityId, applicantId },
  });
}
