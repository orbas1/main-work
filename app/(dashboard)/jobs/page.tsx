"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Input,
  Select,
  VStack,
  HStack,
  Button,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Text,
  useDisclosure,
  useToast,
  Badge,
} from "@chakra-ui/react";
import JobCard from "@/components/JobCard";
import {
  Job,
  getJobs,
  getJob,
  submitApplication,
  saveJob,
} from "@/lib/services/jobService";
import { formatCurrency } from "@/lib/utils/format";
import styles from "./page.module.css";

interface Filters {
  search: string;
  location: string;
  type: string;
}

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filters, setFilters] = useState<Filters>({ search: "", location: "", type: "" });
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const loadJobs = async () => {
    const data = await getJobs({
      search: filters.search,
      location: filters.location,
      type: filters.type || undefined,
    });
    setJobs(data);
  };

  useEffect(() => {
    loadJobs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const openJob = async (job: Job) => {
    const full = await getJob(job.id);
    setSelectedJob(full);
    onOpen();
  };

  const apply = async () => {
    if (!selectedJob) return;
    try {
      await submitApplication({ jobId: selectedJob.id });
      toast({ title: "Application submitted", status: "success" });
      onClose();
    } catch {
      toast({ title: "Failed to apply", status: "error" });
    }
  };

  const save = async () => {
    if (!selectedJob) return;
    try {
      await saveJob(selectedJob.id);
      toast({ title: "Job saved", status: "success" });
    } catch {
      toast({ title: "Failed to save job", status: "error" });
    }
  };

  return (
    <Box className={styles.container}>
      <HStack mb={4} spacing={2} align="flex-end">
        <Input
          placeholder="Search"
          value={filters.search}
          onChange={(e) => setFilters({ ...filters, search: e.target.value })}
        />
        <Input
          placeholder="Location"
          value={filters.location}
          onChange={(e) => setFilters({ ...filters, location: e.target.value })}
        />
        <Select
          placeholder="Job Type"
          value={filters.type}
          onChange={(e) => setFilters({ ...filters, type: e.target.value })}
        >
          <option value="full-time">Full Time</option>
          <option value="part-time">Part Time</option>
          <option value="contract">Contract</option>
          <option value="remote">Remote</option>
        </Select>
        <Button colorScheme="brand" onClick={loadJobs}>
          Search
        </Button>
      </HStack>
      <VStack align="stretch" spacing={4}>
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} onSelect={openJob} />
        ))}
      </VStack>

      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="xl">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader>{selectedJob?.title}</DrawerHeader>
          <DrawerBody>
            {selectedJob && (
              <VStack align="start" spacing={4}>
                <Text fontWeight="bold">
                  {selectedJob.company} • {selectedJob.location}
                </Text>
                <Badge colorScheme="green">
                  {formatCurrency(selectedJob.salaryMin)} - {" "}
                  {formatCurrency(selectedJob.salaryMax)}
                </Badge>
                <Badge colorScheme="purple">{selectedJob.type}</Badge>
                <Text>{selectedJob.description}</Text>
                {selectedJob.benefits && <Text>{selectedJob.benefits}</Text>}
              </VStack>
            )}
          </DrawerBody>
          <DrawerFooter>
            <HStack spacing={3}>
              <Button onClick={save}>Save</Button>
              <Button colorScheme="brand" onClick={apply}>
                Apply Now
              </Button>
            </HStack>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Box>
  );
}
