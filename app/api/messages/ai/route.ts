import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { prompt } = await req.json();
  if (!prompt) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "AI service not configured" }, { status: 500 });
  }
  const response = await fetch(
    process.env.OPENAI_API_URL || "https://api.openai.com/v1/chat/completions",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
      }),
    }
  );
  if (!response.ok) {
    return NextResponse.json({ error: "AI request failed" }, { status: 500 });
  }
  const data = await response.json();
  const message = data.choices?.[0]?.message?.content?.trim() || "";
  return NextResponse.json({ message });
}
