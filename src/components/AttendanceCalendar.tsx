import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Calendar, Check, X, Clock, Minus } from 'lucide-react';
import { AttendanceRecord, Subject } from '../types/attendance';

interface AttendanceCalendarProps {
  records: AttendanceRecord[];
  subjects: Subject[];
  onEditAttendance: (date: string, subjectId: string, occurrence: number, status: 'attended' | 'absent' | 'off' | null) => void;
}

export const AttendanceCalendar: React.FC<AttendanceCalendarProps & { schedules: any[] }> = ({ records, subjects, onEditAttendance, schedules }) => {
  // Start with today as default
  const [currentDate, setCurrentDate] = useState(new Date());
  // By default, select today's date if in current month, else first day
  const today = new Date();
  const isCurrentMonth =
    today.getFullYear() === currentDate.getFullYear() &&
    today.getMonth() === currentDate.getMonth();
  const [selectedDay, setSelectedDay] = useState<number | null>(
    isCurrentMonth ? today.getDate() : 1
  );

  // When month changes, update selectedDay to today if in current month, else 1
  useEffect(() => {
    if (
      today.getFullYear() === currentDate.getFullYear() &&
      today.getMonth() === currentDate.getMonth()
    ) {
      setSelectedDay(today.getDate());
    } else {
      setSelectedDay(1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentDate]);

  const getStatusColor = (status: string | null | undefined) => {
    switch (status) {
      case 'attended': return 'bg-green-500';
      case 'absent': return 'bg-red-500';
      case 'off': return 'bg-blue-500';
      default: return 'bg-gray-300';
    }
  };

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const navigateMonth = (direction: number) => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + direction, 1));
  };

  const getRecordsForDate = (day: number) => {
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return records.filter(record => record.date === dateStr);
  };

  const renderCalendarDay = (day: number, isCurrentMonth: boolean) => {
    // Get the weekday string for this date
    const dateObj = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    const weekday = dateObj.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
    // Find the schedule for this weekday
    const schedule = (schedules || []).find((s: any) => s.day === weekday);
    let scheduledSubjectIds: string[] = [];
    if (schedule && Array.isArray(schedule.subjects)) {
      scheduledSubjectIds = schedule.subjects;
    }
    // Build subject occurrence list for this day
    const subjectOccurrenceList: { subjectId: string; occurrence: number }[] = [];
    const occMap: Record<string, number> = {};
    scheduledSubjectIds.forEach(subjectId => {
      if (!(subjectId in occMap)) occMap[subjectId] = 0;
      subjectOccurrenceList.push({ subjectId, occurrence: occMap[subjectId] });
      occMap[subjectId] += 1;
    });
    // Get records for this date
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const dayRecords = records.filter(record => record.date === dateStr);
    const isSelected = isCurrentMonth && selectedDay === day;

    // Determine dot color for the day
    let dotColor = 'bg-gray-300'; // empty
    if (subjectOccurrenceList.length > 0) {
      const statuses = subjectOccurrenceList.map(({ subjectId, occurrence }) => {
        const rec = dayRecords.find(r => r.subjectId === subjectId && r.occurrence === occurrence);
        return rec?.status || null;
      });
      const uniqueStatuses = Array.from(new Set(statuses));
      if (uniqueStatuses.length === 1) {
        switch (uniqueStatuses[0]) {
          case 'attended': dotColor = 'bg-green-500'; break;
          case 'absent': dotColor = 'bg-red-500'; break;
          case 'off': dotColor = 'bg-blue-500'; break;
          case null:
          case undefined:
          default: dotColor = 'bg-gray-300'; break;
        }
      } else if (uniqueStatuses.length > 1) {
        dotColor = 'bg-purple-500'; // mixed
      }
    }

    return (
      <button
        key={day}
        type="button"
        onClick={() => isCurrentMonth && setSelectedDay(day)}
        className={`min-h-[64px] w-full p-2 border border-transparent flex flex-col items-center justify-start rounded-lg transition-all
          ${isCurrentMonth
            ? (isSelected
              ? 'bg-blue-600 text-white dark:bg-blue-500 dark:text-white'
              : 'bg-white hover:bg-blue-50 text-gray-900 dark:bg-gray-800 dark:hover:bg-blue-900 dark:text-gray-100')
            : 'bg-gray-50 text-gray-400 dark:bg-gray-900 dark:text-gray-600'}
          ${isCurrentMonth ? 'cursor-pointer' : 'cursor-default'}
        `}
        style={{ outline: isSelected ? '2px solid #2563eb' : undefined }}
      >
        <div className={`text-base font-semibold ${isSelected ? 'text-white dark:text-white' : isCurrentMonth ? 'text-gray-900 dark:text-gray-100' : 'text-gray-400 dark:text-gray-600'}`}>
          {day}
        </div>
        {subjectOccurrenceList.length > 0 && (
          <div className="flex gap-1 mt-1">
            <div
              className={`w-3 h-3 rounded-full border-2 border-white dark:border-gray-800 ${dotColor}`}
              title={
                dotColor === 'bg-purple-500'
                  ? 'Mixed attendance'
                  : dotColor === 'bg-green-500'
                    ? 'All attended'
                    : dotColor === 'bg-red-500'
                      ? 'All absent'
                      : dotColor === 'bg-blue-500'
                        ? 'All off'
                        : 'Not marked'
              }
            />
          </div>
        )}
      </button>
    );
  };

  const daysInMonth = getDaysInMonth(currentDate);
  const firstDayOfMonth = getFirstDayOfMonth(currentDate);
  const daysInPrevMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate();

  const calendarDays = [];

  // Previous month days (disabled)
  if (firstDayOfMonth > 0) {
    for (let i = firstDayOfMonth - 1; i >= 0; i--) {
      calendarDays.push(
        <button
          key={`prev-${i}`}
          type="button"
          disabled
          className="min-h-[64px] w-full p-2 flex flex-col items-center justify-start rounded-lg bg-transparent text-gray-400 dark:text-gray-700 cursor-default"
        >
          <div className="text-base font-semibold">{daysInPrevMonth - i}</div>
        </button>
      );
    }
  }

  // Current month days (interactive)
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(renderCalendarDay(day, true));
  }

  // Next month days (disabled)
  const totalCells = calendarDays.length;
  const nextMonthDays = (7 - (totalCells % 7)) % 7;
  for (let day = 1; day <= nextMonthDays; day++) {
    calendarDays.push(
      <button
        key={`next-${day}`}
        type="button"
        disabled
        className="min-h-[64px] w-full p-2 flex flex-col items-center justify-start rounded-lg bg-transparent text-gray-400 dark:text-gray-700 cursor-default"
      >
        <div className="text-base font-semibold">{day}</div>
      </button>
    );
  }

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  return (
    <div className="flex justify-center items-center min-h-[80vh] bg-gray-50 dark:bg-gray-950 py-8">
      <div className="w-full max-w-2xl bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800 p-8">
        <div className="flex items-center gap-3 mb-6">
          <Calendar className="w-7 h-7 text-blue-400" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Edit Attendance by Date</h2>
        </div>
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => navigateMonth(-1)}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          >
            <ChevronLeft className="w-6 h-6 text-gray-400 dark:text-gray-300" />
          </button>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white min-w-[180px] text-center">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h3>
          <button
            onClick={() => navigateMonth(1)}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          >
            <ChevronRight className="w-6 h-6 text-gray-400 dark:text-gray-300" />
          </button>
        </div>
        {/* Weekday headers */}
        <div className="grid grid-cols-7 gap-0 mb-2">
          {weekDays.map(day => (
            <div key={day} className="text-center text-base font-medium text-gray-500 dark:text-gray-400 py-2">
              {day}
            </div>
          ))}
        </div>
        {/* Calendar grid */}
        <div className="grid grid-cols-7 gap-1 mb-6">
          {calendarDays}
        </div>
        {/* Legend - efficient color coding with round dots */}
        <div className="flex flex-wrap gap-8 mb-8 text-base justify-center">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-green-400 inline-block"></span>
            <span className="text-gray-700 dark:text-gray-200">Attended</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-400 inline-block"></span>
            <span className="text-gray-700 dark:text-gray-200">Absent</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-yellow-400 inline-block"></span>
            <span className="text-gray-700 dark:text-gray-200">Off</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-gray-400 inline-block"></span>
            <span className="text-gray-700 dark:text-gray-200">Not marked</span>
          </div>
        </div>
        {/* Attendance details for selected day: always show scheduled classes for that weekday */}
        {selectedDay && (() => {
          // Get the weekday string for the selected date
          const dateObj = new Date(currentDate.getFullYear(), currentDate.getMonth(), selectedDay);
          const weekday = dateObj.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
          // Find the schedule for this weekday from props (passed from App)
          const schedule = (schedules || []).find((s: any) => s.day === weekday);
          let scheduledSubjectIds: string[] = [];
          if (schedule && Array.isArray(schedule.subjects)) {
            scheduledSubjectIds = schedule.subjects;
          }
          // If not found, fallback to showing all subjects (should not happen)
          if (!scheduledSubjectIds.length && subjects.length) {
            scheduledSubjectIds = subjects.map(s => s.id);
          }
          // For each scheduled subject, show all occurrences (matching Home page logic)
          const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(selectedDay).padStart(2, '0')}`;
          const dayRecords = records.filter(record => record.date === dateStr);
          // Count occurrences for each subjectId
          const occurrenceCount: Record<string, number> = {};
          scheduledSubjectIds.forEach(subjectId => {
            occurrenceCount[subjectId] = (occurrenceCount[subjectId] || 0) + 1;
          });
          // Build a flat list of { subjectId, occurrence }
          const subjectOccurrenceList: { subjectId: string; occurrence: number }[] = [];
          const occMap: Record<string, number> = {};
          scheduledSubjectIds.forEach(subjectId => {
            if (!(subjectId in occMap)) occMap[subjectId] = 0;
            subjectOccurrenceList.push({ subjectId, occurrence: occMap[subjectId] });
            occMap[subjectId] += 1;
          });
          return (
            <div className="mt-6 bg-gray-100 dark:bg-gray-800 rounded-xl p-6">
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                {monthNames[currentDate.getMonth()]} {selectedDay}, {currentDate.getFullYear()}
              </h4>
              {subjectOccurrenceList.length === 0 ? (
                <div className="text-gray-400 italic">No classes scheduled for this day.</div>
              ) : (
                subjectOccurrenceList.map(({ subjectId, occurrence }) => {
                  const subject = subjects.find(s => s.id === subjectId);
                  const record = dayRecords.find(r => r.subjectId === subjectId && r.occurrence === occurrence);
                  return (
                    <div key={subjectId + '-' + occurrence} className="flex items-center justify-between py-2 border-b border-gray-200 dark:border-gray-700 last:border-b-0">
                      <div className="flex items-center gap-3">
                        <span className="w-3 h-3 rounded-full" style={{ backgroundColor: subject?.color || '#6B7280' }}></span>
                        <span className="font-semibold text-gray-900 dark:text-white">{subject?.name || 'Unknown'}</span>
                        <span className="text-gray-500 dark:text-gray-400 text-sm">{subject?.code}</span>
                        <span className="text-gray-500 dark:text-gray-400 text-sm">Class {occurrence + 1}</span>
                      </div>
                      <div className="flex gap-2">
                        {[{ value: 'attended', color: 'bg-green-500', label: 'Attended', icon: <Check className="w-4 h-4" /> }, { value: 'absent', color: 'bg-red-500', label: 'Absent', icon: <X className="w-4 h-4" /> }, { value: 'off', color: 'bg-blue-500', label: 'Off', icon: <Clock className="w-4 h-4" /> }, { value: null, color: 'bg-gray-700', label: 'Clear', icon: <Minus className="w-4 h-4" /> }].map(option => (
                          <button
                            key={option.label}
                            className={`w-6 h-6 rounded-full border-2 flex items-center justify-center focus:outline-none transition-colors
                              ${option.color} ${(record && record.status === option.value) ? 'ring-2 ring-blue-400' : 'opacity-60 hover:opacity-100'}`}
                            title={option.label}
                            onClick={() => onEditAttendance(
                              dateStr,
                              subjectId,
                              occurrence,
                              option.value as any
                            )}
                            aria-label={option.label}
                          >
                            {option.icon}
                          </button>
                        ))}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          );
        })()}
      </div>
    </div>
  );
};