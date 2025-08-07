import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  const projects = await prisma.project.findMany({
    include: { owner: { select: { name: true } } },
    orderBy: { id: "asc" },
  });
  const formatted = projects.map((p) => ({
    id: p.id,
    title: p.title,
    owner: p.owner.name,
    status: p.status,
  }));
  return NextResponse.json(formatted);
}
