import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { Flex, Box } from "@chakra-ui/react";
import { authOptions } from "@/lib/auth";
import ChatWidget from "@/components/ChatWidget";

export const metadata: Metadata = {
  title: "Dashboard - Orbas",
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  return (
    <>
      <Navbar />
      <Flex>
        <Sidebar />
        <Box flex="1" p={4} bg="gray.50">
          {children}
        </Box>
      </Flex>
      <ChatWidget />
    </>
  );
}
