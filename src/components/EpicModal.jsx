import React, { useState, useEffect } from 'react';

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

const EpicModal = ({ epic, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    color: PRESET_COLORS[0],
  });

  useEffect(() => {
    if (epic) {
      setFormData({
        name: epic.name || '',
        description: epic.description || '',
        color: epic.color || PRESET_COLORS[0],
      });
    }
  }, [epic]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return;
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-dark-card border border-dark-border rounded-lg w-full max-w-md">
        <div className="border-b border-dark-border p-6">
          <h2 className="text-2xl font-bold">
            {epic ? 'Edit Epic' : 'New Epic'}
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Name *</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="w-full bg-dark-hover border border-dark-border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter epic name..."
              autoFocus
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="w-full bg-dark-hover border border-dark-border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]"
              placeholder="Enter epic description..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Color</label>
            <div className="flex flex-wrap gap-3">
              {PRESET_COLORS.map(color => (
                <button
                  key={color}
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, color }))}
                  className={`w-10 h-10 rounded-lg transition-all ${
                    formData.color === color 
                      ? 'ring-2 ring-white ring-offset-2 ring-offset-dark-card scale-110' 
                      : 'hover:scale-105'
                  }`}
                  style={{ backgroundColor: color }}
                  title={color}
                />
              ))}
            </div>
            <div className="mt-3 flex items-center gap-3 p-3 bg-dark-hover/50 rounded-lg border border-dark-border">
              <div 
                className="w-8 h-8 rounded-full flex-shrink-0"
                style={{ backgroundColor: formData.color }}
              />
              <div className="text-sm text-gray-400">
                Preview: <span className="text-white font-medium">{formData.name || 'Epic Name'}</span>
              </div>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
            >
              {epic ? 'Save Changes' : 'Create Epic'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-dark-hover hover:bg-dark-border text-gray-300 font-medium py-2 px-4 rounded-lg transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EpicModal;
