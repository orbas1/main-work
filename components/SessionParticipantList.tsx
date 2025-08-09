import { Box, Flex, Avatar, Text, IconButton } from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import styles from "./SessionParticipantList.module.css";

interface Participant {
  id: number;
  user: {
    id: number;
    name: string | null;
    image?: string | null;
    title?: string | null;
  };
}

interface Props {
  participants: Participant[];
  onRemove?: (userId: number) => void;
}

export default function SessionParticipantList({ participants, onRemove }: Props) {
  return (
    <Box className={styles.list}>
      {participants.map((p) => (
        <Flex key={p.id} align="center" className={styles.item}>
          <Avatar
            name={p.user.name || ""}
            src={p.user.image || undefined}
            mr={2}
          />
          <Box flex="1">
            <Text fontWeight="bold">{p.user.name}</Text>
            {p.user.title && <Text fontSize="sm">{p.user.title}</Text>}
          </Box>
          {onRemove && (
            <IconButton
              aria-label="Remove"
              icon={<CloseIcon />}
              size="sm"
              onClick={() => onRemove(p.user.id)}
            />
          )}
        </Flex>
      ))}
    </Box>
  );
}
