'use client';

import { Box, Heading, VStack } from "@chakra-ui/react";
import InterviewItem from "@/components/InterviewItem";

const interviews = [
  {
    id: 1,
    jobTitle: "Frontend Developer",
    scheduledAt: new Date().toISOString(),
    location: "Zoom",
    link: "https://zoom.us/j/123456789",
    status: "scheduled",
  },
  {
    id: 2,
    jobTitle: "Backend Engineer",
    scheduledAt: new Date(Date.now() + 86400000).toISOString(),
    status: "pending",
  },
];

export default function InterviewsPage() {
  return (
    <Box p={4}>
      <Heading size="md" mb={4}>
        Interviews
      </Heading>
      <VStack spacing={4} align="stretch">
        {interviews.map((interview) => (
          <InterviewItem
            key={interview.id}
            jobTitle={interview.jobTitle}
            scheduledAt={interview.scheduledAt}
            location={interview.location}
            link={interview.link}
            status={interview.status}
          />
        ))}
      </VStack>
    </Box>
  );
}

