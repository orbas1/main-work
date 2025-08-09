import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getTasks, createTask } from "@/lib/services/taskService";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const filters = {
    search: searchParams.get("search") || undefined,
    category: searchParams.get("category") || undefined,
  };
  const tasks = await getTasks(filters);
  return NextResponse.json(tasks);
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  const creatorId = session?.user?.id ? Number(session.user.id) : undefined;
  if (!creatorId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const {
    title,
    description,
    category,
    skills,
    budgetMin,
    budgetMax,
    paymentMethod,
    deadline,
    media,
    visibility,
  } = await req.json();

  if (!title || !description) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  const task = await createTask({
    title,
    description,
    category,
    skills,
    budgetMin,
    budgetMax,
    paymentMethod,
    deadline: deadline ? new Date(deadline) : undefined,
    media,
    visibility,
    creatorId,
  });

  return NextResponse.json(task, { status: 201 });
}
