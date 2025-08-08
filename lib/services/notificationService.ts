import prisma from "@/lib/prisma";

export async function getUserNotifications(email: string) {
  return prisma.notification.findMany({
    where: { user: { email } },
    orderBy: { createdAt: "desc" },
  });
}

export async function markNotificationRead(id: number, email: string) {
  return prisma.notification.updateMany({
    where: { id, user: { email } },
    data: { read: true },
  });
}
