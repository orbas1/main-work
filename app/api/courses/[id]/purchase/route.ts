import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request, { params }: any) {
  const id = parseInt(params.id, 10);
  const body = await req.json();
  const course = await prisma.course.findUnique({ where: { id } });
  if (!course) {
    return NextResponse.json({ error: "Course not found" }, { status: 404 });
  }
  if (!body.userId) {
    return NextResponse.json({ error: "userId required" }, { status: 400 });
  }
  const transaction = await prisma.transaction.create({
    data: {
      userId: body.userId,
      amount: course.price,
      description: `Course purchase: ${course.title}`,
      status: "completed",
    },
  });
  return NextResponse.json({ success: true, transactionId: transaction.id });
}
