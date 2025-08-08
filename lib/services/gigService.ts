import prisma from "@/lib/prisma";

export interface GigFilters {
  search?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  sort?: "price" | "rating" | "newest";
}

export async function getGigs(filters: GigFilters = {}) {
  const { search, category, minPrice, maxPrice, sort } = filters;
  const orderBy =
    sort === "price"
      ? { price: "asc" }
      : sort === "rating"
      ? { rating: "desc" }
      : { createdAt: "desc" };

  return prisma.gig.findMany({
    where: {
      ...(search ? { title: { contains: search, mode: "insensitive" } } : {}),
      ...(category ? { category } : {}),
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
