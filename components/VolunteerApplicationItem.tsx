"use client";

import { Box, Heading, Text, Badge } from "@chakra-ui/react";
import styles from "./VolunteerApplicationItem.module.css";

interface VolunteerApplication {
  id: number;
  status: string;
  opportunity: {
    title: string;
    organization: string;
  };
  volunteer?: {
    name?: string | null;
  };
}

export default function VolunteerApplicationItem({ application }: { application: VolunteerApplication }) {
  const statusColor: Record<string, string> = {
    pending: "yellow",
    accepted: "green",
    rejected: "red",
  };

  return (
    <Box className={styles.item} p={4} bg="white" borderWidth="1px" borderRadius="md">
      <Heading size="sm">{application.opportunity.title}</Heading>
      <Text fontSize="sm" color="gray.500">
        {application.opportunity.organization}
        {application.volunteer && ` • ${application.volunteer.name ?? ""}`}
      </Text>
      <Badge mt={2} colorScheme={statusColor[application.status] || "gray"}>
        {application.status}
      </Badge>
    </Box>
  );
}
