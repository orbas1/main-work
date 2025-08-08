import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { listOrders } from "@/lib/services/orderService";

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { searchParams } = new URL(req.url);
  const role = searchParams.get("role") === "seller" ? "seller" : "buyer";
  const orders = await listOrders(Number(session.user.id), role);
  const formatted = orders.map((o) => ({
    id: o.id,
    gigTitle: o.gig.title,
    sellerName: o.seller.name,
    buyerName: o.buyer.name,
    status: o.status,
    dueDate: o.dueDate,
    notes: o.notes || "",
  }));
  return NextResponse.json(formatted);
}
