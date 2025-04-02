
import { useState } from "react";
import { WeeklyPlan, TrainingSession } from "../types/training";
import { 
  createEmptyPlan, 
  generateId, 
  getPreviousWeekDate, 
  getNextWeekDate 
} from "../utils/planUtils";
import { startOfWeek } from "date-fns";

// Initial data with a couple of examples
const initialData: WeeklyPlan[] = [
  {
    id: "initial-plan",
    weekStartDate: startOfWeek(new Date(), { weekStartsOn: 1 }).toISOString(),
    sessions: [
      {
        id: "session-1",
        dayOfWeek: 0, // Monday
        startTime: "17:00",
        endTime: "19:00",
        title: "Footwork Training",
        description: "Focus on movement patterns and court coverage",
        intensity: "medium",
        focus: ["Footwork", "Endurance"],
        notes: "Pay attention to proper technique"
      },
      {
        id: "session-2",
        dayOfWeek: 2, // Wednesday
        startTime: "18:00",
        endTime: "20:00",
        title: "Smash Practice",
        description: "Developing power and accuracy in smash shots",
        intensity: "high",
        focus: ["Attack", "Power"],
        notes: "Rotate players every 10 minutes"
      },
      {
        id: "session-3",
        dayOfWeek: 4, // Friday
        startTime: "16:30",
        endTime: "18:30",
        title: "Match Practice",
        description: "Simulated match scenarios",
        intensity: "high",
        focus: ["Strategy", "Game Situations"],
        notes: "Focus on applying techniques from week's training"
      }
    ]
  }
];

export const usePlanStore = () => {
  const [plans, setPlans] = useState<WeeklyPlan[]>(initialData);
  const [currentWeekStartDate, setCurrentWeekStartDate] = useState<string>(
    startOfWeek(new Date(), { weekStartsOn: 1 }).toISOString()
  );

  // Find the current plan
  const getCurrentPlan = (): WeeklyPlan => {
    const existingPlan = plans.find(plan => plan.weekStartDate === currentWeekStartDate);
    
    if (existingPlan) {
      return existingPlan;
    }
    
    // If no plan exists for this week, create a new one
    const newPlan = createEmptyPlan(new Date(currentWeekStartDate));
    setPlans([...plans, newPlan]);
    return newPlan;
  };

  // Add a new session to the current plan
  const addSession = (session: Omit<TrainingSession, "id">) => {
    const currentPlan = getCurrentPlan();
    const newSession = { ...session, id: generateId() };
    
    setPlans(
      plans.map(plan => 
        plan.id === currentPlan.id 
          ? { ...plan, sessions: [...plan.sessions, newSession] }
          : plan
      )
    );
  };

  // Update a session
  const updateSession = (sessionId: string, updates: Partial<TrainingSession>) => {
    const currentPlan = getCurrentPlan();
    
    setPlans(
      plans.map(plan => 
        plan.id === currentPlan.id 
          ? {
              ...plan,
              sessions: plan.sessions.map(session => 
                session.id === sessionId 
                  ? { ...session, ...updates }
                  : session
              )
            }
          : plan
      )
    );
  };

  // Delete a session
  const deleteSession = (sessionId: string) => {
    const currentPlan = getCurrentPlan();
    
    setPlans(
      plans.map(plan => 
        plan.id === currentPlan.id 
          ? {
              ...plan,
              sessions: plan.sessions.filter(session => session.id !== sessionId)
            }
          : plan
      )
    );
  };

  // Navigate to previous week
  const goToPreviousWeek = () => {
    const prevWeekDate = getPreviousWeekDate(currentWeekStartDate);
    setCurrentWeekStartDate(prevWeekDate.toISOString());
  };

  // Navigate to next week
  const goToNextWeek = () => {
    const nextWeekDate = getNextWeekDate(currentWeekStartDate);
    setCurrentWeekStartDate(nextWeekDate.toISOString());
  };

  // Copy plan from a previous week
  const copyFromPreviousWeek = (sourceWeekStartDate: string) => {
    const currentPlan = getCurrentPlan();
    const sourcePlan = plans.find(plan => plan.weekStartDate === sourceWeekStartDate);
    
    if (!sourcePlan) return;
    
    setPlans(
      plans.map(plan => 
        plan.id === currentPlan.id 
          ? {
              ...plan,
              sessions: sourcePlan.sessions.map(session => ({
                ...session,
                id: generateId() // Generate new IDs for copied sessions
              }))
            }
          : plan
      )
    );
  };

  return {
    plans,
    currentWeekStartDate,
    getCurrentPlan,
    addSession,
    updateSession,
    deleteSession,
    goToPreviousWeek,
    goToNextWeek,
    copyFromPreviousWeek,
    setCurrentWeekStartDate
  };
};
