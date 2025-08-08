"use client";

import { Card, CardHeader, CardBody, Heading, Text, Badge, Stack } from "@chakra-ui/react";
import { Job } from "@/lib/services/jobService";
import { formatCurrency } from "@/lib/utils/format";
import styles from "./JobCard.module.css";

interface Props {
  job: Job;
  onSelect: (job: Job) => void;
}

export default function JobCard({ job, onSelect }: Props) {
  return (
    <Card
      className={styles.card}
      onClick={() => onSelect(job)}
      cursor="pointer"
    >
      <CardHeader>
        <Heading size="md">{job.title}</Heading>
        <Text fontSize="sm" color="gray.600">
          {job.company} • {job.location}
        </Text>
      </CardHeader>
      <CardBody>
        <Stack spacing={2}>
          <Text noOfLines={2}>{job.description}</Text>
          <Badge colorScheme="green">
            {formatCurrency(job.salaryMin)} - {formatCurrency(job.salaryMax)}
          </Badge>
          <Badge colorScheme="purple">{job.type}</Badge>
        </Stack>
      </CardBody>
    </Card>
  );
}
