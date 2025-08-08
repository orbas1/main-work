import { NextResponse, NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { markNotificationRead } from "@/lib/services/notificationService";

export async function PUT(_req: NextRequest, context: any) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const id = Number(context?.params?.id);
  if (Number.isNaN(id)) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  }
  await markNotificationRead(id, session.user.email);
  return NextResponse.json({ success: true });
}
