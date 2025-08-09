import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

interface Params {
  params: { id: string };
}

export async function POST(_req: NextRequest, { params }: Params) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const jobId = Number(params.id);
  await prisma.savedJob.upsert({
    where: {
      userId_jobId: { userId: Number(session.user.id), jobId },
    },
    update: {},
    create: { userId: Number(session.user.id), jobId },
  });
  return NextResponse.json({ ok: true }, { status: 201 });
}
