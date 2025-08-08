"use client";

import { useRouter } from "next/navigation";
import { Box, useToast } from "@chakra-ui/react";
import api from "@/lib/api";
import ServiceForm, { ServiceFormData } from "@/components/ServiceForm";
import styles from "./page.module.css";

interface Service { id: number }

export default function CreateServicePage() {
  const router = useRouter();
  const toast = useToast();

  const handleSubmit = async (data: ServiceFormData) => {
    try {
      const service = await api.post<Service>(`/services`, data);
      toast({ status: "success", description: "Service created" });
      router.push(`/services/${service.id}`);
    } catch (e: any) {
      toast({ status: "error", description: e.message });
    }
  };

  return (
    <Box className={styles.container}>
      <ServiceForm onSubmit={handleSubmit} submitLabel="Create" />
    </Box>
  );
}
