
import { WeeklyPlan, TrainingSession, IntensityLevel } from "../types/training";
import { format, startOfWeek, addDays, parseISO, addWeeks, isSameDay } from "date-fns";

// Generate a unique ID
export const generateId = (): string => {
  return Math.random().toString(36).substring(2, 11);
};

// Create a new empty plan for a specific week
export const createEmptyPlan = (weekStartDate: Date): WeeklyPlan => {
  const startDate = startOfWeek(weekStartDate, { weekStartsOn: 1 }); // Week starts on Monday
  
  return {
    id: generateId(),
    weekStartDate: startDate.toISOString(),
    sessions: []
  };
};

// Format date to display
export const formatDate = (date: Date): string => {
  return format(date, "MMM d, yyyy");
};

// Format time for display
export const formatTime = (timeString: string): string => {
  return timeString.substring(0, 5); // Takes "HH:MM" from "HH:MM:SS"
};

// Create a new training session
export const createTrainingSession = (
  dayOfWeek: number,
  startTime: string = "17:00",
  endTime: string = "19:00",
  title: string = "Training Session",
  intensity: IntensityLevel = "medium"
): TrainingSession => {
  return {
    id: generateId(),
    dayOfWeek,
    startTime,
    endTime,
    title,
    description: "",
    intensity,
    focus: [],
    notes: ""
  };
};

// Get sessions for a specific day
export const getSessionsForDay = (plan: WeeklyPlan, dayOfWeek: number): TrainingSession[] => {
  return plan.sessions.filter(session => session.dayOfWeek === dayOfWeek)
    .sort((a, b) => a.startTime.localeCompare(b.startTime));
};

// Get day name
export const getDayName = (dayOfWeek: number): string => {
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  return days[dayOfWeek];
};

// Get date for a specific day in the week
export const getDateForDay = (weekStartDate: string, dayOfWeek: number): Date => {
  return addDays(parseISO(weekStartDate), dayOfWeek);
};

// Copy plan from a previous week
export const copyPlanFromPrevious = (
  currentPlan: WeeklyPlan,
  previousPlan: WeeklyPlan
): WeeklyPlan => {
  return {
    ...currentPlan,
    sessions: previousPlan.sessions.map(session => ({
      ...session,
      id: generateId() // Generate new IDs for copied sessions
    }))
  };
};

// Navigate to previous week
export const getPreviousWeekDate = (currentWeekStart: string): Date => {
  return addWeeks(parseISO(currentWeekStart), -1);
};

// Navigate to next week
export const getNextWeekDate = (currentWeekStart: string): Date => {
  return addWeeks(parseISO(currentWeekStart), 1);
};

// Check if a date is today
export const isToday = (date: Date): boolean => {
  return isSameDay(date, new Date());
};
