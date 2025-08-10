import { NextResponse } from "next/server";
import { features } from "@/lib/data";

export async function GET() {
  return NextResponse.json(features);
}
