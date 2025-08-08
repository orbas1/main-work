import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getChatMessages, sendMessage } from "@/lib/services/chatService";

interface Params {
  params: { chatId: string };
}

export async function GET(req: Request, { params }: Params) {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id ? Number(session.user.id) : undefined;
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const chatId = Number(params.chatId);
  const messages = await getChatMessages(chatId, userId);
  return NextResponse.json(messages);
}

export async function POST(req: Request, { params }: Params) {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id ? Number(session.user.id) : undefined;
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const chatId = Number(params.chatId);
  const { content } = await req.json();
  if (!content) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }
  const message = await sendMessage(chatId, userId, content);
  return NextResponse.json(message, { status: 201 });
}
