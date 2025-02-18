import React from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { Task } from '../types';

interface TaskListProps {
  tasks: Task[];
  onAddTask: () => void;
  onRemoveTask: (id: string) => void;
}

export const TaskList: React.FC<TaskListProps> = ({ tasks, onAddTask, onRemoveTask }) => {
  return (
    <div className="flex flex-col gap-2 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold dark:text-white">Tasks</h2>
        <button
          onClick={onAddTask}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        >
          <Plus size={18} />
          Add Task
        </button>
      </div>
      <div className="space-y-2">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-md"
          >
            <span className="dark:text-white">{task.name}</span>
            <button
              onClick={() => onRemoveTask(task.id)}
              className="text-red-500 hover:text-red-600 transition-colors"
            >
              <Trash2 size={18} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};