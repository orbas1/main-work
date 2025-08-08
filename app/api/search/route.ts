import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q") || "";
  const location = searchParams.get("location") || undefined;
  const expertise = searchParams.get("expertise") || undefined;

  const users = await prisma.user.findMany({
    where: {
      AND: [
        q
          ? {
              OR: [
                { name: { contains: q, mode: "insensitive" } },
                { email: { contains: q, mode: "insensitive" } },
                { bio: { contains: q, mode: "insensitive" } },
              ],
            }
          : {},
        location
          ? { location: { equals: location, mode: "insensitive" } }
          : {},
        expertise
          ? { expertise: { contains: expertise, mode: "insensitive" } }
          : {},
      ],
    },
    select: {
      id: true,
      name: true,
      email: true,
      location: true,
      expertise: true,
      image: true,
    },
    take: 50,
  });

  return NextResponse.json(users);
}
