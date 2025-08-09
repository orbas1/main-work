import prisma from "@/lib/prisma";
import type { ContractStatus, MilestoneStatus } from "@prisma/client";

export interface CreateMilestoneData {
  title: string;
  amount: number;
  dueDate?: Date;
}

export interface CreateContractData {
  title: string;
  description?: string;
  clientId: number;
  freelancerId: number;
  totalValue: number;
  startDate?: Date;
  endDate?: Date;
  milestones?: CreateMilestoneData[];
}

export async function listContracts(
  userId: number,
  role: "client" | "freelancer",
  status?: ContractStatus
) {
  return prisma.contract.findMany({
    where: {
      ...(role === "client" ? { clientId: userId } : { freelancerId: userId }),
      ...(status ? { status } : {}),
    },
    include: {
      milestones: true,
      client: { select: { id: true, name: true, image: true } },
      freelancer: { select: { id: true, name: true, image: true } },
    },
    orderBy: { createdAt: "desc" },
  });
}

export async function getContract(id: number) {
  return prisma.contract.findUnique({
    where: { id },
    include: {
      milestones: true,
      client: { select: { id: true, name: true, image: true } },
      freelancer: { select: { id: true, name: true, image: true } },
    },
  });
}

export async function createContract(data: CreateContractData) {
  const { milestones, ...contractData } = data;
  return prisma.contract.create({
    data: {
      ...contractData,
      milestones: milestones
        ? {
            create: milestones.map((m) => ({
              title: m.title,
              amount: m.amount,
              dueDate: m.dueDate,
            })),
          }
        : undefined,
    },
    include: { milestones: true },
  });
}

export async function updateContract(
  id: number,
  data: Partial<{
    title: string;
    description: string;
    status: ContractStatus;
    startDate: Date;
    endDate: Date;
    totalValue: number;
  }>
) {
  return prisma.contract.update({ where: { id }, data });
}

export async function updateMilestone(
  id: number,
  data: Partial<{
    title: string;
    amount: number;
    dueDate: Date;
    status: MilestoneStatus;
  }>
) {
  return prisma.milestone.update({ where: { id }, data });
}
