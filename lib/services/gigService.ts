import prisma from "@/lib/prisma";

export async function getSellerGigs(userId: number) {
  return prisma.gig.findMany({
    where: { sellerId: userId },
    orderBy: { id: "asc" },
  });
}

export async function getBuyerOrders(userId: number) {
  return prisma.order.findMany({
    where: { buyerId: userId },
    include: {
      gig: {
        select: {
          title: true,
          seller: { select: { name: true } },
        },
      },
    },
    orderBy: { id: "asc" },
  });
}

export async function updateGigStatus(
  id: number,
  userId: number,
  data: { active?: boolean }
) {
  return prisma.gig.updateMany({
    where: { id, sellerId: userId },
    data,
  });
}

export type Gig = Awaited<ReturnType<typeof getSellerGigs>>[number];
export type Order = Awaited<ReturnType<typeof getBuyerOrders>>[number];
