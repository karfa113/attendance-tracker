import React from 'react';
import { BarChart3, TrendingUp, AlertTriangle, Target } from 'lucide-react';
import { AttendanceStats } from '../types/attendance';

interface StatisticsProps {
  stats: AttendanceStats[];
  requiredPercentage: number;
}

export const Statistics: React.FC<StatisticsProps> = ({ stats, requiredPercentage }) => {
  const overallStats = stats.reduce(
    (acc, stat) => {
      acc.totalClasses += stat.totalClasses;
      acc.attendedClasses += stat.attendedClasses;
      acc.absentClasses += stat.absentClasses;
      return acc;
    },
    { totalClasses: 0, attendedClasses: 0, absentClasses: 0 }
  );

  const overallPercentage = overallStats.totalClasses > 0 
    ? (overallStats.attendedClasses / overallStats.totalClasses) * 100 
    : 0;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-300';
      case 'good': return 'text-blue-600 bg-blue-100 dark:bg-blue-900 dark:text-blue-300';
      case 'warning': return 'text-amber-600 bg-amber-100 dark:bg-amber-900 dark:text-amber-300';
      case 'critical': return 'text-red-600 bg-red-100 dark:bg-red-900 dark:text-red-300';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  const getProgressColor = (percentage: number) => {
    if (percentage >= 90) return 'bg-green-500';
    if (percentage >= 80) return 'bg-blue-500';
    if (percentage >= requiredPercentage) return 'bg-amber-500';
    return 'bg-red-500';
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Overall Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Overall Attendance</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{overallPercentage.toFixed(1)}%</p>
            </div>
            <TrendingUp className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Classes</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{overallStats.totalClasses}</p>
            </div>
            <BarChart3 className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Classes Attended</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{overallStats.attendedClasses}</p>
            </div>
            <Target className="w-8 h-8 text-green-600 dark:text-green-400" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Classes Missed</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{overallStats.absentClasses}</p>
            </div>
            <AlertTriangle className="w-8 h-8 text-red-600 dark:text-red-400" />
          </div>
        </div>
      </div>

      {/* Subject-wise Statistics */}
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Subject-wise Statistics</h2>
        </div>
        <div className="p-6">
          {stats.length === 0 ? (
            <div className="text-center py-8">
              <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-600 dark:text-gray-400">No attendance data available</p>
            </div>
          ) : (
            <div className="space-y-6">
              {stats.map((stat) => (
                <div key={stat.subjectId} className="border border-gray-100 dark:border-gray-700 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white">{stat.subjectName}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{stat.subjectCode}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-gray-900 dark:text-white">{stat.percentage.toFixed(1)}%</p>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${getStatusColor(stat.status)}`}>
                        {stat.status}
                      </span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600 dark:text-gray-400 mb-3">
                    <div>
                      <span className="font-medium">Attended:</span> {stat.attendedClasses}
                    </div>
                    <div>
                      <span className="font-medium">Absent:</span> {stat.absentClasses}
                    </div>
                    <div>
                      <span className="font-medium">Off Days:</span> {stat.offClasses}
                    </div>
                    <div>
                      <span className="font-medium">Total:</span> {stat.totalClasses}
                    </div>
                  </div>

                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-3">
                    <div 
                      className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(stat.percentage)}`}
                      style={{ width: `${Math.min(stat.percentage, 100)}%` }}
                    />
                  </div>

                  {stat.percentage < requiredPercentage && stat.classesNeeded > 0 && (
                    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3">
                      <p className="text-sm text-red-700 dark:text-red-300">
                        <AlertTriangle className="w-4 h-4 inline mr-1" />
                        You need to attend {stat.classesNeeded} more consecutive classes to reach {requiredPercentage}%
                      </p>
                    </div>
                  )}

                  {stat.percentage >= requiredPercentage && stat.canMiss > 0 && (
                    <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-3">
                      <p className="text-sm text-green-700 dark:text-green-300">
                        <Target className="w-4 h-4 inline mr-1" />
                        You can miss {stat.canMiss} more classes and still maintain {requiredPercentage}%
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};