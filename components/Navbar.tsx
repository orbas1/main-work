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
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import type { IconType } from "react-icons";
import {
  FiUser,
  FiCompass,
  FiEdit,
  FiCreditCard,
  FiShoppingBag,
  FiCalendar,
} from "react-icons/fi";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const user = { name: "Demo User", image: "/next.svg" };
  const router = useRouter();
  const pathname = usePathname();
  const [term, setTerm] = useState("");

  const menuItems: { label: string; href: string; icon: IconType }[] = [
    { label: "Profile", href: "/profile", icon: FiUser },
    { label: "Onboarding", href: "/onboarding", icon: FiCompass },
    { label: "Edit Profile", href: "/profile/edit", icon: FiEdit },
    { label: "Billing", href: "/billing", icon: FiCreditCard },
    { label: "Services", href: "/services", icon: FiShoppingBag },
    { label: "Sessions", href: "/sessions", icon: FiCalendar },
  ];

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
        <MenuList className={styles.menuList} py={2} shadow="md">
          {menuItems.map(({ label, href, icon: Icon }) => (
            <MenuItem
              key={href}
              className={styles.menuItem}
              as={Link}
              href={href}
              icon={<Icon />}
              bg={pathname === href ? "gray.100" : undefined}
              fontWeight={pathname === href ? "600" : "normal"}
            >
              {label}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </Flex>
  );
}
