"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Flex,
  VStack,
  Heading,
  Textarea,
  Button,
  Select,
} from "@chakra-ui/react";
import FeedPost from "@/components/FeedPost";
import LiveEvents from "@/components/LiveEvents";
import {
  LiveFeedPost,
  getPosts,
  createPost,
} from "@/lib/services/liveFeedService";
import styles from "./page.module.css";

const categories = [
  { value: "employment", label: "Employment" },
  { value: "freelancing", label: "Freelancing" },
  { value: "education", label: "Education" },
  { value: "networking", label: "Networking" },
  { value: "services", label: "Local Services" },
];

export default function LiveFeedPage() {
  const [posts, setPosts] = useState<LiveFeedPost[]>([]);
  const [content, setContent] = useState("");
  const [category, setCategory] = useState(categories[0].value);
  const [filter, setFilter] = useState<string | undefined>();

  useEffect(() => {
    getPosts(filter).then(setPosts).catch(() => setPosts([]));
  }, [filter]);

  const submitPost = async () => {
    if (!content.trim()) return;
    const newPost = await createPost(content, category);
    setPosts((p) => [newPost, ...p]);
    setContent("");
  };

  return (
    <Flex className={styles.container} gap={4}>
      <Box flex="1">
        <Box mb={4} p={4} bg="white" borderWidth="1px" borderRadius="md">
          <Heading size="md" mb={2}>
            Create Post
          </Heading>
          <Select
            mb={2}
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories.map((c) => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
          </Select>
          <Textarea
            placeholder="Share something..."
            mb={2}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <Button colorScheme="brand" onClick={submitPost}>
            Post
          </Button>
        </Box>

        <Select
          mb={4}
          placeholder="Filter by category"
          value={filter || ""}
          onChange={(e) => setFilter(e.target.value || undefined)}
        >
          {categories.map((c) => (
            <option key={c.value} value={c.value}>
              {c.label}
            </option>
          ))}
        </Select>

        <VStack align="stretch">
          {posts.map((post) => (
            <FeedPost key={post.id} post={post} />
          ))}
        </VStack>
      </Box>
      <Box w={{ base: "100%", md: "sm" }}>
        <LiveEvents />
      </Box>
    </Flex>
  );
}
