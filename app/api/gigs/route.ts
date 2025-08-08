import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { fetchGigs } from "@/lib/services/gigService";

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const filters = {
    category: searchParams.get("category") || undefined,
    minPrice: searchParams.get("minPrice") ? Number(searchParams.get("minPrice")) : undefined,
    maxPrice: searchParams.get("maxPrice") ? Number(searchParams.get("maxPrice")) : undefined,
    deliveryTime: searchParams.get("deliveryTime") ? Number(searchParams.get("deliveryTime")) : undefined,
    rating: searchParams.get("rating") ? Number(searchParams.get("rating")) : undefined,
    query: searchParams.get("q") || undefined,
    sort: (searchParams.get("sort") as any) || undefined,
  };

  const gigs = await fetchGigs(filters);
  return NextResponse.json(gigs);
}
