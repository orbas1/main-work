import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import {
  getService,
  updateService,
  deleteService,
} from "@/lib/services/serviceProviderService";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const service = await getService(Number(params.id));
  return NextResponse.json(service);
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const data = await req.json();
  const service = await updateService(Number(params.id), data);
  return NextResponse.json(service);
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  await deleteService(Number(params.id));
  return NextResponse.json({ success: true });
}
