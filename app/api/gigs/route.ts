import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getSellerGigs, getBuyerOrders } from "@/lib/services/gigService";

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const userId = Number(session.user.id);
  const { searchParams } = new URL(req.url);
  const mode = searchParams.get("mode") === "buyer" ? "buyer" : "seller";
  if (mode === "seller") {
    const gigs = await getSellerGigs(userId);
    return NextResponse.json(gigs);
  }
  const orders = await getBuyerOrders(userId);
  return NextResponse.json(orders);
}
