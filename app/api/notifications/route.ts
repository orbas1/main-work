import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import {
  getUserNotifications,
  markNotificationRead,
  markAllNotificationsRead,
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
  const { notificationId } = await req.json().catch(() => ({}));
  if (notificationId) {
    await markNotificationRead(Number(notificationId), id);
  } else {
    await markAllNotificationsRead(id);
  }
  return NextResponse.json({ success: true });
}

