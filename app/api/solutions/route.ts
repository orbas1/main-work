import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  const solutions = await prisma.solution.findMany({
    orderBy: { id: "asc" },
  });
  return NextResponse.json(solutions);
}
