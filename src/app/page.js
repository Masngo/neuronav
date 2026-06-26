'use client';
import { useState, useEffect } from 'react';
import { LayoutDashboard, Heart, Sparkles, History, CheckCircle2 } from 'lucide-react';
import GentleForm from '@/components/GentleForm';
import TaskList from '@/components/TaskList';
import ProgressBar from '@/components/ProgressBar';

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [motivationalQuote, setMotivationalQuote] = useState("Every great journey starts with a single microscopic step.");
  const [history, setHistory] = useState([
    { id: 1, title: "Finish biology worksheet", date: "Yesterday", status: "Completed" },
    { id: 2, title: "Clean matching desk drawer", date: "2 days ago", status: "Completed" }
  ]);

  const completedCount = tasks.filter(t => t.completed).length;
  const totalCount = tasks.length;

  useEffect(() => {
    if (totalCount === 0) return;
    const percentage = (completedCount / totalCount) * 100;
    if (percentage === 100) {
      setMotivationalQuote("Incredible! You absolutely crushed it. Celebrate this win! 🎉");
    } else if (percentage >= 50) {
      setMotivationalQuote("Look at that progress! You're officially over the hill. Keep moving gently. ⚡");
    } else if (percentage > 0) {
      setMotivationalQuote("First momentum achieved! Big things come from tiny actions. 🪵");
    }
  }, [completedCount, totalCount]);

  const handleFetchBreakdown = async ({ task, anxietyLevel }) => {
    setLoading(true);
    try {
      const response = await fetch('/api/breakdown', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ task, anxietyLevel }),
      });
      const data = await response.json();
      if (data.success) {
        setTasks(data.tasks.map(t => ({ ...t, completed: false })));
        setHistory(prev => [{ id: Date.now(), title: task, date: "Just now", status: "In Progress" }, ...prev]);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const toggleTask = (id) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col md:flex-row">
      
      {/* SIDEBAR */}
      <aside className="w-full md:w-64 bg-white border-b md:border-b-0 md:border-r border-slate-100 p-6 flex flex-col justify-between shrink-0">
        <div>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center text-white text-xl shadow-md shadow-emerald-200">
              🧭
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-slate-900">NeuroNav</h1>
              <span className="text-xs font-semibold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">v1.0 (Hackathon)</span>
            </div>
          </div>

          <nav className="space-y-1">
            <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-50 text-slate-900 font-medium transition">
              <LayoutDashboard size={18} className="text-emerald-500" /> Dashboard
            </a>
            <a href="https://www.akhilautismfoundation.org/" target="_blank" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-500 hover:bg-slate-50 hover:text-slate-900 transition">
              <Heart size={18} className="text-rose-400" /> Supporting Cause
            </a>
          </nav>
        </div>

        <div className="mt-8 bg-gradient-to-tr from-emerald-50 to-teal-50 p-4 rounded-xl border border-emerald-100/50">
          <p className="text-xs font-semibold text-emerald-800 flex items-center gap-1.5 mb-1">
            <Sparkles size={12} /> Mission Statement
          </p>
          <p className="text-xs text-emerald-700 leading-relaxed">
            Built for Youth Code x AI to create structural accessibility frameworks for neurodiverse focus management.
          </p>
        </div>
      </aside>

      {/* MAIN PANEL */}
      <main className="flex-1 p-6 md:p-10 max-w-5xl mx-auto w-full grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* WORKSPACE MODULES */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Focus Hub</h2>
              <p className="text-slate-500 text-sm mt-0.5">Offload your executive dysfunction onto our custom AI workspace.</p>
            </div>
            {totalCount > 0 && (
              <div className="text-right shrink-0">
                <span className="text-2xl font-bold text-emerald-600">{completedCount}</span>
                <span className="text-slate-400 font-medium">/{totalCount} Steps Done</span>
              </div>
            )}
          </div>

          <GentleForm onSubmit={handleFetchBreakdown} loading={loading} />

          {totalCount > 0 && (
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm animate-fade-in">
              <h3 className="text-md font-bold text-slate-900 mb-1">Your Gentle Roadmap</h3>
              <p className="text-xs text-slate-400 mb-4">Click any micro-step when you complete it to gather structural momentum.</p>
              
              <ProgressBar tasks={tasks} />
              <TaskList tasks={tasks} onToggle={toggleTask} />
            </div>
          )}
        </div>

        {/* METRICS SIDEBAR */}
        <div className="space-y-6">
          
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white p-6 rounded-2xl shadow-xl shadow-slate-200 relative overflow-hidden">
            <div className="absolute right-[-20px] bottom-[-20px] text-8xl opacity-10 select-none">🧠</div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-emerald-400 mb-2">Coach's Message</h3>
            <p className="text-md font-medium text-slate-100 leading-relaxed italic">
              "{motivationalQuote}"
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <h3 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
              <History size={16} className="text-slate-400" /> Session Activity Log
            </h3>
            <div className="space-y-4">
              {history.map((item) => (
                <div key={item.id} className="flex justify-between items-start text-xs border-b border-slate-50 pb-3 last:border-none last:pb-0">
                  <div>
                    <h4 className="font-semibold text-slate-700 line-clamp-1">{item.title}</h4>
                    <span className="text-slate-400 mt-0.5 block">{item.date}</span>
                  </div>
                  <span className={`px-2 py-0.5 rounded font-medium ${
                    item.status === 'Completed' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700 animate-pulse'
                  }`}>
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}