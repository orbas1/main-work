"use client";

import { Button } from "@chakra-ui/react";
import { ReactNode } from "react";
import styles from "./SocialButton.module.css";

interface SocialButtonProps {
  icon: ReactNode;
  label: string;
  onClick: () => void;
}

export default function SocialButton({ icon, label, onClick }: SocialButtonProps) {
  return (
    <Button leftIcon={icon} variant="outline" onClick={onClick} className={styles.button}>
      {label}
    </Button>
  );
}
