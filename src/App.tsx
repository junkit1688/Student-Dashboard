import { useState, useEffect } from 'react';
import { 
  BarChart3, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  LayoutDashboard, 
  Settings, 
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Moon,
  Sun,
  Menu,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from './types';
import Dashboard from './components/Dashboard';
import TaskManagement from './components/TaskManagement';
import PomodoroTimer from './components/PomodoroTimer';
import Analytics from './components/Analytics';

type View = 'dashboard' | 'tasks' | 'timer' | 'analytics';

export default function App() {
  const [activeView, setActiveView] = useState<View>('dashboard');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const navItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Overview' },
    { id: 'tasks', icon: CheckCircle2, label: 'Tasks' },
    { id: 'timer', icon: Clock, label: 'Focus Timer' },
    { id: 'analytics', icon: BarChart3, label: 'Analytics' },
  ];

  const renderView = () => {
    switch (activeView) {
      case 'dashboard': return <Dashboard />;
      case 'tasks': return <TaskManagement />;
      case 'timer': return <PomodoroTimer />;
      case 'analytics': return <Analytics />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className={cn(
      "min-h-screen transition-colors duration-300",
      isDarkMode ? "bg-zinc-950 text-zinc-100 dark" : "bg-zinc-50 text-zinc-900"
    )}>
      {/* Sidebar - Desktop */}
      <aside className={cn(
        "fixed left-0 top-0 h-full hidden md:flex flex-col border-r border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 transition-all duration-300 z-50",
        isSidebarCollapsed ? "w-20" : "w-64"
      )}>
        <div className={cn("p-6 flex items-center", isSidebarCollapsed ? "justify-center" : "justify-between")}>
          <AnimatePresence mode="wait">
            {!isSidebarCollapsed && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex items-center gap-2"
              >
                <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                <span className="font-bold text-xl tracking-tight">StudyFlow</span>
              </motion.div>
            )}
          </AnimatePresence>
          <button 
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            className={cn("p-1.5 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors", isSidebarCollapsed ? "mt-2" : "")}
          >
            {isSidebarCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
        </div>

        <nav className="flex-1 px-4 space-y-1.5 mt-4">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id as View)}
              className={cn(
                "w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-200 group relative",
                activeView === item.id 
                  ? "bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400" 
                  : "hover:bg-zinc-100 dark:hover:bg-zinc-900 text-zinc-500 dark:text-zinc-400"
              )}
            >
              <item.icon className={cn(
                "w-5 h-5 shrink-0 transition-colors",
                activeView === item.id ? "text-indigo-600 dark:text-indigo-400" : "group-hover:text-zinc-800 dark:group-hover:text-zinc-200"
              )} />
              {!isSidebarCollapsed && <span className="font-medium whitespace-nowrap">{item.label}</span>}
              {activeView === item.id && (
                <motion.div 
                  layoutId="activeNav"
                  className="absolute left-0 w-1 h-6 bg-indigo-600 dark:bg-indigo-400 rounded-r-full" 
                />
              )}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-zinc-200 dark:border-zinc-800 space-y-1.5">
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors text-zinc-500 dark:text-zinc-400"
          >
            {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            {!isSidebarCollapsed && <span className="font-medium">{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>}
          </button>
          <button className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors text-zinc-500 dark:text-zinc-400">
            <Settings className="w-5 h-5" />
            {!isSidebarCollapsed && <span className="font-medium">Settings</span>}
          </button>
        </div>
      </aside>

      {/* Header - Mobile */}
      <header className="md:hidden fixed top-0 w-full h-16 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800 z-40 flex items-center justify-between px-6">
        <div className="flex items-center gap-2">
          <BookOpen className="w-6 h-6 text-indigo-600" />
          <span className="font-bold text-lg tracking-tight">StudyFlow</span>
        </div>
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-900"
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </header>

      {/* Mobile Menu Backdrop */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-zinc-900/40 backdrop-blur-sm z-40 md:hidden"
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 w-72 bg-white dark:bg-zinc-950 z-50 md:hidden p-6 flex flex-col shadow-2xl"
            >
              <div className="flex items-center gap-2 mb-10">
                <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <span className="font-bold text-2xl tracking-tight">StudyFlow</span>
              </div>
              <nav className="flex-1 space-y-2">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveView(item.id as View);
                      setIsMobileMenuOpen(false);
                    }}
                    className={cn(
                      "w-full flex items-center gap-4 p-4 rounded-2xl transition-all",
                      activeView === item.id 
                        ? "bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 shadow-sm" 
                        : "text-zinc-500 dark:text-zinc-400"
                    )}
                  >
                    <item.icon className="w-6 h-6" />
                    <span className="font-semibold text-lg">{item.label}</span>
                  </button>
                ))}
              </nav>
              <div className="pt-6 border-t border-zinc-200 dark:border-zinc-800 space-y-4">
                <button
                  onClick={() => setIsDarkMode(!isDarkMode)}
                  className="w-full flex items-center gap-4 p-4 text-zinc-500 dark:text-zinc-400"
                >
                  {isDarkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
                  <span className="font-semibold">{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className={cn(
        "transition-all duration-300 min-h-screen",
        "pt-16 md:pt-0",
        isSidebarCollapsed ? "md:pl-20" : "md:pl-64"
      )}>
        <div className="max-w-7xl mx-auto p-4 md:p-8 lg:p-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeView}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              {renderView()}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
