import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { updateOrderStatus, updateOrderNotes } from "@/lib/services/orderService";

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const id = Number(params.id);
  const { status, notes } = await req.json();
  try {
    if (status) {
      const order = await updateOrderStatus(id, status, Number(session.user.id));
      return NextResponse.json(order);
    }
    if (typeof notes === "string") {
      const order = await updateOrderNotes(id, notes, Number(session.user.id));
      return NextResponse.json(order);
    }
    return NextResponse.json({ error: "No valid fields" }, { status: 400 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
