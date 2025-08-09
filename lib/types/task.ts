export interface Task {
  id: number;
  title: string;
  instructions?: string;
  payment: number;
  deadline: string;
  status: string;
  reschedulable: boolean;
  rating?: number;
  completedAt?: string;
}
