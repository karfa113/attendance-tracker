import { Student, Subject, AttendanceRecord, AttendanceStats } from '../types/attendance';

export const mockStudent: Student = {
  id: '1',
  name: 'Alex Johnson',
  email: 'alex.johnson@university.edu',
  studentId: 'STU-2024-001',
  class: 'Computer Science',
  year: '3rd Year'
};

export const mockSubjects: Subject[] = [
  {
    id: '1',
    name: 'Data Structures & Algorithms',
    code: 'CS-301',
    instructor: 'Dr. Sarah Smith',
    totalClasses: 45
  },
  {
    id: '2',
    name: 'Database Management Systems',
    code: 'CS-302',
    instructor: 'Prof. Michael Brown',
    totalClasses: 40
  },
  {
    id: '3',
    name: 'Software Engineering',
    code: 'CS-303',
    instructor: 'Dr. Emily Davis',
    totalClasses: 42
  },
  {
    id: '4',
    name: 'Computer Networks',
    code: 'CS-304',
    instructor: 'Prof. James Wilson',
    totalClasses: 38
  }
];

export const mockAttendanceRecords: AttendanceRecord[] = [
  // Recent records for demonstration
  { id: '1', studentId: '1', subjectId: '1', date: '2024-01-15', status: 'present' },
  { id: '2', studentId: '1', subjectId: '2', date: '2024-01-15', status: 'present' },
  { id: '3', studentId: '1', subjectId: '3', date: '2024-01-14', status: 'late', remarks: 'Traffic delay' },
  { id: '4', studentId: '1', subjectId: '4', date: '2024-01-14', status: 'absent', remarks: 'Sick leave' },
  { id: '5', studentId: '1', subjectId: '1', date: '2024-01-13', status: 'present' },
  { id: '6', studentId: '1', subjectId: '2', date: '2024-01-12', status: 'present' },
  { id: '7', studentId: '1', subjectId: '3', date: '2024-01-12', status: 'present' },
  { id: '8', studentId: '1', subjectId: '4', date: '2024-01-11', status: 'excused', remarks: 'Medical appointment' },
];

export const mockAttendanceStats: AttendanceStats[] = [
  {
    subjectId: '1',
    subjectName: 'Data Structures & Algorithms',
    subjectCode: 'CS-301',
    totalClasses: 45,
    attendedClasses: 41,
    percentage: 91.1,
    status: 'excellent'
  },
  {
    subjectId: '2',
    subjectName: 'Database Management Systems',
    subjectCode: 'CS-302',
    totalClasses: 40,
    attendedClasses: 36,
    percentage: 90.0,
    status: 'excellent'
  },
  {
    subjectId: '3',
    subjectName: 'Software Engineering',
    subjectCode: 'CS-303',
    totalClasses: 42,
    attendedClasses: 35,
    percentage: 83.3,
    status: 'good'
  },
  {
    subjectId: '4',
    subjectName: 'Computer Networks',
    subjectCode: 'CS-304',
    totalClasses: 38,
    attendedClasses: 27,
    percentage: 71.1,
    status: 'warning'
  }
];