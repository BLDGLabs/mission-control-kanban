import { useState, useEffect } from 'react';
import { DndContext, DragOverlay, closestCorners, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, arrayMove } from '@dnd-kit/sortable';
import StatsBar from './components/StatsBar';
import Column from './components/Column';
import TaskCard from './components/TaskCard';
import ActivityFeed from './components/ActivityFeed';
import TaskModal from './components/TaskModal';
import './App.css';

const COLUMNS = ['Recurring', 'Backlog', 'In Progress', 'Review'];

function App() {
  const [tasks, setTasks] = useState([]);
  const [activities, setActivities] = useState([]);
  const [activeId, setActiveId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  // Load data from localStorage
  useEffect(() => {
    const savedTasks = localStorage.getItem('kanban-tasks');
    const savedActivities = localStorage.getItem('kanban-activities');
    
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
    if (savedActivities) {
      setActivities(JSON.parse(savedActivities));
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (tasks.length > 0 || activities.length > 0) {
      localStorage.setItem('kanban-tasks', JSON.stringify(tasks));
      localStorage.setItem('kanban-activities', JSON.stringify(activities));
    }
  }, [tasks, activities]);

  const addActivity = (type, taskTitle, fromColumn = null, toColumn = null) => {
    const activity = {
      id: Date.now(),
      type,
      taskTitle,
      fromColumn,
      toColumn,
      timestamp: new Date().toISOString(),
    };
    setActivities(prev => [activity, ...prev].slice(0, 50)); // Keep last 50 activities
  };

  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    setActiveId(null);

    if (!over) return;

    const activeTask = tasks.find(t => t.id === active.id);
    const overColumn = over.id;

    if (activeTask && COLUMNS.includes(overColumn) && activeTask.column !== overColumn) {
      setTasks(prevTasks => 
        prevTasks.map(task => 
          task.id === active.id 
            ? { ...task, column: overColumn, updatedAt: new Date().toISOString() }
            : task
        )
      );
      addActivity('moved', activeTask.title, activeTask.column, overColumn);
    }
  };

  const handleAddTask = (taskData) => {
    if (editingTask) {
      setTasks(prevTasks =>
        prevTasks.map(task =>
          task.id === editingTask.id
            ? { ...task, ...taskData, updatedAt: new Date().toISOString() }
            : task
        )
      );
      addActivity('edited', taskData.title);
    } else {
      const newTask = {
        id: Date.now(),
        ...taskData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setTasks(prevTasks => [...prevTasks, newTask]);
      addActivity('created', taskData.title);
    }
    setIsModalOpen(false);
    setEditingTask(null);
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleDeleteTask = (taskId) => {
    const task = tasks.find(t => t.id === taskId);
    setTasks(prevTasks => prevTasks.filter(t => t.id !== taskId));
    if (task) {
      addActivity('deleted', task.title);
    }
  };

  const handleCompleteTask = (taskId) => {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
      addActivity('completed', task.title);
      handleDeleteTask(taskId);
    }
  };

  const getTasksByColumn = (column) => {
    return tasks.filter(task => task.column === column);
  };

  const activeTask = tasks.find(t => t.id === activeId);

  return (
    <div className="min-h-screen bg-dark-bg text-white">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Mission Control</h1>
          <button
            onClick={() => {
              setEditingTask(null);
              setIsModalOpen(true);
            }}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition-colors"
          >
            + New Task
          </button>
        </div>

        {/* Stats Bar */}
        <StatsBar tasks={tasks} />

        <div className="flex gap-6 mt-6">
          {/* Main Board */}
          <div className="flex-1">
            <DndContext
              sensors={sensors}
              collisionDetection={closestCorners}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
            >
              <div className="grid grid-cols-4 gap-4">
                {COLUMNS.map(column => (
                  <Column
                    key={column}
                    id={column}
                    title={column}
                    tasks={getTasksByColumn(column)}
                    onEditTask={handleEditTask}
                    onDeleteTask={handleDeleteTask}
                    onCompleteTask={handleCompleteTask}
                  />
                ))}
              </div>
              <DragOverlay>
                {activeTask ? (
                  <TaskCard task={activeTask} isDragging />
                ) : null}
              </DragOverlay>
            </DndContext>
          </div>

          {/* Activity Feed */}
          <ActivityFeed activities={activities} />
        </div>
      </div>

      {/* Task Modal */}
      {isModalOpen && (
        <TaskModal
          task={editingTask}
          onSave={handleAddTask}
          onClose={() => {
            setIsModalOpen(false);
            setEditingTask(null);
          }}
        />
      )}
    </div>
  );
}

export default App;
