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
  Button,
} from "@chakra-ui/react";
import Link from "next/link";
import { signOut, useSession, signIn } from "next-auth/react";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const { data: session } = useSession();

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
      <Input maxW="400px" placeholder="Search" borderRadius="full" bg="gray.100" />
      {session ? (
        <Menu>
          <MenuButton>
            <Avatar name={session.user?.name || "User"} src={session.user?.image || undefined} size="sm" />
          </MenuButton>
          <MenuList>
            <MenuItem as={Link} href="/profile">
              Profile
            </MenuItem>
            <MenuItem onClick={() => signOut()}>Logout</MenuItem>
          </MenuList>
        </Menu>
      ) : (
        <Button colorScheme="brand" onClick={() => signIn()}>
          Login
        </Button>
      )}
    </Flex>
  );
}
