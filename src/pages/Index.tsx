
import React from "react";
import WeeklyPlanner from "../components/training/WeeklyPlanner";
import { Card } from "@/components/ui/card";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-monday-blue text-white py-4">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold">Badminton Training Planner</h1>
        </div>
      </header>
      
      <main className="container mx-auto py-6 px-4">
        <WeeklyPlanner />
        
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="p-4 shadow-sm">
            <h2 className="text-lg font-medium mb-2">Quick Tips</h2>
            <ul className="list-disc list-inside text-sm space-y-1 text-gray-700">
              <li>Use the tabs to switch between weekdays and weekend views</li>
              <li>Click "Add Session" to create a new training session</li>
              <li>Edit or delete sessions using the buttons on each card</li>
              <li>Copy plans from previous weeks using the "Copy from" dropdown</li>
              <li>Navigate between weeks using the previous/next buttons</li>
            </ul>
          </Card>
          
          <Card className="p-4 shadow-sm">
            <h2 className="text-lg font-medium mb-2">Training Intensity Guide</h2>
            <div className="space-y-2 text-sm text-gray-700">
              <div className="flex items-center">
                <div className="w-4 h-4 rounded-full bg-intensity-low mr-2"></div>
                <p><strong>Low:</strong> Technical drills, recovery sessions</p>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 rounded-full bg-intensity-medium mr-2"></div>
                <p><strong>Medium:</strong> Regular training, skill development</p>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 rounded-full bg-intensity-high mr-2"></div>
                <p><strong>High:</strong> Match simulation, intensive drills</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-4 shadow-sm">
            <h2 className="text-lg font-medium mb-2">Focus Areas</h2>
            <p className="text-sm text-gray-700 mb-2">
              Add focus areas to help players understand the goal of each session:
            </p>
            <div className="flex flex-wrap gap-1">
              {[
                "Footwork", "Smash", "Drop", "Clear", "Defense", 
                "Net Play", "Serve", "Return", "Tactics", "Endurance"
              ].map((focus, index) => (
                <span key={index} className="bg-gray-100 text-gray-800 px-2 py-0.5 text-xs rounded-full">
                  {focus}
                </span>
              ))}
            </div>
          </Card>
        </div>
      </main>
      
      <footer className="bg-gray-100 py-4 border-t">
        <div className="container mx-auto px-4 text-center text-gray-600 text-sm">
          Badminton Training Planner - Designed for coaches
        </div>
      </footer>
    </div>
  );
};

export default Index;
