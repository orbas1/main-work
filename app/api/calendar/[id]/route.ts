import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { updateEvent, deleteEvent } from "@/lib/services/calendarService";

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  const sellerId = session?.user?.id ? Number(session.user.id) : undefined;
  if (!sellerId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const id = Number(params.id);
  const data = await req.json();
  const event = await updateEvent(id, {
    ...data,
    start: data.start ? new Date(data.start) : undefined,
    end: data.end ? new Date(data.end) : undefined,
  });
  return NextResponse.json(event);
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  const sellerId = session?.user?.id ? Number(session.user.id) : undefined;
  if (!sellerId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const id = Number(params.id);
  await deleteEvent(id);
  return NextResponse.json({ success: true });
}
