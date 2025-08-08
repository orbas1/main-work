import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { updateUserProfile } from "@/lib/services/userService";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { coverLetter } = await req.json();
  const updated = await updateUserProfile(session.user.email, { coverLetter });
  return NextResponse.json({ coverLetter: updated.coverLetter });
}
