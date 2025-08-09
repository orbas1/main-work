import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getContract, updateContract } from "@/lib/services/contractService";
import type { ContractStatus } from "@prisma/client";

interface Params { params: { id: string } }

export async function GET(_req: Request, { params }: Params) {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id ? Number(session.user.id) : undefined;
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const id = Number(params.id);
  const contract = await getContract(id);
  if (!contract || (contract.clientId !== userId && contract.freelancerId !== userId)) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json(contract);
}

export async function PUT(req: Request, { params }: Params) {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id ? Number(session.user.id) : undefined;
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const id = Number(params.id);
  const contract = await getContract(id);
  if (!contract || (contract.clientId !== userId && contract.freelancerId !== userId)) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  const body = (await req.json()) as Partial<{ status: ContractStatus; endDate: Date }>;
  const updated = await updateContract(id, body);
  return NextResponse.json(updated);
}
