"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  NumberInput,
  NumberInputField,
  Select,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Tag,
  HStack,
  VStack,
  Spinner,
  Text,
} from "@chakra-ui/react";
import api from "@/lib/api";
import styles from "./page.module.css";

interface JobPost {
  id: number;
  title: string;
  description: string;
  requirements?: string;
  salaryMin?: number;
  salaryMax?: number;
  benefits?: string;
  jobType: string;
  location?: string;
  deadline?: string;
  category?: string;
  status: string;
}

export default function JobPostManagementPage() {
  const [posts, setPosts] = useState<JobPost[]>([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [requirements, setRequirements] = useState("");
  const [salaryMin, setSalaryMin] = useState("");
  const [salaryMax, setSalaryMax] = useState("");
  const [benefits, setBenefits] = useState("");
  const [jobType, setJobType] = useState("full-time");
  const [location, setLocation] = useState("");
  const [deadline, setDeadline] = useState("");
  const [category, setCategory] = useState("");

  const loadPosts = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      params.set("mine", "true");
      if (filter) params.set("status", filter);
      const data = await api.get<JobPost[]>(`/job-posts?${params.toString()}`);
      setPosts(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setRequirements("");
    setSalaryMin("");
    setSalaryMax("");
    setBenefits("");
    setJobType("full-time");
    setLocation("");
    setDeadline("");
    setCategory("");
    setEditingId(null);
  };

  const savePost = async () => {
    const body = {
      title,
      description,
      requirements: requirements || undefined,
      salaryMin: salaryMin ? Number(salaryMin) : undefined,
      salaryMax: salaryMax ? Number(salaryMax) : undefined,
      benefits: benefits || undefined,
      jobType,
      location: location || undefined,
      deadline: deadline ? new Date(deadline) : undefined,
      category: category || undefined,
      status: "active",
    };
    if (editingId) {
      await api.put(`/job-posts/${editingId}`, body);
    } else {
      await api.post<JobPost>("/job-posts", body);
    }
    resetForm();
    loadPosts();
  };

  const editPost = (post: JobPost) => {
    setEditingId(post.id);
    setTitle(post.title);
    setDescription(post.description);
    setRequirements(post.requirements || "");
    setSalaryMin(post.salaryMin?.toString() || "");
    setSalaryMax(post.salaryMax?.toString() || "");
    setBenefits(post.benefits || "");
    setJobType(post.jobType);
    setLocation(post.location || "");
    setDeadline(post.deadline ? post.deadline.substring(0, 10) : "");
    setCategory(post.category || "");
  };

  const duplicatePost = async (post: JobPost) => {
    const { id, status, deadline, ...rest } = post;
    await api.post("/job-posts", {
      ...rest,
      status,
      deadline: deadline ? new Date(deadline) : undefined,
      title: `${post.title} (Copy)`,
    });
    loadPosts();
  };

  const toggleStatus = async (post: JobPost) => {
    const newStatus = post.status === "active" ? "inactive" : "active";
    await api.put(`/job-posts/${post.id}`, { status: newStatus });
    loadPosts();
  };

  const removePost = async (post: JobPost) => {
    await api.delete(`/job-posts/${post.id}`);
    loadPosts();
  };

  return (
    <Box className={styles.container}>
      <VStack align="stretch" spacing={4} mb={8}>
        <FormControl isRequired>
          <FormLabel>Job Title</FormLabel>
          <Input value={title} onChange={(e) => setTitle(e.target.value)} />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Job Description</FormLabel>
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            minH="120px"
          />
        </FormControl>
        <FormControl>
          <FormLabel>Requirements & Qualifications</FormLabel>
          <Textarea
            value={requirements}
            onChange={(e) => setRequirements(e.target.value)}
            minH="80px"
          />
        </FormControl>
        <HStack spacing={4} flexWrap="wrap">
          <FormControl maxW="150px">
            <FormLabel>Salary Min</FormLabel>
            <NumberInput min={0} value={salaryMin} onChange={(v) => setSalaryMin(v)}>
              <NumberInputField />
            </NumberInput>
          </FormControl>
          <FormControl maxW="150px">
            <FormLabel>Salary Max</FormLabel>
            <NumberInput min={0} value={salaryMax} onChange={(v) => setSalaryMax(v)}>
              <NumberInputField />
            </NumberInput>
          </FormControl>
          <FormControl maxW="200px">
            <FormLabel>Job Type</FormLabel>
            <Select value={jobType} onChange={(e) => setJobType(e.target.value)}>
              <option value="full-time">Full-time</option>
              <option value="part-time">Part-time</option>
              <option value="remote">Remote</option>
              <option value="contract">Contract</option>
              <option value="gig">Gig</option>
            </Select>
          </FormControl>
          <FormControl maxW="200px">
            <FormLabel>Location</FormLabel>
            <Input value={location} onChange={(e) => setLocation(e.target.value)} />
          </FormControl>
          <FormControl maxW="200px">
            <FormLabel>Application Deadline</FormLabel>
            <Input type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} />
          </FormControl>
          <FormControl maxW="200px">
            <FormLabel>Industry Category</FormLabel>
            <Input value={category} onChange={(e) => setCategory(e.target.value)} />
          </FormControl>
        </HStack>
        <FormControl>
          <FormLabel>Benefits</FormLabel>
          <Input value={benefits} onChange={(e) => setBenefits(e.target.value)} />
        </FormControl>
        <HStack spacing={4}>
          <Button colorScheme="brand" onClick={savePost}>
            {editingId ? "Update Job Post" : "Create Job Post"}
          </Button>
          {editingId && (
            <Button variant="ghost" onClick={resetForm}>
              Cancel
            </Button>
          )}
        </HStack>
      </VStack>

      <Box className={styles.preview} p={4} borderWidth="1px" borderRadius="md" mb={10}>
        <Text fontSize="xl" fontWeight="bold" mb={2}>
          {title || "Job Title Preview"}
        </Text>
        <Text mb={2}>{description || "Job description preview"}</Text>
        {requirements && (
          <Text mb={2}>
            <strong>Requirements:</strong> {requirements}
          </Text>
        )}
        {(salaryMin || salaryMax) && (
          <Text mb={2}>
            <strong>Salary:</strong> {salaryMin || ""} - {salaryMax || ""}
          </Text>
        )}
        {location && (
          <Text mb={2}>
            <strong>Location:</strong> {location}
          </Text>
        )}
        {deadline && (
          <Text>
            <strong>Apply by:</strong> {deadline}
          </Text>
        )}
      </Box>

      <HStack mb={4} spacing={4} align="center">
        <FormControl maxW="200px">
          <FormLabel>Filter Status</FormLabel>
          <Select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="">All</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="draft">Draft</option>
          </Select>
        </FormControl>
      </HStack>

      {loading ? (
        <Spinner />
      ) : posts.length === 0 ? (
        <Text>No job posts found</Text>
      ) : (
        <Table size="sm">
          <Thead>
            <Tr>
              <Th>Title</Th>
              <Th>Status</Th>
              <Th>Type</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {posts.map((post) => (
              <Tr key={post.id}>
                <Td>{post.title}</Td>
                <Td>
                  <Tag colorScheme={post.status === "active" ? "green" : post.status === "draft" ? "yellow" : "red"}>
                    {post.status}
                  </Tag>
                </Td>
                <Td>{post.jobType}</Td>
                <Td>
                  <HStack className={styles.actions}>
                    <Button size="xs" onClick={() => editPost(post)}>
                      Edit
                    </Button>
                    <Button size="xs" onClick={() => duplicatePost(post)}>
                      Duplicate
                    </Button>
                    <Button size="xs" onClick={() => toggleStatus(post)}>
                      {post.status === "active" ? "Deactivate" : "Activate"}
                    </Button>
                    <Button size="xs" colorScheme="red" onClick={() => removePost(post)}>
                      Delete
                    </Button>
                  </HStack>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}
    </Box>
  );
}

