"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Heading,
  VStack,
  Text,
  AspectRatio,
} from "@chakra-ui/react";
import api from "@/lib/api";
import styles from "./page.module.css";
import { useParams } from "next/navigation";

interface Module {
  id: number;
  title: string;
  content?: string | null;
}

interface Course {
  id: number;
  title: string;
  streamUrl?: string | null;
  modules: Module[];
}

export default function ClassroomPage() {
  const params = useParams<{ courseId: string }>();
  const [course, setCourse] = useState<Course | null>(null);

  useEffect(() => {
    if (!params?.courseId) return;
    api.get<Course>(`/courses/${params.courseId}`)
      .then(setCourse)
      .catch(console.error);
  }, [params?.courseId]);

  if (!course) return null;

  return (
    <Box className={styles.container}>
      <Heading mb={4}>{course.title}</Heading>
      {course.streamUrl && (
        <AspectRatio ratio={16 / 9} mb={4}>
          <iframe src={course.streamUrl} allowFullScreen />
        </AspectRatio>
      )}
      <VStack align="stretch" spacing={3}>
        {course.modules.map((m) => (
          <Box key={m.id} borderWidth="1px" borderRadius="md" p={3}>
            <Heading size="sm">{m.title}</Heading>
            {m.content && <Text mt={2}>{m.content}</Text>}
          </Box>
        ))}
      </VStack>
    </Box>
  );
}
