import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getUserProfile, updateUserProfile } from "@/lib/services/userService";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const user = await getUserProfile(session.user.email);
  return NextResponse.json(user);
}

export async function PUT(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const {
    name,
    phone,
    location,
    bio,
    expertise,
    payment,
    taxId,
    portfolio,
    title,
    image,
    resume,
    coverLetter,
    showPortfolio,
    showReviews,
    showActivityFeed,
    themeColor,
    bannerUrl,
  } = await req.json();
  const updated = await updateUserProfile(session.user.email, {
    name,
    phone,
    location,
    bio,
    expertise,
    payment,
    taxId,
    portfolio,
    title,
    image,
    resume,
    coverLetter,
    showPortfolio,
    showReviews,
    showActivityFeed,
    themeColor,
    bannerUrl,
  });
  return NextResponse.json(updated);
}
