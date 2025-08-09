import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function getUserByEmail(email: string) {
  return prisma.user.findUnique({ where: { email } });
}

export async function registerUser(data: {
  name?: string;
  email: string;
  password: string;
  phone?: string;
  location?: string;
  bio?: string;
  expertise?: string;
  payment?: string;
  taxId?: string;
  portfolio?: string;
  title?: string;
  image?: string;
  introVideo?: string;
  resume?: string;
  coverLetter?: string;
}) {
  const existing = await getUserByEmail(data.email);
  if (existing) throw new Error("Email already in use");
  const hashedPassword = await bcrypt.hash(data.password, 10);
  return prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      password: hashedPassword,
      phone: data.phone,
      location: data.location,
      bio: data.bio,
      expertise: data.expertise,
      payment: data.payment,
      taxId: data.taxId,
      portfolio: data.portfolio,
      title: data.title,
      image: data.image,
      introVideo: data.introVideo,
      resume: data.resume,
      coverLetter: data.coverLetter,
    },
  });
}

export async function validateUser(email: string, password: string) {
  const user = await getUserByEmail(email);
  if (!user) return null;
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return null;
  return { id: String(user.id), email: user.email, name: user.name };
}
