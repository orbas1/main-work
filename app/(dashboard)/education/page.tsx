"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Button,
  ButtonGroup,
  Heading,
  Input,
  VStack,
} from "@chakra-ui/react";
import CourseProgress from "@/components/CourseProgress";
import TeacherCourseCard from "@/components/TeacherCourseCard";
import api from "@/lib/api";
import styles from "./page.module.css";

interface StudentCourse {
  id: number;
  title: string;
  progress: number;
  nextSession?: string | null;
  recommendation?: string | null;
}

interface TeacherCourse {
  id: number;
  title: string;
  studentCount: number;
  avgProgress: number;
  nextSession?: string | null;
  recommendation?: string | null;
}

export default function EducationDashboardPage() {
  const [view, setView] = useState<"student" | "teacher">("student");
  const [courses, setCourses] = useState<(StudentCourse | TeacherCourse)[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    api
      .get<{ role: string; courses: any[] }>(`/education/dashboard?role=${view}`)
      .then((res) => setCourses(res.courses))
      .catch(console.error);
  }, [view]);

  const filtered = courses.filter((c) =>
    c.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box className={styles.container}>
      <Heading size="lg" mb={4}>
        Education Dashboard
      </Heading>
      <ButtonGroup mb={4}>
        <Button
          colorScheme="brand"
          variant={view === "student" ? "solid" : "outline"}
          onClick={() => setView("student")}
        >
          Student View
        </Button>
        <Button
          colorScheme="brand"
          variant={view === "teacher" ? "solid" : "outline"}
          onClick={() => setView("teacher")}
        >
          Teacher View
        </Button>
      </ButtonGroup>
      <Input
        placeholder="Search courses"
        mb={4}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <VStack align="stretch" spacing={4}>
        {view === "student" &&
          (filtered as StudentCourse[]).map((course) => (
            <CourseProgress key={course.id} {...course} />
          ))}
        {view === "teacher" &&
          (filtered as TeacherCourse[]).map((course) => (
            <TeacherCourseCard key={course.id} {...course} />
          ))}
      </VStack>
    </Box>
  );
}
