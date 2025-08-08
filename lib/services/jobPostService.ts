import prisma from "@/lib/prisma";
import type { Prisma } from "@prisma/client";

export interface JobPostFilters {
  employerId?: number;
  status?: string;
}

export async function getJobPosts(filters: JobPostFilters = {}) {
  const { employerId, status } = filters;
  return prisma.jobPost.findMany({
    where: {
      ...(employerId ? { employerId } : {}),
      ...(status ? { status } : {}),
    },
    orderBy: { createdAt: "desc" },
  });
}

export interface JobPostData {
  title: string;
  description: string;
  requirements?: string;
  salaryMin?: number;
  salaryMax?: number;
  benefits?: string;
  jobType: string;
  location?: string;
  deadline?: Date;
  category?: string;
  status?: string;
  employerId: number;
}

export async function createJobPost(data: JobPostData) {
  return prisma.jobPost.create({ data });
}

export async function getJobPost(id: number) {
  return prisma.jobPost.findUnique({ where: { id } });
}

export async function updateJobPost(id: number, data: Partial<JobPostData>) {
  return prisma.jobPost.update({ where: { id }, data });
}

export async function deleteJobPost(id: number) {
  return prisma.jobPost.delete({ where: { id } });
}
