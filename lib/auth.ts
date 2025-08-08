import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/lib/prisma";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import LinkedIn from "next-auth/providers/linkedin";
import Facebook from "next-auth/providers/facebook";
import Apple from "next-auth/providers/apple";
import type { NextAuthOptions } from "next-auth";
import { validateUser } from "./services/authService";

const providers: NextAuthOptions["providers"] = [
  Credentials({
    credentials: {
      email: { label: "Email", type: "email" },
      password: { label: "Password", type: "password" },
      code: { label: "2FA Code", type: "text" },
    },
    async authorize(credentials) {
      if (!credentials?.email || !credentials.password) return null;
      try {
        return await validateUser(
          credentials.email,
          credentials.password,
          credentials.code as string | undefined
        );
      } catch (err: any) {
        throw new Error(err.message);
      }
    },
  }),
];

if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  providers.push(
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  );
}

if (process.env.LINKEDIN_CLIENT_ID && process.env.LINKEDIN_CLIENT_SECRET) {
  providers.push(
    LinkedIn({
      clientId: process.env.LINKEDIN_CLIENT_ID,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
    }),
  );
}

if (process.env.FACEBOOK_CLIENT_ID && process.env.FACEBOOK_CLIENT_SECRET) {
  providers.push(
    Facebook({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    }),
  );
}

if (process.env.APPLE_CLIENT_ID && process.env.APPLE_CLIENT_SECRET) {
  providers.push(
    Apple({
      clientId: process.env.APPLE_CLIENT_ID,
      clientSecret: process.env.APPLE_CLIENT_SECRET,
    }),
  );
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers,
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
  callbacks: {
    session({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
};
