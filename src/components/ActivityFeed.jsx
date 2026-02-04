import React from 'react';

const ActivityFeed = ({ activities }) => {
  const getActivityIcon = (type) => {
    switch (type) {
      case 'created': return '➕';
      case 'completed': return '✅';
      case 'moved': return '➡️';
      case 'edited': return '✏️';
      case 'deleted': return '🗑️';
      default: return '•';
    }
  };

  const getActivityText = (activity) => {
    switch (activity.type) {
      case 'created':
        return `Created "${activity.taskTitle}"`;
      case 'completed':
        return `Completed "${activity.taskTitle}"`;
      case 'moved':
        return `Moved "${activity.taskTitle}" from ${activity.fromColumn} to ${activity.toColumn}`;
      case 'edited':
        return `Edited "${activity.taskTitle}"`;
      case 'deleted':
        return `Deleted "${activity.taskTitle}"`;
      default:
        return activity.taskTitle;
    }
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now - date;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="w-80 bg-dark-card border border-dark-border rounded-lg p-4 h-fit sticky top-6">
      <h2 className="text-xl font-bold mb-4">Activity Feed</h2>
      
      <div className="space-y-3 max-h-[600px] overflow-y-auto">
        {activities.length === 0 ? (
          <p className="text-gray-500 text-sm text-center py-8">No activity yet</p>
        ) : (
          activities.map((activity) => (
            <div
              key={activity.id}
              className="flex gap-3 p-3 bg-dark-hover rounded-lg border border-dark-border hover:border-gray-600 transition-colors"
            >
              <div className="text-xl">{getActivityIcon(activity.type)}</div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-300 break-words">
                  {getActivityText(activity)}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {formatTime(activity.timestamp)}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ActivityFeed;
