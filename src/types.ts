export interface Task {
  id: string;
  name: string;
}

export interface TaskProgress {
  [date: string]: {
    [taskId: string]: boolean;
  };
}

export interface HabitTrackerState {
  tasks: Task[];
  progress: TaskProgress;
  darkMode: boolean;
}