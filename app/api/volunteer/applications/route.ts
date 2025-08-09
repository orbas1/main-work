import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import {
  applyToOpportunity,
  getMyVolunteerApplications,
  getReceivedVolunteerApplications,
} from "@/lib/services/volunteerService";

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const userId = Number(session.user.id);
  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type");
  const data =
    type === "received"
      ? await getReceivedVolunteerApplications(userId)
      : await getMyVolunteerApplications(userId);
  return NextResponse.json(data);
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const userId = Number(session.user.id);
  const { opportunityId } = await req.json();
  if (!opportunityId) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }
  const application = await applyToOpportunity(Number(opportunityId), userId);
  return NextResponse.json(application, { status: 201 });
}
