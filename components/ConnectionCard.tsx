import { Box, Flex, Avatar, Text, Badge, Button } from "@chakra-ui/react";
import styles from "./ConnectionCard.module.css";

interface Connection {
  id: number;
  target: {
    id: number;
    name: string | null;
    image?: string | null;
    title?: string | null;
  };
  status: string;
}

interface Props {
  connection: Connection;
  onStatusChange?: (id: number, status: string) => void;
}

export default function ConnectionCard({ connection, onStatusChange }: Props) {
  return (
    <Box className={styles.card}>
      <Flex align="center">
        <Avatar
          mr={4}
          name={connection.target.name || ""}
          src={connection.target.image || undefined}
        />
        <Box flex="1">
          <Text fontWeight="bold">{connection.target.name}</Text>
          {connection.target.title && (
            <Text fontSize="sm">{connection.target.title}</Text>
          )}
        </Box>
        <Badge colorScheme="blue" className={styles.status}>
          {connection.status}
        </Badge>
      </Flex>
      {onStatusChange && (
        <Flex mt={2} justify="flex-end" gap={2}>
          <Button size="sm" onClick={() => onStatusChange(connection.id, "followed-up")}>
            Follow Up
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => onStatusChange(connection.id, "archived")}
          >
            Archive
          </Button>
        </Flex>
      )}
    </Box>
  );
}
