"use client";

import { useState } from "react";
import { Box, Select, Text } from "@chakra-ui/react";
import styles from "./CoverLetterTemplates.module.css";

export interface TemplateOption {
  name: string;
  value: string;
}

const defaultTemplates: TemplateOption[] = [
  {
    name: "Technology",
    value:
      "Dear Hiring Manager,\n\nI am excited to apply for the technology role at your company. My experience in software development and problem-solving makes me a strong candidate.\n\nSincerely,\n[Your Name]",
  },
  {
    name: "Marketing",
    value:
      "Dear Marketing Team,\n\nWith a passion for crafting compelling campaigns and a track record of driving engagement, I would love to contribute to your marketing initiatives.\n\nBest regards,\n[Your Name]",
  },
  {
    name: "Finance",
    value:
      "Dear Finance Department,\n\nMy background in financial analysis and budgeting has prepared me to add value to your finance team. I am eager to bring my skills to your organization.\n\nThank you,\n[Your Name]",
  },
];

interface Props {
  templates?: TemplateOption[];
  value: string;
  onChange: (content: string) => void;
}

export default function CoverLetterTemplates({
  templates = defaultTemplates,
  value,
  onChange,
}: Props) {
  const [preview, setPreview] = useState(value);

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = templates.find((t) => t.name === e.target.value);
    const content = selected ? selected.value : "";
    setPreview(content);
    onChange(content);
  };

  return (
    <Box>
      <Select placeholder="Select Template" onChange={handleSelect} mb={3}>
        {templates.map((t) => (
          <option key={t.name} value={t.name}>
            {t.name}
          </option>
        ))}
      </Select>
      {preview && (
        <Box className={styles.preview}>
          <Text whiteSpace="pre-wrap" fontSize="sm">
            {preview}
          </Text>
        </Box>
      )}
    </Box>
  );
}

