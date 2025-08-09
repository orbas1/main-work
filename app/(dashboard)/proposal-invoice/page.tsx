"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Heading,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Stack,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  NumberInput,
  NumberInputField,
  useToast,
} from "@chakra-ui/react";
import api from "@/lib/api";
import styles from "./page.module.css";

interface Proposal {
  id: number;
  project: string;
  freelancer: string;
  amount: number;
  status: string;
}

interface Invoice {
  id: number;
  contract: string;
  amount: number;
  dueDate: string;
  status: string;
}

export default function ProposalInvoicePage() {
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [newProposal, setNewProposal] = useState({ project: "", amount: "", message: "" });
  const [newInvoice, setNewInvoice] = useState({ contract: "", amount: "", dueDate: "" });
  const toast = useToast();

  useEffect(() => {
    api.get<Proposal[]>("/proposals").then(setProposals).catch(() => setProposals([]));
    api.get<Invoice[]>("/invoices").then(setInvoices).catch(() => setInvoices([]));
  }, []);

  const submitProposal = async () => {
    try {
      const created = await api.post<Proposal>("/proposals", {
        project: newProposal.project,
        amount: Number(newProposal.amount),
        message: newProposal.message,
      });
      setProposals((prev) => [...prev, created]);
      setNewProposal({ project: "", amount: "", message: "" });
      toast({ status: "success", description: "Proposal submitted" });
    } catch {
      toast({ status: "error", description: "Failed to submit proposal" });
    }
  };

  const submitInvoice = async () => {
    try {
      const created = await api.post<Invoice>("/invoices", {
        contract: newInvoice.contract,
        amount: Number(newInvoice.amount),
        dueDate: newInvoice.dueDate,
      });
      setInvoices((prev) => [...prev, created]);
      setNewInvoice({ contract: "", amount: "", dueDate: "" });
      toast({ status: "success", description: "Invoice submitted" });
    } catch {
      toast({ status: "error", description: "Failed to submit invoice" });
    }
  };

  const updateProposalStatus = async (id: number, status: string) => {
    try {
      await api.post(`/proposals/${id}/status`, { status });
      setProposals((prev) => prev.map((p) => (p.id === id ? { ...p, status } : p)));
    } catch {
      toast({ status: "error", description: "Update failed" });
    }
  };

  const markInvoicePaid = async (id: number) => {
    try {
      await api.post(`/invoices/${id}/pay`, {});
      setInvoices((prev) => prev.map((i) => (i.id === id ? { ...i, status: "paid" } : i)));
    } catch {
      toast({ status: "error", description: "Payment update failed" });
    }
  };

  return (
    <Box className={styles.container}>
      <Tabs variant="enclosed">
        <TabList>
          <Tab>Client View</Tab>
          <Tab>Freelancer View</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Heading size="md" mb={4}>
              Proposals
            </Heading>
            <Table bg="white" variant="simple" mb={8}>
              <Thead>
                <Tr>
                  <Th>Project</Th>
                  <Th>Freelancer</Th>
                  <Th>Amount</Th>
                  <Th>Status</Th>
                  <Th></Th>
                </Tr>
              </Thead>
              <Tbody>
                {proposals.map((p) => (
                  <Tr key={p.id}>
                    <Td>{p.project}</Td>
                    <Td>{p.freelancer}</Td>
                    <Td>${p.amount}</Td>
                    <Td>{p.status}</Td>
                    <Td>
                      {p.status === "pending" && (
                        <Stack direction="row" spacing={2}>
                          <Button
                            size="sm"
                            colorScheme="green"
                            onClick={() => updateProposalStatus(p.id, "approved")}
                          >
                            Approve
                          </Button>
                          <Button
                            size="sm"
                            colorScheme="red"
                            onClick={() => updateProposalStatus(p.id, "rejected")}
                          >
                            Reject
                          </Button>
                        </Stack>
                      )}
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
            <Heading size="md" mb={4}>
              Invoices
            </Heading>
            <Table bg="white" variant="simple">
              <Thead>
                <Tr>
                  <Th>Contract</Th>
                  <Th>Amount</Th>
                  <Th>Due</Th>
                  <Th>Status</Th>
                  <Th></Th>
                </Tr>
              </Thead>
              <Tbody>
                {invoices.map((inv) => (
                  <Tr key={inv.id}>
                    <Td>{inv.contract}</Td>
                    <Td>${inv.amount}</Td>
                    <Td>{inv.dueDate}</Td>
                    <Td>{inv.status}</Td>
                    <Td>
                      {inv.status !== "paid" && (
                        <Button
                          size="sm"
                          colorScheme="brand"
                          onClick={() => markInvoicePaid(inv.id)}
                        >
                          Mark Paid
                        </Button>
                      )}
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TabPanel>
          <TabPanel>
            <Heading size="md" mb={4}>
              Submit Proposal
            </Heading>
            <Stack spacing={4} mb={8} maxW="400px">
              <FormControl>
                <FormLabel>Project</FormLabel>
                <Input
                  value={newProposal.project}
                  onChange={(e) => setNewProposal({ ...newProposal, project: e.target.value })}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Amount</FormLabel>
                <NumberInput
                  min={0}
                  value={newProposal.amount}
                  onChange={(v) => setNewProposal({ ...newProposal, amount: v })}
                >
                  <NumberInputField />
                </NumberInput>
              </FormControl>
              <FormControl>
                <FormLabel>Message</FormLabel>
                <Textarea
                  value={newProposal.message}
                  onChange={(e) => setNewProposal({ ...newProposal, message: e.target.value })}
                />
              </FormControl>
              <Button colorScheme="brand" onClick={submitProposal}>
                Send Proposal
              </Button>
            </Stack>
            <Heading size="md" mb={4}>
              Submit Invoice
            </Heading>
            <Stack spacing={4} maxW="400px">
              <FormControl>
                <FormLabel>Contract</FormLabel>
                <Input
                  value={newInvoice.contract}
                  onChange={(e) => setNewInvoice({ ...newInvoice, contract: e.target.value })}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Amount</FormLabel>
                <NumberInput
                  min={0}
                  value={newInvoice.amount}
                  onChange={(v) => setNewInvoice({ ...newInvoice, amount: v })}
                >
                  <NumberInputField />
                </NumberInput>
              </FormControl>
              <FormControl>
                <FormLabel>Due Date</FormLabel>
                <Input
                  type="date"
                  value={newInvoice.dueDate}
                  onChange={(e) => setNewInvoice({ ...newInvoice, dueDate: e.target.value })}
                />
              </FormControl>
              <Button colorScheme="brand" onClick={submitInvoice}>
                Send Invoice
              </Button>
            </Stack>
            <Heading size="md" mt={10} mb={4}>
              Your Proposals
            </Heading>
            <Table bg="white" variant="simple" mb={8}>
              <Thead>
                <Tr>
                  <Th>Project</Th>
                  <Th>Amount</Th>
                  <Th>Status</Th>
                </Tr>
              </Thead>
              <Tbody>
                {proposals.map((p) => (
                  <Tr key={p.id}>
                    <Td>{p.project}</Td>
                    <Td>${p.amount}</Td>
                    <Td>{p.status}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
            <Heading size="md" mb={4}>
              Your Invoices
            </Heading>
            <Table bg="white" variant="simple">
              <Thead>
                <Tr>
                  <Th>Contract</Th>
                  <Th>Amount</Th>
                  <Th>Status</Th>
                </Tr>
              </Thead>
              <Tbody>
                {invoices.map((inv) => (
                  <Tr key={inv.id}>
                    <Td>{inv.contract}</Td>
                    <Td>${inv.amount}</Td>
                    <Td>{inv.status}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}

