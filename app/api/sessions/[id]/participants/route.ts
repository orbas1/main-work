import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { addParticipant, removeParticipant } from "@/lib/services/sessionService";

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  const hostId = session?.user?.id ? Number(session.user.id) : undefined;
  if (!hostId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { userId } = await req.json();
  if (typeof userId !== "number") {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }
  await addParticipant(Number(params.id), userId);
  return NextResponse.json({ ok: true }, { status: 201 });
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  const hostId = session?.user?.id ? Number(session.user.id) : undefined;
  if (!hostId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { searchParams } = new URL(req.url);
  const userIdParam = searchParams.get("userId");
  if (!userIdParam) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }
  await removeParticipant(Number(params.id), Number(userIdParam));
  return NextResponse.json({ ok: true });
}
