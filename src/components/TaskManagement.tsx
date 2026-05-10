import { useState, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Plus, 
  Trash2, 
  CheckCircle2, 
  Circle, 
  Calendar, 
  Tag, 
  Filter,
  Search,
  MoreVertical,
  Flag
} from 'lucide-react';
import { cn, Task, Priority } from '../types';

const PRIORITY_COLORS = {
  low: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-900/20',
  medium: 'text-amber-500 bg-amber-50 dark:bg-amber-900/20',
  high: 'text-rose-500 bg-rose-50 dark:bg-rose-900/20'
};

export default function TaskManagement() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem('studyflow_tasks');
    return saved ? JSON.parse(saved) : [
      { id: '1', title: 'Calculus Assignment Chapter 4', completed: false, priority: 'high', category: 'Math', dueDate: '2023-05-15' },
      { id: '2', title: 'English Essay Draft', completed: true, priority: 'medium', category: 'English', dueDate: '2023-05-12' },
      { id: '3', title: 'Read History Unit 2', completed: false, priority: 'low', category: 'History', dueDate: '2023-05-14' },
    ];
  });

  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  useEffect(() => {
    localStorage.setItem('studyflow_tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (e: FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    
    const newTask: Task = {
      id: Date.now().toString(),
      title: newTaskTitle,
      completed: false,
      priority: 'medium',
      category: 'General',
      dueDate: new Date().toISOString().split('T')[0]
    };
    
    setTasks([newTask, ...tasks]);
    setNewTaskTitle('');
  };

  const toggleTask = (id: string) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase());
    if (filter === 'completed') return matchesSearch && task.completed;
    if (filter === 'active') return matchesSearch && !task.completed;
    return matchesSearch;
  });

  return (
    <div className="space-y-8">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Tasks & Missions</h1>
          <p className="text-zinc-500 dark:text-zinc-400 mt-1">Conquer your day one goal at a time.</p>
        </div>
        
        <form onSubmit={addTask} className="flex-1 max-w-md">
          <div className="relative">
            <input
              type="text"
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              placeholder="What needs to be done?"
              className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl py-4 pl-6 pr-14 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 font-medium transition-all shadow-sm"
            />
            <button 
              type="submit"
              className="absolute right-2 top-2 p-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-500/20"
            >
              <Plus size={24} />
            </button>
          </div>
        </form>
      </header>

      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-zinc-100 dark:bg-zinc-900/50 p-2 rounded-2xl">
        <div className="flex bg-white dark:bg-zinc-900 p-1 rounded-xl shadow-sm border border-zinc-200 dark:border-zinc-800 overflow-hidden">
          {(['all', 'active', 'completed'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                "px-6 py-2.5 rounded-lg text-sm font-bold uppercase tracking-wider transition-all",
                filter === f 
                  ? "bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 shadow-sm" 
                  : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100"
              )}
            >
              {f}
            </button>
          ))}
        </div>
        
        <div className="relative w-full md:w-64">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/10"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        <AnimatePresence mode="popLayout" initial={false}>
          {filteredTasks.length > 0 ? (
            filteredTasks.map((task) => (
              <motion.div
                key={task.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className={cn(
                  "group flex items-center gap-4 p-5 rounded-3xl border transition-all duration-300",
                  task.completed 
                    ? "bg-zinc-50 dark:bg-zinc-900/30 border-transparent opacity-60" 
                    : "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 hover:border-indigo-200 dark:hover:border-indigo-500/30 shadow-sm hover:shadow-md"
                )}
              >
                <button 
                  onClick={() => toggleTask(task.id)}
                  className={cn(
                    "p-1 rounded-full transition-colors",
                    task.completed ? "text-indigo-600" : "text-zinc-300 hover:text-zinc-400"
                  )}
                >
                  {task.completed ? <CheckCircle2 size={24} /> : <Circle size={24} />}
                </button>
                
                <div className="flex-1 min-w-0">
                  <p className={cn(
                    "font-bold text-lg md:text-xl truncate transition-all",
                    task.completed && "line-through text-zinc-400"
                  )}>
                    {task.title}
                  </p>
                  <div className="flex flex-wrap items-center gap-3 mt-1 text-xs">
                    <span className={cn("px-2 py-0.5 rounded-full font-bold uppercase tracking-tighter", PRIORITY_COLORS[task.priority])}>
                      {task.priority}
                    </span>
                    <span className="flex items-center gap-1 text-zinc-400 font-bold uppercase tracking-tighter">
                      <Tag size={12} />
                      {task.category}
                    </span>
                    <span className="flex items-center gap-1 text-zinc-400 font-bold uppercase tracking-tighter">
                      <Calendar size={12} />
                      {task.dueDate}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="p-2.5 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-400 hover:text-zinc-600">
                    <Flag size={18} />
                  </button>
                  <button 
                    onClick={() => deleteTask(task.id)}
                    className="p-2.5 rounded-xl hover:bg-rose-50 dark:hover:bg-rose-900/20 text-zinc-400 hover:text-rose-500"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </motion.div>
            ))
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-20 text-center"
            >
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-zinc-100 dark:bg-zinc-900 mb-6">
                <CheckCircle2 className="w-10 h-10 text-zinc-300 dark:text-zinc-700" />
              </div>
              <h3 className="text-xl font-bold text-zinc-400">All clear!</h3>
              <p className="text-zinc-500 dark:text-zinc-400">Enjoy your free time or start a new task.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
