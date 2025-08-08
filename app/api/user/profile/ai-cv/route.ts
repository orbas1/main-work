import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getUserProfile } from "@/lib/services/userService";

export async function POST() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const profile = await getUserProfile(session.user.email);
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "AI service not configured" }, { status: 500 });
  }
  const prompt = `Create a professional CV in plain text using the following information: ${JSON.stringify(
    profile
  )}. Include sections for Summary, Experience, Education and Skills.`;
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
  const cv = data.choices?.[0]?.message?.content?.trim() || "";
  return NextResponse.json({ cv });
}
