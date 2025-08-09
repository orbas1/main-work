import prisma from "@/lib/prisma";
import type { Prisma } from "@prisma/client";

export interface ServiceFilters {
  search?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  location?: string;
  sellerId?: number;
  status?: string;
}

export async function getServices(filters: ServiceFilters = {}) {
  const { search, category, minPrice, maxPrice, location, sellerId, status } = filters;
  const orderBy: Prisma.ServiceOrderByWithRelationInput = { createdAt: "desc" };

  return prisma.service.findMany({
    where: {
      ...(search ? { title: { contains: search, mode: "insensitive" } } : {}),
      ...(category ? { category } : {}),
      ...(status ? { status } : {}),
      ...(sellerId ? { sellerId } : {}),
      ...(location ? { location: { contains: location, mode: "insensitive" } } : {}),
      ...(minPrice || maxPrice
        ? { price: { gte: minPrice || 0, lte: maxPrice || undefined } }
        : {}),
    },
    include: {
      seller: {
        select: { id: true, name: true, image: true },
      },
    },
    orderBy,
  });
}

export interface CreateServiceData {
  title: string;
  description: string;
  price: number;
  category?: string;
  location?: string;
  sellerId: number;
  status?: string;
}

export async function createService(data: CreateServiceData) {
  return prisma.service.create({ data });
}

export async function getService(id: number) {
  return prisma.service.findUnique({
    where: { id },
    include: {
      seller: {
        select: { id: true, name: true, image: true },
      },
    },
  });
}

export async function updateService(
  id: number,
  data: Partial<CreateServiceData> & { status?: string }
) {
  return prisma.service.update({ where: { id }, data });
}

export async function deleteService(id: number) {
  return prisma.service.delete({ where: { id } });
}
