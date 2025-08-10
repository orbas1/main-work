import { NetworkingSession, SessionParticipant } from "@/lib/types/session";

export const networkingSessions: NetworkingSession[] = [
  {
    id: 1,
    title: "Tech Innovators Meetup",
    description: "Connect with innovators across the tech industry.",
    industry: "Technology",
    topic: "Innovation",
    date: new Date().toISOString(),
    duration: 60,
    capacity: 50,
    price: 0,
    type: "networking",
    host: { id: 1, name: "Alice Johnson", image: "/next.svg" },
    availableSeats: 35,
  },
  {
    id: 2,
    title: "Marketing Roundtable",
    description: "Discuss the latest marketing trends and strategies.",
    industry: "Marketing",
    topic: "Growth",
    date: new Date(Date.now() + 86400000).toISOString(),
    duration: 45,
    capacity: 40,
    price: 15,
    type: "networking",
    host: { id: 2, name: "Brian Smith", image: "/next.svg" },
    availableSeats: 12,
  },
  {
    id: 3,
    title: "Designers Collaboration Session",
    description: "Share and critique design ideas with peers.",
    industry: "Design",
    topic: "UI/UX",
    date: new Date(Date.now() + 2 * 86400000).toISOString(),
    duration: 30,
    capacity: 30,
    price: 0,
    type: "networking",
    host: { id: 3, name: "Cleo Lee", image: "/next.svg" },
    availableSeats: 5,
  },
];

export const sessionParticipants: SessionParticipant[] = [
  {
    id: 1,
    user: {
      id: 1,
      name: "Alice Johnson",
      image: "/next.svg",
      title: "Engineer",
    },
  },
  {
    id: 2,
    user: {
      id: 2,
      name: "Brian Smith",
      image: "/next.svg",
      title: "Marketer",
    },
  },
  {
    id: 3,
    user: {
      id: 3,
      name: "Cleo Lee",
      image: "/next.svg",
      title: "Designer",
    },
  },
];

