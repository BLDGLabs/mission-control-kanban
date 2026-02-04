import React from 'react';

const StatsBar = ({ tasks }) => {
  const now = new Date();
  const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  
  const tasksThisWeek = tasks.filter(task => {
    const createdAt = new Date(task.createdAt);
    return createdAt >= oneWeekAgo;
  }).length;

  const inProgress = tasks.filter(task => task.column === 'In Progress').length;
  const totalTasks = tasks.length;
  const completed = tasks.filter(task => task.column === 'Review').length;
  const completionRate = totalTasks > 0 ? Math.round((completed / totalTasks) * 100) : 0;

  const stats = [
    { label: 'This Week', fullLabel: 'Tasks This Week', value: tasksThisWeek, color: 'text-blue-400' },
    { label: 'In Progress', fullLabel: 'In Progress', value: inProgress, color: 'text-yellow-400' },
    { label: 'Total', fullLabel: 'Total Tasks', value: totalTasks, color: 'text-purple-400' },
    { label: 'Done', fullLabel: 'Completion Rate', value: `${completionRate}%`, color: 'text-green-400' },
  ];

  return (
    <div className="grid grid-cols-4 gap-2 md:gap-4">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-dark-card border border-dark-border rounded-lg p-2 md:p-4 hover:border-gray-600 transition-colors"
        >
          <div className="text-gray-400 text-xs md:text-sm mb-0.5 md:mb-1 truncate">
            <span className="md:hidden">{stat.label}</span>
            <span className="hidden md:inline">{stat.fullLabel}</span>
          </div>
          <div className={`text-lg md:text-3xl font-bold ${stat.color}`}>{stat.value}</div>
        </div>
      ))}
    </div>
  );
};

export default StatsBar;
