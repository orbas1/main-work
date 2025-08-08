import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { listUserChats, initiateChat } from "@/lib/services/chatService";

export async function GET() {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id ? Number(session.user.id) : undefined;
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const chats = await listUserChats(userId);
  return NextResponse.json(chats);
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id ? Number(session.user.id) : undefined;
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { targetUserId } = await req.json();
  if (!targetUserId) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }
  const chat = await initiateChat(userId, Number(targetUserId));
  return NextResponse.json(chat, { status: 201 });
}
