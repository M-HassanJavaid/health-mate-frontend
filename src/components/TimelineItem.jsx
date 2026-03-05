import React from 'react';
import { Weight, Droplets, Activity, Moon, StickyNote, Calendar, Trash2, Loader2 } from 'lucide-react';
import VitalBadge from './VitalBadge';
import cn from '../utils/cn';
import { useDeleteVitalsMutation } from '../services/vitals';

const TimelineItem = ({ data }) => {
  const [deleteVitals, { isLoading: isDeleting }] = useDeleteVitalsMutation();

  const date = new Date(data.createdAt).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this vital entry?")) {
      try {
        await deleteVitals(data._id).unwrap();
      } catch (error) {
        console.error("Failed to delete vitals:", error);
      }
    }
  };

  return (
    <div className={cn(
      "relative pl-6 sm:pl-8 pb-8 sm:pb-10 group transition-opacity",
      isDeleting && "opacity-50 pointer-events-none"
    )}>
      {/* Timeline Thread Line */}
      <div className="absolute left-[11px] top-0 bottom-0 w-[2px] bg-slate-100 group-last:bg-transparent" />
      
      {/* Timeline Dot */}
      <div className={cn(
        "absolute left-0 top-1 w-6 h-6 rounded-full border-4 border-white shadow-sm z-10 transition-colors",
        isDeleting ? "bg-red-400" : "bg-(--btn-primary)"
      )} />

      <div className="flex flex-col gap-2 sm:gap-3">
        {/* Date Header & Delete Action */}
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2 text-(--text-secondary)">
            <Calendar size={14} className="opacity-70" />
            <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-[0.1em]">{date}</span>
          </div>
          
          <button 
            onClick={handleDelete}
            disabled={isDeleting}
            className="p-1.5 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
          >
            {isDeleting ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
          </button>
        </div>

        {/* Self-Contained Card Container */}
        <div className={cn(
          "p-4 sm:p-6 rounded-[1.5rem] sm:rounded-[2rem] transition-all duration-300 relative overflow-hidden",
          "bg-(--bg-primary) border border-(--border-subtle)",
          "shadow-sm shadow-blue-500/5 hover:shadow-md hover:border-(--btn-primary)/30"
        )}>
          {/* Vitals Grid */}
          <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            {data.bloodPressure && (
              <VitalBadge 
                icon={Activity} 
                label="BP" 
                value={`${data.bloodPressure.systolic}/${data.bloodPressure.diastolic}`} 
                unit="mmHg" 
                colorClass="bg-red-500 text-red-500" 
              />
            )}
            
            <VitalBadge 
              icon={Weight} 
              label="Weight" 
              value={data.weight} 
              unit="kg" 
              colorClass="bg-blue-500 text-blue-500" 
            />
            
            <VitalBadge 
              icon={Droplets} 
              label="Sugar" 
              value={data.sugar} 
              unit="mg/dL" 
              colorClass="bg-orange-500 text-orange-500" 
            />
            
            <VitalBadge 
              icon={Moon} 
              label="Sleep" 
              value={data.sleepingDuration} 
              unit="hrs" 
              colorClass="bg-indigo-500 text-indigo-500" 
            />
          </div>

          {/* Notes Section */}
          {data.notes && (
            <div className="mt-4 sm:mt-5 pt-4 sm:pt-5 border-t border-slate-50 flex gap-2 sm:gap-3 items-start">
              <div className="p-1.5 rounded-lg bg-(--bg-secondary) text-slate-400 shrink-0">
                <StickyNote size={14} />
              </div>
              <p className="text-xs sm:text-sm text-(--text-secondary) italic leading-relaxed py-0.5 sm:py-1">
                "{data.notes}"
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TimelineItem;