import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { updateGoal, deleteGoal } from "@/lib/services/goalService";

export async function PUT(request: NextRequest, context: any) {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id ? Number(session.user.id) : undefined;
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = context.params as { id: string };
  const data = await request.json();
  const goal = await updateGoal(Number(id), userId, data);
  return NextResponse.json(goal);
}

export async function DELETE(request: NextRequest, context: any) {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id ? Number(session.user.id) : undefined;
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = context.params as { id: string };
  await deleteGoal(Number(id), userId);
  return NextResponse.json({ success: true });
}
