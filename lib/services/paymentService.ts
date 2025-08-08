import prisma from "@/lib/prisma";
import { getGig } from "./gigService";

export async function initiatePayment(buyerId: number, gigId: number) {
  const gig = await getGig(gigId);
  if (!gig) {
    throw new Error("Gig not found");
  }
  return prisma.gigOrder.create({
    data: {
      gigId,
      buyerId,
      amount: gig.price,
      transaction: {
        create: {
          userId: buyerId,
          amount: gig.price,
          currency: "USD",
          description: `Payment for gig ${gig.title}`,
          status: "completed",
        },
      },
    },
    include: { transaction: true },
  });
}
