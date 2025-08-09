import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { createJob, listJobs } from "@/lib/services/employmentService";

export async function GET() {
  const jobs = await listJobs();
  return NextResponse.json(jobs);
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const postedById = session?.user?.id ? Number(session.user.id) : undefined;
  if (!postedById) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { title, description, company, location, salary } = await req.json();
  if (!title || !description || !company) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }
  const job = await createJob({
    title,
    description,
    company,
    location,
    salary,
    postedById,
  });
  return NextResponse.json(job, { status: 201 });
}
