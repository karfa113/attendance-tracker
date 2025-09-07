import { Subject, DaySchedule, UserSettings } from '../types/attendance';

export const defaultSubjects: Subject[] = [
  {
    id: '1',
    name: 'Mathematics',
    code: 'MATH101',
    color: '#3B82F6',
    totalClasses: 0,
    attendedClasses: 0,
    absentClasses: 0,
    offClasses: 0
  },
  {
    id: '2',
    name: 'Physics',
    code: 'PHY101',
    color: '#10B981',
    totalClasses: 0,
    attendedClasses: 0,
    absentClasses: 0,
    offClasses: 0
  }
];

export const defaultSchedules: DaySchedule[] = [
  { id: '1', day: 'monday', subjects: ['1', '2'] },
  { id: '2', day: 'tuesday', subjects: ['1'] },
  { id: '3', day: 'wednesday', subjects: ['2'] },
  { id: '4', day: 'thursday', subjects: ['1', '2'] },
  { id: '5', day: 'friday', subjects: ['1'] },
  { id: '6', day: 'saturday', subjects: [] },
  { id: '7', day: 'sunday', subjects: [] }
];

export const defaultSettings: UserSettings = {
  requiredPercentage: 75,
  theme: 'light',
  notifications: true
};