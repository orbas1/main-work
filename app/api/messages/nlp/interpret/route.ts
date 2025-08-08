import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { text } = await req.json();
  if (typeof text !== "string" || !text.trim()) {
    return NextResponse.json({ error: "text required" }, { status: 400 });
  }
  const reply = `AI interpretation: ${text.toUpperCase()}`;
  return NextResponse.json({ reply });
}
