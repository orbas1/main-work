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
    image: "https://source.unsplash.com/random/600x400?sig=1",
    caption: "Exploring new horizons",
    likes: 120,
  },
  {
    id: 2,
    user: "Demo User",
    avatar: "/next.svg",
    image: "https://source.unsplash.com/random/600x400?sig=2",
    caption: "Collaborating with amazing teams",
    likes: 98,
  },
  {
    id: 3,
    user: "Demo User",
    avatar: "/next.svg",
    image: "https://source.unsplash.com/random/600x400?sig=3",
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
    <VStack spacing={6} className={styles.feed}>
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
        <Box key={post.id} className={styles.post}>
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
        </Box>
      ))}
      <div ref={loader} />
    </VStack>
  );
}
