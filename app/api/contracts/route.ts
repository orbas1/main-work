import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { listContractsByUser, createContract } from "@/lib/services/contractService";

export async function GET() {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id ? Number(session.user.id) : null;
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const contracts = await listContractsByUser(userId);
  return NextResponse.json(contracts);
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  const clientId = session?.user?.id ? Number(session.user.id) : null;
  if (!clientId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await req.json();
  if (!body.title || !body.description || !body.freelancerId || !body.paymentType) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }
  const contract = await createContract({
    title: body.title,
    description: body.description,
    freelancerId: Number(body.freelancerId),
    paymentType: body.paymentType,
    totalValue: body.totalValue ? Number(body.totalValue) : undefined,
    hourlyRate: body.hourlyRate ? Number(body.hourlyRate) : undefined,
    expectedHours: body.expectedHours ? Number(body.expectedHours) : undefined,
    milestones: Array.isArray(body.milestones)
      ? body.milestones.map((m: any, index: number) => ({
          description: m.description,
          dueDate: m.dueDate,
          amount: Number(m.amount),
          order: index,
        }))
      : [],
    clientId,
  });
  return NextResponse.json(contract, { status: 201 });
}
