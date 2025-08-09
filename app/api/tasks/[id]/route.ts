import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import prisma from "@/lib/prisma";
import { authOptions } from "@/lib/auth";

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const userId = parseInt(session.user.id);
  const { id } = params;
  const data = await req.json();
  const taskId = parseInt(id);
  const existing = await prisma.task.findFirst({
    where: { id: taskId, taskerId: userId },
  });
  if (!existing) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  if (data.status === "completed") {
    data.completedAt = new Date();
  }
  const task = await prisma.task.update({ where: { id: taskId }, data });
  return NextResponse.json(task);
}

export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const userId = parseInt(session.user.id);
  const taskId = parseInt(params.id);
  const existing = await prisma.task.findFirst({
    where: { id: taskId, taskerId: userId },
  });
  if (!existing) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  await prisma.task.delete({ where: { id: taskId } });
  return NextResponse.json({});
}
