import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getTasks, createTask } from "@/lib/services/taskService";

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id ? Number(session.user.id) : undefined;
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { searchParams } = new URL(req.url);
  const role = (searchParams.get("role") as "creator" | "tasker") || "creator";
  const tasks = await getTasks(userId, role);
  return NextResponse.json(tasks);
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const creatorId = session?.user?.id ? Number(session.user.id) : undefined;
  if (!creatorId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { title, description, budget, assigneeId, status } = await req.json();
  if (!title || !description || typeof budget !== "number") {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }
  const task = await createTask({
    creatorId,
    title,
    description,
    budget,
    assigneeId,
    status,
  });
  return NextResponse.json(task, { status: 201 });
}
