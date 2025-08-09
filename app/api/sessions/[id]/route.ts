import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/services/networkingSessionService";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const id = Number(params.id);
  const session = await getSession(id);
  if (!session) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(session);
}
