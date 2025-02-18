export const formatDate = (date: Date, dayNumber: number): string => {
  const isoDate = date.toISOString().split('T')[0];
  return `${isoDate} (Day-${dayNumber})`;
};

export const getDatesForYear = (): Date[] => {
  const dates: Date[] = [];
  const startDate = new Date(2025, 2, 1); // March 1st, 2025 (month is 0-based)

  for (let i = 0; i < 365; i++) {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i);
    dates.push(date);
  }

  return dates;
};

export const calculateDailyProgress = (
  date: string,
  tasks: string[],
  progress: { [date: string]: { [taskId: string]: boolean } }
): number => {
  if (!tasks.length) return 0;
  const dayProgress = progress[date] || {};
  const completed = tasks.filter((taskId) => dayProgress[taskId]).length;
  return Math.round((completed / tasks.length) * 100);
};