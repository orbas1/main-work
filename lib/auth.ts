import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import LinkedInProvider from "next-auth/providers/linkedin";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "./prisma";
import { compare } from "bcryptjs";

const bypassAuth = process.env.AUTH_BYPASS === "true";
const providers: NextAuthOptions["providers"] = [
  CredentialsProvider({
    name: "Credentials",
    credentials: {
      email: { label: "Email", type: "email" },
      password: { label: "Password", type: "password" },
    },
    async authorize(credentials) {
      if (bypassAuth) {
        return {
          id: "1",
          email: credentials?.email ?? "dev@example.com",
          name: "Dev User",
        };
      }
      if (!credentials?.email || !credentials.password) {
        return null;
      }
      const user = await prisma.user.findUnique({
        where: { email: credentials.email },
      });
      if (!user) return null;
      const isValid = await compare(credentials.password, user.password);
      if (!isValid) return null;
      return {
        id: String(user.id),
        email: user.email,
        name: user.name ?? undefined,
      };
    },
  }),
];

if (!bypassAuth) {
  if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
    providers.push(
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      })
    );
  }

  if (process.env.LINKEDIN_CLIENT_ID && process.env.LINKEDIN_CLIENT_SECRET) {
    providers.push(
      LinkedInProvider({
        clientId: process.env.LINKEDIN_CLIENT_ID,
        clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
      })
    );
  }
}

export const authOptions: NextAuthOptions = {
  adapter: bypassAuth ? undefined : PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  providers,
  callbacks: {
    async session({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
};
