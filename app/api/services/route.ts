import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import {
  getServices,
  createService,
} from "@/lib/services/serviceProviderService";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const session = await getServerSession(authOptions);
  const filters = {
    search: searchParams.get("search") || undefined,
    status: searchParams.get("status") || undefined,
    sellerId:
      searchParams.get("mine") === "true" && session?.user?.id
        ? Number(session.user.id)
        : undefined,
  };
  const services = await getServices(filters);
  return NextResponse.json(services);
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  const sellerId = session?.user?.id ? Number(session.user.id) : undefined;
  if (!sellerId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { title, description, price, status } = await req.json();
  if (!title || !description || typeof price !== "number") {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }
  const service = await createService({
    title,
    description,
    price,
    sellerId,
    status,
  });
  return NextResponse.json(service, { status: 201 });
}
