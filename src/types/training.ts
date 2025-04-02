
export type IntensityLevel = 'low' | 'medium' | 'high';

export interface TrainingSession {
  id: string;
  dayOfWeek: number; // 0-6 (Sunday-Saturday)
  startTime: string;
  endTime: string;
  title: string;
  description: string;
  intensity: IntensityLevel;
  focus: string[];
  notes?: string;
}

export interface WeeklyPlan {
  id: string;
  weekStartDate: string; // ISO string for the start of the week
  sessions: TrainingSession[];
}
