import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getJobPosts, createJobPost } from "@/lib/services/jobPostService";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const session = await getServerSession(authOptions);
  const filters = {
    status: searchParams.get("status") || undefined,
    employerId:
      searchParams.get("mine") === "true" && session?.user?.id
        ? Number(session.user.id)
        : searchParams.get("employerId")
        ? Number(searchParams.get("employerId"))
        : undefined,
  };
  const posts = await getJobPosts(filters);
  return NextResponse.json(posts);
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  const employerId = session?.user?.id ? Number(session.user.id) : undefined;
  if (!employerId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await req.json();
  const { title, description, jobType } = body;
  if (!title || !description || !jobType) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }
  const post = await createJobPost({ ...body, employerId });
  return NextResponse.json(post, { status: 201 });
}
