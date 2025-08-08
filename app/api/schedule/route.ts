import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  const events = await prisma.scheduleEvent.findMany({
    include: { course: { select: { title: true } } },
    orderBy: { date: "asc" },
  });
  const formatted = events.map((e) => ({
    id: e.id,
    title: e.title,
    date: e.date,
    courseTitle: e.course?.title || null,
  }));
  return NextResponse.json(formatted);
}

export async function POST(req: Request) {
  const { title, date, courseId } = await req.json();
  const created = await prisma.scheduleEvent.create({
    data: { title, date: new Date(date), courseId },
  });
  return NextResponse.json(created, { status: 201 });
}
