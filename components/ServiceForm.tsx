"use client";

import { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  NumberInput,
  NumberInputField,
  VStack,
} from "@chakra-ui/react";
import styles from "./ServiceForm.module.css";

export interface ServiceFormData {
  title: string;
  description: string;
  price: number;
  category?: string;
  location?: string;
}

interface Props {
  initialData?: ServiceFormData;
  onSubmit: (data: ServiceFormData) => Promise<void>;
  submitLabel?: string;
}

export default function ServiceForm({
  initialData,
  onSubmit,
  submitLabel = "Submit",
}: Props) {
  const [data, setData] = useState<ServiceFormData>(
    initialData || {
      title: "",
      description: "",
      price: 0,
      category: "",
      location: "",
    }
  );
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePriceChange = (_: string, valueAsNumber: number) => {
    setData((prev) => ({ ...prev, price: valueAsNumber }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await onSubmit(data);
    setLoading(false);
  };

  return (
    <Box as="form" onSubmit={handleSubmit} className={styles.form}>
      <VStack spacing={4} align="stretch">
        <FormControl isRequired>
          <FormLabel>Title</FormLabel>
          <Input name="title" value={data.title} onChange={handleChange} />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Description</FormLabel>
          <Textarea
            name="description"
            value={data.description}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Price</FormLabel>
          <NumberInput
            value={data.price}
            onChange={handlePriceChange}
            min={0}
          >
            <NumberInputField name="price" />
          </NumberInput>
        </FormControl>
        <FormControl>
          <FormLabel>Category</FormLabel>
          <Input name="category" value={data.category} onChange={handleChange} />
        </FormControl>
        <FormControl>
          <FormLabel>Location</FormLabel>
          <Input name="location" value={data.location} onChange={handleChange} />
        </FormControl>
        <Button type="submit" colorScheme="brand" isLoading={loading}>
          {submitLabel}
        </Button>
      </VStack>
    </Box>
  );
}
