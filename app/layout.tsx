import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Orbas | AI-Powered Talent Platform",
  description:
    "Orbas connects job seekers, freelancers, and businesses on one intelligent career marketplace.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Providers>
          <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
            <Navbar />
            <div style={{ display: "flex", flex: 1 }}>
              <Sidebar />
              <main style={{ flex: 1 }}>{children}</main>
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
