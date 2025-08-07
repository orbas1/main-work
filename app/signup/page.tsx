"use client";

import { useState } from "react";
import { Box, Input, Stack, Heading, Button, Textarea, Progress } from "@chakra-ui/react";
import NextLink from "next/link";

export default function SignUpPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    location: "",
    bio: "",
    expertise: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const canProceed = form.name && form.email && form.password;

  return (
    <Box maxW="lg" mx="auto" mt={10} p={6} bg="white" shadow="md" borderRadius="lg">
      <Progress value={33} mb={6} />
      <Heading size="md" mb={6} textAlign="center">
        Step 1 of 3
      </Heading>
      <Stack spacing={4}>
        <Input placeholder="Full Name" name="name" value={form.name} onChange={handleChange} />
        <Input placeholder="Email Address" name="email" type="email" value={form.email} onChange={handleChange} />
        <Input placeholder="Phone Number" name="phone" value={form.phone} onChange={handleChange} />
        <Input placeholder="Password" name="password" type="password" value={form.password} onChange={handleChange} />
        <Input placeholder="Location" name="location" value={form.location} onChange={handleChange} />
        <Textarea placeholder="Professional Bio" name="bio" value={form.bio} onChange={handleChange} />
        <Input placeholder="Areas of Expertise (optional)" name="expertise" value={form.expertise} onChange={handleChange} />
        <Button as={NextLink} href="/signup/financial" colorScheme="brand" isDisabled={!canProceed}>
          Next
        </Button>
      </Stack>
    </Box>
  );
}
