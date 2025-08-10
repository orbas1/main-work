"use client";

import { Box, Heading, SimpleGrid } from "@chakra-ui/react";
import TeacherCourseCard from "@/components/TeacherCourseCard";
import { teacherCourses } from "@/lib/courses";

export default function CourseManagementPage() {
  return (
    <Box p={4}>
      <Heading size="md" mb={4}>
        Manage Courses
      </Heading>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
        {teacherCourses.map((course) => (
          <TeacherCourseCard key={course.id} {...course} />
        ))}
      </SimpleGrid>
    </Box>
  );
}
