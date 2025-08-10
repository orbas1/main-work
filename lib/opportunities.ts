import { Opportunity } from "@/lib/types/opportunity";

export const opportunities: Opportunity[] = [
  {
    id: 1,
    title: "Junior Web Developer",
    description: "Assist in building and maintaining modern web applications using React and Node.js.",
    category: "Technology",
    location: "Remote",
    skills: "React, TypeScript, CSS",
    compensation: 45000,
    status: "Open",
    providerId: 1,
    provider: { id: 1, name: "Tech Corp", image: "/api/image" },
  },
  {
    id: 2,
    title: "Marketing Intern",
    description: "Support the marketing team with campaign research, content creation, and analytics.",
    category: "Marketing",
    location: "New York, NY",
    skills: "SEO, Content Writing",
    compensation: 2000,
    status: "Open",
    providerId: 2,
    provider: { id: 2, name: "Growth Gurus", image: "/api/image" },
  },
  {
    id: 3,
    title: "Community Cleanup Volunteer",
    description: "Join our team to help organize and execute a neighborhood cleanup initiative.",
    category: "Volunteer",
    location: "San Francisco, CA",
    skills: "Teamwork",
    status: "Open",
    providerId: 3,
    provider: { id: 3, name: "City Helpers", image: "/api/image" },
  },
];

export function getOpportunityById(id: number): Opportunity | undefined {
  return opportunities.find((op) => op.id === id);
}
