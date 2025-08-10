'use client';

import { Box } from "@chakra-ui/react";
import ServiceDetail from "@/components/ServiceDetail";
import { Service } from "@/lib/types/service";
import { use } from "react";

export default function ServiceDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const service: Service = {
    id: Number(id),
    title: "Sample Service",
    description: "Detailed description coming soon.",
    price: 100,
    status: "active",
    seller: { id: 1, name: "Alice Johnson", image: "/next.svg" },
    createdAt: new Date().toISOString(),
  };

  return (
    <Box p={4}>
      <ServiceDetail service={service} />
    </Box>
  );
}

