import React from 'react';
import { Calendar, BookOpen, TrendingUp, AlertTriangle } from 'lucide-react';
import { AttendanceStats } from '../types/attendance';

interface DashboardProps {
  stats: AttendanceStats[];
}

export const Dashboard: React.FC<DashboardProps> = ({ stats }) => {
  const overallAttendance = stats.reduce((acc, stat) => {
    acc.totalClasses += stat.totalClasses;
    acc.attendedClasses += stat.attendedClasses;
    return acc;
  }, { totalClasses: 0, attendedClasses: 0 });

  const overallPercentage = (overallAttendance.attendedClasses / overallAttendance.totalClasses) * 100;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'text-green-600 bg-green-100';
      case 'good': return 'text-blue-600 bg-blue-100';
      case 'warning': return 'text-amber-600 bg-amber-100';
      case 'critical': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getProgressColor = (percentage: number) => {
    if (percentage >= 90) return 'bg-green-500';
    if (percentage >= 80) return 'bg-blue-500';
    if (percentage >= 75) return 'bg-amber-500';
    return 'bg-red-500';
  };

  return (
    <div className="space-y-6">
      {/* Overall Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Overall Attendance</p>
              <p className="text-2xl font-bold text-gray-900">{overallPercentage.toFixed(1)}%</p>
            </div>
            <TrendingUp className="w-8 h-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Classes</p>
              <p className="text-2xl font-bold text-gray-900">{overallAttendance.totalClasses}</p>
            </div>
            <BookOpen className="w-8 h-8 text-indigo-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Classes Attended</p>
              <p className="text-2xl font-bold text-gray-900">{overallAttendance.attendedClasses}</p>
            </div>
            <Calendar className="w-8 h-8 text-green-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Classes Missed</p>
              <p className="text-2xl font-bold text-gray-900">{overallAttendance.totalClasses - overallAttendance.attendedClasses}</p>
            </div>
            <AlertTriangle className="w-8 h-8 text-red-600" />
          </div>
        </div>
      </div>

      {/* Subject-wise Attendance */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Subject-wise Attendance</h2>
        </div>
        <div className="p-6">
          <div className="space-y-6">
            {stats.map((stat) => (
              <div key={stat.subjectId} className="border border-gray-100 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="font-medium text-gray-900">{stat.subjectName}</h3>
                    <p className="text-sm text-gray-600">{stat.subjectCode}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-gray-900">{stat.percentage.toFixed(1)}%</p>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${getStatusColor(stat.status)}`}>
                      {stat.status}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                  <span>Classes: {stat.attendedClasses}/{stat.totalClasses}</span>
                  <span>Missed: {stat.totalClasses - stat.attendedClasses}</span>
                </div>

                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(stat.percentage)}`}
                    style={{ width: `${stat.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};