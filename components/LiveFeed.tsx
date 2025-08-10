"use client";

import { Avatar, Box, HStack, Image, Text, VStack } from "@chakra-ui/react";
import styles from "./LiveFeed.module.css";

interface Post {
  id: number;
  user: string;
  avatar: string;
  image: string;
  caption: string;
  likes: number;
}

const posts: Post[] = [
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

export default function LiveFeed() {
  return (
    <VStack spacing={6} className={styles.feed}>
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
    </VStack>
  );
}
