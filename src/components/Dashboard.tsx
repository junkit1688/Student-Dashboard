import { motion } from 'motion/react';
import { 
  CheckCircle2, 
  Clock, 
  TrendingUp, 
  Zap,
  ArrowUpRight,
  Plus,
  LucideIcon
} from 'lucide-react';
import { cn } from '../types';

interface StatCardProps {
  title: string;
  value: string | number;
  unit?: string;
  icon: LucideIcon;
  color: string;
  trend?: number;
}

const StatCard = ({ title, value, unit, icon: Icon, color, trend }: StatCardProps) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="bg-white dark:bg-zinc-900 p-6 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm"
  >
    <div className="flex items-start justify-between">
      <div className={cn("p-3 rounded-2xl", color)}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      {trend && (
        <span className="flex items-center gap-1 text-xs font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 px-2 py-1 rounded-lg">
          <ArrowUpRight size={14} />
          {trend}%
        </span>
      )}
    </div>
    <div className="mt-4">
      <h3 className="text-zinc-500 dark:text-zinc-400 text-sm font-medium">{title}</h3>
      <div className="flex items-baseline gap-1 mt-1">
        <span className="text-3xl font-bold tracking-tight">{value}</span>
        {unit && <span className="text-zinc-400 dark:text-zinc-500 text-sm">{unit}</span>}
      </div>
    </div>
  </motion.div>
);

export default function Dashboard() {
  return (
    <div className="space-y-8">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Good morning, Student!</h1>
          <p className="text-zinc-500 dark:text-zinc-400 mt-2 text-lg">Here's what's happening with your studies today.</p>
        </div>
        <button className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-2xl font-semibold transition-all shadow-lg shadow-indigo-500/20">
          <Plus size={20} />
          New Study Session
        </button>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <StatCard 
          title="Tasks Completed" 
          value="12" 
          unit="/ 15" 
          icon={CheckCircle2} 
          color="bg-emerald-500" 
          trend={8}
        />
        <StatCard 
          title="Study Time" 
          value="4.5" 
          unit="hours" 
          icon={Clock} 
          color="bg-amber-500" 
          trend={12}
        />
        <StatCard 
          title="Focus Score" 
          value="84" 
          unit="%" 
          icon={Zap} 
          color="bg-indigo-500" 
          trend={5}
        />
        <StatCard 
          title="Daily Streak" 
          value="7" 
          unit="days" 
          icon={TrendingUp} 
          color="bg-rose-500" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <section className="bg-white dark:bg-zinc-900 p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-2xl font-bold tracking-tight">Current Focus</h2>
              <p className="text-zinc-500 dark:text-zinc-400 mt-1">Advanced Calculus - Chapter 4</p>
              
              <div className="mt-8 flex items-center gap-6">
                <div className="flex-1">
                  <div className="flex justify-between mb-2 text-sm font-medium">
                    <span>Progress</span>
                    <span>65%</span>
                  </div>
                  <div className="w-full h-3 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: "65%" }}
                      className="h-full bg-indigo-600 rounded-full"
                    />
                  </div>
                </div>
                <button className="bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 px-6 py-3 rounded-2xl font-bold transition-transform hover:scale-105">
                  Resume
                </button>
              </div>
            </div>
            
            {/* Visual flair */}
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-indigo-50 dark:bg-indigo-900/10 rounded-full blur-3xl opacity-50" />
          </section>

          <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-zinc-900 p-6 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
              <h3 className="font-bold text-lg mb-4">Upcoming Deadlines</h3>
              <div className="space-y-4">
                {[
                  { title: "English Essay", date: "Tomorrow, 2:00 PM", urgency: "high" },
                  { title: "Math Quiz", date: "Wed, Oct 14", urgency: "medium" },
                  { title: "History Project", date: "Fri, Oct 16", urgency: "low" }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 group cursor-pointer">
                    <div className={cn(
                      "w-2 h-10 rounded-full",
                      item.urgency === 'high' ? 'bg-rose-500' :
                      item.urgency === 'medium' ? 'bg-amber-500' : 'bg-emerald-500'
                    )} />
                    <div>
                      <p className="font-semibold group-hover:text-indigo-600 transition-colors">{item.title}</p>
                      <p className="text-xs text-zinc-400 dark:text-zinc-500 uppercase tracking-wider font-bold mt-0.5">{item.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-white dark:bg-zinc-900 p-6 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
              <h3 className="font-bold text-lg mb-4">Quick Stats</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center bg-zinc-50 dark:bg-zinc-800/50 p-4 rounded-2xl">
                  <span className="text-zinc-500 dark:text-zinc-400 font-medium">Avg. Focus Time</span>
                  <span className="font-bold">45 min</span>
                </div>
                <div className="flex justify-between items-center bg-zinc-50 dark:bg-zinc-800/50 p-4 rounded-2xl">
                  <span className="text-zinc-500 dark:text-zinc-400 font-medium">Top Subject</span>
                  <span className="font-bold text-indigo-600 dark:text-indigo-400 underline decoration-2 underline-offset-4">Mathematics</span>
                </div>
              </div>
            </div>
          </section>
        </div>

        <aside className="bg-indigo-600 dark:bg-indigo-700/80 p-8 rounded-[2.5rem] text-white overflow-hidden relative">
          <div className="relative z-10">
            <h2 className="text-2xl font-bold leading-tight">Focus Reminder</h2>
            <p className="mt-2 text-indigo-100 font-medium opacity-90">"The secret of getting ahead is getting started."</p>
            
            <div className="mt-10 bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/10">
              <div className="flex items-center justify-between font-bold text-sm tracking-widest uppercase mb-4 opacity-80">
                <span>Timer Preset</span>
                <span>Pomodoro</span>
              </div>
              <div className="text-6xl font-black font-mono tracking-tighter mb-6">25:00</div>
              <button className="w-full bg-white text-indigo-600 py-4 rounded-2xl font-bold hover:bg-zinc-100 transition-colors shadow-lg">
                Start Session
              </button>
            </div>
          </div>
          
          <div className="absolute bottom-0 right-0 -mr-10 -mb-10 w-48 h-48 bg-white/10 rounded-full blur-2xl" />
        </aside>
      </div>
    </div>
  );
}
