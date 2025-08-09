import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getEmployment } from "@/lib/services/employmentService";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id ? Number(session.user.id) : undefined;
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const employment = await getEmployment(Number(params.id));
  if (!employment) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json(employment);
}
