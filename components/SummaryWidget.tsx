"use client";

import { Box, Stat, StatLabel, StatNumber } from "@chakra-ui/react";
import styles from "./SummaryWidget.module.css";

export default function SummaryWidget({ label, value }: { label: string; value: number }) {
  return (
    <Box className={styles.widget} p={4} bg="white" borderRadius="md" boxShadow="sm">
      <Stat>
        <StatLabel>{label}</StatLabel>
        <StatNumber>{value}</StatNumber>
      </Stat>
    </Box>
  );
}
