import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { applyToOpportunity } from "@/lib/services/opportunityService";

export async function POST(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  await applyToOpportunity(Number(params.id), Number(session.user.id));
  return NextResponse.json({ success: true }, { status: 201 });
}
