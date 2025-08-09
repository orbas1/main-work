import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { rejectApplication } from "@/lib/services/employmentService";

export async function PUT(
  req: Request,
  { params }: { params: { applicationId: string } }
) {
  const session = await getServerSession(authOptions);
  const employerId = session?.user?.id ? Number(session.user.id) : undefined;
  if (!employerId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const id = Number(params.applicationId);
  const application = await rejectApplication(id);
  return NextResponse.json(application);
}
