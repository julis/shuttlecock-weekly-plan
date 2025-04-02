
import React, { useState } from "react";
import { TrainingSession } from "../../types/training";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { formatTime } from "../../utils/planUtils";
import IntensityBadge from "./IntensityBadge";
import { Edit, Trash2 } from "lucide-react";
import SessionForm from "./SessionForm";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface SessionCardProps {
  session: TrainingSession;
  onUpdate: (sessionId: string, updates: Partial<TrainingSession>) => void;
  onDelete: (sessionId: string) => void;
}

const SessionCard: React.FC<SessionCardProps> = ({ session, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  
  const handleSave = (updatedSession: Partial<TrainingSession>) => {
    onUpdate(session.id, updatedSession);
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this session?")) {
      onDelete(session.id);
    }
  };

  return (
    <>
      <Card className="mb-4 shadow-sm transition-all hover:shadow-md border-l-4" 
            style={{ borderLeftColor: session.intensity === 'low' ? '#00CA72' : 
                                     session.intensity === 'medium' ? '#FFC107' : '#E8505B' }}>
        <CardHeader className="pb-2 flex flex-row items-center justify-between">
          <div>
            <h3 className="font-medium text-base">{session.title}</h3>
            <p className="text-sm text-gray-500">
              {formatTime(session.startTime)} - {formatTime(session.endTime)}
            </p>
          </div>
          <IntensityBadge intensity={session.intensity} />
        </CardHeader>
        <CardContent className="pb-2">
          {session.description && (
            <p className="text-sm mb-2">{session.description}</p>
          )}
          {session.focus.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-1">
              {session.focus.map((item, index) => (
                <span
                  key={index}
                  className="bg-gray-100 text-gray-800 px-2 py-0.5 text-xs rounded-full"
                >
                  {item}
                </span>
              ))}
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-end gap-2 pt-0">
          <Button
            variant="ghost"
            size="sm"
            className="text-gray-500 hover:text-monday-blue"
            onClick={() => setIsEditing(true)}
          >
            <Edit size={16} className="mr-1" />
            Edit
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-gray-500 hover:text-destructive"
            onClick={handleDelete}
          >
            <Trash2 size={16} className="mr-1" />
            Delete
          </Button>
        </CardFooter>
      </Card>

      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Training Session</DialogTitle>
          </DialogHeader>
          <SessionForm 
            initialValues={session} 
            onSubmit={handleSave} 
            onCancel={() => setIsEditing(false)} 
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SessionCard;
