import React from 'react';
import { Settings, BookOpen } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';


interface HeaderProps {
  onSettingsClick: () => void;
  totalAttendancePercentage?: number;
}

export const Header: React.FC<HeaderProps> = ({ onSettingsClick, totalAttendancePercentage }) => {
  return (
    <header className="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-3">
            <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-lg">
              <BookOpen className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">Axion</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">Manage your attendance & tasks</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {typeof totalAttendancePercentage === 'number' && (
              <div
                className={
                  'px-3 py-1 rounded-lg font-semibold text-sm border ' +
                  (totalAttendancePercentage >= 90
                    ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 border-green-300 dark:border-green-700'
                    : totalAttendancePercentage >= 80
                      ? 'bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300 border-yellow-300 dark:border-yellow-700'
                      : totalAttendancePercentage >= 75
                        ? 'bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300 border-orange-300 dark:border-orange-700'
                        : 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 border-red-300 dark:border-red-700')
                }
                title="Total attendance percentage"
              >
                {totalAttendancePercentage.toFixed(1)}%
              </div>
            )}
            <ThemeToggle />
            <button
              onClick={onSettingsClick}
              className="p-2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              title="Settings"
            >
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};