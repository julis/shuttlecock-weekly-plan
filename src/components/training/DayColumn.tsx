
import React, { useState } from "react";
import { TrainingSession } from "../../types/training";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import SessionCard from "./SessionCard";
import SessionForm from "./SessionForm";
import { getDateForDay, formatDate, isToday } from "../../utils/planUtils";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface DayColumnProps {
  dayOfWeek: number;
  dayName: string;
  weekStartDate: string;
  sessions: TrainingSession[];
  onAddSession: (session: Partial<TrainingSession>) => void;
  onUpdateSession: (sessionId: string, updates: Partial<TrainingSession>) => void;
  onDeleteSession: (sessionId: string) => void;
}

const DayColumn: React.FC<DayColumnProps> = ({
  dayOfWeek,
  dayName,
  weekStartDate,
  sessions,
  onAddSession,
  onUpdateSession,
  onDeleteSession,
}) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const date = getDateForDay(weekStartDate, dayOfWeek);
  const formattedDate = formatDate(date);
  const todayHighlight = isToday(date);

  const handleAddSession = (newSession: Partial<TrainingSession>) => {
    onAddSession({ ...newSession, dayOfWeek });
    setShowAddForm(false);
  };

  return (
    <div className="flex-1 min-w-[240px] max-w-[340px]">
      <Card className={cn(
        "h-full bg-white", 
        todayHighlight && "ring-2 ring-monday-blue"
      )}>
        <CardHeader className={cn(
          "py-2 px-4 flex flex-col items-center justify-center text-center border-b",
          todayHighlight && "bg-monday-blue text-white"
        )}>
          <h3 className="font-medium">{dayName}</h3>
          <p className="text-sm">{formattedDate}</p>
        </CardHeader>
        <CardContent className="p-3 h-[calc(100%-3.5rem)] overflow-y-auto">
          {sessions.length > 0 ? (
            sessions.map((session) => (
              <SessionCard
                key={session.id}
                session={session}
                onUpdate={onUpdateSession}
                onDelete={onDeleteSession}
              />
            ))
          ) : (
            <div className="flex flex-col items-center justify-center h-24 text-gray-500">
              <p className="text-sm">No sessions scheduled</p>
            </div>
          )}
          
          <Button
            onClick={() => setShowAddForm(true)}
            variant="outline"
            className="w-full mt-2 border-dashed border-gray-300 text-gray-500 hover:text-monday-blue hover:border-monday-blue"
          >
            <Plus size={16} className="mr-1" />
            Add Session
          </Button>
        </CardContent>
      </Card>

      <Dialog open={showAddForm} onOpenChange={setShowAddForm}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add Training Session for {dayName}</DialogTitle>
          </DialogHeader>
          <SessionForm 
            dayOfWeek={dayOfWeek}
            onSubmit={handleAddSession} 
            onCancel={() => setShowAddForm(false)} 
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DayColumn;
