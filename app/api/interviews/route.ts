import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { createInterview, getInterviewsByUser } from "@/lib/services/interviewService";

export async function GET() {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id ? Number(session.user.id) : undefined;
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const interviews = await getInterviewsByUser(userId);
  return NextResponse.json(interviews);
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id ? Number(session.user.id) : undefined;
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { candidateEmail, scheduledAt } = await req.json();
  if (!candidateEmail || !scheduledAt) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }
  const meetingLink = `https://${process.env.NEXT_PUBLIC_JITSI_DOMAIN || "meet.jit.si"}/${crypto.randomUUID()}`;
  const interview = await createInterview({
    interviewerId: userId,
    candidateEmail,
    scheduledAt: new Date(scheduledAt),
    meetingLink,
  });
  return NextResponse.json(interview, { status: 201 });
}
