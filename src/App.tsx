import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Navigation } from './components/Navigation';
import { Home } from './components/Home';
import { SubjectManager } from './components/SubjectManager';
import { ScheduleManager } from './components/ScheduleManager';
import { Statistics } from './components/Statistics';
import { TodoList } from './components/TodoList';
import { Settings } from './components/Settings';
import { useLocalStorage } from './hooks/useLocalStorage';
import { useTheme } from './hooks/useTheme';
import { calculateAttendanceStats } from './utils/attendanceCalculations';
import { defaultSubjects, defaultSchedules, defaultSettings } from './data/defaultData';
import { Subject, DaySchedule, AttendanceRecord, TodoItem, UserSettings } from './types/attendance';

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [showSettings, setShowSettings] = useState(false);

  // Data management with localStorage
  const [subjects, setSubjects] = useLocalStorage<Subject[]>('subjects', defaultSubjects);
  const [schedules, setSchedules] = useLocalStorage<DaySchedule[]>('schedules', defaultSchedules);
  const [records, setRecords] = useLocalStorage<AttendanceRecord[]>('attendance-records', []);
  const [todos, setTodos] = useLocalStorage<TodoItem[]>('todos', []);
  const [settings, setSettings] = useLocalStorage<UserSettings>('settings', defaultSettings);

  // Theme management
  const { theme } = useTheme();

  // Calculate attendance statistics
  const stats = calculateAttendanceStats(subjects, records, settings.requiredPercentage);

  // Subject management
  const handleAddSubject = (subjectData: Omit<Subject, 'id'>) => {
    const newSubject: Subject = {
      ...subjectData,
      id: Date.now().toString()
    };
    setSubjects([...subjects, newSubject]);
  };

  const handleUpdateSubject = (id: string, updates: Partial<Subject>) => {
    setSubjects(subjects.map(subject =>
      subject.id === id ? { ...subject, ...updates } : subject
    ));
  };

  const handleDeleteSubject = (id: string) => {
    setSubjects(subjects.filter(subject => subject.id !== id));
    // Also remove from schedules
    setSchedules(schedules.map(schedule => ({
      ...schedule,
      subjects: schedule.subjects.filter(subjectId => subjectId !== id)
    })));
    // Remove attendance records
    setRecords(records.filter(record => record.subjectId !== id));
  };

  // Schedule management
  const handleUpdateSchedule = (dayId: string, subjectIds: string[]) => {
    const existingSchedule = schedules.find(s => s.day === dayId);
    if (existingSchedule) {
      setSchedules(schedules.map(schedule =>
        schedule.day === dayId ? { ...schedule, subjects: subjectIds } : schedule
      ));
    } else {
      setSchedules([...schedules, {
        id: Date.now().toString(),
        day: dayId as any,
        subjects: subjectIds
      }]);
    }
  };

  // Attendance management (now supports multiple occurrences per day)
  const handleMarkAttendance = (subjectId: string, occurrence: number, status: 'attended' | 'absent' | 'off' | null) => {
    const today = new Date().toISOString().split('T')[0];
    const existingRecord = records.find(record =>
      record.subjectId === subjectId && record.date === today && record.occurrence === occurrence
    );

    if (status === null) {
      // Clear attendance
      if (existingRecord) {
        setRecords(records.filter(record => record.id !== existingRecord.id));
      }
    } else {
      if (existingRecord) {
        // Update existing record
        setRecords(records.map(record =>
          record.id === existingRecord.id
            ? { ...record, status, timestamp: Date.now() }
            : record
        ));
      } else {
        // Create new record
        const newRecord: AttendanceRecord = {
          id: Date.now().toString(),
          subjectId,
          date: today,
          occurrence,
          status,
          timestamp: Date.now()
        };
        setRecords([...records, newRecord]);
      }
    }
  };

  // Todo management
  const handleAddTodo = (todoData: Omit<TodoItem, 'id' | 'createdAt'>) => {
    const newTodo: TodoItem = {
      ...todoData,
      id: Date.now().toString(),
      createdAt: Date.now()
    };
    setTodos([...todos, newTodo]);
  };

  const handleToggleTodo = (id: string) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const handleDeleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  // Settings management
  const handleUpdateSettings = (newSettings: UserSettings) => {
    setSettings(newSettings);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <Home
            subjects={subjects}
            schedules={schedules}
            records={records}
            onMarkAttendance={handleMarkAttendance}
          />
        );
      case 'subjects':
        return (
          <SubjectManager
            subjects={subjects}
            onAddSubject={handleAddSubject}
            onUpdateSubject={handleUpdateSubject}
            onDeleteSubject={handleDeleteSubject}
          />
        );
      case 'schedule':
        return (
          <ScheduleManager
            subjects={subjects}
            schedules={schedules}
            onUpdateSchedule={handleUpdateSchedule}
          />
        );
      case 'stats':
        return (
          <Statistics
            stats={stats}
            requiredPercentage={settings.requiredPercentage}
          />
        );
      case 'todo':
        return (
          <TodoList
            todos={todos}
            onAddTodo={handleAddTodo}
            onToggleTodo={handleToggleTodo}
            onDeleteTodo={handleDeleteTodo}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors">
      <Header onSettingsClick={() => setShowSettings(true)} />
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderContent()}
      </main>

      {showSettings && (
        <Settings
          settings={settings}
          onUpdateSettings={handleUpdateSettings}
          onClose={() => setShowSettings(false)}
        />
      )}
    </div>
  );
}

export default App;