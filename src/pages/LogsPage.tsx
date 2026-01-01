import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { getLogs, getLogStats } from '../data/LogsData';
import type { LogEntry } from '../data/LogsData';
import { addLog } from '../data/LogsData';
import { BarChart, Eye, Activity, Users, Calendar, Filter } from 'lucide-react';
import { BackButton } from '../components/BackButton';

export function LogsPage() {
  const { user } = useAuth();
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [filter, setFilter] = useState<'all' | 'page_view' | 'plant_view' | 'user_activity'>('all');

  useEffect(() => {
    const allLogs = getLogs();
    setLogs(allLogs);
    setStats(getLogStats());

    addLog({ 
      action: 'page_view', 
      page: 'logs',
      userId: user?.id,
      userName: user?.name
    });
  }, [user]);

  const filteredLogs = logs.filter(log => {
    if (filter === 'all') return true;
    if (filter === 'page_view') return log.action === 'page_view';
    if (filter === 'plant_view') return log.action === 'plant_view';
    if (filter === 'user_activity') return log.action !== 'page_view' && log.action !== 'plant_view';
    return true;
  });

  const formatAction = (action: string) => {
    return action.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleString('en-AU', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-[calc(100vh-5rem)] px-4 py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <BackButton to="/dashboard" />
        </div>
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-green-800 mb-2">Analytics & Logs</h1>
          <p className="text-gray-600">
            Track page views, plant bio access, and user activity
          </p>
        </div>

        {/* Stats Cards */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center justify-between mb-2">
                <div className="text-gray-600">Total Events</div>
                <Activity className="w-8 h-8 text-gray-600" />
              </div>
              <div className="text-gray-800">{stats.totalLogs}</div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center justify-between mb-2">
                <div className="text-gray-600">Page Views</div>
                <Eye className="w-8 h-8 text-blue-600" />
              </div>
              <div className="text-blue-800">
                {Object.values(stats.pageViews as Record<string, number>).reduce((a: number, b: number) => a + b, 0)}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center justify-between mb-2">
                <div className="text-gray-600">Plant Views</div>
                <BarChart className="w-8 h-8 text-green-600" />
              </div>
              <div className="text-green-800">
                {Object.values(stats.plantViews as Record<string, any>).reduce((a: number, b: any) => a + b.count, 0)}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center justify-between mb-2">
                <div className="text-gray-600">Active Users</div>
                <Users className="w-8 h-8 text-purple-600" />
              </div>
              <div className="text-purple-800">
                {Object.keys(stats.studentActivity).length}
              </div>
            </div>
          </div>
        )}

        {/* Page View Breakdown */}
        {stats && Object.keys(stats.pageViews).length > 0 && (
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-green-800 mb-6">Page View Breakdown</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(stats.pageViews as Record<string, number>)
                .sort(([, a], [, b]) => b - a)
                .map(([page, count]) => (
                  <div key={page} className="p-4 bg-gray-50 rounded-lg">
                    <div className="text-gray-600 mb-1 capitalize">{page.replace('_', ' ')}</div>
                    <div className="text-gray-900">{count} views</div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* Plant View Stats */}
        {stats && Object.keys(stats.plantViews).length > 0 && (
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-green-800 mb-6">Most Viewed Plants</h2>
            <div className="space-y-3">
              {Object.entries(stats.plantViews as Record<string, any>)
                .sort(([, a], [, b]) => b.count - a.count)
                .slice(0, 10)
                .map(([plantId, data]) => (
                  <div key={plantId} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-green-100 rounded-lg">
                        <Eye className="w-5 h-5 text-green-700" />
                      </div>
                      <span className="text-gray-900">{data.name}</span>
                    </div>
                    <span className="text-gray-600">{data.count} views</span>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* Student Activity (Admin Only) */}
        {user?.role === 'admin' && stats && Object.keys(stats.studentActivity).length > 0 && (
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-green-800 mb-6">Student Activity</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(stats.studentActivity as Record<string, any>)
                .sort(([, a], [, b]) => b.count - a.count)
                .map(([userId, data]) => (
                  <div key={userId} className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Users className="w-5 h-5 text-purple-700" />
                      <div className="text-gray-900">{data.name}</div>
                    </div>
                    <div className="text-gray-600">{data.count} actions</div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* Activity Log */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-green-800">Activity Log</h2>
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-600" />
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value as any)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="all">All Events</option>
                <option value="page_view">Page Views</option>
                <option value="plant_view">Plant Views</option>
                <option value="user_activity">User Actions</option>
              </select>
            </div>
          </div>

          {filteredLogs.length === 0 ? (
            <p className="text-center text-gray-600 py-8">No activity logs yet</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-gray-600">Time</th>
                    <th className="text-left py-3 px-4 text-gray-600">Action</th>
                    <th className="text-left py-3 px-4 text-gray-600">Page</th>
                    {user?.role === 'admin' && (
                      <th className="text-left py-3 px-4 text-gray-600">User</th>
                    )}
                    <th className="text-left py-3 px-4 text-gray-600">Details</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLogs.slice(0, 100).map((log) => (
                    <tr key={log.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 text-gray-600 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          {formatDate(log.timestamp)}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full">
                          {formatAction(log.action)}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-gray-700 capitalize">
                        {log.page.replace('_', ' ')}
                      </td>
                      {user?.role === 'admin' && (
                        <td className="py-3 px-4 text-gray-700">
                          {log.userName || 'Visitor'}
                        </td>
                      )}
                      <td className="py-3 px-4 text-gray-600">
                        {log.plantName || '-'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}