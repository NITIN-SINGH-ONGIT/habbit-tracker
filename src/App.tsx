import React, { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { TaskList } from './components/TaskList';
import { ProgressGrid } from './components/ProgressGrid';
import { HabitTrackerState, Task } from './types';
import { getDatesForYear } from './utils';

const STORAGE_KEY = 'habit-tracker-state';

function App() {
  const [state, setState] = useState<HabitTrackerState>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved
      ? JSON.parse(saved)
      : {
          tasks: [],
          progress: {},
          darkMode: window.matchMedia('(prefers-color-scheme: dark)').matches,
        };
  });

  const dates = getDatesForYear();

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    if (state.darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [state]);

  const handleAddTask = () => {
    const taskName = prompt('Enter task name:');
    if (taskName?.trim()) {
      setState((prev) => ({
        ...prev,
        tasks: [...prev.tasks, { id: crypto.randomUUID(), name: taskName.trim() }],
      }));
    }
  };

  const handleRemoveTask = (id: string) => {
    if (confirm('Are you sure you want to remove this task?')) {
      setState((prev) => ({
        ...prev,
        tasks: prev.tasks.filter((t) => t.id !== id),
        progress: Object.fromEntries(
          Object.entries(prev.progress).map(([date, tasks]) => [
            date,
            Object.fromEntries(
              Object.entries(tasks).filter(([taskId]) => taskId !== id)
            ),
          ])
        ),
      }));
    }
  };

  const handleToggleTask = (date: string, taskId: string) => {
    setState((prev) => ({
      ...prev,
      progress: {
        ...prev.progress,
        [date]: {
          ...prev.progress[date],
          [taskId]: !prev.progress[date]?.[taskId],
        },
      },
    }));
  };

  const toggleDarkMode = () => {
    setState((prev) => ({
      ...prev,
      darkMode: !prev.darkMode,
    }));
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors">
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold dark:text-white">Habit Tracker</h1>
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            {state.darkMode ? (
              <Sun className="text-white" size={24} />
            ) : (
              <Moon size={24} />
            )}
          </button>
        </div>

        <div className="flex flex-col lg:grid lg:grid-cols-[300px,1fr] gap-6">
          <TaskList
            tasks={state.tasks}
            onAddTask={handleAddTask}
            onRemoveTask={handleRemoveTask}
          />
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
            <div className="w-full">
              <ProgressGrid
                dates={dates}
                tasks={state.tasks}
                progress={state.progress}
                onToggleTask={handleToggleTask}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;