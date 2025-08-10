"use client";
import { useState, useEffect, FormEvent } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Stack,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import styles from "./page.module.css";

interface ProfileForm {
  name: string;
  phone: string;
  location: string;
  bio: string;
  title: string;
}

export default function EditProfilePage() {
  const router = useRouter();
  const [form, setForm] = useState<ProfileForm>({
    name: "",
    phone: "",
    location: "",
    bio: "",
    title: "",
  });

  useEffect(() => {
    api.get<ProfileForm>("/profile").then((data) => setForm(data));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await api.put("/profile", form);
    router.push("/profile");
  };

  return (
    <Box className={styles.container}>
      <form onSubmit={handleSubmit}>
        <Stack spacing={4}>
          <FormControl>
            <FormLabel>Name</FormLabel>
            <Input name="name" value={form.name} onChange={handleChange} />
          </FormControl>
          <FormControl>
            <FormLabel>Title</FormLabel>
            <Input name="title" value={form.title} onChange={handleChange} />
          </FormControl>
          <FormControl>
            <FormLabel>Phone</FormLabel>
            <Input name="phone" value={form.phone} onChange={handleChange} />
          </FormControl>
          <FormControl>
            <FormLabel>Location</FormLabel>
            <Input name="location" value={form.location} onChange={handleChange} />
          </FormControl>
          <FormControl>
            <FormLabel>Bio</FormLabel>
            <Textarea name="bio" value={form.bio} onChange={handleChange} />
          </FormControl>
          <Button type="submit" colorScheme="brand">
            Save Changes
          </Button>
        </Stack>
      </form>
    </Box>
  );
}
