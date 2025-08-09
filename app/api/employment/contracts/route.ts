import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { createContract } from "@/lib/services/employmentService";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const employerId = session?.user?.id ? Number(session.user.id) : undefined;
  if (!employerId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { jobId, employeeId, terms } = await req.json();
  if (!jobId || !employeeId || !terms) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }
  const contract = await createContract({ jobId, employerId, employeeId, terms });
  return NextResponse.json(contract, { status: 201 });
}
