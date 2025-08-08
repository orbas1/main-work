"use client";

import { ChakraProvider } from "@chakra-ui/react";
import { SessionProvider } from "next-auth/react";
import theme from "../theme";
import { FavoritesProvider } from "@/components/FavoritesContext";

export function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <ChakraProvider theme={theme}>
        <FavoritesProvider>{children}</FavoritesProvider>
      </ChakraProvider>
    </SessionProvider>
  );
}
