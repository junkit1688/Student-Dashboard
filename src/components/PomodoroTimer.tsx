import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Coffee, 
  Zap, 
  Brain,
  Bell,
  Settings2,
  Trophy,
  History
} from 'lucide-react';
import { cn } from '../types';

type TimerMode = 'work' | 'shortBreak' | 'longBreak';

export default function PomodoroTimer() {
  const [mode, setMode] = useState<TimerMode>('work');
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [sessionsCompleted, setSessionsCompleted] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const modeSettings = {
    work: { time: 25 * 60, label: 'Deep Focus', color: 'bg-indigo-600', icon: Brain },
    shortBreak: { time: 5 * 60, label: 'Short Rest', color: 'bg-emerald-600', icon: Coffee },
    longBreak: { time: 15 * 60, label: 'Mental Reset', color: 'bg-amber-600', icon: Zap },
  };

  useEffect(() => {
    if (isActive && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      handleTimerComplete();
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isActive, timeLeft]);

  const handleTimerComplete = () => {
    setIsActive(false);
    if (mode === 'work') {
      setSessionsCompleted((prev) => prev + 1);
      // Play a notification sound (simulated or actual)
      if ("Notification" in window && Notification.permission === "granted") {
        new Notification("Focus Session Complete!", { body: "Time for a well-deserved break." });
      }
    }
    // Switch modes automatically? Let's leave it to the user for now but reset timer
    const nextMode = mode === 'work' ? 'shortBreak' : 'work';
    setMode(nextMode);
    setTimeLeft(modeSettings[nextMode].time);
  };

  const toggleTimer = () => setIsActive(!isActive);
  
  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(modeSettings[mode].time);
  };

  const changeMode = (newMode: TimerMode) => {
    setMode(newMode);
    setIsActive(false);
    setTimeLeft(modeSettings[newMode].time);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = (timeLeft / modeSettings[mode].time) * 100;

  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <header className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 font-bold text-sm uppercase tracking-widest border border-indigo-100 dark:border-indigo-800">
          <Bell size={16} />
          Focus Protocol Active
        </div>
        <h1 className="text-4xl md:text-5xl font-black tracking-tighter">Your Focus Command Center</h1>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Main Timer Display */}
        <div className="md:col-span-7 bg-white dark:bg-zinc-950 p-10 md:p-16 rounded-[4rem] border border-zinc-200 dark:border-zinc-800 shadow-2xl relative overflow-hidden">
          <div className="relative z-10 flex flex-col items-center">
            {/* Mode Selector */}
            <div className="flex bg-zinc-100 dark:bg-zinc-900 p-1.5 rounded-2xl mb-12 w-full max-w-sm">
              {(Object.keys(modeSettings) as TimerMode[]).map((m) => (
                <button
                  key={m}
                  onClick={() => changeMode(m)}
                  className={cn(
                    "flex-1 py-3 px-2 rounded-xl text-xs font-black uppercase tracking-tighter transition-all duration-300",
                    mode === m 
                      ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 shadow-sm" 
                      : "text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
                  )}
                >
                  {modeSettings[m].label}
                </button>
              ))}
            </div>

            {/* Time Display */}
            <div className="relative mb-12">
              <div className="text-9xl md:text-[10rem] font-mono font-black tracking-tighter leading-none select-none">
                {formatTime(timeLeft)}
              </div>
              <motion.div 
                className="absolute -bottom-4 left-0 right-0 h-1 hidden md:block"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="w-full h-full bg-zinc-100 dark:bg-zinc-900 rounded-full">
                  <motion.div 
                    className={cn("h-full rounded-full transition-colors", modeSettings[mode].color)}
                    style={{ width: `${100 - progress}%` }}
                    transition={{ duration: 1, ease: "linear" }}
                  />
                </div>
              </motion.div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-6">
              <button 
                onClick={resetTimer}
                className="p-5 rounded-3xl bg-zinc-100 dark:bg-zinc-900 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-all hover:scale-105"
              >
                <RotateCcw size={28} />
              </button>
              <button 
                onClick={toggleTimer}
                className={cn(
                  "p-8 rounded-[2.5rem] text-white shadow-2xl transition-all hover:scale-105 active:scale-95",
                  isActive ? "bg-zinc-900 dark:bg-zinc-800 shadow-zinc-500/20" : cn(modeSettings[mode].color, "shadow-indigo-500/30")
                )}
              >
                {isActive ? <Pause size={48} fill="currentColor" /> : <Play size={48} fill="currentColor" className="ml-2" />}
              </button>
              <button className="p-5 rounded-3xl bg-zinc-100 dark:bg-zinc-900 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-all hover:scale-105">
                <Settings2 size={28} />
              </button>
            </div>
          </div>
          
          {/* Subtle background glow */}
          <motion.div 
            animate={{ 
              scale: isActive ? [1, 1.1, 1] : 1,
              opacity: isActive ? [0.1, 0.2, 0.1] : 0.05 
            }}
            transition={{ duration: 3, repeat: Infinity }}
            className={cn(
              "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] rounded-full blur-[100px]",
              modeSettings[mode].color
            )} 
          />
        </div>

        {/* Sidebar stats */}
        <div className="md:col-span-5 space-y-6">
          <section className="bg-indigo-600 p-8 rounded-[3rem] text-white shadow-xl">
            <header className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold">Daily Streak</h2>
              <Trophy className="w-8 h-8 opacity-50" />
            </header>
            <div className="flex items-end gap-2">
              <span className="text-7xl font-black leading-none">{sessionsCompleted}</span>
              <span className="text-xl font-bold uppercase tracking-widest opacity-80 pb-2">Sessions</span>
            </div>
            <p className="mt-4 text-indigo-100 font-medium opacity-90">Keep it up! You're in the top 5% of students today.</p>
          </section>

          <section className="bg-white dark:bg-zinc-900 p-8 rounded-[3rem] border border-zinc-200 dark:border-zinc-800">
            <h3 className="font-bold text-xl mb-6 flex items-center gap-2">
              <History size={20} className="text-zinc-400" />
              Focus Archive
            </h3>
            <div className="space-y-4">
              {[
                { label: 'Deep Work', time: '50m', status: 'completed' },
                { label: 'Review', time: '25m', status: 'completed' },
                { label: 'Study session', time: '--', status: 'pending' },
              ].map((s, i) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50">
                  <div className="flex items-center gap-3">
                    <div className={cn("w-2 h-2 rounded-full", s.status === 'completed' ? 'bg-indigo-500' : 'bg-zinc-300')} />
                    <span className="font-bold text-zinc-700 dark:text-zinc-200">{s.label}</span>
                  </div>
                  <span className="font-mono text-zinc-400 font-bold">{s.time}</span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
