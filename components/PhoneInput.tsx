"use client";

import { HStack, Select, Input } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import styles from "./PhoneInput.module.css";

interface PhoneInputProps {
  value: string;
  onChange: (value: string) => void;
}

const countryCodes = [
  { code: "+1", label: "US" },
  { code: "+44", label: "UK" },
  { code: "+91", label: "IN" },
  { code: "+61", label: "AU" },
  { code: "+81", label: "JP" },
];

function formatLocalNumber(digits: string) {
  const clean = digits.replace(/\D/g, "");
  if (clean.length <= 3) return clean;
  if (clean.length <= 6) return `${clean.slice(0, 3)}-${clean.slice(3)}`;
  return `${clean.slice(0, 3)}-${clean.slice(3, 6)}-${clean.slice(6, 10)}`;
}

export default function PhoneInput({ value, onChange }: PhoneInputProps) {
  const [code, setCode] = useState("+1");
  const [digits, setDigits] = useState("");

  useEffect(() => {
    const match = value.match(/^(\+\d{1,3})(\d*)$/);
    if (match) {
      setCode(match[1]);
      setDigits(match[2]);
    }
  }, [value]);

  const handleCodeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCode = e.target.value;
    setCode(newCode);
    onChange(`${newCode}${digits}`);
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, "");
    setDigits(raw);
    onChange(`${code}${raw}`);
  };

  return (
    <HStack className={styles.container}>
      <Select value={code} onChange={handleCodeChange} maxW="90px">
        {countryCodes.map((c) => (
          <option key={c.code} value={c.code}>
            {c.label} {c.code}
          </option>
        ))}
      </Select>
      <Input
        placeholder="Phone Number"
        value={formatLocalNumber(digits)}
        onChange={handleNumberChange}
      />
    </HStack>
  );
}

