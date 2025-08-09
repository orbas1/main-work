export interface Service {
  id: number;
  title: string;
  description: string;
  price: number;
  status: string;
  seller: {
    id: number;
    name: string | null;
    image?: string | null;
  };
  createdAt: string;
}

export interface ServiceOrder {
  id: number;
  service: Service;
  buyer: {
    id: number;
    name: string | null;
    image?: string | null;
  };
  status: string;
  scheduledFor?: string | null;
  createdAt: string;
}
