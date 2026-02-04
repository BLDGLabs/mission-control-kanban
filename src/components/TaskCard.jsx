import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const TAG_COLORS = {
  bug: 'bg-red-500/20 text-red-400 border-red-500/30',
  feature: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  improvement: 'bg-green-500/20 text-green-400 border-green-500/30',
  urgent: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  documentation: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
};

const TaskCard = ({ task, onEdit, onDelete, onComplete, isDragging }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now - date;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="bg-dark-hover border border-dark-border rounded-lg p-4 cursor-grab active:cursor-grabbing hover:border-gray-600 transition-all group"
    >
      <div className="flex items-start justify-between mb-2">
        <h3 className="font-medium text-white flex-1">{task.title}</h3>
        <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit(task);
            }}
            className="text-gray-400 hover:text-blue-400 text-sm"
          >
            ✏️
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onComplete(task.id);
            }}
            className="text-gray-400 hover:text-green-400 text-sm"
          >
            ✓
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(task.id);
            }}
            className="text-gray-400 hover:text-red-400 text-sm"
          >
            🗑️
          </button>
        </div>
      </div>
      
      {task.description && (
        <p className="text-sm text-gray-400 mb-3 line-clamp-2">{task.description}</p>
      )}
      
      <div className="flex items-center justify-between">
        <div className="flex gap-2 flex-wrap">
          {task.tags?.map((tag, index) => (
            <span
              key={index}
              className={`text-xs px-2 py-1 rounded border ${TAG_COLORS[tag] || TAG_COLORS.feature}`}
            >
              {tag}
            </span>
          ))}
        </div>
        <span className="text-xs text-gray-500">
          {formatDate(task.updatedAt || task.createdAt)}
        </span>
      </div>
    </div>
  );
};

export default TaskCard;
