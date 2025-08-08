import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getJobPost, updateJobPost, deleteJobPost } from "@/lib/services/jobPostService";

export async function GET(req: NextRequest, { params }: any) {
  const id = Number(params.id);
  const post = await getJobPost(id);
  if (!post) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(post);
}

export async function PUT(req: NextRequest, { params }: any) {
  const session = await getServerSession(authOptions);
  const employerId = session?.user?.id ? Number(session.user.id) : undefined;
  const id = Number(params.id);
  if (!employerId)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const existing = await getJobPost(id);
  if (!existing || existing.employerId !== employerId)
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  const data = await req.json();
  const post = await updateJobPost(id, data);
  return NextResponse.json(post);
}

export async function DELETE(req: NextRequest, { params }: any) {
  const session = await getServerSession(authOptions);
  const employerId = session?.user?.id ? Number(session.user.id) : undefined;
  const id = Number(params.id);
  if (!employerId)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const existing = await getJobPost(id);
  if (!existing || existing.employerId !== employerId)
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  await deleteJobPost(id);
  return NextResponse.json({ success: true });
}
