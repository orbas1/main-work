import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const role = searchParams.get("role") === "teacher" ? "teacher" : "student";

  if (role === "teacher") {
    const courses = await prisma.course.findMany({
      where: { teacherId: Number(session.user.id) },
      include: { enrollments: true },
    });

    const data = await Promise.all(
      courses.map(async (course) => {
        const avgProgress =
          course.enrollments.length > 0
            ? course.enrollments.reduce((sum, e) => sum + e.progress, 0) /
              course.enrollments.length
            : 0;

        let recommendation: string | null = null;
        const base = process.env.OPEN_LIBRARY_API_URL;
        if (base) {
          try {
            const resp = await fetch(
              `${base}/${encodeURIComponent(course.title.toLowerCase())}.json?limit=1`
            );
            if (resp.ok) {
              const json = await resp.json();
              recommendation = json.works?.[0]?.title ?? null;
            }
          } catch {
            // ignore external API errors
          }
        }

        return {
          id: course.id,
          title: course.title,
          studentCount: course.enrollments.length,
          avgProgress,
          nextSession: course.nextSession,
          recommendation,
        };
      })
    );

    return NextResponse.json({ role, courses: data });
  }

  const enrollments = await prisma.enrollment.findMany({
    where: { studentId: Number(session.user.id) },
    include: { course: true },
  });

  const data = await Promise.all(
    enrollments.map(async (enrollment) => {
      let recommendation: string | null = null;
      const base = process.env.OPEN_LIBRARY_API_URL;
      if (base) {
        try {
          const resp = await fetch(
            `${base}/${encodeURIComponent(enrollment.course.title.toLowerCase())}.json?limit=1`
          );
          if (resp.ok) {
            const json = await resp.json();
            recommendation = json.works?.[0]?.title ?? null;
          }
        } catch {
          // ignore external API errors
        }
      }

      return {
        id: enrollment.course.id,
        title: enrollment.course.title,
        progress: enrollment.progress,
        nextSession: enrollment.course.nextSession,
        recommendation,
      };
    })
  );

  return NextResponse.json({ role, courses: data });
}
