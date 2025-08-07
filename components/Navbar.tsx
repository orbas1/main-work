'use client';

import { Flex, Heading, HStack, Link, IconButton } from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';

export default function Navbar() {
  return (
    <Flex
      as="nav"
      bg="white"
      px={6}
      py={4}
      boxShadow="sm"
      align="center"
      justify="space-between"
      borderBottom="1px solid"
      borderColor="gray.200"
    >
      <Heading size="md" color="brand.500">
        Neon Dashboard
      </Heading>
      <HStack spacing={4} display={{ base: 'none', md: 'flex' }}>
        <Link href="#" fontWeight="medium">
          Home
        </Link>
        <Link href="#" fontWeight="medium">
          Projects
        </Link>
        <Link href="#" fontWeight="medium">
          Users
        </Link>
      </HStack>
      <IconButton
        aria-label="Open menu"
        icon={<HamburgerIcon />}
        variant="ghost"
        display={{ base: 'flex', md: 'none' }}
      />
    </Flex>
  );
}

