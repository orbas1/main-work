export interface SessionHost {
  id: number;
  name: string | null;
  image?: string | null;
}

export interface NetworkingSession {
  id: number;
  title: string;
  description?: string | null;
  industry?: string | null;
  topic?: string | null;
  date: string;
  duration: number;
  capacity: number;
  price: number;
  type: string;
  host: SessionHost;
  availableSeats: number;
}

export interface SessionRegistration {
  id: number;
  sessionId: number;
  participantId: number;
}
