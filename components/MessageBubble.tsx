"use client";

import { Box } from "@chakra-ui/react";
import styles from "./MessageBubble.module.css";

interface Props {
  content: string;
  mine?: boolean;
}

export default function MessageBubble({ content, mine }: Props) {
  return (
    <Box
      className={styles.bubble}
      bg={mine ? "brand.500" : "gray.200"}
      color={mine ? "white" : "black"}
      alignSelf={mine ? "flex-end" : "flex-start"}
      borderRadius="md"
      p={2}
      mb={1}
      maxW="80%"
    >
      {content}
    </Box>
  );
}
