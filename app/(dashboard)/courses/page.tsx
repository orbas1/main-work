"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Heading,
  SimpleGrid,
  Card,
  CardHeader,
  CardBody,
  Text,
  Button,
} from "@chakra-ui/react";
import NextLink from "next/link";
import styles from "./courses.module.css";

interface Course {
  id: number;
  title: string;
  description: string;
  price: number;
}

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    fetch("/api/courses")
      .then((res) => res.json())
      .then((data) => setCourses(data));
  }, []);

  return (
    <Box className={styles.container}>
      <Heading mb={4}>Courses</Heading>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
        {courses.map((course) => (
          <Card key={course.id}>
            <CardHeader>
              <Heading size="md">{course.title}</Heading>
            </CardHeader>
            <CardBody>
              <Text mb={2}>{course.description}</Text>
              <Text fontWeight="bold">${course.price.toFixed(2)}</Text>
              <Button
                as={NextLink}
                href={`/courses/${course.id}`}
                mt={3}
                colorScheme="blue"
              >
                View Details
              </Button>
            </CardBody>
          </Card>
        ))}
      </SimpleGrid>
    </Box>
  );
}
