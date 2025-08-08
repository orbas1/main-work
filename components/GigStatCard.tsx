"use client";

import { Stat, StatNumber } from "@chakra-ui/react";
import DashboardCard from "./DashboardCard";
import styles from "./GigStatCard.module.css";

interface Props {
  label: string;
  value: number | string;
}

export default function GigStatCard({ label, value }: Props) {
  return (
    <DashboardCard title={label}>
      <Stat className={styles.stat}>
        <StatNumber>{value}</StatNumber>
      </Stat>
    </DashboardCard>
  );
}
