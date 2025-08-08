"use client";

import { useState } from "react";
import {
  Box,
  VStack,
  Input,
  Textarea,
  Select,
  Button,
  NumberInput,
  NumberInputField,
  HStack,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import styles from "./ContractForm.module.css";

interface MilestoneForm {
  description: string;
  dueDate: string;
  amount: number;
}

interface ContractFormProps {
  contract?: any;
}

export default function ContractForm({ contract }: ContractFormProps) {
  const router = useRouter();
  const [title, setTitle] = useState(contract?.title || "");
  const [description, setDescription] = useState(contract?.description || "");
  const [freelancerId, setFreelancerId] = useState<string>(
    contract?.freelancerId ? String(contract.freelancerId) : ""
  );
  const [paymentType, setPaymentType] = useState<string>(
    contract?.paymentType || "fixed"
  );
  const [totalValue, setTotalValue] = useState<number>(contract?.totalValue || 0);
  const [hourlyRate, setHourlyRate] = useState<number>(contract?.hourlyRate || 0);
  const [expectedHours, setExpectedHours] = useState<number>(
    contract?.expectedHours || 0
  );
  const [milestones, setMilestones] = useState<MilestoneForm[]>(
    contract?.milestones && contract.milestones.length > 0
      ? contract.milestones.map((m: any) => ({
          description: m.description,
          dueDate: m.dueDate?.slice(0, 10) || "",
          amount: m.amount,
        }))
      : [{ description: "", dueDate: "", amount: 0 }]
  );
  const [loading, setLoading] = useState(false);

  const handleMilestoneChange = (
    index: number,
    field: keyof MilestoneForm,
    value: string
  ) => {
    setMilestones((prev) => {
      const copy = [...prev];
      (copy[index] as any)[field] = field === "amount" ? Number(value) : value;
      return copy;
    });
  };

  const addMilestone = () =>
    setMilestones((prev) => [...prev, { description: "", dueDate: "", amount: 0 }]);

  const removeMilestone = (index: number) =>
    setMilestones((prev) => prev.filter((_, i) => i !== index));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        title,
        description,
        freelancerId: Number(freelancerId),
        paymentType,
        totalValue: paymentType === "fixed" ? totalValue : undefined,
        hourlyRate: paymentType === "hourly" ? hourlyRate : undefined,
        expectedHours: paymentType === "hourly" ? expectedHours : undefined,
        milestones: milestones.map((m, index) => ({ ...m, order: index })),
      };
      if (contract?.id) {
        await api.put(`/contracts/${contract.id}`, payload);
      } else {
        await api.post("/contracts", payload);
      }
      router.push("/contracts");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box as="form" onSubmit={handleSubmit} className={styles.form}>
      <VStack spacing={4} align="stretch">
        <FormControl isRequired>
          <FormLabel>Title</FormLabel>
          <Input value={title} onChange={(e) => setTitle(e.target.value)} />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Description</FormLabel>
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Freelancer ID</FormLabel>
          <NumberInput
            value={freelancerId}
            onChange={(valueString) => setFreelancerId(valueString)}
          >
            <NumberInputField />
          </NumberInput>
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Payment Type</FormLabel>
          <Select
            value={paymentType}
            onChange={(e) => setPaymentType(e.target.value)}
          >
            <option value="fixed">Fixed</option>
            <option value="hourly">Hourly</option>
          </Select>
        </FormControl>
        {paymentType === "fixed" ? (
          <FormControl>
            <FormLabel>Total Value</FormLabel>
            <NumberInput
              value={totalValue}
              onChange={(v) => setTotalValue(Number(v))}
            >
              <NumberInputField />
            </NumberInput>
          </FormControl>
        ) : (
          <HStack>
            <FormControl>
              <FormLabel>Hourly Rate</FormLabel>
              <NumberInput
                value={hourlyRate}
                onChange={(v) => setHourlyRate(Number(v))}
              >
                <NumberInputField />
              </NumberInput>
            </FormControl>
            <FormControl>
              <FormLabel>Expected Hours</FormLabel>
              <NumberInput
                value={expectedHours}
                onChange={(v) => setExpectedHours(Number(v))}
              >
                <NumberInputField />
              </NumberInput>
            </FormControl>
          </HStack>
        )}
        <Box>
          <FormLabel>Milestones</FormLabel>
          {milestones.map((m, idx) => (
            <Box key={idx} className={styles.milestone}>
              <HStack align="flex-start">
                <Input
                  placeholder="Description"
                  value={m.description}
                  onChange={(e) =>
                    handleMilestoneChange(idx, "description", e.target.value)
                  }
                />
                <Input
                  type="date"
                  value={m.dueDate}
                  onChange={(e) =>
                    handleMilestoneChange(idx, "dueDate", e.target.value)
                  }
                />
                <NumberInput
                  value={m.amount}
                  onChange={(v) =>
                    handleMilestoneChange(idx, "amount", v as string)
                  }
                >
                  <NumberInputField />
                </NumberInput>
                <Button
                  aria-label="Remove milestone"
                  onClick={() => removeMilestone(idx)}
                >
                  -
                </Button>
              </HStack>
            </Box>
          ))}
          <Button onClick={addMilestone} mt={2} variant="outline">
            Add Milestone
          </Button>
        </Box>
        <Button type="submit" colorScheme="brand" isLoading={loading}>
          {contract ? "Update Contract" : "Create Contract"}
        </Button>
      </VStack>
    </Box>
  );
}
