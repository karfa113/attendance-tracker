import React from 'react';
import { Calendar, Clock, CheckCircle, XCircle, AlertCircle, Shield } from 'lucide-react';
import { AttendanceRecord, Subject } from '../types/attendance';

interface AttendanceHistoryProps {
  records: AttendanceRecord[];
  subjects: Subject[];
}

export const AttendanceHistory: React.FC<AttendanceHistoryProps> = ({ records, subjects }) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'present': return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'absent': return <XCircle className="w-5 h-5 text-red-600" />;
      case 'late': return <Clock className="w-5 h-5 text-amber-600" />;
      case 'excused': return <Shield className="w-5 h-5 text-blue-600" />;
      default: return <AlertCircle className="w-5 h-5 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'present': return 'text-green-700 bg-green-100';
      case 'absent': return 'text-red-700 bg-red-100';
      case 'late': return 'text-amber-700 bg-amber-100';
      case 'excused': return 'text-blue-700 bg-blue-100';
      default: return 'text-gray-700 bg-gray-100';
    }
  };

  const getSubjectName = (subjectId: string) => {
    const subject = subjects.find(s => s.id === subjectId);
    return subject ? `${subject.name} (${subject.code})` : 'Unknown Subject';
  };

  const sortedRecords = [...records].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <Calendar className="w-5 h-5" />
          Recent Attendance History
        </h2>
      </div>
      
      <div className="p-6">
        {sortedRecords.length === 0 ? (
          <div className="text-center py-8">
            <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-600">No attendance records found</p>
          </div>
        ) : (
          <div className="space-y-4">
            {sortedRecords.map((record) => (
              <div key={record.id} className="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-4">
                  {getStatusIcon(record.status)}
                  <div>
                    <h3 className="font-medium text-gray-900">
                      {getSubjectName(record.subjectId)}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {new Date(record.date).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                    {record.remarks && (
                      <p className="text-sm text-gray-500 mt-1">
                        Note: {record.remarks}
                      </p>
                    )}
                  </div>
                </div>
                
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium capitalize ${getStatusColor(record.status)}`}>
                  {record.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};