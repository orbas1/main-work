import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import {
  getServiceOrders,
  createServiceOrder,
} from "@/lib/services/serviceProviderService";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const session = await getServerSession(authOptions);
  const filters = {
    sellerId:
      searchParams.get("sellerId") === "mine" && session?.user?.id
        ? Number(session.user.id)
        : searchParams.get("sellerId")
        ? Number(searchParams.get("sellerId"))
        : undefined,
    buyerId:
      searchParams.get("mine") === "true" && session?.user?.id
        ? Number(session.user.id)
        : searchParams.get("buyerId")
        ? Number(searchParams.get("buyerId"))
        : undefined,
    status: searchParams.get("status") || undefined,
  };
  const orders = await getServiceOrders(filters);
  return NextResponse.json(orders);
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  const buyerId = session?.user?.id ? Number(session.user.id) : undefined;
  if (!buyerId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { serviceId, scheduledFor } = await req.json();
  if (!serviceId) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }
  const order = await createServiceOrder({
    serviceId,
    buyerId,
    scheduledFor: scheduledFor ? new Date(scheduledFor) : null,
  });
  return NextResponse.json(order, { status: 201 });
}
