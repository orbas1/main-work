import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import {
  getService,
  updateService,
  deleteService,
} from "@/lib/services/serviceService";

interface Params {
  params: { id: string };
}

export async function GET(_req: Request, { params }: Params) {
  const id = Number(params.id);
  const service = await getService(id);
  if (!service) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json(service);
}

export async function PUT(req: Request, { params }: Params) {
  const session = await getServerSession(authOptions);
  const id = Number(params.id);
  const existing = await getService(id);
  if (!existing) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  if (existing.sellerId !== Number(session?.user?.id)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  const data = await req.json();
  const service = await updateService(id, data);
  return NextResponse.json(service);
}

export async function DELETE(_req: Request, { params }: Params) {
  const session = await getServerSession(authOptions);
  const id = Number(params.id);
  const existing = await getService(id);
  if (!existing) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  if (existing.sellerId !== Number(session?.user?.id)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  await deleteService(id);
  return NextResponse.json({ success: true });
}
