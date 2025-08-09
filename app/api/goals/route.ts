import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getUserGoals, createGoal } from "@/lib/services/goalService";

export async function GET() {
  const session = await getServerSession(authOptions);
  const id = session?.user?.id ? Number(session.user.id) : undefined;
  if (!id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const goals = await getUserGoals(id);
  return NextResponse.json(goals);
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  const id = session?.user?.id ? Number(session.user.id) : undefined;
  if (!id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { title, target } = await req.json();
  if (!title || typeof target !== "number") {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }
  const goal = await createGoal({ title, target, userId: id });
  return NextResponse.json(goal, { status: 201 });
}
