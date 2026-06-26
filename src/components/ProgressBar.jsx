import React from 'react';

export default function ProgressBar({ tasks }) {
  if (tasks.length === 0) return null;
  
  const completedCount = tasks.filter(t => t.completed).length;
  const percentage = Math.round((completedCount / tasks.length) * 100);

  return (
    <div className="mb-6">
      <div className="w-full bg-slate-100 rounded-full h-3 relative overflow-hidden shadow-inner">
        <div 
          className="bg-gradient-to-r from-emerald-400 to-teal-400 h-full transition-all duration-500 ease-out rounded-full"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <div className="flex justify-between items-center mt-2 text-xs font-medium text-slate-500">
        <span>Progress Meter</span>
        <span className="text-emerald-600 font-bold">{percentage}% Complete</span>
      </div>
    </div>
  );
}