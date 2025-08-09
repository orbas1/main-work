import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { scheduleInterview } from "@/lib/services/applicationService";

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { scheduledAt, location, link, notes } = await req.json();
  if (!scheduledAt) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }
  const interview = await scheduleInterview(Number(params.id), {
    scheduledAt: new Date(scheduledAt),
    location,
    link,
    notes,
  });
  return NextResponse.json(interview, { status: 201 });
}
