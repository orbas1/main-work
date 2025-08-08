import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getDashboardSummary } from "@/lib/services/dashboardService";

export async function GET() {
  const session = await getServerSession(authOptions);
  const id = session?.user?.id ? Number(session.user.id) : undefined;
  if (!id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const summary = await getDashboardSummary(id);
  return NextResponse.json(summary);
}
