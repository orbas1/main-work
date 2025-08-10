"use client";

import { Box, Heading, SimpleGrid } from "@chakra-ui/react";
import CourseProgress from "@/components/CourseProgress";
import { studentCourses } from "@/lib/courses";

export default function EducationPage() {
  return (
    <Box p={4}>
      <Heading size="md" mb={4}>
        My Courses
      </Heading>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
        {studentCourses.map((course) => (
          <CourseProgress key={course.id} {...course} />
        ))}
      </SimpleGrid>
    </Box>
  );
}
