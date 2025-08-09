import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import prisma from "@/lib/prisma";
import { authOptions } from "@/lib/auth";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const opportunities = await prisma.opportunity.findMany({
    where: { employerId: (session.user as any).id },
    orderBy: { createdAt: "desc" },
  });

import { authOptions } from "@/lib/auth";
import {
  getOpportunities,
  createOpportunity,
} from "@/lib/services/opportunityService";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const session = await getServerSession(authOptions);
  const search = searchParams.get("search") || undefined;
  const category = searchParams.get("category") || undefined;
  const status = searchParams.get("status") || undefined;
  const mine = searchParams.get("mine");

  if (mine === "provider") {
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const opportunities = await getOpportunities({
      providerId: Number(session.user.id),
      status,
    });
    return NextResponse.json(opportunities);
  }

  if (mine === "participant") {
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const opportunities = await getOpportunities({
      participantId: Number(session.user.id),
      status,
    });
    return NextResponse.json(opportunities);
  }

  const opportunities = await getOpportunities({ search, category, status });
  return NextResponse.json(opportunities);
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const data = await req.json();
  const opportunity = await prisma.opportunity.create({
    data: {
      title: data.title,
      description: data.description,
      skills: data.skills,
      startDate: data.startDate ? new Date(data.startDate) : null,
      endDate: data.endDate ? new Date(data.endDate) : null,
      employerId: (session.user as any).id,
    },
  });

  const providerId = session?.user?.id ? Number(session.user.id) : undefined;
  if (!providerId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const {
    title,
    description,
    category,
    location,
    skills,
    compensation,
    status,
  } = await req.json();
  if (!title || !description) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }
  const opportunity = await createOpportunity({
    title,
    description,
    category,
    location,
    skills,
    compensation,
    status,
    providerId,
  });
  return NextResponse.json(opportunity, { status: 201 });
}
