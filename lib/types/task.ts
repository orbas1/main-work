export interface Task {
  id: number;
  title: string;
  description: string;
  category?: string | null;
  skills: string[];
  budgetMin?: number | null;
  budgetMax?: number | null;
  paymentMethod?: string | null;
  deadline?: string | null;
  media: string[];
  visibility: string;
  creatorId: number;
  status: string;
  createdAt: string;
}

export interface TaskBid {
  id: number;
  taskId: number;
  bidderId: number;
  amount: number;
  message?: string | null;
  timeline?: string | null;
  status: string;
  createdAt: string;
  instructions?: string;
  payment: number;
  deadline: string;
  status: string;
  reschedulable: boolean;
  rating?: number;
  completedAt?: string;
}
