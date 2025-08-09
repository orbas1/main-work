import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getEvents, createEvent } from "@/lib/services/calendarService";

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id ? Number(session.user.id) : undefined;
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { searchParams } = new URL(req.url);
  const role = (searchParams.get("role") as "seller" | "buyer") || "seller";
  const events = await getEvents(userId, role);
  return NextResponse.json(events);
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const sellerId = session?.user?.id ? Number(session.user.id) : undefined;
  if (!sellerId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { title, start, end, buyerId, status } = await req.json();
  if (!title || !start || !end) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }
  const event = await createEvent({
    sellerId,
    buyerId,
    title,
    start: new Date(start),
    end: new Date(end),
    status,
  });
  return NextResponse.json(event, { status: 201 });
}
