import React, { useState } from 'react';
import { Sliders, Sparkles } from 'lucide-react';

export default function GentleForm({ onSubmit, loading }) {
  const [task, setTask] = useState('');
  const [anxietyLevel, setAnxietyLevel] = useState(3);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!task.trim()) return;
    onSubmit({ task, anxietyLevel });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 space-y-5">
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">What's feeling overwhelming right now?</label>
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="e.g., Study for history exam, clean room, map out essay structures..."
          className="w-full px-4 py-3.5 rounded-xl border border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-sm"
        />
      </div>

      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="text-sm font-semibold text-slate-700 flex items-center gap-1.5">
            <Sliders size={16} className="text-slate-400" /> Current Overwhelm / Anxiety Level
          </label>
          <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
            anxietyLevel >= 4 ? 'bg-rose-50 text-rose-600' : anxietyLevel === 3 ? 'bg-amber-50 text-amber-600' : 'bg-emerald-50 text-emerald-600'
          }`}>
            Level {anxietyLevel}/5
          </span>
        </div>
        <input
          type="range"
          min="1"
          max="5"
          value={anxietyLevel}
          onChange={(e) => setAnxietyLevel(Number(e.target.value))}
          className="w-full accent-emerald-500 h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-slate-400 px-1 mt-1">
          <span>I got this</span>
          <span>Paralyzed / Stuck</span>
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3.5 bg-emerald-500 text-white font-semibold rounded-xl hover:bg-emerald-600 shadow-lg shadow-emerald-500/10 transition duration-200 active:scale-[0.99] disabled:opacity-50 flex items-center justify-center gap-2 text-sm"
      >
        {loading ? (
          <>
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Decompressing Task Mountains...
          </>
        ) : (
          <>
            <Sparkles size={16} /> Break It Down Gently
          </>
        )}
      </button>
    </form>
  );
}