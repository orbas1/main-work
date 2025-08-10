import { NextResponse } from "next/server";
import { search } from "@/lib/search";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q") || "";
  const results = search(q);
  return NextResponse.json(results);
}
