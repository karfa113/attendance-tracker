import { Subject, AttendanceRecord, AttendanceStats } from '../types/attendance';

export function calculateAttendanceStats(
  subjects: Subject[],
  records: AttendanceRecord[],
  requiredPercentage: number
): AttendanceStats[] {
  return subjects.map(subject => {
    const subjectRecords = records.filter(record => record.subjectId === subject.id);

    const attendedClasses = subjectRecords.filter(record => record.status === 'attended').length;
    const absentClasses = subjectRecords.filter(record => record.status === 'absent').length;
    const offClasses = subjectRecords.filter(record => record.status === 'off').length;
    const totalClasses = attendedClasses + absentClasses; // off classes don't count towards total

    const percentage = totalClasses > 0 ? (attendedClasses / totalClasses) * 100 : 0;

    let status: 'excellent' | 'good' | 'warning' | 'critical';
    if (percentage >= 90) status = 'excellent';
    else if (percentage >= 80) status = 'good';
    else if (percentage >= requiredPercentage) status = 'warning';
    else status = 'critical';

    // Calculate classes needed to reach required percentage
    const classesNeeded = Math.max(0, Math.ceil((requiredPercentage * totalClasses - 100 * attendedClasses) / (100 - requiredPercentage)));

    // Calculate how many classes can be missed while maintaining required percentage
    const canMiss = Math.max(0, Math.floor((100 * attendedClasses - requiredPercentage * totalClasses) / requiredPercentage));

    return {
      subjectId: subject.id,
      subjectName: subject.name,
      subjectCode: subject.code,
      totalClasses,
      attendedClasses,
      absentClasses,
      offClasses,
      percentage,
      status,
      classesNeeded,
      canMiss
    };
  });
}

export function getTodaySchedule(schedules: any[], subjects: Subject[]): Subject[] {
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase() as any;
  const todaySchedule = schedules.find(schedule => schedule.day === today);

  if (!todaySchedule) return [];

  return todaySchedule.subjects
    .map((subjectId: string) => subjects.find(subject => subject.id === subjectId))
    .filter(Boolean);
}