'use client';

import { Box, Heading, VStack, HStack, Checkbox } from "@chakra-ui/react";

interface Task {
  id: number;
  title: string;
  completed: boolean;
}

const tasks: Task[] = [
  { id: 1, title: "Update portfolio", completed: false },
  { id: 2, title: "Submit proposal", completed: true },
];

export default function TasksPage() {
  return (
    <Box p={4}>
      <Heading size="md" mb={4}>
        Tasks
      </Heading>
      <VStack spacing={3} align="stretch">
        {tasks.map((task) => (
          <HStack
            key={task.id}
            p={3}
            borderWidth="1px"
            borderRadius="md"
            bg="white"
          >
            <Checkbox isChecked={task.completed}>{task.title}</Checkbox>
          </HStack>
        ))}
      </VStack>
    </Box>
  );
}

