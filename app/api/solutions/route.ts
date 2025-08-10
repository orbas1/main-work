import { NextResponse } from "next/server";
import { solutions } from "@/lib/data";

export async function GET() {
  return NextResponse.json(solutions);
}
