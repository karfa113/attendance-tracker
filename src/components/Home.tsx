import React from 'react';
import { Calendar, Coffee, CheckCircle, XCircle, Clock, Minus } from 'lucide-react';
import { Subject, AttendanceRecord } from '../types/attendance';



export interface HomeProps {
  subjects: Subject[];
  schedules: any[];
  records: AttendanceRecord[];
  onMarkAttendance: (subjectId: string, occurrence: number, status: 'attended' | 'absent' | 'off' | null) => void;
  onBulkMarkAttendance?: (updates: { subjectId: string; occurrence: number; status: 'attended' | 'absent' | 'off' | null }[]) => void;
}

export const Home: React.FC<HomeProps> = ({ subjects, schedules, records, onMarkAttendance, onBulkMarkAttendance }) => {


  // Get today's schedule as a flat list of subject occurrences (not just unique subjects)
  // Build a list of { subject, occurrence } for today
  const todayScheduleRaw = (() => {
    const today = new Date().toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
    const schedule = schedules.find((s: any) => s.day === today);
    if (!schedule) return [];
    return schedule.subjects.map((subjectId: string) => subjects.find(subject => subject.id === subjectId)).filter(Boolean) as Subject[];
  })();

  // Build a list of { subject, occurrence } for today
  const subjectOccurrenceList: { subject: Subject; occurrence: number }[] = [];
  const occurrenceMap: Record<string, number> = {};
  todayScheduleRaw.forEach((subject) => {
    if (!subject) return;
    if (!(subject.id in occurrenceMap)) occurrenceMap[subject.id] = 0;
    subjectOccurrenceList.push({ subject, occurrence: occurrenceMap[subject.id] });
    occurrenceMap[subject.id] += 1;
  });

  const today = new Date().toISOString().split('T')[0];

  // Get today's attendance record for a subject occurrence
  const getTodayRecord = (subjectId: string, occurrence: number) => {
    return records.find(record => record.subjectId === subjectId && record.date === today && record.occurrence === occurrence);
  };

  // Bulk mark handler: mark all occurrences for today using correct occurrence index
  const handleBulkMark = (status: 'attended' | 'absent' | 'off' | null) => {
    if (typeof onBulkMarkAttendance === 'function') {
      const updates = subjectOccurrenceList.map(({ subject, occurrence }) => ({
        subjectId: subject.id,
        occurrence,
        status
      }));
      onBulkMarkAttendance(updates);
    } else {
      subjectOccurrenceList.forEach(({ subject, occurrence }) => {
        onMarkAttendance(subject.id, occurrence, status);
      });
    }
  };

  const getStatusButton = (status: string, isActive: boolean, onClick: () => void, icon: React.ReactNode, label: string) => {
    const baseClasses = "flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg font-medium text-sm transition-all";
    const activeClasses = {
      attended: "bg-green-500 text-white shadow-lg",
      absent: "bg-red-500 text-white shadow-lg",
      off: "bg-gray-500 text-white shadow-lg",
      clear: "bg-blue-500 text-white shadow-lg"
    };
    const inactiveClasses = "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700";

    return (
      <button
        onClick={onClick}
        className={`${baseClasses} ${isActive ? activeClasses[status as keyof typeof activeClasses] : inactiveClasses}`}
      >
        {icon}
        <span className="hidden sm:inline">{label}</span>
      </button>
    );
  };

  if (subjectOccurrenceList.length === 0) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-8 text-center">
          <div className="mb-6">
            <Coffee className="w-16 h-16 text-blue-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Day Off! 🎉</h2>
            <p className="text-gray-600 dark:text-gray-400">No classes scheduled for today. Enjoy your free time!</p>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Make the most of your day</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Use this time to catch up on assignments, review previous lessons, or simply relax and recharge!
            </p>
          </div>
        </div>
      </div>
    );
  }


  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center gap-3 mb-6">
          <Calendar className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Today's Classes</h2>
            <p className="text-gray-600 dark:text-gray-400">
              {new Date().toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
          </div>
        </div>

        {/* Bulk attendance tab */}
        <div className="flex justify-center gap-4 mb-8">
          <div className="grid grid-cols-4 gap-2 w-full max-w-2xl">
            {getStatusButton(
              'attended',
              false,
              () => handleBulkMark('attended'),
              <CheckCircle className="w-4 h-4" />,
              'Attended'
            )}
            {getStatusButton(
              'absent',
              false,
              () => handleBulkMark('absent'),
              <XCircle className="w-4 h-4" />,
              'Absent'
            )}
            {getStatusButton(
              'off',
              false,
              () => handleBulkMark('off'),
              <Clock className="w-4 h-4" />,
              'Off'
            )}
            {getStatusButton(
              'clear',
              false,
              () => handleBulkMark(null),
              <Minus className="w-4 h-4" />,
              'Clear'
            )}
          </div>
        </div>

        <div className="space-y-4">
          {subjectOccurrenceList.map(({ subject, occurrence }) => {
            const record = getTodayRecord(subject.id, occurrence);
            const currentStatus = record?.status;

            return (
              <div
                key={subject.id + '-' + occurrence}
                className="border border-gray-200 dark:border-gray-700 rounded-xl p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: subject.color }}
                    />
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">{subject.name}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{subject.code}</p>
                      <span className="text-xs text-gray-400">Class {occurrence + 1} today</span>
                    </div>
                  </div>
                  {currentStatus && (
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      Marked as {currentStatus}
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-4 gap-2">
                  {getStatusButton(
                    'attended',
                    currentStatus === 'attended',
                    () => onMarkAttendance(subject.id, occurrence, 'attended'),
                    <CheckCircle className="w-4 h-4" />,
                    'Attended'
                  )}
                  {getStatusButton(
                    'absent',
                    currentStatus === 'absent',
                    () => onMarkAttendance(subject.id, occurrence, 'absent'),
                    <XCircle className="w-4 h-4" />,
                    'Absent'
                  )}
                  {getStatusButton(
                    'off',
                    currentStatus === 'off',
                    () => onMarkAttendance(subject.id, occurrence, 'off'),
                    <Clock className="w-4 h-4" />,
                    'Off'
                  )}
                  {getStatusButton(
                    'clear',
                    false,
                    () => onMarkAttendance(subject.id, occurrence, null),
                    <Minus className="w-4 h-4" />,
                    'Clear'
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};