import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getOpportunity } from "@/lib/services/volunteerService";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const opportunity = await getOpportunity(Number(params.id));
  if (!opportunity) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json(opportunity);
}
