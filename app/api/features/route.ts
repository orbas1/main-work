import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  const features = await prisma.feature.findMany({
    orderBy: { id: "asc" },
  });
  return NextResponse.json(features);
}
