import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { createEmployment } from "@/lib/services/employmentService";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const employerId = session?.user?.id ? Number(session.user.id) : undefined;
  if (!employerId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { jobId, employeeId, startDate } = await req.json();
  if (!jobId || !employeeId || !startDate) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }
  const employment = await createEmployment({
    jobId,
    employerId,
    employeeId,
    startDate: new Date(startDate),
  });
  return NextResponse.json(employment, { status: 201 });
}
