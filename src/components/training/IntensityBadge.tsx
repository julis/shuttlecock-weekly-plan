
import React from "react";
import { IntensityLevel } from "../../types/training";
import { cn } from "@/lib/utils";

interface IntensityBadgeProps {
  intensity: IntensityLevel;
  className?: string;
}

const IntensityBadge: React.FC<IntensityBadgeProps> = ({ intensity, className }) => {
  const badgeClasses = {
    low: "bg-intensity-low text-white",
    medium: "bg-intensity-medium text-black",
    high: "bg-intensity-high text-white",
  };

  const intensityLabels = {
    low: "Low",
    medium: "Medium",
    high: "High",
  };

  return (
    <span
      className={cn(
        "inline-block px-2 py-1 text-xs font-medium rounded-full",
        badgeClasses[intensity],
        className
      )}
    >
      {intensityLabels[intensity]}
    </span>
  );
};

export default IntensityBadge;
