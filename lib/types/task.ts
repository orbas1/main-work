export interface Task {
  id: number;
  title: string;
  description: string;
  budget: number;
  status: string;
  creatorId: number;
  assigneeId?: number | null;
}
