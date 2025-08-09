import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import prisma from "@/lib/prisma";
import { authOptions } from "@/lib/auth";

export async function GET(req: Request, context: any) {
  const modules = await prisma.module.findMany({
    where: { courseId: parseInt(context.params.id) },
    orderBy: { order: "asc" },
  });
  return NextResponse.json(modules);
}

export async function POST(req: Request, context: any) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return new NextResponse("Unauthorized", { status: 401 });
  }
  const data = await req.json();
  const createdModule = await prisma.module.create({
    data: {
      title: data.title,
      content: data.content,
      order: data.order ?? 0,
      courseId: parseInt(context.params.id),
    },
  });
  return NextResponse.json(createdModule, { status: 201 });
}
