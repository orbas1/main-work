import prisma from "@/lib/prisma";

export interface GigFilters {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  deliveryTime?: number;
  rating?: number;
  query?: string;
  sort?: "Most Relevant" | "Highest Rated" | "Newest";
}

export async function fetchGigs(filters: GigFilters = {}) {
  const { category, minPrice, maxPrice, deliveryTime, rating, query, sort } = filters;
  const where: any = {};

  if (category) where.category = category;
  if (minPrice !== undefined || maxPrice !== undefined) {
    where.price = {};
    if (minPrice !== undefined) where.price.gte = minPrice;
    if (maxPrice !== undefined) where.price.lte = maxPrice;
  }
  if (deliveryTime !== undefined) where.deliveryTime = { lte: deliveryTime };
  if (rating !== undefined) where.rating = { gte: rating };
  if (query) {
    where.OR = [
      { title: { contains: query, mode: "insensitive" } },
      { description: { contains: query, mode: "insensitive" } },
    ];
  }

  let orderBy: any;
  switch (sort) {
    case "Highest Rated":
      orderBy = { rating: "desc" };
      break;
    case "Newest":
      orderBy = { createdAt: "desc" };
      break;
    default:
      orderBy = { id: "asc" };
  }

  return prisma.gig.findMany({
    where,
    orderBy,
    include: { seller: { select: { id: true, name: true } } },
  });
}
