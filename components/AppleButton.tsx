"use client";

import { type ButtonHTMLAttributes, type ReactNode } from "react";
import styles from "./AppleButton.module.css";

interface AppleButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
}

export default function AppleButton({ children, className = "", ...props }: AppleButtonProps) {
  return (
    <button className={`${styles.button} ${className}`} {...props}>
      {children}
    </button>
  );
}
