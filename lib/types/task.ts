export interface Task {
  id: number;
  title: string;
  description: string;
}

export interface TaskBid {
  id: number;
  taskId: number;
  bidderId: number;
  amount: number;
}
