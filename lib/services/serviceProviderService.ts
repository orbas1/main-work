import prisma from "@/lib/prisma";
import type { Prisma } from "@prisma/client";

export interface ServiceFilters {
  search?: string;
  status?: string;
  sellerId?: number;
}

export async function getServices(filters: ServiceFilters = {}) {
  const { search, status, sellerId } = filters;
  return prisma.service.findMany({
    where: {
      ...(search ? { title: { contains: search, mode: "insensitive" } } : {}),
      ...(status ? { status } : {}),
      ...(sellerId ? { sellerId } : {}),
    },
    include: {
      seller: { select: { id: true, name: true, image: true } },
    },
    orderBy: { createdAt: "desc" },
  });
}

export interface CreateServiceData {
  title: string;
  description: string;
  price: number;
  sellerId: number;
  status?: string;
}

export async function createService(data: CreateServiceData) {
  return prisma.service.create({ data });
}

export async function getService(id: number) {
  return prisma.service.findUnique({
    where: { id },
    include: { seller: { select: { id: true, name: true, image: true } } },
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

export interface ServiceOrderFilters {
  sellerId?: number;
  buyerId?: number;
  status?: string;
}

export async function getServiceOrders(filters: ServiceOrderFilters = {}) {
  const { sellerId, buyerId, status } = filters;
  return prisma.serviceOrder.findMany({
    where: {
      ...(sellerId ? { service: { sellerId } } : {}),
      ...(buyerId ? { buyerId } : {}),
      ...(status ? { status } : {}),
    },
    include: {
      service: {
        include: { seller: { select: { id: true, name: true, image: true } } },
      },
      buyer: { select: { id: true, name: true, image: true } },
    },
    orderBy: { createdAt: "desc" },
  });
}

export interface CreateServiceOrderData {
  serviceId: number;
  buyerId: number;
  scheduledFor?: Date | null;
}

export async function createServiceOrder(data: CreateServiceOrderData) {
  return prisma.serviceOrder.create({ data });
}
