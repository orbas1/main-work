import { NextResponse } from "next/server";
import { getJob } from "@/lib/services/employmentService";

export async function GET(
  req: Request,
  { params }: { params: { jobId: string } }
) {
  const id = Number(params.jobId);
  const job = await getJob(id);
  if (!job) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json(job);
}
