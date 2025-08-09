export interface Opportunity {
  id: number;
  title: string;
  description: string;
  category?: string;
  location?: string;
  skills?: string;
  compensation?: number;
  status: string;
  providerId: number;
  provider?: { id: number; name: string; image?: string };
  applicationStatus?: string;
}
