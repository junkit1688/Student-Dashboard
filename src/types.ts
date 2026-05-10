import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type Priority = 'low' | 'medium' | 'high';

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  priority: Priority;
  category: string;
  dueDate: string;
}

export interface StudySession {
  id: string;
  date: string;
  duration: number; // in minutes
  category: string;
}

export interface DashboardStats {
  totalTasks: number;
  completedTasks: number;
  studyTimeToday: number;
  focusScore: number;
}
