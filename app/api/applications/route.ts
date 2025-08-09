import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import {
  getMyApplications,
  getReceivedApplications,
} from "@/lib/services/applicationService";

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
      ? await getReceivedApplications(userId)
      : await getMyApplications(userId);
  return NextResponse.json(data);
}
