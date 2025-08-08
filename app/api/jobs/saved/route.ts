import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const jobs = await prisma.savedJob.findMany({
    where: { userId: Number(session.user.id) },
    include: { job: true },
  });
  return NextResponse.json(jobs.map((j) => j.job));
}
