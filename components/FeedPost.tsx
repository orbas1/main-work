"use client";

import { useState } from "react";
import { Box, Text, HStack, IconButton, useToast } from "@chakra-ui/react";
import { FaHeart } from "react-icons/fa";
import { LiveFeedPost, likePost } from "@/lib/services/liveFeedService";
import styles from "./FeedPost.module.css";

interface Props {
  post: LiveFeedPost;
}

export default function FeedPost({ post }: Props) {
  const [likes, setLikes] = useState(post.likes);
  const toast = useToast();

  const handleLike = async () => {
    try {
      await likePost(post.id);
      setLikes((l) => l + 1);
    } catch (e) {
      toast({ status: "error", description: "Failed to like post" });
    }
  };

  return (
    <Box className={styles.post} borderWidth="1px" borderRadius="md" p={4} bg="white">
      <Text fontWeight="bold" mb={2}>
        {post.author}
      </Text>
      <Text mb={2}>{post.content}</Text>
      <HStack spacing={2}>
        <IconButton
          aria-label="Like post"
          icon={<FaHeart />}
          onClick={handleLike}
          size="sm"
          colorScheme="pink"
          variant="ghost"
        />
        <Text>{likes}</Text>
      </HStack>
    </Box>
  );
}
