"use client";

import { Box, HStack, VStack, Text, Button } from "@chakra-ui/react";
import styles from "./ApplicationItem.module.css";

interface Props {
  id: number;
  jobTitle: string;
  applicantName?: string;
  status: string;
  onStatusChange?: (status: string) => void;
  onSchedule?: () => void;
}

export default function ApplicationItem({
  id,
  jobTitle,
  applicantName,
  status,
  onStatusChange,
  onSchedule,
}: Props) {
  return (
    <Box className={styles.item} p={4} borderWidth="1px" borderRadius="md" bg="white">
      <VStack align="start" spacing={2}>
        <Text fontWeight="bold">{jobTitle}</Text>
        {applicantName && <Text>Applicant: {applicantName}</Text>}
        <HStack spacing={2} className={styles.actions}>
          <Text>Status: {status}</Text>
          {onStatusChange && (
            <>
              <Button size="sm" onClick={() => onStatusChange("accepted")}>Accept</Button>
              <Button size="sm" onClick={() => onStatusChange("rejected")}>Reject</Button>
            </>
          )}
          {onSchedule && (
            <Button size="sm" onClick={onSchedule}>Schedule Interview</Button>
          )}
        </HStack>
      </VStack>
    </Box>
  );
}
