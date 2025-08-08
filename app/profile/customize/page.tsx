"use client";

import { useState, useEffect } from "react";
import {
  Box,
  Stack,
  FormControl,
  FormLabel,
  Switch,
  Input,
  Button,
  Image,
  Heading,
  Text,
} from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import styles from "./page.module.css";

interface CustomizationForm {
  showPortfolio: boolean;
  showReviews: boolean;
  showActivityFeed: boolean;
  themeColor: string;
  bannerUrl: string;
}

export default function CustomizeProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [form, setForm] = useState<CustomizationForm>({
    showPortfolio: true,
    showReviews: true,
    showActivityFeed: true,
    themeColor: "#3182ce",
    bannerUrl: "",
  });

  useEffect(() => {
    if (status === "unauthenticated") router.push("/login");
    if (status === "authenticated") {
      api.get<CustomizationForm>("/profile").then((data) =>
        setForm((prev) => ({
          ...prev,
          showPortfolio: data.showPortfolio ?? true,
          showReviews: data.showReviews ?? true,
          showActivityFeed: data.showActivityFeed ?? true,
          themeColor: data.themeColor || "#3182ce",
          bannerUrl: data.bannerUrl || "",
        }))
      );
    }
  }, [status, router]);

  const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: checked }));
  };

  const handleColor = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, themeColor: e.target.value }));
  };

  const handleBanner = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (ev) =>
        setForm((prev) => ({ ...prev, bannerUrl: ev.target?.result as string }));
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    await api.put("/profile", form);
    router.push("/profile");
  };

  return (
    <Box className={styles.container}>
      <Stack spacing={6}>
        <Stack spacing={4}>
          <FormControl display="flex" alignItems="center">
            <FormLabel htmlFor="showPortfolio" mb="0">
              Show Portfolio
            </FormLabel>
            <Switch
              id="showPortfolio"
              name="showPortfolio"
              isChecked={form.showPortfolio}
              onChange={handleToggle}
            />
          </FormControl>
          <FormControl display="flex" alignItems="center">
            <FormLabel htmlFor="showReviews" mb="0">
              Show Reviews
            </FormLabel>
            <Switch
              id="showReviews"
              name="showReviews"
              isChecked={form.showReviews}
              onChange={handleToggle}
            />
          </FormControl>
          <FormControl display="flex" alignItems="center">
            <FormLabel htmlFor="showActivityFeed" mb="0">
              Show Activity Feed
            </FormLabel>
            <Switch
              id="showActivityFeed"
              name="showActivityFeed"
              isChecked={form.showActivityFeed}
              onChange={handleToggle}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="themeColor">Theme Color</FormLabel>
            <Input
              id="themeColor"
              type="color"
              value={form.themeColor}
              onChange={handleColor}
              maxW="120px"
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="banner">Profile Banner</FormLabel>
            <Input id="banner" type="file" accept="image/*" onChange={handleBanner} />
          </FormControl>
          <Button colorScheme="brand" onClick={handleSubmit}>
            Save Changes
          </Button>
        </Stack>
        <Box className={styles.preview} bg="white">
          {form.bannerUrl && (
            <Image src={form.bannerUrl} alt="Banner" w="100%" h="200px" objectFit="cover" />
          )}
          <Box p={4}>
            <Heading size="md" color={form.themeColor}>
              {session?.user?.name || "Your Name"}
            </Heading>
            {form.showPortfolio && <Text mt={2}>Portfolio section preview...</Text>}
            {form.showReviews && <Text mt={2}>Reviews section preview...</Text>}
            {form.showActivityFeed && <Text mt={2}>Activity feed preview...</Text>}
          </Box>
        </Box>
      </Stack>
    </Box>
  );
}

