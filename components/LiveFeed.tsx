"use client";

import {
  Avatar,
  Box,
  HStack,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import styles from "./LiveFeed.module.css";

interface Post {
  id: number;
  user: string;
  avatar: string;
  image: string;
  caption: string;
  likes: number;
}

const initialPosts: Post[] = [
  {
    id: 1,
    user: "Demo User",
    avatar: "/next.svg",
    image: "/api/image",
    caption: "Exploring new horizons",
    likes: 120,
  },
  {
    id: 2,
    user: "Demo User",
    avatar: "/next.svg",
    image: "/api/image",
    caption: "Collaborating with amazing teams",
    likes: 98,
  },
  {
    id: 3,
    user: "Demo User",
    avatar: "/next.svg",
    image: "/api/image",
    caption: "Building the future with passion",
    likes: 201,
  },
];

const stories = [
  { id: 1, name: "Alice", avatar: "/next.svg" },
  { id: 2, name: "Bob", avatar: "/next.svg" },
  { id: 3, name: "Cleo", avatar: "/next.svg" },
  { id: 4, name: "Dan", avatar: "/next.svg" },
  { id: 5, name: "Eve", avatar: "/next.svg" },
];

const MotionBox = motion(Box);

export default function LiveFeed() {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const loader = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setPosts((prev) => [
          ...prev,
          ...initialPosts.map((p, i) => ({ ...p, id: prev.length + i + 1 })),
        ]);
      }
    });

    const current = loader.current;
    if (current) {
      observer.observe(current);
    }

    return () => {
      if (current) {
        observer.unobserve(current);
      }
    };
  }, []);

  return (
    <VStack spacing={6} className={styles.feed} align="stretch">
      <HStack spacing={3} className={styles.stories}>
        {stories.map((story) => (
          <VStack key={story.id} className={styles.story}>
            <Avatar
              src={story.avatar}
              name={story.name}
              size="md"
              className={styles.storyAvatar}
            />
            <Text fontSize="sm">{story.name}</Text>
          </VStack>
        ))}
      </HStack>
      {posts.map((post) => (
        <MotionBox
          key={post.id}
          className={styles.post}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <HStack className={styles.postHeader} spacing={3}>
            <Avatar src={post.avatar} name={post.user} size="sm" />
            <Text fontWeight="bold">{post.user}</Text>
          </HStack>
          <Image src={post.image} alt={post.caption} className={styles.postImage} />
          <Box className={styles.postBody}>
            <Text fontWeight="semibold" mb={1}>
              {post.likes} likes
            </Text>
            <Text>{post.caption}</Text>
          </Box>
        </MotionBox>
      ))}
      <div ref={loader} />
    </VStack>
  );
}
