import React, { useState } from 'react';

const EpicSidebar = ({ epics, selectedEpicId, onSelectEpic, onCreateEpic, onEditEpic, onDeleteEpic, tasks }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  const getTaskCountForEpic = (epicId) => {
    return tasks.filter(task => task.epicId === epicId).length;
  };

  const handleCreateClick = () => {
    setIsCreating(true);
  };

  const handleCreateEpic = (epicData) => {
    onCreateEpic(epicData);
    setIsCreating(false);
  };

  if (isCollapsed) {
    return (
      <div className="bg-dark-card border-r border-dark-border flex flex-col items-center py-4 w-12">
        <button
          onClick={() => setIsCollapsed(false)}
          className="text-gray-400 hover:text-white transition-colors rotate-180"
          title="Expand Epic Sidebar"
        >
          ◀
        </button>
        <div className="mt-6 text-xs text-gray-500 [writing-mode:vertical-lr] rotate-180">
          Epics
        </div>
      </div>
    );
  }

  return (
    <div className="bg-dark-card border-r border-dark-border w-64 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-dark-border flex items-center justify-between">
        <h2 className="font-bold text-lg">Epics</h2>
        <button
          onClick={() => setIsCollapsed(true)}
          className="text-gray-400 hover:text-white transition-colors"
          title="Collapse Epic Sidebar"
        >
          ◀
        </button>
      </div>

      {/* Epic List */}
      <div className="flex-1 overflow-y-auto p-2">
        {/* All Tasks Option */}
        <button
          onClick={() => onSelectEpic(null)}
          className={`w-full text-left px-3 py-2.5 rounded-lg mb-2 transition-all ${
            selectedEpicId === null
              ? 'bg-blue-600/20 border border-blue-500/50 text-white'
              : 'hover:bg-dark-hover text-gray-300'
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-400 to-purple-500"></div>
              <span className="font-medium">All Tasks</span>
            </div>
            <span className="text-xs text-gray-500 font-semibold bg-dark-bg px-2 py-0.5 rounded">
              {tasks.length}
            </span>
          </div>
        </button>

        {/* Epic Items */}
        {epics.map(epic => (
          <EpicItem
            key={epic.id}
            epic={epic}
            isSelected={selectedEpicId === epic.id}
            taskCount={getTaskCountForEpic(epic.id)}
            onSelect={() => onSelectEpic(epic.id)}
            onEdit={() => onEditEpic(epic)}
            onDelete={() => onDeleteEpic(epic.id)}
          />
        ))}

        {/* Create New Epic */}
        {isCreating ? (
          <EpicForm
            onSave={handleCreateEpic}
            onCancel={() => setIsCreating(false)}
          />
        ) : (
          <button
            onClick={handleCreateClick}
            className="w-full text-left px-3 py-2.5 rounded-lg mt-2 border border-dashed border-gray-600 hover:border-gray-500 text-gray-400 hover:text-gray-300 transition-all flex items-center gap-2"
          >
            <span className="text-lg">+</span>
            <span className="text-sm">New Epic</span>
          </button>
        )}
      </div>
    </div>
  );
};

const EpicItem = ({ epic, isSelected, taskCount, onSelect, onEdit, onDelete }) => {
  const [showActions, setShowActions] = useState(false);

  return (
    <div
      className={`relative group mb-2 rounded-lg transition-all ${
        isSelected ? 'ring-2 ring-blue-500/50' : ''
      }`}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      <button
        onClick={onSelect}
        className={`w-full text-left px-3 py-2.5 rounded-lg transition-all ${
          isSelected
            ? 'bg-dark-hover border border-gray-600 text-white'
            : 'hover:bg-dark-hover/50 text-gray-300'
        }`}
      >
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <div
              className="w-3 h-3 rounded-full flex-shrink-0"
              style={{ backgroundColor: epic.color }}
            ></div>
            <span className="font-medium text-sm truncate">{epic.name}</span>
          </div>
          <span className="text-xs text-gray-500 font-semibold bg-dark-bg px-2 py-0.5 rounded flex-shrink-0">
            {taskCount}
          </span>
        </div>
        {epic.description && (
          <p className="text-xs text-gray-500 line-clamp-1 ml-5">{epic.description}</p>
        )}
      </button>
      
      {/* Action Buttons */}
      {showActions && (
        <div className="absolute right-2 top-2 flex gap-1 bg-dark-card/95 rounded px-1 py-0.5 shadow-lg">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit();
            }}
            className="text-gray-400 hover:text-blue-400 text-xs px-1"
            title="Edit Epic"
          >
            ✏️
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (window.confirm(`Delete "${epic.name}"? Tasks will not be deleted, just unlinked.`)) {
                onDelete();
              }
            }}
            className="text-gray-400 hover:text-red-400 text-xs px-1"
            title="Delete Epic"
          >
            🗑️
          </button>
        </div>
      )}
    </div>
  );
};

const PRESET_COLORS = [
  '#3b82f6', // blue
  '#8b5cf6', // purple
  '#ec4899', // pink
  '#f59e0b', // amber
  '#10b981', // green
  '#06b6d4', // cyan
  '#f97316', // orange
  '#ef4444', // red
  '#14b8a6', // teal
  '#6366f1', // indigo
];

const EpicForm = ({ epic, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: epic?.name || '',
    description: epic?.description || '',
    color: epic?.color || PRESET_COLORS[0],
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return;
    onSave(formData);
  };

  return (
    <div className="bg-dark-hover border border-dark-border rounded-lg p-3 mb-2">
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            className="w-full bg-dark-bg border border-dark-border rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="Epic name..."
            autoFocus
          />
        </div>
        <div>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            className="w-full bg-dark-bg border border-dark-border rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none"
            placeholder="Description (optional)..."
            rows="2"
          />
        </div>
        <div>
          <div className="text-xs text-gray-400 mb-2">Color:</div>
          <div className="flex flex-wrap gap-2">
            {PRESET_COLORS.map(color => (
              <button
                key={color}
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, color }))}
                className={`w-6 h-6 rounded-full transition-transform ${
                  formData.color === color ? 'ring-2 ring-white ring-offset-2 ring-offset-dark-hover scale-110' : ''
                }`}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>
        <div className="flex gap-2">
          <button
            type="submit"
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-sm py-1.5 px-3 rounded transition-colors"
          >
            {epic ? 'Save' : 'Create'}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 bg-dark-bg hover:bg-dark-border text-gray-300 text-sm py-1.5 px-3 rounded transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export { EpicForm };
export default EpicSidebar;
