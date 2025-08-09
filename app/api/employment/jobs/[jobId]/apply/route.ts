import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { applyForJob } from "@/lib/services/employmentService";

export async function POST(
  req: NextRequest,
  { params }: { params: { jobId: string } }
) {
  const session = await getServerSession(authOptions);
  const applicantId = session?.user?.id ? Number(session.user.id) : undefined;
  if (!applicantId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const jobId = Number(params.jobId);
  const application = await applyForJob(jobId, applicantId);
  return NextResponse.json(application, { status: 201 });
}
