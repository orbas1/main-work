import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getGigs, createGig } from "@/lib/services/gigService";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const session = await getServerSession(authOptions);
  const filters = {
    search: searchParams.get("search") || undefined,
    category: searchParams.get("category") || undefined,
    minPrice: searchParams.get("minPrice")
      ? Number(searchParams.get("minPrice"))
      : undefined,
    maxPrice: searchParams.get("maxPrice")
      ? Number(searchParams.get("maxPrice"))
      : undefined,
    maxDelivery: searchParams.get("maxDelivery")
      ? Number(searchParams.get("maxDelivery"))
      : undefined,
    minRating: searchParams.get("minRating")
      ? Number(searchParams.get("minRating"))
      : undefined,
    location: searchParams.get("location") || undefined,
    sort: (searchParams.get("sort") as "price" | "rating" | "newest") || undefined,
    status: searchParams.get("status") || undefined,
    sellerId: searchParams.get("mine") === "true" && session?.user?.id
      ? Number(session.user.id)
      : searchParams.get("sellerId")
      ? Number(searchParams.get("sellerId"))
      : undefined,
  };
  const gigs = await getGigs(filters);
  return NextResponse.json(gigs);
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  const sellerId = session?.user?.id ? Number(session.user.id) : undefined;
  if (!sellerId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { title, description, price, category, thumbnail, deliveryTime, location } = await req.json();
  if (!title || !description || typeof price !== "number") {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }
  const gig = await createGig({
    title,
    description,
    price,
    category,
    thumbnail,
    deliveryTime,
    location,
    sellerId,
  });
  return NextResponse.json(gig, { status: 201 });
}
