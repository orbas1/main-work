import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import {
  getPaymentMethods,
  addPaymentMethod,
} from "@/lib/services/paymentMethodService";
import { getCardBrand } from "@/lib/utils/card";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { id: true },
  });
  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

  const methods = await getPaymentMethods(user.id);
  return NextResponse.json(methods);
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { id: true },
  });
  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

  const { cardNumber, expMonth, expYear, isDefault } = await req.json();
  const brand = getCardBrand(cardNumber);
  const last4 = cardNumber.slice(-4);

  const method = await addPaymentMethod(user.id, {
    brand,
    last4,
    expMonth,
    expYear,
    isDefault,
  });
  return NextResponse.json(method, { status: 201 });
}
