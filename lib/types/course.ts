export interface Course {
  id: number;
  title: string;
  progress: number;
  nextSession?: string | null;
  recommendation?: string | null;
}

export interface TeacherCourse {
  id: number;
  title: string;
  studentCount: number;
  avgProgress: number;
  nextSession?: string | null;
  recommendation?: string | null;
}
