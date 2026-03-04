import React from 'react';
import Card from './Card'; // Using the card component you provided
import { 
  Activity, 
  Droplets, 
  Weight, 
  Moon, 
  FileText, 
  Calendar 
} from 'lucide-react';
import { useGetAnylaticsQuery } from '../services/anylatics';

const CardContiner = () => {
  
    const { data , isLoading } = useGetAnylaticsQuery();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-48 rounded-[2.5rem] bg-(--bg-secondary) animate-pulse" />
        ))}
      </div>
    );
  }

  // Fallback if no data is provided
  if (!data?.anylatics) return null;

  const anylatics = data.anylatics;

  const stats = [
    {
      label: "Last Blood Pressure",
      value: anylatics.lastBloodPressure || "---",
      unit: "mmHg",
      icon: Activity,
      iconColor: "text-red-500",
    },
    {
      label: "Last Blood Sugar",
      value: anylatics.lastSugar || "---",
      unit: "mg/dL",
      icon: Droplets,
      iconColor: "text-cyan-500",
    },
    {
      label: "Last Body Weight",
      value: anylatics.lastWeight || "---",
      unit: "kg",
      icon: Weight,
      iconColor: "text-blue-500",
    },
    {
      label: "Last Sleep Duration",
      value: anylatics.lastSleepingDuration || "---",
      unit: "hrs",
      icon: Moon,
      iconColor: "text-indigo-500",
    },
    {
      label: "Total Reports",
      value: anylatics.totalReports || "0",
      unit: "files",
      icon: FileText,
      iconColor: "text-amber-500",
    }
  ];

  return (
    <div className="flex flex-wrap gap-6">
      {stats.map((stat, index) => (
        <Card
          key={index}
          label={stat.label}
          value={stat.value}
          unit={stat.unit}
          icon={stat.icon}
          iconColor={stat.iconColor}
        />
      ))}
    </div>
  );
};

export default CardContiner;