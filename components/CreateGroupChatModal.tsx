"use client";

import { useState } from "react";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  VStack,
} from "@chakra-ui/react";
import styles from "./CreateGroupChatModal.module.css";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onCreated: (chat: any) => void;
}

export default function CreateGroupChatModal({ isOpen, onClose, onCreated }: Props) {
  const [participants, setParticipants] = useState("");

  const create = async () => {
    const ids = participants
      .split(",")
      .map((id) => parseInt(id.trim(), 10))
      .filter(Boolean);
    if (!ids.length) return;
    const res = await fetch("/api/chats", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ participantIds: ids }),
    });
    if (res.ok) {
      const chat = await res.json();
      onCreated(chat);
      setParticipants("");
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent className={styles.modal}>
        <ModalHeader>Create Group Chat</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={2} align="stretch">
            <Input
              placeholder="Participant IDs, comma separated"
              value={participants}
              onChange={(e) => setParticipants(e.target.value)}
            />
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="brand" mr={3} onClick={create}>
            Create
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
