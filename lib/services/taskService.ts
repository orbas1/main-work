import prisma from "@/lib/prisma";

export interface TaskFilters {
  search?: string;
  category?: string;
}

export async function getTasks(filters: TaskFilters = {}) {
  const { search, category } = filters;
  return prisma.task.findMany({
    where: {
      ...(search ? { title: { contains: search, mode: "insensitive" } } : {}),
      ...(category ? { category } : {}),
      status: "open",
    },
    orderBy: { createdAt: "desc" },
  });
}

export interface CreateTaskData {
  title: string;
  description: string;
  category?: string;
  skills?: string[];
  budgetMin?: number;
  budgetMax?: number;
  paymentMethod?: string;
  deadline?: Date;
  media?: string[];
  visibility?: string;
  creatorId: number;
}

export async function createTask(data: CreateTaskData) {
  return prisma.task.create({ data });
}

export async function getTask(id: number) {
  return prisma.task.findUnique({
    where: { id },
    include: {
      creator: { select: { id: true, name: true, image: true } },
      bids: {
        include: {
          bidder: { select: { id: true, name: true, image: true } },
        },
      },
    },
  });
}

export interface CreateBidData {
  taskId: number;
  bidderId: number;
  amount: number;
  message?: string;
  timeline?: string;
}

export async function createTaskBid(data: CreateBidData) {
  return prisma.taskBid.create({ data });
}
