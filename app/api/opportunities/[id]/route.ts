import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import {
  getOpportunity,
  updateOpportunity,
  deleteOpportunity,
} from "@/lib/services/opportunityService";

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const id = Number(params.id);
  const opportunity = await getOpportunity(id);
  if (!opportunity) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json(opportunity);
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  const providerId = session?.user?.id ? Number(session.user.id) : undefined;
  if (!providerId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const id = Number(params.id);
  const existing = await getOpportunity(id);
  if (!existing || existing.providerId !== providerId) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  const data = await req.json();
  const updated = await updateOpportunity(id, data);
  return NextResponse.json(updated);
}

export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  const providerId = session?.user?.id ? Number(session.user.id) : undefined;
  if (!providerId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const id = Number(params.id);
  const existing = await getOpportunity(id);
  if (!existing || existing.providerId !== providerId) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  await deleteOpportunity(id);
  return NextResponse.json({ success: true });
}
