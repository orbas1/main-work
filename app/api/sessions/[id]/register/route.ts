import { NextResponse, NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { registerForSession, getSession } from "@/lib/services/networkingSessionService";

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const sessionAuth = await getServerSession(authOptions);
  const participantId = sessionAuth?.user?.id ? Number(sessionAuth.user.id) : undefined;
  if (!participantId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const sessionId = Number(params.id);
  const existing = await getSession(sessionId);
  if (!existing || existing.availableSeats <= 0) {
    return NextResponse.json({ error: "Session full or not found" }, { status: 400 });
  }
  const registration = await registerForSession(sessionId, participantId);
  return NextResponse.json(registration, { status: 201 });
}
