import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: Request, context: any) {
  const course = await prisma.course.findUnique({
    where: { id: parseInt(context.params.id) },
    include: { modules: { orderBy: { order: "asc" } } },
  });
  if (!course) {
    return new NextResponse("Not Found", { status: 404 });
  }
  return NextResponse.json(course);
}
