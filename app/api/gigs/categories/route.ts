import { NextResponse } from "next/server";
import { getGigCategories } from "@/lib/services/gigService";

export async function GET() {
  const categories = await getGigCategories();
  return NextResponse.json(categories);
}
