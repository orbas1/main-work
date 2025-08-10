"use client";

import { Box, Heading } from "@chakra-ui/react";
import { useState } from "react";
import SessionParticipantList from "@/components/SessionParticipantList";
import { sessionParticipants } from "@/lib/sessions";

export default function SessionManagementPage() {
  const [participants, setParticipants] = useState(sessionParticipants);

  const handleRemove = (userId: number) => {
    setParticipants((prev) => prev.filter((p) => p.user.id !== userId));
  };

  return (
    <Box p={4}>
      <Heading size="md" mb={4}>
        Session Participants
      </Heading>
      <SessionParticipantList
        participants={participants}
        onRemove={handleRemove}
      />
    </Box>
  );
}
