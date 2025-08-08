"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  Box,
  Heading,
  Text,
  Button,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import styles from "./course.module.css";

interface Event {
  id: number;
  title: string;
  date: string;
}

interface Course {
  id: number;
  title: string;
  description: string;
  price: number;
  events: Event[];
}

export default function CourseDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  useEffect(() => {
    fetch(`/api/courses/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setCourse(data);
        setLoading(false);
      });
  }, [id]);

  const handlePurchase = async () => {
    const res = await fetch(`/api/courses/${id}/purchase`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: 1 }),
    });
    if (res.ok) {
      toast({ title: "Purchase successful", status: "success" });
    } else {
      const data = await res.json();
      toast({ title: data.error || "Error", status: "error" });
    }
  };

  if (loading) {
    return <Spinner />;
  }

  if (!course) {
    return <Text>Course not found</Text>;
  }

  return (
    <Box className={styles.container}>
      <Heading>{course.title}</Heading>
      <Text mt={4}>{course.description}</Text>
      <Text mt={2} fontWeight="bold">${course.price.toFixed(2)}</Text>
      <Heading size="md" mt={6} mb={2}>
        Schedule
      </Heading>
      {course.events.map((e) => (
        <Text key={e.id}>{new Date(e.date).toLocaleString()} - {e.title}</Text>
      ))}
      <Button mt={6} colorScheme="green" onClick={handlePurchase}>
        Purchase
      </Button>
    </Box>
  );
}
