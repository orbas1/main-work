import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const search = searchParams.get("search") || undefined;
  const location = searchParams.get("location") || undefined;
  const type = searchParams.get("type") || undefined;
  const minSalary = searchParams.get("minSalary");
  const maxSalary = searchParams.get("maxSalary");
  const page = parseInt(searchParams.get("page") || "1", 10);
  const take = 10;
  const skip = (page - 1) * take;

  const jobs = await prisma.job.findMany({
    where: {
      ...(search ? { title: { contains: search, mode: "insensitive" } } : {}),
      ...(location ? { location: { contains: location, mode: "insensitive" } } : {}),
      ...(type ? { type } : {}),
      ...(minSalary || maxSalary
        ? {
            AND: [
              minSalary ? { salaryMin: { gte: Number(minSalary) } } : {},
              maxSalary ? { salaryMax: { lte: Number(maxSalary) } } : {},
            ],
          }
        : {}),
    },
    orderBy: { createdAt: "desc" },
    skip,
    take,
  });

  return NextResponse.json(jobs);
}
