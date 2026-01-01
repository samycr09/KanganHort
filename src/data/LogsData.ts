export interface LogEntry {
  id: string;
  userId?: string;
  userName?: string;
  action: string;
  page: string;
  plantId?: string;
  plantName?: string;
  timestamp: string;
  ipAddress?: string;
}

export function getLogs(): LogEntry[] {
  const stored = localStorage.getItem('logs');
  return stored ? JSON.parse(stored) : [];
}

export function addLog(log: Omit<LogEntry, 'id' | 'timestamp'>): void {
  const logs = getLogs();
  const newLog: LogEntry = {
    ...log,
    id: `log-${Date.now()}-${Math.random()}`,
    timestamp: new Date().toISOString()
  };
  
  logs.unshift(newLog); // Add to beginning
  
  // Keep only last 1000 logs
  if (logs.length > 1000) {
    logs.splice(1000);
  }
  
  localStorage.setItem('logs', JSON.stringify(logs));
}

export function getLogStats() {
  const logs = getLogs();
  
  // Page view counts
  const pageViews: Record<string, number> = {};
  logs.forEach(log => {
    if (log.action === 'page_view') {
      pageViews[log.page] = (pageViews[log.page] || 0) + 1;
    }
  });
  
  // Plant view counts
  const plantViews: Record<string, { count: number; name: string }> = {};
  logs.forEach(log => {
    if (log.action === 'plant_view' && log.plantId && log.plantName) {
      if (!plantViews[log.plantId]) {
        plantViews[log.plantId] = { count: 0, name: log.plantName };
      }
      plantViews[log.plantId].count++;
    }
  });
  
  // Student activity
  const studentActivity: Record<string, { count: number; name: string }> = {};
  logs.forEach(log => {
    if (log.userId && log.userName && log.action !== 'page_view') {
      if (!studentActivity[log.userId]) {
        studentActivity[log.userId] = { count: 0, name: log.userName };
      }
      studentActivity[log.userId].count++;
    }
  });
  
  return {
    pageViews,
    plantViews,
    studentActivity,
    totalLogs: logs.length
  };
}
