import prisma from "@/lib/prisma";

interface SearchFilters {
  q?: string;
  location?: string;
  expertise?: string;
}

export async function searchJobSeekers(filters: SearchFilters) {
  const { q, location, expertise } = filters;
  return prisma.user.findMany({
    where: {
      AND: [
        q
          ? {
              OR: [
                { name: { contains: q, mode: "insensitive" } },
                { email: { contains: q, mode: "insensitive" } },
                { bio: { contains: q, mode: "insensitive" } },
              ],
            }
          : {},
        location ? { location: { equals: location, mode: "insensitive" } } : {},
        expertise ? { expertise: { contains: expertise, mode: "insensitive" } } : {},
      ],
    },
    select: {
      id: true,
      name: true,
      email: true,
      location: true,
      expertise: true,
      image: true,
    },
    take: 50,
  });
}

export async function getRecommendations() {
  // Simple recommendation logic: return recently created users
  return prisma.user.findMany({
    orderBy: { id: "desc" },
    select: {
      id: true,
      name: true,
      email: true,
      location: true,
      expertise: true,
      image: true,
    },
    take: 5,
  });
}
