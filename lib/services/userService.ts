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
      expertise: true,
      payment: true,
      taxId: true,
      portfolio: true,
      title: true,
      image: true,
      introVideo: true,
      resume: true,
      coverLetter: true,
      showPortfolio: true,
      showReviews: true,
      showActivityFeed: true,
      themeColor: true,
      bannerUrl: true,
    },
  });
}

export interface UpdateProfileData {
  name?: string;
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
  showPortfolio?: boolean;
  showReviews?: boolean;
  showActivityFeed?: boolean;
  themeColor?: string;
  bannerUrl?: string;
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
      expertise: true,
      payment: true,
      taxId: true,
      portfolio: true,
      title: true,
      image: true,
      introVideo: true,
      resume: true,
      coverLetter: true,
      showPortfolio: true,
      showReviews: true,
      showActivityFeed: true,
      themeColor: true,
      bannerUrl: true,
    },
  });
}
