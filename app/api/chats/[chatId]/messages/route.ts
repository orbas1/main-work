import { NextResponse, NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getChatMessages, sendMessage } from "@/lib/services/chatService";

export async function GET(
  req: NextRequest,
  context: any
) {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id ? Number(session.user.id) : undefined;
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { chatId } = context.params as { chatId: string };
  const messages = await getChatMessages(Number(chatId), userId);
  return NextResponse.json(messages);
}

export async function POST(
  req: NextRequest,
  context: any
) {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id ? Number(session.user.id) : undefined;
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { chatId } = context.params as { chatId: string };
  const { content } = await req.json();
  if (!content) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }
  const message = await sendMessage(Number(chatId), userId, content);
  return NextResponse.json(message, { status: 201 });
}
