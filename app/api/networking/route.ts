import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import prisma from "@/lib/prisma";
import { authOptions } from "@/lib/auth";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const sessions = await prisma.networkingSession.findMany({
    where: {
      OR: [{ hostId: (session.user as any).id }],
    },
    orderBy: { date: "asc" },
  });
  return NextResponse.json(sessions);
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const data = await req.json();
  const record = await prisma.networkingSession.create({
    data: {
      title: data.title,
      description: data.description,
      date: new Date(data.date),
      hostId: (session.user as any).id,
    },
  });

  return NextResponse.json(record, { status: 201 });
}
