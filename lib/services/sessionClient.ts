import api from "@/lib/api";
import { NetworkingSession, SessionRegistration } from "@/lib/types/session";

export async function fetchSessions(query: Record<string, string | number | undefined> = {}) {
  const params = new URLSearchParams();
  Object.entries(query).forEach(([k, v]) => {
    if (v !== undefined && v !== null && v !== "") params.append(k, String(v));
  });
  return api.get<NetworkingSession[]>(`/sessions?${params.toString()}`);
}

export async function fetchSession(id: number) {
  return api.get<NetworkingSession>(`/sessions/${id}`);
}

export async function registerSession(id: number): Promise<SessionRegistration> {
  return api.post<SessionRegistration>(`/sessions/${id}/register`, {});
}
