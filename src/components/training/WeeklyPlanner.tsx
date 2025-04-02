
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { format, parseISO, startOfWeek, addWeeks, subWeeks } from "date-fns";
import { usePlanStore } from "../../store/planStore";
import DayColumn from "./DayColumn";
import { getDayName, getSessionsForDay } from "../../utils/planUtils";
import { ChevronLeft, ChevronRight, Copy, Save } from "lucide-react";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

const WeeklyPlanner: React.FC = () => {
  const {
    plans,
    currentWeekStartDate,
    getCurrentPlan,
    addSession,
    updateSession,
    deleteSession,
    goToPreviousWeek,
    goToNextWeek,
    copyFromPreviousWeek
  } = usePlanStore();

  const [activeView, setActiveView] = useState<"weekday" | "weekend">("weekday");
  
  const currentPlan = getCurrentPlan();
  const currentWeekStart = parseISO(currentWeekStartDate);
  const formattedWeekRange = `${format(currentWeekStart, "MMM d")} - ${format(
    addWeeks(currentWeekStart, 1),
    "MMM d, yyyy"
  )}`;

  // Create arrays for weekdays (Mon-Fri) and weekend (Sat-Sun)
  const weekdays = [0, 1, 2, 3, 4]; // Monday to Friday
  const weekend = [5, 6]; // Saturday and Sunday

  const handleCopyFromPrevious = (weekStartDate: string) => {
    copyFromPreviousWeek(weekStartDate);
    toast.success("Plan copied successfully");
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Weekly Training Planner</h1>
          <p className="text-gray-600">{formattedWeekRange}</p>
        </div>
        
        <div className="flex items-center space-x-2 mt-4 md:mt-0">
          <Button
            variant="outline"
            size="sm"
            onClick={goToPreviousWeek}
            className="border-gray-300"
          >
            <ChevronLeft size={16} className="mr-1" />
            Previous
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={goToNextWeek}
            className="border-gray-300"
          >
            Next
            <ChevronRight size={16} className="ml-1" />
          </Button>
          
          {plans.length > 1 && (
            <Select onValueChange={(value) => handleCopyFromPrevious(value)}>
              <SelectTrigger className="w-[180px]">
                <Copy size={16} className="mr-2" />
                <SelectValue placeholder="Copy from..." />
              </SelectTrigger>
              <SelectContent>
                {plans
                  .filter(plan => plan.weekStartDate !== currentWeekStartDate)
                  .map(plan => {
                    const date = parseISO(plan.weekStartDate);
                    return (
                      <SelectItem key={plan.id} value={plan.weekStartDate}>
                        {format(date, "MMM d")} - {format(addWeeks(date, 1), "MMM d")}
                      </SelectItem>
                    );
                  })}
              </SelectContent>
            </Select>
          )}
        </div>
      </div>
      
      <Tabs defaultValue="weekday" className="w-full" onValueChange={(value) => setActiveView(value as "weekday" | "weekend")}>
        <TabsList className="mb-4">
          <TabsTrigger value="weekday">Weekdays</TabsTrigger>
          <TabsTrigger value="weekend">Weekend</TabsTrigger>
        </TabsList>
        
        <TabsContent value="weekday" className="mt-0">
          <div className="overflow-x-auto">
            <div className="flex space-x-4 min-w-max pb-4">
              {weekdays.map((day) => (
                <DayColumn
                  key={day}
                  dayOfWeek={day}
                  dayName={getDayName(day)}
                  weekStartDate={currentWeekStartDate}
                  sessions={getSessionsForDay(currentPlan, day)}
                  onAddSession={addSession}
                  onUpdateSession={updateSession}
                  onDeleteSession={deleteSession}
                />
              ))}
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="weekend" className="mt-0">
          <div className="overflow-x-auto">
            <div className="flex space-x-4 min-w-max pb-4">
              {weekend.map((day) => (
                <DayColumn
                  key={day}
                  dayOfWeek={day}
                  dayName={getDayName(day)}
                  weekStartDate={currentWeekStartDate}
                  sessions={getSessionsForDay(currentPlan, day)}
                  onAddSession={addSession}
                  onUpdateSession={updateSession}
                  onDeleteSession={deleteSession}
                />
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default WeeklyPlanner;
