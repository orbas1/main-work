import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import {
  getUserNotifications,
  markNotificationRead,
} from "@/lib/services/notificationService";

export async function GET() {
  const session = await getServerSession(authOptions);
  const id = session?.user?.id ? Number(session.user.id) : undefined;
  if (!id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const notifications = await getUserNotifications(id);
  return NextResponse.json(notifications);
}

export async function PATCH(req: Request) {
  const session = await getServerSession(authOptions);
  const id = session?.user?.id ? Number(session.user.id) : undefined;
  if (!id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { notificationId } = await req.json();
  if (!notificationId) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
  await markNotificationRead(Number(notificationId), id);
  return NextResponse.json({ success: true });
}

