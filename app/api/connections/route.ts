import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import {
  getConnections,
  addConnection,
  updateConnectionStatus,
} from "@/lib/services/connectionService";

export async function GET() {
  const session = await getServerSession(authOptions);
  const ownerId = session?.user?.id ? Number(session.user.id) : undefined;
  if (!ownerId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const connections = await getConnections(ownerId);
  return NextResponse.json(connections);
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  const ownerId = session?.user?.id ? Number(session.user.id) : undefined;
  if (!ownerId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { targetId } = await req.json();
  if (typeof targetId !== "number") {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }
  const connection = await addConnection(ownerId, targetId);
  return NextResponse.json(connection, { status: 201 });
}

export async function PUT(req: Request) {
  const session = await getServerSession(authOptions);
  const ownerId = session?.user?.id ? Number(session.user.id) : undefined;
  if (!ownerId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id, status } = await req.json();
  if (typeof id !== "number" || typeof status !== "string") {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }
  const updated = await updateConnectionStatus(id, status);
  return NextResponse.json(updated);
}
