import type { Metadata } from "next";
import "./globals.css";
import ThemeToggle from "@/components/ThemeToggle";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "Orbas | AI-Powered Talent Platform",
  description:
    "Orbas connects job seekers, freelancers, and businesses on one intelligent career marketplace.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <div style={{ position: "fixed", top: 16, right: 16 }}>
            <ThemeToggle />
          </div>
          {children}
        </Providers>
      </body>
    </html>
  );
}
