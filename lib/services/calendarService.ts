import prisma from "@/lib/prisma";

export async function getEvents(userId: number, role: "seller" | "buyer") {
  if (role === "seller") {
    return prisma.serviceAppointment.findMany({ where: { sellerId: userId } });
  }
  return prisma.serviceAppointment.findMany({ where: { buyerId: userId } });
}

export async function createEvent(data: {
  sellerId: number;
  buyerId?: number;
  title: string;
  start: Date;
  end: Date;
  status?: string;
}) {
  return prisma.serviceAppointment.create({ data });
}

export async function updateEvent(id: number, data: Partial<{
  title: string;
  start: Date;
  end: Date;
  status: string;
  buyerId: number | null;
}>) {
  return prisma.serviceAppointment.update({ where: { id }, data });
}

export async function deleteEvent(id: number) {
  return prisma.serviceAppointment.delete({ where: { id } });
}
