"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Box, useToast } from "@chakra-ui/react";
import api from "@/lib/api";
import ServiceForm, { ServiceFormData } from "@/components/ServiceForm";
import styles from "./page.module.css";

export default function EditServicePage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const toast = useToast();
  const [initial, setInitial] = useState<ServiceFormData | null>(null);

  useEffect(() => {
    api
      .get<ServiceFormData>(`/services/${params.id}`)
      .then(setInitial)
      .catch(() => toast({ status: "error", description: "Failed to load" }));
  }, [params.id, toast]);

  const handleSubmit = async (data: ServiceFormData) => {
    try {
      await api.put(`/services/${params.id}`, data);
      toast({ status: "success", description: "Service updated" });
      router.push(`/services/${params.id}`);
    } catch (e: any) {
      toast({ status: "error", description: e.message });
    }
  };

  if (!initial) return null;

  return (
    <Box className={styles.container}>
      <ServiceForm initialData={initial} onSubmit={handleSubmit} submitLabel="Update" />
    </Box>
  );
}
