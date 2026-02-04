import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import TaskCard from './TaskCard';

const Column = ({ id, title, tasks, onEditTask, onDeleteTask, onCompleteTask }) => {
  const { setNodeRef } = useDroppable({ id });

  return (
    <div className="flex flex-col h-full">
      <div className="bg-dark-card border border-dark-border rounded-t-lg p-3">
        <h2 className="font-semibold text-lg">{title}</h2>
        <span className="text-sm text-gray-400">{tasks.length} tasks</span>
      </div>
      
      <div
        ref={setNodeRef}
        className="flex-1 bg-dark-card border-x border-b border-dark-border rounded-b-lg p-3 min-h-[600px]"
      >
        <SortableContext items={tasks.map(t => t.id)} strategy={verticalListSortingStrategy}>
          <div className="space-y-3">
            {tasks.map(task => (
              <TaskCard
                key={task.id}
                task={task}
                onEdit={onEditTask}
                onDelete={onDeleteTask}
                onComplete={onCompleteTask}
              />
            ))}
          </div>
        </SortableContext>
      </div>
    </div>
  );
};

export default Column;
