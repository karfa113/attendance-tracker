import React from 'react';
import { User, Mail, GraduationCap, Calendar, Award } from 'lucide-react';
import { Student, AttendanceStats } from '../types/attendance';

interface ProfileProps {
  student: Student;
  stats: AttendanceStats[];
}

export const Profile: React.FC<ProfileProps> = ({ student, stats }) => {
  const overallAttendance = stats.reduce((acc, stat) => {
    acc.totalClasses += stat.totalClasses;
    acc.attendedClasses += stat.attendedClasses;
    return acc;
  }, { totalClasses: 0, attendedClasses: 0 });

  const overallPercentage = (overallAttendance.attendedClasses / overallAttendance.totalClasses) * 100;

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center gap-6">
          <div className="bg-blue-100 p-4 rounded-full">
            <User className="w-12 h-12 text-blue-600" />
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900">{student.name}</h2>
            <p className="text-gray-600">{student.class} • {student.year}</p>
          </div>
        </div>
      </div>

      {/* Student Information */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Student Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <Mail className="w-5 h-5 text-blue-600" />
            <div>
              <p className="text-sm text-gray-600">Email</p>
              <p className="font-medium text-gray-900">{student.email}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <GraduationCap className="w-5 h-5 text-indigo-600" />
            <div>
              <p className="text-sm text-gray-600">Student ID</p>
              <p className="font-medium text-gray-900">{student.studentId}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <Calendar className="w-5 h-5 text-green-600" />
            <div>
              <p className="text-sm text-gray-600">Academic Year</p>
              <p className="font-medium text-gray-900">{student.year}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <Award className="w-5 h-5 text-amber-600" />
            <div>
              <p className="text-sm text-gray-600">Program</p>
              <p className="font-medium text-gray-900">{student.class}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Attendance Summary */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Attendance Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <p className="text-2xl font-bold text-blue-600">{overallPercentage.toFixed(1)}%</p>
            <p className="text-sm text-blue-700">Overall Attendance</p>
          </div>
          
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <p className="text-2xl font-bold text-green-600">{overallAttendance.attendedClasses}</p>
            <p className="text-sm text-green-700">Classes Attended</p>
          </div>
          
          <div className="text-center p-4 bg-red-50 rounded-lg">
            <p className="text-2xl font-bold text-red-600">{overallAttendance.totalClasses - overallAttendance.attendedClasses}</p>
            <p className="text-sm text-red-700">Classes Missed</p>
          </div>
        </div>
      </div>
    </div>
  );
};