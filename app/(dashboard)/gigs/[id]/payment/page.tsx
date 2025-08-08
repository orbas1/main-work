"use client";

import { useEffect, useState } from "react";
import { Box, Spinner, Flex, Text, useToast } from "@chakra-ui/react";
import PaymentForm from "@/components/PaymentForm";
import OrderSummary from "@/components/OrderSummary";
import api from "@/lib/api";
import styles from "./page.module.css";

interface GigDetail {
  id: number;
  title: string;
  price: number;
}

export default function GigPaymentPage({ params }: { params: { id: string } }) {
  const [gig, setGig] = useState<GigDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  useEffect(() => {
    const load = async () => {
      try {
        const data = await api.get<GigDetail>(`/gigs/${params.id}`);
        setGig(data);
      } catch {
        toast({ status: "error", description: "Unable to load gig." });
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [params.id, toast]);

  if (loading) return <Spinner />;
  if (!gig) return <Text>Gig not found.</Text>;

  return (
    <Flex className={styles.container} direction={{ base: "column", md: "row" }} gap={8}>
      <Box flex="1">
        <PaymentForm gigId={gig.id} onSuccess={() => {}} />
      </Box>
      <Box flex="1">
        <OrderSummary title={gig.title} price={gig.price} />
      </Box>
    </Flex>
  );
}
