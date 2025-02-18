import React from 'react';
import { Task, TaskProgress } from '../types';
import { formatDate, calculateDailyProgress } from '../utils';

interface ProgressGridProps {
  dates: Date[];
  tasks: Task[];
  progress: TaskProgress;
  onToggleTask: (date: string, taskId: string) => void;
}

export const ProgressGrid: React.FC<ProgressGridProps> = ({
  dates,
  tasks,
  progress,
  onToggleTask,
}) => {
  return (
    <div className="overflow-x-auto overflow-y-auto max-h-[calc(100vh-12rem)]">
      <table className="w-full border-collapse" style={{ minWidth: '800px' }}>
        <thead>
          <tr className="sticky top-0 bg-white dark:bg-gray-800 z-20">
            <th className="sticky left-0 z-30 bg-white dark:bg-gray-800 p-2 border dark:border-gray-700 min-w-[180px] whitespace-nowrap">
              Date
            </th>
            {tasks.map((task) => (
              <th
                key={task.id}
                className="p-2 border dark:border-gray-700 dark:text-white whitespace-nowrap min-w-[140px]"
              >
                {task.name}
              </th>
            ))}
            <th className="p-2 border dark:border-gray-700 dark:text-white min-w-[100px]">
              Progress
            </th>
          </tr>
        </thead>
        <tbody>
          {dates.map((date, index) => {
            const dateStr = date.toISOString().split('T')[0];
            const dailyProgress = calculateDailyProgress(
              dateStr,
              tasks.map((t) => t.id),
              progress
            );
            const isComplete = dailyProgress === 100;

            return (
              <tr
                key={dateStr}
                className={`${
                  isComplete ? 'bg-green-50 dark:bg-green-900/20' : ''
                } hover:bg-gray-50 dark:hover:bg-gray-700/50`}
              >
                <td className="sticky left-0 z-10 bg-white dark:bg-gray-800 p-2 border dark:border-gray-700 dark:text-white whitespace-nowrap">
                  {formatDate(date, index + 1)}
                </td>
                {tasks.map((task) => (
                  <td
                    key={task.id}
                    className="p-2 border dark:border-gray-700 text-center"
                  >
                    <input
                      type="checkbox"
                      checked={progress[dateStr]?.[task.id] || false}
                      onChange={() => onToggleTask(dateStr, task.id)}
                      className="w-4 h-4 rounded border-gray-300 dark:border-gray-600 text-blue-500 focus:ring-blue-500"
                    />
                  </td>
                ))}
                <td className="p-2 border dark:border-gray-700 dark:text-white text-center">
                  {dailyProgress}%
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};