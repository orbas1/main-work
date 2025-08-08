import { NextResponse } from "next/server";
import { getRecommendedGigs } from "@/lib/services/gigService";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category") || undefined;
  const gigs = await getRecommendedGigs(category);
  return NextResponse.json(gigs);
}
