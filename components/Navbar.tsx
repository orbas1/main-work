"use client";

import {
  Flex,
  Box,
  Input,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  HStack,
  Image,
} from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const user = { name: "Demo User", image: "/next.svg" };
  const router = useRouter();
  const [term, setTerm] = useState("");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && term.trim()) {
      router.push(`/search?q=${encodeURIComponent(term.trim())}`);
    }
  };

  return (
    <Flex
      bg="white"
      px={6}
      py={3}
      shadow="sm"
      align="center"
      justify="space-between"
      position="sticky"
      top={0}
      zIndex={10}
    >
      <HStack spacing={4} align="center">
        <Image src="/next.svg" alt="Logo" boxSize="32px" />
        <Box className={styles.brand}>MyDashboard</Box>
      </HStack>
      <Input
        maxW="400px"
        placeholder="Search"
        borderRadius="full"
        bg="gray.100"
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <Menu>
        <MenuButton>
          <Avatar name={user.name} src={user.image} size="sm" />
        </MenuButton>
        <MenuList>
          <MenuItem as={Link} href="/profile">
            Profile
          </MenuItem>
          <MenuItem as={Link} href="/onboarding">
            Onboarding
          </MenuItem>
          <MenuItem as={Link} href="/profile/edit">
            Edit Profile
          </MenuItem>
          <MenuItem as={Link} href="/billing">
            Billing
          </MenuItem>
          <MenuItem as={Link} href="/services">
            Services
          </MenuItem>
          <MenuItem as={Link} href="/sessions">
            Sessions
          </MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  );
}
