import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const userIdParam = req.nextUrl.searchParams.get("userId");
  const userId = userIdParam ? parseInt(userIdParam, 10) : NaN;
  if (!userId) {
    return NextResponse.json({ error: "userId required" }, { status: 400 });
  }

  const [activeContracts, spendAgg] = await Promise.all([
    prisma.project.count({ where: { ownerId: userId, NOT: { status: "completed" } } }),
    prisma.transaction.aggregate({ where: { userId }, _sum: { amount: true } }),
  ]);

  return NextResponse.json({
    activeContracts,
    totalSpend: spendAgg._sum.amount ?? 0,
  });
}

