import { Course, TeacherCourse } from "@/lib/types/course";

export const studentCourses: Course[] = [
  {
    id: 1,
    title: "Intro to Programming",
    progress: 0.6,
    nextSession: new Date().toISOString(),
    recommendation: "Read Chapter 5",
  },
  {
    id: 2,
    title: "Advanced React",
    progress: 0.3,
    nextSession: new Date(Date.now() + 86400000).toISOString(),
    recommendation: "Review hooks",
  },
];

export const teacherCourses: TeacherCourse[] = [
  {
    id: 1,
    title: "Design Systems",
    studentCount: 25,
    avgProgress: 0.75,
    nextSession: new Date().toISOString(),
    recommendation: "Prepare module 3",
  },
  {
    id: 2,
    title: "Data Structures",
    studentCount: 30,
    avgProgress: 0.5,
    nextSession: new Date(Date.now() + 2 * 86400000).toISOString(),
    recommendation: "Share practice problems",
  },
];
