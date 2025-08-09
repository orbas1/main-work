import { NextResponse } from "next/server";
import { getUserByEmail } from "@/lib/services/authService";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");
  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }
  const user = await getUserByEmail(email);
  return NextResponse.json({ exists: Boolean(user) });
}
