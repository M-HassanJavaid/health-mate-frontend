import React from 'react';
import DashboardLayout from '../layout/DashboardLayout.jsx';
import TimelineItem from '../components/TimelineItem.jsx';
import { useGetVitalsQuery } from '../services/vitals.js';
import { History, Plus } from 'lucide-react';
import Button from '../components/Button.jsx';

const HealthTimeline = () => {
  const { data , isLoading , isError , error} = useGetVitalsQuery();

  if (isError) {
    alert(error?.data?.message || error?.message || 'Some error occured')
  }

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        {/* Page Header */}
        <div className="flex justify-between items-end mb-10">
          <div>
            <h1 className="text-3xl font-black text-(--text-primary) tracking-tight flex items-center gap-3">
              <History className="text-(--btn-primary)" size={32} />
              Vital Chronology
            </h1>
            <p className="text-(--text-secondary) mt-1">Review your historical health data and trends.</p>
          </div>
          
          <Button path="/add-vitals" className="rounded-2xl py-3 shadow-lg shadow-blue-200">
            <Plus size={18} /> Add Entry
          </Button>
        </div>

        {/* Timeline List */}
        <div className="mt-4">
          {isLoading ? (
            <div className="flex justify-center py-20 text-(--text-secondary)">Loading timeline...</div>
          ) : data.vitals?.length > 0 ? (
            data.vitals.map((record) => (
              <TimelineItem key={record._id} data={record} />
            ))
          ) : (
            <div className="text-center py-20 bg-(--bg-secondary) rounded-[2rem] border-2 border-dashed border-slate-200">
              <p className="text-(--text-secondary)">No records found. Start by adding your first vital today!</p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default HealthTimeline;