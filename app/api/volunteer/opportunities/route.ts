import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { listOpportunities } from "@/lib/services/volunteerService";

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { searchParams } = new URL(req.url);
  const keyword = searchParams.get("q") || undefined;
  const opportunities = await listOpportunities(keyword);
  return NextResponse.json(opportunities);
}
