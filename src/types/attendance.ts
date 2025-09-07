export interface Subject {
  id: string;
  name: string;
  code: string;
  color: string;
  totalClasses: number;
  attendedClasses: number;
  absentClasses: number;
  offClasses: number;
}

export interface DaySchedule {
  id: string;
  day: 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';
  subjects: string[]; // subject IDs
}

export interface AttendanceRecord {
  id: string;
  subjectId: string;
  date: string;
  status: 'attended' | 'absent' | 'off' | null;
  timestamp: number;
}

export interface TodoItem {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  dueDate?: string;
  createdAt: number;
}

export interface UserSettings {
  requiredPercentage: number;
  theme: 'light' | 'dark';
  notifications: boolean;
}

export interface AttendanceStats {
  subjectId: string;
  subjectName: string;
  subjectCode: string;
  totalClasses: number;
  attendedClasses: number;
  absentClasses: number;
  offClasses: number;
  percentage: number;
  status: 'excellent' | 'good' | 'warning' | 'critical';
  classesNeeded: number;
  canMiss: number;
}