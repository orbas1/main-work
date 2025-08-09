import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import prisma from "@/lib/prisma";
import { authOptions } from "@/lib/auth";

export async function GET() {
  const courses = await prisma.course.findMany({
    include: { modules: { orderBy: { order: "asc" } } },
    orderBy: { id: "asc" },
  });
  return NextResponse.json(courses);
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return new NextResponse("Unauthorized", { status: 401 });
  }
  const data = await req.json();
  const course = await prisma.course.create({
    data: {
      title: data.title,
      description: data.description,
      streamUrl: data.streamUrl,
      teacherId: parseInt(session.user.id),
    },
  });
  return NextResponse.json(course, { status: 201 });
}
