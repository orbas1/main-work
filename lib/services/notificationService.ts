import prisma from "@/lib/prisma";

export async function getUserNotifications(userId: number) {
  return prisma.notification.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });
}

export async function markNotificationRead(id: number, userId: number) {
  return prisma.notification.updateMany({
    where: { id, userId },
    data: { read: true },
  });
}

export async function createNotification(userId: number, message: string) {
  return prisma.notification.create({
    data: { userId, message },
  });
}

export type Notification = Awaited<ReturnType<typeof getUserNotifications>>[number];

