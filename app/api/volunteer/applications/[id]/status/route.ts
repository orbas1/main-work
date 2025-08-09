import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { updateVolunteerApplicationStatus } from "@/lib/services/volunteerService";

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { status } = await req.json();
  if (!status) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }
  const updated = await updateVolunteerApplicationStatus(Number(params.id), status);
  return NextResponse.json(updated);
}
