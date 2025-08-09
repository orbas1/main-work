"use client";

import { Button, ButtonGroup } from "@chakra-ui/react";
import styles from "./RoleSwitcher.module.css";

export type Role = "client" | "freelancer";

interface Props {
  role: Role;
  onChange: (role: Role) => void;
}

export default function RoleSwitcher({ role, onChange }: Props) {
  return (
    <ButtonGroup isAttached variant="outline" colorScheme="brand" className={styles.group}>
      <Button onClick={() => onChange("client")} isActive={role === "client"}>
        Client
      </Button>
      <Button onClick={() => onChange("freelancer")} isActive={role === "freelancer"}>
        Freelancer
      </Button>
    </ButtonGroup>
  );
}

