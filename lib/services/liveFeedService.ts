import api from "../api";

export interface LiveFeedPost {
  id: string;
  author: string;
  content: string;
  likes: number;
  category: string;
  createdAt: string;
}

export interface LiveEvent {
  id: string;
  title: string;
  status: string;
  startsAt: string;
}

export async function getPosts(category?: string): Promise<LiveFeedPost[]> {
  const query = category ? `?category=${encodeURIComponent(category)}` : "";
  return api.get<LiveFeedPost[]>(`/live-feed/posts${query}`);
}

export async function createPost(content: string, category: string): Promise<LiveFeedPost> {
  return api.post<LiveFeedPost>("/live-feed/posts", { content, category });
}

export async function likePost(postId: string): Promise<void> {
  await api.post(`/live-feed/posts/${postId}/likes`, {});
}

export async function getLiveEvents(): Promise<LiveEvent[]> {
  return api.get<LiveEvent[]>("/live-feed/updates");
}

