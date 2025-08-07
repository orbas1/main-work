import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function getUserByEmail(email: string) {
  return prisma.user.findUnique({ where: { email } });
}

export async function registerUser(data: { name?: string; email: string; password: string }) {
  const existing = await getUserByEmail(data.email);
  if (existing) throw new Error("Email already in use");
  const hashedPassword = await bcrypt.hash(data.password, 10);
  return prisma.user.create({
    data: { name: data.name, email: data.email, password: hashedPassword },
  });
}

export async function validateUser(email: string, password: string) {
  const user = await getUserByEmail(email);
  if (!user) return null;
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return null;
  return { id: String(user.id), email: user.email, name: user.name };
}
