"use client";

import { useEffect, useState } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  SimpleGrid,
  Button,
  Text,
  Spinner,
  HStack,
} from "@chakra-ui/react";
import Link from "next/link";
import api from "@/lib/api";
import TaskCard from "@/components/TaskCard";
import { Task } from "@/lib/types/task";
import styles from "./page.module.css";

export default function TaskBrowsePage() {
  const [search, setSearch] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadTasks = async () => {
    setLoading(true);
    setError("");
    try {
      const params = new URLSearchParams();
      if (search) params.set("search", search);
      const data = await api.get<Task[]>(`/tasks?${params.toString()}`);
      setTasks(data);
    } catch (err: any) {
      setError(err.message || "Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box className={styles.container}>
      <HStack justify="space-between" align="flex-end" mb={4}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            loadTasks();
          }}
          className={styles.searchForm}
        >
          <FormControl>
            <FormLabel>Search</FormLabel>
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search tasks"
            />
          </FormControl>
        </form>
        <Button colorScheme="brand" onClick={loadTasks}>
          Apply
        </Button>
        <Button as={Link} href="/tasks/create" colorScheme="brand" variant="outline">
          New Task
        </Button>
      </HStack>
      {error && (
        <Text color="red.500" mt={4}>
          {error}
        </Text>
      )}
      {loading ? (
        <Spinner mt={4} />
      ) : (
        <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={4} mt={4}>
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </SimpleGrid>
      )}
  Button,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Text,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Stack,
} from "@chakra-ui/react";
import api from "@/lib/api";
import { Task } from "@/lib/types/task";
import styles from "./page.module.css";

export default function TaskSchedulePage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selected, setSelected] = useState<Task | null>(null);
  const [newDate, setNewDate] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    api.get<Task[]>("/tasks").then(setTasks).catch(console.error);
  }, []);

  const active = tasks.filter((t) => t.status !== "completed");
  const completed = tasks.filter((t) => t.status === "completed");

  const openReschedule = (task: Task) => {
    setSelected(task);
    setNewDate(task.deadline.split("T")[0]);
    onOpen();
  };

  const reschedule = async () => {
    if (!selected) return;
    await api.put(`/tasks/${selected.id}`, { deadline: newDate });
    setTasks((prev) =>
      prev.map((t) =>
        t.id === selected.id ? { ...t, deadline: newDate } : t
      )
    );
    onClose();
  };

  const markComplete = async (task: Task) => {
    await api.put(`/tasks/${task.id}`, { status: "completed" });
    setTasks((prev) =>
      prev.map((t) =>
        t.id === task.id ? { ...t, status: "completed" } : t
      )
    );
  };

  const daysInMonth = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const numDays = new Date(year, month + 1, 0).getDate();
    const cells: (Task[] | null)[] = Array(firstDay).fill(null);
    for (let d = 1; d <= numDays; d++) {
      const dayTasks = active.filter(
        (t) => new Date(t.deadline).getDate() === d
      );
      cells.push(dayTasks);
    }
    return cells;
  };

  return (
    <Box className={styles.container}>
      <Heading size="md" mb={4}>
        Task & Schedule Management
      </Heading>
      <Tabs variant="enclosed">
        <TabList>
          <Tab>Active Tasks</Tab>
          <Tab>Schedule</Tab>
          <Tab>Completed</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Title</Th>
                  <Th>Deadline</Th>
                  <Th>Payment</Th>
                  <Th>Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {active.map((task) => (
                  <Tr key={task.id} className={styles.taskRow}>
                    <Td>{task.title}</Td>
                    <Td>{new Date(task.deadline).toLocaleDateString()}</Td>
                    <Td>${task.payment}</Td>
                    <Td>
                      <Stack direction="row" spacing={2}>
                        {task.reschedulable && (
                          <Button size="sm" onClick={() => openReschedule(task)}>
                            Reschedule
                          </Button>
                        )}
                        <Button
                          size="sm"
                          colorScheme="green"
                          onClick={() => markComplete(task)}
                        >
                          Complete
                        </Button>
                      </Stack>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TabPanel>
          <TabPanel>
            <Box className={styles.calendar}>
              <Table size="sm">
                <Tbody>
                  {(() => {
                    const cells = daysInMonth();
                    const rows = [];
                    for (let i = 0; i < cells.length; i += 7) {
                      rows.push(cells.slice(i, i + 7));
                    }
                    return rows.map((week, idx) => (
                      <Tr key={idx}>
                        {week.map((day, j) => (
                          <Td key={j} h="80px" verticalAlign="top">
                            {Array.isArray(day) ? (
                              <>
                                <Text fontSize="xs" mb={1}>
                                  {idx * 7 + j + 1 -
                                    (week[0] === null ? j : 0)}
                                </Text>
                                {day.map((t) => (
                                  <Text key={t.id} fontSize="xs">
                                    {t.title}
                                  </Text>
                                ))}
                              </>
                            ) : null}
                          </Td>
                        ))}
                      </Tr>
                    ));
                  })()}
                </Tbody>
              </Table>
            </Box>
          </TabPanel>
          <TabPanel>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Title</Th>
                  <Th>Completed At</Th>
                  <Th>Payment</Th>
                  <Th>Rating</Th>
                </Tr>
              </Thead>
              <Tbody>
                {completed.map((task) => (
                  <Tr key={task.id}>
                    <Td>{task.title}</Td>
                    <Td>{
                      task.completedAt
                        ? new Date(task.completedAt).toLocaleDateString()
                        : ""
                    }</Td>
                    <Td>${task.payment}</Td>
                    <Td>{task.rating ?? "-"}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TabPanel>
        </TabPanels>
      </Tabs>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Reschedule Task</ModalHeader>
          <ModalBody>
            <Input
              type="date"
              value={newDate}
              onChange={(e) => setNewDate(e.target.value)}
            />
          </ModalBody>
          <ModalFooter>
            <Button mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="brand" onClick={reschedule}>
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
