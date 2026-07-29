import React, { useState } from 'react';
import { useOS } from '../../context/OSContext';
import { Clock, Sparkles, Filter, Check, Plus } from 'lucide-react';

export const TimetableBuilder: React.FC = () => {
  const { addToast, toggleAI } = useOS();
  const [selectedGrade, setSelectedGrade] = useState<string>('Grade 10-A');

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const timeslots = ['08:00 AM', '09:15 AM', '10:30 AM', '11:45 AM', '01:00 PM', '02:15 PM'];

  const scheduleMatrix: Record<string, Record<string, { subject: string; teacher: string; room: string; color: string }>> = {
    'Monday': {
      '08:00 AM': { subject: 'Advanced Calculus', teacher: 'Dr. Clara Thorne', room: 'Hall 102', color: '#3b82f6' },
      '09:15 AM': { subject: 'Quantum Physics', teacher: 'Prof. Marcus Vance', room: 'Lab B-4', color: '#8b5cf6' },
      '10:30 AM': { subject: 'World History', teacher: 'Sarah Jenkins', room: 'Room 201', color: '#f59e0b' },
      '11:45 AM': { subject: 'Lunch Break & Advisory', teacher: 'All Faculty', room: 'Cafeteria', color: '#64748b' },
      '01:00 PM': { subject: 'AI & Data Structures', teacher: 'David Kim', room: 'CS Lab 1', color: '#10b981' },
      '02:15 PM': { subject: 'Symphonic Music', teacher: 'Elena Rostova', room: 'Music Studio', color: '#ec4899' },
    },
    'Tuesday': {
      '08:00 AM': { subject: 'Quantum Physics', teacher: 'Prof. Marcus Vance', room: 'Lab B-4', color: '#8b5cf6' },
      '09:15 AM': { subject: 'AI & Data Structures', teacher: 'David Kim', room: 'CS Lab 1', color: '#10b981' },
      '10:30 AM': { subject: 'Advanced Calculus', teacher: 'Dr. Clara Thorne', room: 'Hall 102', color: '#3b82f6' },
      '11:45 AM': { subject: 'Lunch Break', teacher: 'N/A', room: 'Cafeteria', color: '#64748b' },
      '01:00 PM': { subject: 'World History', teacher: 'Sarah Jenkins', room: 'Room 201', color: '#f59e0b' },
      '02:15 PM': { subject: 'Physical Education', teacher: 'Coach Miller', room: 'Stadium', color: '#06b6d4' },
    },
    'Wednesday': {
      '08:00 AM': { subject: 'Advanced Calculus', teacher: 'Dr. Clara Thorne', room: 'Hall 102', color: '#3b82f6' },
      '09:15 AM': { subject: 'World History', teacher: 'Sarah Jenkins', room: 'Room 201', color: '#f59e0b' },
      '10:30 AM': { subject: 'AI & Data Structures', teacher: 'David Kim', room: 'CS Lab 1', color: '#10b981' },
      '11:45 AM': { subject: 'Lunch Break', teacher: 'N/A', room: 'Cafeteria', color: '#64748b' },
      '01:00 PM': { subject: 'Quantum Physics', teacher: 'Prof. Marcus Vance', room: 'Lab B-4', color: '#8b5cf6' },
      '02:15 PM': { subject: 'Symphonic Music', teacher: 'Elena Rostova', room: 'Music Studio', color: '#ec4899' },
    },
    'Thursday': {
      '08:00 AM': { subject: 'AI & Data Structures', teacher: 'David Kim', room: 'CS Lab 1', color: '#10b981' },
      '09:15 AM': { subject: 'Quantum Physics', teacher: 'Prof. Marcus Vance', room: 'Lab B-4', color: '#8b5cf6' },
      '10:30 AM': { subject: 'Advanced Calculus', teacher: 'Dr. Clara Thorne', room: 'Hall 102', color: '#3b82f6' },
      '11:45 AM': { subject: 'Lunch Break', teacher: 'N/A', room: 'Cafeteria', color: '#64748b' },
      '01:00 PM': { subject: 'Symphonic Music', teacher: 'Elena Rostova', room: 'Music Studio', color: '#ec4899' },
      '02:15 PM': { subject: 'World History', teacher: 'Sarah Jenkins', room: 'Room 201', color: '#f59e0b' },
    },
    'Friday': {
      '08:00 AM': { subject: 'World History', teacher: 'Sarah Jenkins', room: 'Room 201', color: '#f59e0b' },
      '09:15 AM': { subject: 'Advanced Calculus', teacher: 'Dr. Clara Thorne', room: 'Hall 102', color: '#3b82f6' },
      '10:30 AM': { subject: 'Quantum Physics Lab', teacher: 'Prof. Marcus Vance', room: 'Lab B-4', color: '#8b5cf6' },
      '11:45 AM': { subject: 'Lunch Break', teacher: 'N/A', room: 'Cafeteria', color: '#64748b' },
      '01:00 PM': { subject: 'AI Project Showcase', teacher: 'David Kim', room: 'Auditorium', color: '#10b981' },
      '02:15 PM': { subject: 'Weekly Assembly', teacher: 'Principal Vance', room: 'Auditorium', color: '#3b82f6' },
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }} className="animate-fade-in">
      <div className="flex-between">
        <div>
          <h2 style={{ fontSize: '20px', fontWeight: 700, letterSpacing: '-0.02em' }}>
            Interactive Weekly Timetable Builder
          </h2>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
            Schedule matrix, faculty availability, classroom mapping & AI conflict detection
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button 
            className="mac-btn mac-btn-primary" 
            onClick={() => {
              addToast('AI Optimizer', 'Analyzing room allocation & teacher workload... 0 conflicts found!', 'success');
            }}
          >
            <Sparkles size={16} /> AI Auto-Optimize Matrix
          </button>
        </div>
      </div>

      {/* Class Selector Bar */}
      <div className="glass-panel" style={{ padding: '12px 18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Filter size={16} style={{ color: 'var(--accent-primary)' }} />
          <span style={{ fontSize: '13px', fontWeight: 600 }}>Active Target Class:</span>
          <select className="mac-input" value={selectedGrade} onChange={e => setSelectedGrade(e.target.value)} style={{ width: '160px' }}>
            <option value="Grade 10-A">Grade 10 - Section A</option>
            <option value="Grade 10-B">Grade 10 - Section B</option>
            <option value="Grade 11-A">Grade 11 - Section A</option>
            <option value="Grade 12-A">Grade 12 - Section A</option>
          </select>
        </div>

        <span className="mac-badge mac-badge-success">
          <Check size={12} /> Matrix Validated • 0 Room Collisions
        </span>
      </div>

      {/* Timetable Schedule Grid */}
      <div className="mac-table-container">
        <table className="mac-table" style={{ tableLayout: 'fixed' }}>
          <thead>
            <tr>
              <th style={{ width: '110px' }}>Time Slot</th>
              {days.map(day => (
                <th key={day}>{day}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {timeslots.map(slot => (
              <tr key={slot}>
                <td style={{ fontWeight: 600, fontFamily: 'JetBrains Mono, monospace', fontSize: '12px', background: 'rgba(0,0,0,0.1)' }}>
                  {slot}
                </td>
                {days.map(day => {
                  const entry = scheduleMatrix[day]?.[slot];
                  if (!entry) return <td key={day}>-</td>;
                  return (
                    <td key={day} style={{ padding: '8px' }}>
                      <div 
                        className="glass-card" 
                        style={{ 
                          padding: '8px 10px', 
                          borderLeft: `4px solid ${entry.color}`, 
                          borderRadius: 'var(--radius-sm)',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '2px'
                        }}
                      >
                        <div style={{ fontWeight: 700, fontSize: '12px', color: 'var(--text-primary)' }}>
                          {entry.subject}
                        </div>
                        <div style={{ fontSize: '10px', color: 'var(--text-secondary)' }}>
                          {entry.teacher}
                        </div>
                        <div style={{ fontSize: '10px', fontWeight: 600, color: entry.color }}>
                          📍 {entry.room}
                        </div>
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
