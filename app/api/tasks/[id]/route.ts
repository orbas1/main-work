import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { updateTask, deleteTask } from "@/lib/services/taskService";

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  const creatorId = session?.user?.id ? Number(session.user.id) : undefined;
  if (!creatorId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const id = Number(params.id);
  const data = await req.json();
  const task = await updateTask(id, data);
  return NextResponse.json(task);
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  const creatorId = session?.user?.id ? Number(session.user.id) : undefined;
  if (!creatorId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const id = Number(params.id);
  await deleteTask(id);
  return NextResponse.json({ success: true });
}
