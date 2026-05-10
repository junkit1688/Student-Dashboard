import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { 
  TrendingUp, 
  Calendar, 
  Clock, 
  Zap,
  Download,
  Info
} from 'lucide-react';
import { cn } from '../types';

const STUDY_DATA = [
  { day: 'Mon', hours: 4.5, focus: 85 },
  { day: 'Tue', hours: 5.2, focus: 78 },
  { day: 'Wed', hours: 3.8, focus: 92 },
  { day: 'Thu', hours: 6.1, focus: 80 },
  { day: 'Fri', hours: 4.0, focus: 88 },
  { day: 'Sat', hours: 2.5, focus: 95 },
  { day: 'Sun', hours: 1.5, focus: 70 },
];

const CATEGORY_DATA = [
  { name: 'Mathematics', value: 45, color: '#4f46e5' },
  { name: 'Computer Science', value: 30, color: '#06b6d4' },
  { name: 'Physics', value: 15, color: '#f59e0b' },
  { name: 'English', value: 10, color: '#10b981' },
];

export default function Analytics() {
  return (
    <div className="space-y-10">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Intelligence & Insights</h1>
          <p className="text-zinc-500 dark:text-zinc-400 mt-1">Deep dive into your cognitive performance.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-6 py-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl font-bold text-sm shadow-sm hover:bg-zinc-50 transition-colors">
            <Calendar size={18} />
            Last 7 Days
          </button>
          <button className="flex items-center gap-2 px-6 py-3 bg-zinc-900 border border-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-2xl font-bold text-sm shadow-sm hover:bg-zinc-800 transition-colors transition-colors">
            <Download size={18} />
            Export Audit
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <section className="lg:col-span-2 bg-white dark:bg-zinc-900 p-8 rounded-[3rem] border border-zinc-200 dark:border-zinc-800 shadow-sm">
          <header className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-2xl font-bold flex items-center gap-2">
                Memory Retention & Focus
                <Info size={16} className="text-zinc-400" />
              </h2>
              <p className="text-zinc-500 text-sm mt-1">Hours studied vs. focus quality index.</p>
            </div>
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-indigo-600" />
                <span className="text-xs font-bold uppercase tracking-wider text-zinc-500">Duration</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-indigo-200" />
                <span className="text-xs font-bold uppercase tracking-wider text-zinc-500">Focus Index</span>
              </div>
            </div>
          </header>
          
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={STUDY_DATA}>
                <defs>
                  <linearGradient id="colorHours" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="day" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 700 }}
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 700 }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#18181b', 
                    borderRadius: '16px', 
                    border: 'none',
                    color: '#f4f4f5',
                    padding: '12px'
                  }} 
                  itemStyle={{ color: '#f4f4f5', fontWeight: 800 }}
                />
                <Area 
                  type="monotone" 
                  dataKey="hours" 
                  stroke="#4f46e5" 
                  strokeWidth={4}
                  fillOpacity={1} 
                  fill="url(#colorHours)" 
                />
                <Bar 
                  dataKey="focus" 
                  fill="#e0e7ff" 
                  radius={[4, 4, 0, 0]} 
                  opacity={0.3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </section>

        <div className="space-y-6">
          <section className="bg-white dark:bg-zinc-900 p-8 rounded-[3rem] border border-zinc-200 dark:border-zinc-800 shadow-sm h-full flex flex-col">
            <h3 className="font-bold text-xl mb-8">Subject Distribution</h3>
            <div className="flex-1 flex flex-col items-center justify-center">
              <div className="h-64 w-full relative">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={CATEGORY_DATA}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={8}
                      dataKey="value"
                    >
                      {CATEGORY_DATA.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                  <span className="text-xs font-bold text-zinc-400 block uppercase tracking-widest">Total</span>
                  <span className="text-3xl font-black">27h</span>
                </div>
              </div>
              <div className="mt-8 grid grid-cols-2 gap-4 w-full">
                {CATEGORY_DATA.map((item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-xs font-bold text-zinc-500 uppercase truncate">{item.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: "Weekly Growth", value: "+14.2%", icon: TrendingUp, color: "text-emerald-500" },
          { title: "Avg. Session", value: "52 min", icon: Clock, color: "text-amber-500" },
          { title: "Optimal Start", value: "9:00 AM", icon: Zap, color: "text-indigo-500" },
          { title: "Peak Learning", value: "Wednesday", icon: Calendar, color: "text-rose-500" }
        ].map((item, i) => (
          <div key={i} className="bg-white dark:bg-zinc-900 p-6 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm flex items-center gap-4">
            <div className={cn("p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50", item.color)}>
              <item.icon size={24} />
            </div>
            <div>
              <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest leading-none mb-1">{item.title}</p>
              <p className="text-xl font-bold tracking-tight leading-none">{item.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
