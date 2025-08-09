"use client";

import { Stat, StatLabel, StatNumber } from "@chakra-ui/react";
import styles from "./StatWidget.module.css";

interface Props {
  label: string;
  value: number | string;
}

export default function StatWidget({ label, value }: Props) {
  return (
    <Stat className={styles.stat}>
      <StatLabel>{label}</StatLabel>
      <StatNumber>{value}</StatNumber>
    </Stat>
  );
}
