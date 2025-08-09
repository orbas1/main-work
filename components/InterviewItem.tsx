"use client";

import { Box, VStack, Text } from "@chakra-ui/react";
import styles from "./InterviewItem.module.css";

interface Props {
  jobTitle: string;
  scheduledAt: string;
  location?: string;
  link?: string;
  status: string;
}

export default function InterviewItem({ jobTitle, scheduledAt, location, link, status }: Props) {
  return (
    <Box className={styles.item} p={4} borderWidth="1px" borderRadius="md" bg="white">
      <VStack align="start" spacing={2}>
        <Text fontWeight="bold">{jobTitle}</Text>
        <Text>Scheduled: {new Date(scheduledAt).toLocaleString()}</Text>
        {location && <Text>Location: {location}</Text>}
        {link && (
          <Text>
            Link: <a href={link} className={styles.link}>{link}</a>
          </Text>
        )}
        <Text>Status: {status}</Text>
      </VStack>
    </Box>
  );
}
