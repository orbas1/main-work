"use client";

import { ChakraProvider } from "@chakra-ui/react";
import { SessionProvider } from "next-auth/react";
import theme from "../theme";
import { NotificationProvider } from "@/components/NotificationContext";

export function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <ChakraProvider theme={theme}>
        <NotificationProvider>{children}</NotificationProvider>
      </ChakraProvider>
    </SessionProvider>
  );
}
