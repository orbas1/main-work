import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import {
  listContracts,
  createContract,
  CreateContractData,
} from "@/lib/services/contractService";
import type { ContractStatus } from "@prisma/client";

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id ? Number(session.user.id) : undefined;
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { searchParams } = new URL(req.url);
  const role = (searchParams.get("role") as "client" | "freelancer") || "client";
  const status = searchParams.get("status") as ContractStatus | null;
  const contracts = await listContracts(userId, role, status || undefined);
  return NextResponse.json(contracts);
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  const clientId = session?.user?.id ? Number(session.user.id) : undefined;
  if (!clientId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = (await req.json()) as Omit<CreateContractData, "clientId">;
  if (!body.freelancerId || !body.title || !body.totalValue) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }
  const contract = await createContract({ ...body, clientId });
  return NextResponse.json(contract, { status: 201 });
}
