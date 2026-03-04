import React from 'react';
import DashboardLayout from '../layout/DashboardLayout.jsx';
import TimelineItem from '../components/TimelineItem.jsx';
import { useGetVitalsQuery } from '../services/vitals.js';
import { History, Plus } from 'lucide-react';
import Button from '../components/Button.jsx';

const HealthTimeline = () => {
  const { data, isLoading, isError, error } = useGetVitalsQuery();

  if (isError) {
    alert(error?.data?.message || error?.message || 'Some error occured')
  }

  return (
    <DashboardLayout>
      {/* Container padding adjusted for mobile to prevent timeline dots from hitting screen edge */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Page Header - Responsive Flex Direction */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-6 mb-8 sm:mb-10">
          <div className="flex-1">
            <h1 className="text-2xl sm:text-3xl font-black text-(--text-primary) tracking-tight flex items-center gap-3">
              <History className="text-(--btn-primary) shrink-0" size={28} sm={32} />
              Vital Chronology
            </h1>
            <p className="text-(--text-secondary) mt-1 text-sm sm:text-base">
              Review your historical health data and trends.
            </p>
          </div>
          
          {/* Button width logic: full width on mobile, auto on desktop */}
          <Button 
            path="/add-vitals" 
            className="w-full sm:w-auto rounded-2xl shadow-lg shadow-blue-200 flex justify-center items-center gap-2"
          >
            <Plus size={18} /> 
            <span>Add Entry</span>
          </Button>
        </div>

        {/* Timeline List */}
        <div className="mt-4 sm:mt-6">
          {isLoading ? (
            <div className="flex justify-center py-20 text-(--text-secondary)">
              <span className="animate-pulse">Loading timeline...</span>
            </div>
          ) : data?.vitals?.length > 0 ? (
            <div className="flex flex-col">
              {data.vitals.map((record) => (
                <TimelineItem key={record._id} data={record} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 sm:py-20 px-6 bg-(--bg-secondary) rounded-[1.5rem] sm:rounded-[2rem] border-2 border-dashed border-slate-200">
              <p className="text-(--text-secondary) text-sm sm:text-base">
                No records found. Start by adding your first vital today!
              </p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default HealthTimeline;