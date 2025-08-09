import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { jobId, resumeUrl, coverLetter } = await req.json();
  if (!jobId) {
    return NextResponse.json({ error: "jobId is required" }, { status: 400 });
  }
  const application = await prisma.jobApplication.create({
    data: {
      jobId: Number(jobId),
      applicantId: Number(session.user.id),
      resume: resumeUrl,
      coverLetter,
    },
  });
  return NextResponse.json(application, { status: 201 });
}
