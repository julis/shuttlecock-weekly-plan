
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { TrainingSession, IntensityLevel } from "../../types/training";
import { createTrainingSession } from "../../utils/planUtils";

interface SessionFormProps {
  initialValues?: TrainingSession;
  dayOfWeek?: number;
  onSubmit: (session: Partial<TrainingSession>) => void;
  onCancel: () => void;
}

const SessionForm: React.FC<SessionFormProps> = ({ 
  initialValues, 
  dayOfWeek, 
  onSubmit, 
  onCancel 
}) => {
  const defaultValues = initialValues || 
    (dayOfWeek !== undefined ? createTrainingSession(dayOfWeek) : {
      title: "",
      startTime: "17:00",
      endTime: "19:00",
      description: "",
      intensity: "medium" as IntensityLevel,
      focus: [],
      notes: ""
    });

  const [formData, setFormData] = useState<Partial<TrainingSession>>(defaultValues);
  const [focusInput, setFocusInput] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleIntensityChange = (value: IntensityLevel) => {
    setFormData(prev => ({ ...prev, intensity: value }));
  };

  const handleAddFocus = () => {
    if (focusInput.trim() === "") return;
    
    setFormData(prev => ({
      ...prev,
      focus: [...(prev.focus || []), focusInput.trim()]
    }));
    setFocusInput("");
  };

  const handleRemoveFocus = (index: number) => {
    setFormData(prev => ({
      ...prev,
      focus: prev.focus?.filter((_, i) => i !== index) || []
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Session Title</Label>
        <Input
          id="title"
          name="title"
          value={formData.title || ""}
          onChange={handleChange}
          placeholder="e.g., Footwork Training"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="startTime">Start Time</Label>
          <Input
            id="startTime"
            name="startTime"
            type="time"
            value={formData.startTime || ""}
            onChange={handleChange}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="endTime">End Time</Label>
          <Input
            id="endTime"
            name="endTime"
            type="time"
            value={formData.endTime || ""}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          value={formData.description || ""}
          onChange={handleChange}
          placeholder="Describe the training session..."
          rows={2}
        />
      </div>

      <div className="space-y-2">
        <Label>Intensity Level</Label>
        <RadioGroup 
          value={formData.intensity} 
          onValueChange={(value) => handleIntensityChange(value as IntensityLevel)}
          className="flex space-x-2"
        >
          <div className="flex items-center space-x-1">
            <RadioGroupItem value="low" id="intensity-low" className="text-intensity-low" />
            <Label htmlFor="intensity-low" className="text-intensity-low font-medium">Low</Label>
          </div>
          <div className="flex items-center space-x-1">
            <RadioGroupItem value="medium" id="intensity-medium" className="text-intensity-medium" />
            <Label htmlFor="intensity-medium" className="text-intensity-medium font-medium">Medium</Label>
          </div>
          <div className="flex items-center space-x-1">
            <RadioGroupItem value="high" id="intensity-high" className="text-intensity-high" />
            <Label htmlFor="intensity-high" className="text-intensity-high font-medium">High</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-2">
        <Label>Focus Areas</Label>
        <div className="flex">
          <Input
            value={focusInput}
            onChange={(e) => setFocusInput(e.target.value)}
            placeholder="e.g., Footwork, Smash, Defense"
            className="flex-grow"
          />
          <Button 
            type="button" 
            onClick={handleAddFocus}
            className="ml-2 bg-monday-blue text-white"
          >
            Add
          </Button>
        </div>
        {formData.focus && formData.focus.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {formData.focus.map((item, index) => (
              <span
                key={index}
                className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-sm flex items-center"
              >
                {item}
                <button
                  type="button"
                  className="ml-1 text-gray-500 hover:text-gray-700"
                  onClick={() => handleRemoveFocus(index)}
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="notes">Notes</Label>
        <Textarea
          id="notes"
          name="notes"
          value={formData.notes || ""}
          onChange={handleChange}
          placeholder="Additional notes..."
          rows={2}
        />
      </div>

      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" className="bg-monday-blue text-white">
          Save Session
        </Button>
      </div>
    </form>
  );
};

export default SessionForm;
