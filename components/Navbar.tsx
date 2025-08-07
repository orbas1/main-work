"use client";

import { Flex, Box, Input, Avatar, Menu, MenuButton, MenuList, MenuItem, HStack, Image } from "@chakra-ui/react";
import Link from "next/link";
import { signOut } from "next-auth/react";

export default function Navbar() {
  return (
    <Flex bg="white" px={6} py={3} shadow="sm" align="center" justify="space-between" position="sticky" top={0} zIndex={10}>
      <HStack spacing={4} align="center">
        <Image src="/next.svg" alt="Logo" boxSize="32px" />
        <Box fontWeight="bold">MyDashboard</Box>
      </HStack>
      <Input maxW="400px" placeholder="Search" borderRadius="full" bg="gray.100" />
      <Menu>
        <MenuButton>
          <Avatar name="Placeholder" size="sm" />
        </MenuButton>
        <MenuList>
          <MenuItem as={Link} href="/profile">Profile</MenuItem>
          <MenuItem onClick={() => signOut()}>Logout</MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  );
}
