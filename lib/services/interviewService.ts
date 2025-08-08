import prisma from "@/lib/prisma";

export interface CreateInterviewData {
  interviewerId: number;
  candidateEmail: string;
  scheduledAt: Date;
  meetingLink: string;
}

export async function getInterviewsByUser(userId: number) {
  return prisma.interview.findMany({
    where: { interviewerId: userId },
    orderBy: { scheduledAt: "asc" },
  });
}

export async function createInterview(data: CreateInterviewData) {
  return prisma.interview.create({ data });
}

export async function deleteInterview(id: number, userId: number) {
  const interview = await prisma.interview.findUnique({ where: { id } });
  if (!interview || interview.interviewerId !== userId) {
    throw new Error("Interview not found");
  }
  return prisma.interview.delete({ where: { id } });
}
