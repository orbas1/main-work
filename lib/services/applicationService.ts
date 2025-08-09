import prisma from "@/lib/prisma";

export async function getMyApplications(userId: number) {
  return prisma.application.findMany({
    where: { applicantId: userId },
    include: {
      job: true,
      interviews: true,
    },
  });
}

export async function getReceivedApplications(userId: number) {
  return prisma.application.findMany({
    where: { job: { employerId: userId } },
    include: {
      applicant: true,
      job: true,
      interviews: true,
    },
  });
}

export async function updateApplicationStatus(applicationId: number, status: string) {
  return prisma.application.update({
    where: { id: applicationId },
    data: { status },
  });
}

export interface ScheduleInterviewData {
  scheduledAt: Date;
  location?: string;
  link?: string;
  notes?: string;
}

export async function scheduleInterview(applicationId: number, data: ScheduleInterviewData) {
  return prisma.interview.create({
    data: { ...data, applicationId },
  });
}
