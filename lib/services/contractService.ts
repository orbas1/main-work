import prisma from "@/lib/prisma";

export interface MilestoneInput {
  description: string;
  dueDate: string;
  amount: number;
  order: number;
}

export interface CreateContractData {
  title: string;
  description: string;
  clientId: number;
  freelancerId: number;
  paymentType: "fixed" | "hourly";
  totalValue?: number;
  hourlyRate?: number;
  expectedHours?: number;
  milestones: MilestoneInput[];
}

export async function createContract(data: CreateContractData) {
  return prisma.contract.create({
    data: {
      title: data.title,
      description: data.description,
      clientId: data.clientId,
      freelancerId: data.freelancerId,
      paymentType: data.paymentType,
      totalValue: data.totalValue,
      hourlyRate: data.hourlyRate,
      expectedHours: data.expectedHours,
      milestones: {
        create: data.milestones.map((m) => ({
          description: m.description,
          dueDate: new Date(m.dueDate),
          amount: m.amount,
          order: m.order,
        })),
      },
    },
    include: { milestones: true },
  });
}

export async function getContract(id: number) {
  return prisma.contract.findUnique({
    where: { id },
    include: { milestones: true },
  });
}

export async function updateContract(
  id: number,
  data: Partial<CreateContractData>
) {
  return prisma.contract.update({
    where: { id },
    data: {
      title: data.title,
      description: data.description,
      freelancerId: data.freelancerId,
      paymentType: data.paymentType,
      totalValue: data.totalValue,
      hourlyRate: data.hourlyRate,
      expectedHours: data.expectedHours,
      milestones: data.milestones
        ? {
            deleteMany: {},
            create: data.milestones.map((m) => ({
              description: m.description,
              dueDate: new Date(m.dueDate),
              amount: m.amount,
              order: m.order,
            })),
          }
        : undefined,
    },
    include: { milestones: true },
  });
}

export async function listContractsByUser(userId: number) {
  return prisma.contract.findMany({
    where: {
      OR: [{ clientId: userId }, { freelancerId: userId }],
    },
    include: { milestones: true },
    orderBy: { createdAt: "desc" },
  });
}
