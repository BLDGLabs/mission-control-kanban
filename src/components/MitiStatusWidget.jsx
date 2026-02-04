import { useState, useEffect } from 'react';
import { getLatestMitiStatus } from '../services/miti-status';

function formatRelativeTime(timestamp) {
  const now = Date.now();
  const diff = now - timestamp;
  
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  
  if (hours > 0) {
    return `${hours}h ago`;
  } else if (minutes > 0) {
    return `${minutes}m ago`;
  } else {
    return 'just now';
  }
}

function extractTaskSummary(task) {
  if (!task) return 'No task info';
  
  // Try to get first meaningful line
  const lines = task.split('\n').filter(line => line.trim());
  for (const line of lines) {
    const cleaned = line.replace(/^[#*-]+\s*/, '').trim();
    if (cleaned && cleaned.length > 5 && !cleaned.startsWith('**')) {
      return cleaned.length > 60 ? cleaned.substring(0, 57) + '...' : cleaned;
    }
  }
  
  return task.length > 60 ? task.substring(0, 57) + '...' : task;
}

export default function MitiStatusWidget() {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchStatus = async () => {
    try {
      const data = await getLatestMitiStatus();
      setStatus(data);
      setError(null);
    } catch (err) {
      console.error('Error fetching Miti status:', err);
      setError('Failed to fetch status');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStatus();
    
    // Auto-refresh every 30 seconds
    const interval = setInterval(fetchStatus, 30000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center gap-2 px-3 py-1.5 bg-dark-card border border-gray-800 rounded-lg">
        <div className="w-2 h-2 rounded-full bg-gray-500 animate-pulse"></div>
        <span className="text-xs text-gray-500">Loading...</span>
      </div>
    );
  }

  if (error || !status) {
    return (
      <div className="flex items-center gap-2 px-3 py-1.5 bg-dark-card border border-gray-800 rounded-lg">
        <div className="w-2 h-2 rounded-full bg-gray-600"></div>
        <span className="text-xs text-gray-500">Miti offline</span>
      </div>
    );
  }

  const isRecent = Date.now() - status.timestamp < 5 * 60 * 1000; // Within 5 minutes
  const isRunning = status.status === 'running';
  
  // Determine indicator color
  let indicatorColor = 'bg-gray-500'; // Inactive
  if (isRunning) {
    indicatorColor = 'bg-green-500 animate-pulse'; // Running
  } else if (isRecent) {
    indicatorColor = 'bg-yellow-500'; // Recent but not running
  }

  return (
    <div className="flex items-center gap-2 px-3 py-2 bg-dark-card border border-gray-800 rounded-lg hover:border-gray-700 transition-colors group">
      {/* Activity indicator */}
      <div className={`w-2.5 h-2.5 rounded-full ${indicatorColor} shrink-0`}></div>
      
      {/* Main content */}
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-white">Miti</span>
          <span className={`text-xs px-1.5 py-0.5 rounded ${
            isRunning 
              ? 'bg-green-500/10 text-green-400 border border-green-500/30' 
              : 'bg-gray-500/10 text-gray-400 border border-gray-500/30'
          }`}>
            {status.status || 'idle'}
          </span>
        </div>
        
        {/* Task summary - only show if running or recent */}
        {(isRunning || isRecent) && status.task && (
          <p className="text-xs text-gray-400 truncate mt-0.5 max-w-[200px]" title={status.task}>
            {extractTaskSummary(status.task)}
          </p>
        )}
      </div>
      
      {/* Timestamp */}
      <span className="text-xs text-gray-500 shrink-0">
        {formatRelativeTime(status.timestamp)}
      </span>
    </div>
  );
}
