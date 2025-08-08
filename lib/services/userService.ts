import prisma from "@/lib/prisma";

export async function getUserProfile(email: string) {
  return prisma.user.findUnique({
    where: { email },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      location: true,
      bio: true,
      title: true,
      image: true,
    },
  });
}

export interface UpdateProfileData {
  name?: string;
  phone?: string;
  location?: string;
  bio?: string;
  title?: string;
  image?: string;
}

export async function updateUserProfile(email: string, data: UpdateProfileData) {
  return prisma.user.update({
    where: { email },
    data,
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      location: true,
      bio: true,
      title: true,
      image: true,
    },
  });
}
