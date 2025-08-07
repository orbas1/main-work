import { NextResponse } from "next/server";
import { register } from "../../../lib/controllers/authController";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const user = await register({
      name: data.name,
      email: data.email,
      password: data.password,
    });
    return NextResponse.json({ user });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || "Registration failed" }, { status: 400 });
  }
}
