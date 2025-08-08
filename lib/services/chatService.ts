import prisma from "@/lib/prisma";

export async function listUserChats(userId: number) {
  return prisma.chat.findMany({
    where: { participants: { some: { userId } } },
    include: {
      participants: { include: { user: true } },
      messages: { orderBy: { createdAt: "desc" }, take: 1 },
    },
    orderBy: { updatedAt: "desc" }
  });
}

export async function getChatMessages(chatId: number, userId: number) {
  const chat = await prisma.chat.findFirst({
    where: { id: chatId, participants: { some: { userId } } },
  });
  if (!chat) throw new Error("Unauthorized");
  return prisma.message.findMany({
    where: { chatId },
    include: { sender: true },
    orderBy: { createdAt: "asc" },
  });
}

export async function sendMessage(
  chatId: number,
  senderId: number,
  content: string
) {
  const participant = await prisma.chatParticipant.findFirst({
    where: { chatId, userId: senderId },
  });
  if (!participant) throw new Error("Unauthorized");
  const message = await prisma.message.create({
    data: { chatId, senderId, content },
  });
  await prisma.chat.update({ where: { id: chatId }, data: { updatedAt: new Date() } });
  return message;
}

export async function initiateChat(userId: number, targetUserId: number) {
  const existing = await prisma.chat.findFirst({
    where: {
      participants: {
        every: {
          userId: { in: [userId, targetUserId] },
        },
      },
      AND: [
        { participants: { some: { userId } } },
        { participants: { some: { userId: targetUserId } } },
      ],
    },
  });
  if (existing) return existing;
  return prisma.chat.create({
    data: {
      participants: {
        create: [{ userId }, { userId: targetUserId }],
      },
    },
  });
}

export type ChatWithLastMessage = Awaited<ReturnType<typeof listUserChats>>[number];
export type Message = Awaited<ReturnType<typeof getChatMessages>>[number];
