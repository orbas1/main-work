import { NextRequest, NextResponse } from "next/server";
import { getSessions } from "@/lib/services/networkingSessionService";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const filters = {
    search: searchParams.get("search") || undefined,
    industry: searchParams.get("industry") || undefined,
    topic: searchParams.get("topic") || undefined,
    date: searchParams.get("date") || undefined,
    freeOnly: searchParams.get("freeOnly") === "true" || undefined,
    sort: (searchParams.get("sort") as any) || undefined,
  };
  const sessions = await getSessions(filters);
  return NextResponse.json(sessions);
}
