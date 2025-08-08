import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { initiatePayment } from "@/lib/services/paymentService";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  const buyerId = session?.user?.id ? Number(session.user.id) : undefined;
  if (!buyerId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { gigId } = await req.json();
  if (typeof gigId !== "number") {
    return NextResponse.json({ error: "Invalid gigId" }, { status: 400 });
  }
  try {
    const order = await initiatePayment(buyerId, gigId);
    return NextResponse.json(order, { status: 201 });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 400 });
  }
}
