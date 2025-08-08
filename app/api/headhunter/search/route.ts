import { NextRequest, NextResponse } from "next/server";
import { searchJobSeekers } from "@/lib/services/headhunterService";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q") || undefined;
  const location = searchParams.get("location") || undefined;
  const expertise = searchParams.get("expertise") || undefined;
  const candidates = await searchJobSeekers({ q, location, expertise });
  return NextResponse.json(candidates);
}
