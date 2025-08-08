import { NextResponse, NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import {
  setDefaultPaymentMethod,
  removePaymentMethod,
} from "@/lib/services/paymentMethodService";

export async function PUT(req: NextRequest, context: any) {
  const { params } = context;
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { id: true },
  });
  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

  const method = await setDefaultPaymentMethod(user.id, parseInt(params.id, 10));
  return NextResponse.json(method);
}

export async function DELETE(req: NextRequest, context: any) {
  const { params } = context;
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { id: true },
  });
  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

  await removePaymentMethod(user.id, parseInt(params.id, 10));
  return NextResponse.json({ success: true });
}
