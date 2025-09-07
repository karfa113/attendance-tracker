import React, { useState } from 'react';
import { Calendar, Plus, X } from 'lucide-react';
import { Subject, DaySchedule } from '../types/attendance';

interface ScheduleManagerProps {
  subjects: Subject[];
  schedules: DaySchedule[];
  onUpdateSchedule: (dayId: string, subjectIds: string[]) => void;
}

const days = [
  { id: 'monday', name: 'Monday' },
  { id: 'tuesday', name: 'Tuesday' },
  { id: 'wednesday', name: 'Wednesday' },
  { id: 'thursday', name: 'Thursday' },
  { id: 'friday', name: 'Friday' },
  { id: 'saturday', name: 'Saturday' },
  { id: 'sunday', name: 'Sunday' }
];

export const ScheduleManager: React.FC<ScheduleManagerProps> = ({
  subjects,
  schedules,
  onUpdateSchedule
}) => {
  const [editingDay, setEditingDay] = useState<string | null>(null);

  const getDaySchedule = (dayId: string) => {
    return schedules.find(schedule => schedule.day === dayId) || { day: dayId, subjects: [] };
  };

  const getSubjectName = (subjectId: string) => {
    const subject = subjects.find(s => s.id === subjectId);
    return subject ? `${subject.name} (${subject.code})` : 'Unknown Subject';
  };

  const getSubjectColor = (subjectId: string) => {
    const subject = subjects.find(s => s.id === subjectId);
    return subject?.color || '#6B7280';
  };

  const addSubjectToDay = (dayId: string, subjectId: string) => {
    const daySchedule = getDaySchedule(dayId);
    if (!daySchedule.subjects.includes(subjectId)) {
      onUpdateSchedule(dayId, [...daySchedule.subjects, subjectId]);
    }
  };

  const removeSubjectFromDay = (dayId: string, subjectId: string) => {
    const daySchedule = getDaySchedule(dayId);
    onUpdateSchedule(dayId, daySchedule.subjects.filter(id => id !== subjectId));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <Calendar className="w-6 h-6 text-blue-600 dark:text-blue-400" />
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Weekly Schedule</h2>
      </div>

      <div className="space-y-4">
        {days.map((day) => {
          const daySchedule = getDaySchedule(day.id);
          const isEditing = editingDay === day.id;

          return (
            <div
              key={day.id}
              className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{day.name}</h3>
                <button
                  onClick={() => setEditingDay(isEditing ? null : day.id)}
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
                >
                  {isEditing ? 'Done' : 'Edit'}
                </button>
              </div>

              <div className="space-y-3">
                {daySchedule.subjects.length === 0 ? (
                  <p className="text-gray-500 dark:text-gray-400 italic">No classes scheduled</p>
                ) : (
                  <div className="space-y-2">
                    {daySchedule.subjects.map((subjectId, index) => (
                      <div
                        key={subjectId}
                        className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className="w-4 h-4 rounded-full"
                            style={{ backgroundColor: getSubjectColor(subjectId) }}
                          />
                          <span className="font-medium text-gray-900 dark:text-white">
                            Class {index + 1}: {getSubjectName(subjectId)}
                          </span>
                        </div>
                        {isEditing && (
                          <button
                            onClick={() => removeSubjectFromDay(day.id, subjectId)}
                            className="text-red-500 hover:text-red-700 transition-colors"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {isEditing && (
                  <div className="mt-4">
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Add subjects to {day.name}:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {subjects
                        .filter(subject => !daySchedule.subjects.includes(subject.id))
                        .map((subject) => (
                          <button
                            key={subject.id}
                            onClick={() => addSubjectToDay(day.id, subject.id)}
                            className="flex items-center gap-2 px-3 py-2 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                            {subject.name}
                          </button>
                        ))}
                    </div>
                    {subjects.filter(subject => !daySchedule.subjects.includes(subject.id)).length === 0 && (
                      <p className="text-sm text-gray-500 dark:text-gray-400">All subjects are already scheduled for this day</p>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {subjects.length === 0 && (
        <div className="text-center py-12">
          <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No subjects available</h3>
          <p className="text-gray-600 dark:text-gray-400">Add some subjects first to create your schedule</p>
        </div>
      )}
    </div>
  );
};