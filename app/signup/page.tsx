"use client";

import { useState } from "react";
import { Box, Input, Stack, Heading, Button, Textarea, Progress } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

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

  const router = useRouter();
  const canSubmit = form.name && form.email && form.password;

  const handleSubmit = async () => {
    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: form.name, email: form.email, password: form.password }),
    });
    if (res.ok) router.push("/login");
  };

  return (
    <Box maxW="lg" mx="auto" mt={10} p={6} bg="white" shadow="md" borderRadius="lg">
      <Progress value={100} mb={6} />
      <Heading size="md" mb={6} textAlign="center">
        Sign Up
      </Heading>
      <Stack spacing={4}>
        <Input placeholder="Full Name" name="name" value={form.name} onChange={handleChange} />
        <Input placeholder="Email Address" name="email" type="email" value={form.email} onChange={handleChange} />
        <Input placeholder="Phone Number" name="phone" value={form.phone} onChange={handleChange} />
        <Input placeholder="Password" name="password" type="password" value={form.password} onChange={handleChange} />
        <Input placeholder="Location" name="location" value={form.location} onChange={handleChange} />
        <Textarea placeholder="Professional Bio" name="bio" value={form.bio} onChange={handleChange} />
        <Input placeholder="Areas of Expertise (optional)" name="expertise" value={form.expertise} onChange={handleChange} />
        <Button onClick={handleSubmit} colorScheme="brand" isDisabled={!canSubmit}>
          Register
        </Button>
      </Stack>
    </Box>
  );
}
