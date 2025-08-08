"use client";

import { useEffect, useState } from "react";
import { Box, Button, ButtonGroup, Stack } from "@chakra-ui/react";
import api from "@/lib/api";
import GigCard from "@/components/GigCard";
import OrderCard from "@/components/OrderCard";
import { Gig, Order } from "@/lib/services/gigService";
import styles from "./page.module.css";

export default function GigsPage() {
  const [mode, setMode] = useState<"seller" | "buyer">("seller");
  const [gigs, setGigs] = useState<Gig[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    if (mode === "seller") {
      api.get<Gig[]>("/gigs?mode=seller").then(setGigs).catch(console.error);
    } else {
      api.get<Order[]>("/gigs?mode=buyer").then(setOrders).catch(console.error);
    }
  }, [mode]);

  const handleToggle = async (gig: Gig) => {
    try {
      await api.put(`/gigs/${gig.id}`, { active: !gig.active });
      const updated = await api.get<Gig[]>("/gigs?mode=seller");
      setGigs(updated);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box className={styles.container}>
      <ButtonGroup className={styles.toggle}>
        <Button
          colorScheme={mode === "seller" ? "brand" : "gray"}
          onClick={() => setMode("seller")}
        >
          Gig Seller
        </Button>
        <Button
          colorScheme={mode === "buyer" ? "brand" : "gray"}
          onClick={() => setMode("buyer")}
        >
          Gig Buyer
        </Button>
      </ButtonGroup>
      <Stack spacing={4}>
        {mode === "seller"
          ? gigs.map((g) => <GigCard key={g.id} gig={g} onToggle={handleToggle} />)
          : orders.map((o) => <OrderCard key={o.id} order={o} />)}
      </Stack>
    </Box>
  );
}
