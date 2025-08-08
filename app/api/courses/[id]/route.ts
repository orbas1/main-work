import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(_req: Request, { params }: any) {
  const id = parseInt(params.id, 10);
  const course = await prisma.course.findUnique({
    where: { id },
    include: { events: true },
  });
  if (!course) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json(course);
}
