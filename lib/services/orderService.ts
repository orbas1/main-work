import prisma from "@/lib/prisma";

export async function listOrders(userId: number, role: "seller" | "buyer") {
  const where = role === "seller" ? { sellerId: userId } : { buyerId: userId };
  return prisma.order.findMany({
    where,
    include: {
      gig: { select: { title: true } },
      seller: { select: { name: true } },
      buyer: { select: { name: true } },
    },
    orderBy: { createdAt: "desc" },
  });
}

export async function updateOrderStatus(
  orderId: number,
  status: string,
  userId: number
) {
  const order = await prisma.order.findUnique({ where: { id: orderId } });
  if (!order || (order.sellerId !== userId && order.buyerId !== userId)) {
    throw new Error("Unauthorized");
  }
  return prisma.order.update({ where: { id: orderId }, data: { status } });
}

export async function updateOrderNotes(
  orderId: number,
  notes: string,
  userId: number
) {
  const order = await prisma.order.findUnique({ where: { id: orderId } });
  if (!order || (order.sellerId !== userId && order.buyerId !== userId)) {
    throw new Error("Unauthorized");
  }
  return prisma.order.update({ where: { id: orderId }, data: { notes } });
}
