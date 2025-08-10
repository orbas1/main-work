'use client';

import { Box, Heading, VStack } from "@chakra-ui/react";
import ApplicationItem from "@/components/ApplicationItem";

const applications = [
  { id: 1, jobTitle: "Frontend Developer", applicantName: "Alice", status: "pending" },
  { id: 2, jobTitle: "Backend Engineer", applicantName: "Bob", status: "interview" },
];

export default function ApplicationsPage() {
  const handleStatusChange = (id: number, status: string) => {
    console.log(`Application ${id} status changed to ${status}`);
  };

  const handleSchedule = (id: number) => {
    console.log(`Schedule interview for application ${id}`);
  };

  return (
    <Box p={4}>
      <Heading size="md" mb={4}>
        Applications
      </Heading>
      <VStack spacing={4} align="stretch">
        {applications.map((app) => (
          <ApplicationItem
            key={app.id}
            id={app.id}
            jobTitle={app.jobTitle}
            applicantName={app.applicantName}
            status={app.status}
            onStatusChange={(status) => handleStatusChange(app.id, status)}
            onSchedule={() => handleSchedule(app.id)}
          />
        ))}
      </VStack>
    </Box>
  );
}

