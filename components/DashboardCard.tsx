"use client";

import { Card, CardHeader, CardBody, Heading } from "@chakra-ui/react";
import { ReactNode } from "react";
import styles from "./DashboardCard.module.css";

interface Props {
  title: string;
  children: ReactNode;
}

export default function DashboardCard({ title, children }: Props) {
  return (
    <Card bg="white" shadow="md" borderRadius="xl" className={styles.card}>
      <CardHeader>
        <Heading size="sm" color="brand.500">
          {title}
        </Heading>
      </CardHeader>
      <CardBody>{children}</CardBody>
    </Card>
  );
}
