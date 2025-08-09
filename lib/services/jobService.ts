import api from "../api";
import { buildQueryString } from "../utils/query";

export interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  salaryMin: number;
  salaryMax: number;
  type: string;
  description: string;
  benefits?: string;
}

export interface JobQuery {
  search?: string;
  location?: string;
  type?: string;
  minSalary?: number;
  maxSalary?: number;
  page?: number;
}

export async function getJobs(query: JobQuery = {}): Promise<Job[]> {
  const qs = buildQueryString(query);
  return api.get<Job[]>(`/jobs${qs}`);
}

export async function getJob(id: number): Promise<Job> {
  return api.get<Job>(`/jobs/${id}`);
}

export interface ApplicationPayload {
  jobId: number;
  resumeUrl?: string;
  coverLetter?: string;
}

export async function submitApplication(payload: ApplicationPayload): Promise<void> {
  await api.post("/applications/submit", payload);
}

export async function saveJob(jobId: number): Promise<void> {
  await api.post(`/jobs/${jobId}/save`, {});
}

export async function getSavedJobs(): Promise<Job[]> {
  return api.get<Job[]>("/jobs/saved");
}
