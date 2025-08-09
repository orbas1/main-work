import { prisma } from "@/lib/prisma";

export async function createJob(data: {
  title: string;
  description: string;
  company: string;
  location?: string;
  salary?: number;
  postedById: number;
}) {
  return prisma.job.create({ data });
}

export async function listJobs() {
  return prisma.job.findMany({
    where: { status: "open" },
    include: { postedBy: true },
    orderBy: { createdAt: "desc" },
  });
}

export async function getJob(id: number) {
  return prisma.job.findUnique({
    where: { id },
    include: { postedBy: true, applications: true },
  });
}

export async function applyForJob(jobId: number, applicantId: number) {
  const existing = await prisma.jobApplication.findFirst({
    where: { jobId, applicantId },
  });
  if (existing) return existing;
  return prisma.jobApplication.create({ data: { jobId, applicantId } });
}

export async function acceptApplication(id: number) {
  return prisma.jobApplication.update({
    where: { id },
    data: { status: "accepted" },
  });
}

export async function rejectApplication(id: number) {
  return prisma.jobApplication.update({
    where: { id },
    data: { status: "rejected" },
  });
}

export async function createEmployment(data: {
  jobId: number;
  employerId: number;
  employeeId: number;
  startDate: Date;
}) {
  return prisma.employment.create({ data });
}

export async function getEmployment(id: number) {
  return prisma.employment.findUnique({
    where: { id },
    include: { job: true, employee: true, employer: true },
  });
}

export async function createContract(data: {
  jobId: number;
  employerId: number;
  employeeId: number;
  terms: string;
}) {
  return prisma.employmentContract.create({ data });
}

export async function getContract(id: number) {
  return prisma.employmentContract.findUnique({
    where: { id },
    include: { job: true, employer: true, employee: true },
  });
}

export async function getJobSeekerStats(userId: number) {
  const applications = await prisma.jobApplication.count({
    where: { applicantId: userId },
  });
  const interviews = await prisma.interview.count({
    where: {
      application: { applicantId: userId },
      scheduledAt: { gte: new Date() },
    },
  });
  const jobMatches = await prisma.job.findMany({
    where: {
      status: "open",
      applications: { none: { applicantId: userId } },
    },
    take: 5,
    orderBy: { createdAt: "desc" },
  });
  return { applications, interviews, jobMatches };
}

export async function getEmployerStats(userId: number) {
  const jobs = await prisma.job.findMany({
    where: { postedById: userId },
    include: { applications: true },
  });
  const jobPostingInsights = jobs.map((j) => ({
    id: j.id,
    title: j.title,
    applications: j.applications.length,
  }));
  const candidateInsights = await prisma.jobApplication.findMany({
    where: { job: { postedById: userId } },
    include: { applicant: true, job: true },
    orderBy: { createdAt: "desc" },
    take: 5,
  });
  const funnel = {
    applied: await prisma.jobApplication.count({
      where: { job: { postedById: userId }, status: "applied" },
    }),
    accepted: await prisma.jobApplication.count({
      where: { job: { postedById: userId }, status: "accepted" },
    }),
    rejected: await prisma.jobApplication.count({
      where: { job: { postedById: userId }, status: "rejected" },
    }),
  };
  return { jobPostingInsights, candidateInsights, funnel };
}

export async function getDashboardStats(userId: number, mode: "jobseeker" | "employer") {
  return mode === "employer"
    ? getEmployerStats(userId)
    : getJobSeekerStats(userId);
}
