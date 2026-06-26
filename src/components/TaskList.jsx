import React from 'react';
import { CheckCircle2, Circle, Clock } from 'lucide-react';

export default function TaskList({ tasks, onToggle }) {
  if (tasks.length === 0) return null;

  return (
    <div className="space-y-2.5">
      {tasks.map((task) => (
        <div 
          key={task.id} 
          onClick={() => onToggle(task.id)}
          className={`flex items-center justify-between p-4 rounded-xl cursor-pointer border transition-all duration-200 group select-none ${
            task.completed 
              ? 'bg-slate-50/70 border-slate-100 opacity-50 line-through text-slate-400 shadow-none' 
              : 'bg-white border-slate-100 hover:border-emerald-300 hover:shadow-md hover:shadow-slate-100/80 text-slate-700'
          }`}
        >
          <div className="flex items-center gap-3.5 pr-4">
            <div className="shrink-0 transition-transform duration-200 group-hover:scale-110">
              {task.completed ? (
                <CheckCircle2 size={19} className="text-emerald-500 fill-emerald-50" />
              ) : (
                <Circle size={19} className="text-slate-300 group-hover:text-emerald-400" />
              )}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-lg shrink-0">{task.emoji}</span>
              <span className="font-medium text-sm leading-relaxed">{task.step}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-1 bg-slate-50 px-2 py-1 rounded-md text-slate-400 text-[11px] font-semibold tracking-wide border border-slate-100 shrink-0">
            <Clock size={11} />
            {task.duration}
          </div>
        </div>
      ))}
    </div>
  );
}