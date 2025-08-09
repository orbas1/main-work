"use client";

import { VStack, Box, Text, Button } from "@chakra-ui/react";
import Link from "next/link";
import styles from "./JobMatchList.module.css";

interface Job {
  id: number;
  title: string;
  company: string;
}

interface Props {
  jobs: Job[];
}

export default function JobMatchList({ jobs }: Props) {
  return (
    <VStack spacing={3} align="stretch" className={styles.list}>
      {jobs.map((job) => (
        <Box key={job.id} className={styles.item}>
          <Text fontWeight="bold">{job.title}</Text>
          <Text fontSize="sm">{job.company}</Text>
          <Button as={Link} href={`/jobs/${job.id}`} size="sm" colorScheme="brand" mt={2}>
            View
          </Button>
        </Box>
      ))}
    </VStack>
  );
}
