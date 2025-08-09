import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { createTaskBid } from "@/lib/services/taskService";

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  const bidderId = session?.user?.id ? Number(session.user.id) : undefined;
  if (!bidderId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const taskId = Number(params.id);
  if (isNaN(taskId)) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  }
  const { amount, message, timeline } = await req.json();
  if (typeof amount !== "number") {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }
  const bid = await createTaskBid({ taskId, bidderId, amount, message, timeline });
  return NextResponse.json(bid, { status: 201 });
}
