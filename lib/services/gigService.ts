import prisma from "@/lib/prisma";
import type { Prisma } from "@prisma/client";

export interface GigFilters {
  search?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  sort?: "price" | "rating" | "newest";
  sellerId?: number;
  status?: string;
}

export async function getGigs(filters: GigFilters = {}) {
  const { search, category, minPrice, maxPrice, sort, sellerId, status } = filters;
  const orderBy: Prisma.GigOrderByWithRelationInput =
    sort === "price"
      ? { price: "asc" as const }
      : sort === "rating"
      ? { rating: "desc" as const }
      : { createdAt: "desc" as const };

  return prisma.gig.findMany({
    where: {
      ...(search ? { title: { contains: search, mode: "insensitive" } } : {}),
      ...(category ? { category } : {}),
      ...(status ? { status } : {}),
      ...(sellerId ? { sellerId } : {}),
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

export interface CreateGigData {
  title: string;
  description: string;
  price: number;
  category?: string;
  thumbnail?: string;
  sellerId: number;
}

export async function createGig(data: CreateGigData) {
  return prisma.gig.create({ data });
}

export async function getGig(id: number) {
  return prisma.gig.findUnique({
    where: { id },
    include: {
      seller: { select: { id: true, name: true } },
    },
  });
}

export async function updateGig(id: number, data: Partial<CreateGigData> & { status?: string }) {
  return prisma.gig.update({ where: { id }, data });
}

export async function deleteGig(id: number) {
  return prisma.gig.delete({ where: { id } });
}

export async function getSellerGigs(sellerId: number) {
  return getGigs({ sellerId });
}
