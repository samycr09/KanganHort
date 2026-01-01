import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { getPlants } from '../data/PlantData';
import type { PlantBio } from '../data/PlantData';
import { addLog } from '../data/LogsData';
import { Plus, Edit, Eye, Users, BarChart, Leaf, UserPlus } from 'lucide-react';
import { BackButton } from '../components/BackButton';

export function DashboardPage() {
  const { user } = useAuth();
  const [plants, setPlants] = useState<PlantBio[]>([]);

  useEffect(() => {
    const allPlants = getPlants();
    
    if (user?.role === 'admin') {
      setPlants(allPlants);
    } else {
      // Students only see their own plants
      setPlants(allPlants.filter(p => p.studentId === user?.id));
    }

    addLog({ 
      action: 'page_view', 
      page: 'dashboard',
      userId: user?.id,
      userName: user?.name
    });
  }, [user]);

  const allUsers = JSON.parse(localStorage.getItem('users') || '[]');
  const students = allUsers.filter((u: any) => u.role === 'student');

  return (
    <div className="min-h-[calc(100vh-5rem)] px-4 py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <BackButton to="/" label="Back to Home" />
        </div>
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-green-800 mb-2">
            Welcome, {user?.name}
          </h1>
          <p className="text-gray-600">
            {user?.role === 'admin' 
              ? 'Manage students, plant bios, and view analytics' 
              : 'Create and manage your plant biographies'}
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="text-gray-600">
                {user?.role === 'admin' ? 'Total Plants' : 'My Plants'}
              </div>
              <Leaf className="w-8 h-8 text-green-600" />
            </div>
            <div className="text-green-800">{plants.length}</div>
          </div>

          {user?.role === 'admin' && (
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center justify-between mb-2">
                <div className="text-gray-600">Total Students</div>
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <div className="text-blue-800">{students.length}</div>
            </div>
          )}

          <Link
            to="/logs"
            className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="text-gray-600">View Analytics</div>
              <BarChart className="w-8 h-8 text-purple-600" />
            </div>
            <div className="text-purple-800">Access Logs</div>
          </Link>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-green-800 mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link
              to="/plant-bio/new"
              className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg hover:border-green-500 hover:bg-green-50 transition-all"
            >
              <div className="p-2 bg-green-100 rounded-lg">
                <Plus className="w-6 h-6 text-green-700" />
              </div>
              <div>
                <div className="text-gray-900">Create Plant Bio</div>
                <div className="text-gray-500">Add new plant information</div>
              </div>
            </Link>

            {user?.role === 'admin' && (
              <Link
                to="/register"
                className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all"
              >
                <div className="p-2 bg-blue-100 rounded-lg">
                  <UserPlus className="w-6 h-6 text-blue-700" />
                </div>
                <div>
                  <div className="text-gray-900">Register User</div>
                  <div className="text-gray-500">Create student account</div>
                </div>
              </Link>
            )}

            <Link
              to="/logs"
              className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-all"
            >
              <div className="p-2 bg-purple-100 rounded-lg">
                <BarChart className="w-6 h-6 text-purple-700" />
              </div>
              <div>
                <div className="text-gray-900">View Logs</div>
                <div className="text-gray-500">Access analytics</div>
              </div>
            </Link>
          </div>
        </div>

        {/* Plants List */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-green-800">
              {user?.role === 'admin' ? 'All Plant Biographies' : 'My Plant Biographies'}
            </h2>
            <Link
              to="/plant-bio/new"
              className="flex items-center gap-2 px-4 py-2 bg-green-700 hover:bg-green-800 text-white rounded-lg transition-colors"
            >
              <Plus className="w-5 h-5" />
              New Plant
            </Link>
          </div>

          {plants.length === 0 ? (
            <div className="text-center py-12">
              <Leaf className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600 mb-4">No plant biographies yet</p>
              <Link
                to="/plant-bio/new"
                className="inline-flex items-center gap-2 px-6 py-3 bg-green-700 hover:bg-green-800 text-white rounded-lg transition-colors"
              >
                <Plus className="w-5 h-5" />
                Create Your First Plant Bio
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {plants.map(plant => (
                <div
                  key={plant.id}
                  className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow"
                >
                  <h3 className="text-gray-900 mb-2">{plant.commonName}</h3>
                  <p className="text-gray-600 italic mb-3">{plant.botanicalName}</p>
                  <div className="mb-4">
                    <span className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full">
                      {plant.indigenousSeason}
                    </span>
                  </div>
                  {user?.role === 'admin' && (
                    <p className="text-gray-500 mb-4">
                      Student: {plant.studentName}
                    </p>
                  )}
                  <div className="flex gap-2">
                    <Link
                      to={`/plant/${plant.id}`}
                      className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                      View
                    </Link>
                    <Link
                      to={`/plant-bio/edit/${plant.id}`}
                      className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-green-100 hover:bg-green-200 text-green-700 rounded-lg transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                      Edit
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Students List (Admin Only) */}
        {user?.role === 'admin' && (
          <div className="bg-white rounded-2xl shadow-lg p-8 mt-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-green-800">Students</h2>
              <Link
                to="/register"
                className="flex items-center gap-2 px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded-lg transition-colors"
              >
                <UserPlus className="w-5 h-5" />
                Add Student
              </Link>
            </div>

            {students.length === 0 ? (
              <p className="text-gray-600 text-center py-8">No students registered yet</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {students.map((student: any) => {
                  const studentPlants = getPlants().filter(p => p.studentId === student.id);
                  return (
                    <div
                      key={student.id}
                      className="border border-gray-200 rounded-lg p-4"
                    >
                      <div className="text-gray-900 mb-1">{student.name}</div>
                      <div className="text-gray-500 mb-2">{student.email}</div>
                      <div className="text-gray-600">
                        {studentPlants.length} plant{studentPlants.length !== 1 ? 's' : ''}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}