"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Heading,
  VStack,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  List,
  ListItem,
  Divider,
  Link as ChakraLink,
} from "@chakra-ui/react";
import NextLink from "next/link";
import api from "@/lib/api";
import styles from "./page.module.css";

interface Module {
  id: number;
  title: string;
}

interface Course {
  id: number;
  title: string;
  description?: string | null;
  streamUrl?: string | null;
  modules: Module[];
}

export default function CourseManagementPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [streamUrl, setStreamUrl] = useState("");

  useEffect(() => {
    api.get<Course[]>("/courses").then(setCourses).catch(console.error);
  }, []);

  const createCourse = async () => {
    const course = await api.post<Course>("/courses", {
      title,
      description,
      streamUrl,
    });
    setCourses((c) => [...c, { ...course, modules: [] }]);
    setTitle("");
    setDescription("");
    setStreamUrl("");
  };

  return (
    <Box className={styles.container}>
      <Heading size="lg" mb={4}>
        Course Management
      </Heading>
      <VStack align="stretch" spacing={6}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            createCourse();
          }}
        >
          <VStack align="stretch" spacing={3}>
            <FormControl isRequired>
              <FormLabel>Title</FormLabel>
              <Input value={title} onChange={(e) => setTitle(e.target.value)} />
            </FormControl>
            <FormControl>
              <FormLabel>Description</FormLabel>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Stream URL</FormLabel>
              <Input
                value={streamUrl}
                onChange={(e) => setStreamUrl(e.target.value)}
                placeholder="https://example.com/stream"
              />
            </FormControl>
            <Button type="submit" colorScheme="brand" alignSelf="flex-start">
              Create Course
            </Button>
          </VStack>
        </form>
        <Divider />
        <Heading size="md">Existing Courses</Heading>
        <VStack align="stretch" spacing={4}>
          {courses.map((course) => (
            <Box key={course.id} borderWidth="1px" borderRadius="md" p={4}>
              <Heading size="sm">{course.title}</Heading>
              {course.modules.length > 0 && (
                <List mt={2} spacing={1}>
                  {course.modules.map((m) => (
                    <ListItem key={m.id}>• {m.title}</ListItem>
                  ))}
                </List>
              )}
              <ChakraLink
                as={NextLink}
                href={`/classroom/${course.id}`}
                mt={2}
                display="inline-block"
                color="brand.500"
              >
                Open Classroom
              </ChakraLink>
            </Box>
          ))}
        </VStack>
      </VStack>
    </Box>
  );
}
