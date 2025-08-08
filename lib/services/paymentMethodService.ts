import prisma from "@/lib/prisma";

export interface PaymentMethodData {
  brand: string;
  last4: string;
  expMonth: number;
  expYear: number;
  isDefault?: boolean;
}

export async function getPaymentMethods(userId: number) {
  return prisma.paymentMethod.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      brand: true,
      last4: true,
      expMonth: true,
      expYear: true,
      isDefault: true,
    },
  });
}

export async function addPaymentMethod(userId: number, data: PaymentMethodData) {
  if (data.isDefault) {
    await prisma.paymentMethod.updateMany({
      where: { userId, isDefault: true },
      data: { isDefault: false },
    });
  }
  return prisma.paymentMethod.create({
    data: {
      userId,
      brand: data.brand,
      last4: data.last4,
      expMonth: data.expMonth,
      expYear: data.expYear,
      isDefault: data.isDefault ?? false,
    },
    select: {
      id: true,
      brand: true,
      last4: true,
      expMonth: true,
      expYear: true,
      isDefault: true,
    },
  });
}

export async function setDefaultPaymentMethod(userId: number, id: number) {
  await prisma.paymentMethod.updateMany({
    where: { userId, isDefault: true },
    data: { isDefault: false },
  });
  return prisma.paymentMethod.update({
    where: { id },
    data: { isDefault: true },
    select: {
      id: true,
      brand: true,
      last4: true,
      expMonth: true,
      expYear: true,
      isDefault: true,
    },
  });
}

export async function removePaymentMethod(userId: number, id: number) {
  return prisma.paymentMethod.deleteMany({ where: { id, userId } });
}

