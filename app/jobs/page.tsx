'use client';

import { Box, Heading } from "@chakra-ui/react";
import JobMatchList from "@/components/JobMatchList";

const jobs = [
  { id: 1, title: "Frontend Developer", company: "Tech Corp" },
  { id: 2, title: "Backend Engineer", company: "Data Solutions" },
  { id: 3, title: "Full Stack Developer", company: "Web Innovators" },
];

export default function JobsPage() {
  return (
    <Box p={4}>
      <Heading size="md" mb={4}>
        Jobs
      </Heading>
      <JobMatchList jobs={jobs} />
    </Box>
  );
}

