import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import prisma from "@/lib/prisma";
import { authOptions } from "@/lib/auth";

export async function PATCH(
  req: Request,
  { params }: any
) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const user = await prisma.user.findUnique({ where: { email: session.user.email } });
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }
  const id = parseInt(params.id, 10);
  const notification = await prisma.notification.findFirst({
    where: { id, userId: user.id },
  });
  if (!notification) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  const body = await req.json().catch(() => ({}));
  const updated = await prisma.notification.update({
    where: { id },
    data: { read: body.read ?? true },
  });
  return NextResponse.json(updated);
}
