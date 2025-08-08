import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getGig, updateGig, deleteGig } from "@/lib/services/gigService";

export async function PUT(req: NextRequest, { params }: any) {
  const session = await getServerSession(authOptions);
  const sellerId = session?.user?.id ? Number(session.user.id) : undefined;
  const id = Number(params.id);
  if (!sellerId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const existing = await getGig(id);
  if (!existing || existing.sellerId !== sellerId)
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  const data = await req.json();
  const gig = await updateGig(id, data);
  return NextResponse.json(gig);
}

export async function GET(req: NextRequest, { params }: any) {
  const id = Number(params.id);
  const gig = await getGig(id);
  if (!gig) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json(gig);
}

export async function DELETE(req: NextRequest, { params }: any) {
  const session = await getServerSession(authOptions);
  const sellerId = session?.user?.id ? Number(session.user.id) : undefined;
  const id = Number(params.id);
  if (!sellerId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const existing = await getGig(id);
  if (!existing || existing.sellerId !== sellerId)
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  await deleteGig(id);
  return NextResponse.json({ success: true });
}
