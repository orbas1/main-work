import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import {
  getHostSessions,
  updateSession,
} from "@/lib/services/sessionService";

export async function GET() {
  const session = await getServerSession(authOptions);
  const hostId = session?.user?.id ? Number(session.user.id) : undefined;
  if (!hostId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const sessions = await getHostSessions(hostId);
  return NextResponse.json(sessions);
}

export async function PUT(req: Request) {
  const session = await getServerSession(authOptions);
  const hostId = session?.user?.id ? Number(session.user.id) : undefined;
  if (!hostId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id, status, duration, title } = await req.json();
  if (typeof id !== "number") {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }
  const updated = await updateSession(id, { status, duration, title });
  return NextResponse.json(updated);
}
