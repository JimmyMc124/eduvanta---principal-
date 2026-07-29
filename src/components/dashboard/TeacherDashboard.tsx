import React, { useState } from 'react';
import { useOS } from '../../context/OSContext';
import { StatCard } from './StatCard';
import { 
  BookOpen, 
  UserCheck, 
  Clock, 
  FileText, 
  Sparkles, 
  Plus, 
  CheckCircle2, 
  AlertCircle, 
  Upload, 
  Send, 
  Award, 
  BarChart2, 
  Search, 
  QrCode, 
  Filter, 
  Edit3, 
  Bot, 
  Users, 
  FileCheck,
  Check,
  GraduationCap
} from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

export const TeacherDashboard: React.FC = () => {
  const { students, addToast, playSound, toggleAI } = useOS();

  // Active Class & Attendance State
  const [selectedClass, setSelectedClass] = useState<string>('Grade 12-A Calculus');
  const [attendanceData, setAttendanceData] = useState<{ [id: string]: 'Present' | 'Late' | 'Absent' | 'Excused' }>({
    'STU-1001': 'Present',
    'STU-1002': 'Present',
    'STU-1003': 'Late',
    'STU-1004': 'Present',
    'STU-1005': 'Absent',
    'STU-1006': 'Present'
  });

  // Assignment Modal
  const [isCreatingAssignment, setIsCreatingAssignment] = useState<boolean>(false);
  const [newAssignTitle, setNewAssignTitle] = useState<string>('');
  const [newAssignDueDate, setNewAssignDueDate] = useState<string>('2026-08-05');
  const [newAssignPoints, setNewAssignPoints] = useState<string>('100');
  const [newAssignSubject, setNewAssignSubject] = useState<string>('Calculus');

  // AI Lesson Generator Modal
  const [isLessonModalOpen, setIsLessonModalOpen] = useState<boolean>(false);
  const [lessonTopic, setLessonTopic] = useState<string>('Differential Equations & Motion Modeling');
  const [lessonGeneratedText, setLessonGeneratedText] = useState<string | null>(null);
  const [isGeneratingLesson, setIsGeneratingLesson] = useState<boolean>(false);

  // Notes state
  const [notes, setNotes] = useState<{ id: string; title: string; category: string; content: string; date: string }[]>([
    {
      id: 'note-1',
      title: 'Lesson Plan: Vector Calculus Intro',
      category: 'Lesson Plan',
      content: 'Cover dot products, cross products, and 3D coordinate spaces with visual diagrams on the digital board.',
      date: 'Today, 08:30 AM'
    },
    {
      id: 'note-2',
      title: 'Observation: Marcus Vance (Grade 12)',
      category: 'Behavior Note',
      content: 'Demonstrated exceptional problem solving in implicit differentiation. Suggested AP Calculus BC extension.',
      date: 'Yesterday'
    }
  ]);
  const [newNoteTitle, setNewNoteTitle] = useState('');
  const [newNoteContent, setNewNoteContent] = useState('');

  // Sample Class Gradebook Data for Chart
  const gradebookData = [
    { name: 'Quiz 1', avg: 88, max: 100 },
    { name: 'Midterm Prep', avg: 92, max: 100 },
    { name: 'Derivatives Lab', avg: 85, max: 100 },
    { name: 'Vector HW', avg: 95, max: 100 },
    { name: 'Integration Test', avg: 89, max: 100 },
  ];

  const handleAttendanceToggle = (studentId: string, status: 'Present' | 'Late' | 'Absent' | 'Excused') => {
    playSound('click');
    setAttendanceData(prev => ({ ...prev, [studentId]: status }));
  };

  const handleSaveAttendance = () => {
    playSound('save');
    addToast('Attendance Saved', `Period attendance for ${selectedClass} logged securely.`, 'success');
  };

  const handleCreateAssignment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAssignTitle.trim()) return;
    playSound('save');
    addToast('Assignment Created', `Published "${newAssignTitle}" for ${selectedClass}.`, 'success');
    setNewAssignTitle('');
    setIsCreatingAssignment(false);
  };

  const handleGenerateAILesson = () => {
    if (!lessonTopic.trim()) return;
    setIsGeneratingLesson(true);
    playSound('click');
    setTimeout(() => {
      setIsGeneratingLesson(false);
      setLessonGeneratedText(
        `## AI Generated Lesson Plan: ${lessonTopic}\n\n` +
        `**Duration**: 50 Minutes | **Target Grade**: Grade 12 Calculus\n\n` +
        `1. **Hook & Concept Warm-up (8 mins)**: Real-world physical application (rocket trajectory velocity vectors).\n` +
        `2. **Core Direct Instruction (20 mins)**: Step-by-step mathematical proof and boundary conditions.\n` +
        `3. **Collaborative Problem Solving (15 mins)**: Student pairs solve 3 tiered problem sets on whiteboards.\n` +
        `4. **Exit Ticket & Wrap-up (7 mins)**: QR code quick check submission via Eduvanta Student App.\n\n` +
        `*Recommended Resources*: Interactive 3D Grapher, Worksheet #12-B.`
      );
      addToast('AI Lesson Plan Ready', 'Generated 50-minute structured lesson outline.', 'success');
    }, 1200);
  };

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoteTitle.trim() || !newNoteContent.trim()) return;
    playSound('save');
    setNotes(prev => [
      {
        id: `note-${Date.now()}`,
        title: newNoteTitle,
        category: 'Teacher Note',
        content: newNoteContent,
        date: 'Just now'
      },
      ...prev
    ]);
    setNewNoteTitle('');
    setNewNoteContent('');
    addToast('Note Saved', 'Added to Teacher Private Workspace', 'info');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Teacher Welcome Header */}
      <div 
        className="glass-panel" 
        style={{ 
          padding: '24px', 
          background: 'linear-gradient(135deg, rgba(30,58,138,0.25) 0%, rgba(15,23,42,0.6) 100%)',
          border: '1px solid rgba(59,130,246,0.25)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px'
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <span style={{ fontSize: '11px', fontWeight: 700, padding: '3px 10px', borderRadius: '12px', background: '#2563eb', color: '#fff', letterSpacing: '0.05em' }}>
              TEACHER WORKSPACE
            </span>
            <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
              Department of Mathematics & Natural Sciences
            </span>
          </div>
          <h1 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em', margin: 0 }}>
            Good Morning, Prof. Sarah Jenkins
          </h1>
          <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span>Current Period: <strong style={{ color: '#60a5fa' }}>Grade 12-A Calculus (Room 304)</strong></span>
            <span>•</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--accent-success)' }}>
              <Clock size={14} /> Next Class in 18 Mins
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button 
            className="mac-btn mac-btn-primary" 
            onClick={() => setIsLessonModalOpen(true)}
            style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 14px' }}
          >
            <Sparkles size={15} /> AI Lesson Planner
          </button>
          <button 
            className="mac-btn" 
            onClick={() => setIsCreatingAssignment(true)}
            style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 14px' }}
          >
            <Plus size={15} /> Create Assignment
          </button>
        </div>
      </div>

      {/* Quick Classroom Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <StatCard 
          title="Today's Total Students" 
          value="142" 
          change="+4" 
          changeType="positive" 
          icon={<Users size={18} />} 
          subtitle="Across 4 Calculus & Physics Sections"
        />
        <StatCard 
          title="Attendance Recorded" 
          value="96.5%" 
          change="137 Present" 
          changeType="positive" 
          icon={<UserCheck size={18} />} 
          subtitle="Period 1 & 2 Submitted"
        />
        <StatCard 
          title="Pending Submissions" 
          value="14" 
          change="Needs Grading" 
          changeType="neutral" 
          icon={<FileText size={18} />} 
          subtitle="Midterm AP Calculus Lab"
        />
        <StatCard 
          title="Class Average GPA" 
          value="3.84" 
          change="+0.12" 
          changeType="positive" 
          icon={<Award size={18} />} 
          subtitle="Q2 Mathematics Department"
        />
      </div>

      {/* Main Workspace Split Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '20px' }}>
        {/* Left Column: Interactive Attendance & Gradebook */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Quick Period Attendance Sheet */}
          <div className="glass-panel" style={{ padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div>
                <h3 style={{ fontSize: '16px', fontWeight: 700, margin: 0, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <UserCheck size={18} style={{ color: '#3b82f6' }} /> Classroom Period Attendance
                </h3>
                <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                  Mark live attendance for active class period
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <select 
                  className="mac-input" 
                  value={selectedClass} 
                  onChange={(e) => setSelectedClass(e.target.value)}
                  style={{ width: '180px', fontSize: '12px' }}
                >
                  <option value="Grade 12-A Calculus">Grade 12-A Calculus</option>
                  <option value="Grade 10-B Physics">Grade 10-B Physics</option>
                  <option value="Grade 11 Honors Math">Grade 11 Honors Math</option>
                </select>
                <button className="mac-btn mac-btn-primary mac-btn-sm" onClick={handleSaveAttendance}>
                  <Check size={14} /> Submit Attendance
                </button>
              </div>
            </div>

            {/* Attendance Table */}
            <div style={{ overflowX: 'auto' }}>
              <table className="mac-table" style={{ width: '100%', fontSize: '13px' }}>
                <thead>
                  <tr>
                    <th>Roll No</th>
                    <th>Student Name</th>
                    <th>Status Action</th>
                    <th>Medical / Note</th>
                  </tr>
                </thead>
                <tbody>
                  {students.slice(0, 6).map((stu) => {
                    const currentStatus = attendanceData[stu.id] || 'Present';
                    return (
                      <tr key={stu.id}>
                        <td style={{ fontWeight: 600, color: 'var(--text-secondary)' }}>{stu.rollNo}</td>
                        <td style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#3b82f6', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 700 }}>
                              {stu.name.charAt(0)}
                            </div>
                            {stu.name}
                          </div>
                        </td>
                        <td>
                          <div style={{ display: 'flex', gap: '4px' }}>
                            <button 
                              style={{ 
                                padding: '3px 8px', 
                                borderRadius: '4px', 
                                fontSize: '11px', 
                                fontWeight: 600, 
                                border: 'none', 
                                cursor: 'pointer',
                                background: currentStatus === 'Present' ? '#16a34a' : 'rgba(255,255,255,0.06)',
                                color: currentStatus === 'Present' ? '#fff' : 'var(--text-secondary)'
                              }}
                              onClick={() => handleAttendanceToggle(stu.id, 'Present')}
                            >
                              Present
                            </button>
                            <button 
                              style={{ 
                                padding: '3px 8px', 
                                borderRadius: '4px', 
                                fontSize: '11px', 
                                fontWeight: 600, 
                                border: 'none', 
                                cursor: 'pointer',
                                background: currentStatus === 'Late' ? '#d97706' : 'rgba(255,255,255,0.06)',
                                color: currentStatus === 'Late' ? '#fff' : 'var(--text-secondary)'
                              }}
                              onClick={() => handleAttendanceToggle(stu.id, 'Late')}
                            >
                              Late
                            </button>
                            <button 
                              style={{ 
                                padding: '3px 8px', 
                                borderRadius: '4px', 
                                fontSize: '11px', 
                                fontWeight: 600, 
                                border: 'none', 
                                cursor: 'pointer',
                                background: currentStatus === 'Absent' ? '#dc2626' : 'rgba(255,255,255,0.06)',
                                color: currentStatus === 'Absent' ? '#fff' : 'var(--text-secondary)'
                              }}
                              onClick={() => handleAttendanceToggle(stu.id, 'Absent')}
                            >
                              Absent
                            </button>
                          </div>
                        </td>
                        <td style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                          {stu.allergies && stu.allergies.length > 0 ? `⚠️ ${stu.allergies.join(', ')}` : 'Clear'}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Class Gradebook Performance Chart */}
          <div className="glass-panel" style={{ padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div>
                <h3 style={{ fontSize: '16px', fontWeight: 700, margin: 0, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <BarChart2 size={18} style={{ color: '#10b981' }} /> Class Assessment Performance
                </h3>
                <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                  Grade 12-A Calculus Average vs Max Score
                </div>
              </div>
              <span style={{ fontSize: '11px', color: 'var(--accent-success)', fontWeight: 600, background: 'rgba(16,185,129,0.15)', padding: '2px 8px', borderRadius: '10px' }}>
                Class Avg: 89.8%
              </span>
            </div>

            <div style={{ height: '200px', width: '100%' }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={gradebookData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="name" stroke="var(--text-muted)" fontSize={11} />
                  <YAxis stroke="var(--text-muted)" fontSize={11} domain={[0, 100]} />
                  <Tooltip 
                    contentStyle={{ background: 'rgba(15,23,42,0.9)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)' }} 
                  />
                  <Bar dataKey="avg" fill="#3b82f6" radius={[4, 4, 0, 0]} name="Average Score" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>

        {/* Right Column: Today Schedule, Notes & AI Tools */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Today's Teaching Schedule */}
          <div className="glass-panel" style={{ padding: '20px' }}>
            <h3 style={{ fontSize: '15px', fontWeight: 700, margin: 0, color: 'var(--text-primary)', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Clock size={16} style={{ color: '#f59e0b' }} /> Today's Teaching Schedule
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ padding: '12px', borderRadius: '8px', background: 'rgba(59,130,246,0.15)', borderLeft: '3px solid #3b82f6' }}>
                <div style={{ fontSize: '10px', color: '#60a5fa', fontWeight: 700 }}>09:00 AM - 10:15 AM • ROOM 304</div>
                <div style={{ fontWeight: 700, fontSize: '13px', color: 'var(--text-primary)', marginTop: '2px' }}>Grade 12-A Calculus</div>
                <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Topic: Implicit Differentiation & Related Rates</div>
              </div>

              <div style={{ padding: '12px', borderRadius: '8px', background: 'rgba(255,255,255,0.04)', borderLeft: '3px solid var(--text-muted)' }}>
                <div style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 700 }}>10:30 AM - 11:45 AM • LAB 2</div>
                <div style={{ fontWeight: 700, fontSize: '13px', color: 'var(--text-primary)', marginTop: '2px' }}>Grade 10-B Physics Lab</div>
                <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Topic: Wave Motion & Interference Patterns</div>
              </div>

              <div style={{ padding: '12px', borderRadius: '8px', background: 'rgba(255,255,255,0.04)', borderLeft: '3px solid var(--text-muted)' }}>
                <div style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 700 }}>01:15 PM - 02:30 PM • ROOM 108</div>
                <div style={{ fontWeight: 700, fontSize: '13px', color: 'var(--text-primary)', marginTop: '2px' }}>Grade 11 Honors Math</div>
                <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Topic: Exponential Functions & Modeling</div>
              </div>
            </div>
          </div>

          {/* Teacher Private Notes */}
          <div className="glass-panel" style={{ padding: '20px' }}>
            <h3 style={{ fontSize: '15px', fontWeight: 700, margin: 0, color: 'var(--text-primary)', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Edit3 size={16} style={{ color: '#8b5cf6' }} /> Classroom Notes & Observations
            </h3>

            <form onSubmit={handleAddNote} style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '14px' }}>
              <input 
                className="mac-input" 
                placeholder="Note Title..." 
                value={newNoteTitle} 
                onChange={(e) => setNewNoteTitle(e.target.value)}
                style={{ fontSize: '12px' }}
              />
              <textarea 
                className="mac-input" 
                placeholder="Write class observation, lesson reminder, or student note..." 
                value={newNoteContent} 
                onChange={(e) => setNewNoteContent(e.target.value)}
                rows={2}
                style={{ fontSize: '12px', resize: 'none' }}
              />
              <button type="submit" className="mac-btn mac-btn-primary mac-btn-sm" style={{ alignSelf: 'flex-end' }}>
                Save Note
              </button>
            </form>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '200px', overflowY: 'auto' }}>
              {notes.map(note => (
                <div key={note.id} style={{ padding: '10px', borderRadius: '6px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)' }}>{note.title}</span>
                    <span style={{ fontSize: '10px', color: '#a855f7', fontWeight: 600 }}>{note.category}</span>
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '4px' }}>
                    {note.content}
                  </div>
                  <div style={{ fontSize: '9px', color: 'var(--text-muted)', marginTop: '4px', textAlign: 'right' }}>
                    {note.date}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Assignment Modal */}
      {isCreatingAssignment && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 9999, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
          <div className="glass-panel" style={{ width: '100%', maxWidth: '480px', padding: '24px', background: 'rgba(15,23,42,0.95)' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 800, margin: 0, color: 'var(--text-primary)', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Plus size={18} style={{ color: '#3b82f6' }} /> Create New Assignment
            </h2>
            <form onSubmit={handleCreateAssignment} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Assignment Title</label>
                <input className="mac-input" placeholder="e.g. AP Calculus Midterm Homework Set 4" value={newAssignTitle} onChange={(e) => setNewAssignTitle(e.target.value)} required />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Subject</label>
                  <select className="mac-input" value={newAssignSubject} onChange={(e) => setNewAssignSubject(e.target.value)}>
                    <option value="Calculus">Calculus</option>
                    <option value="Physics">Physics</option>
                    <option value="Honors Math">Honors Math</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Due Date</label>
                  <input type="date" className="mac-input" value={newAssignDueDate} onChange={(e) => setNewAssignDueDate(e.target.value)} required />
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
                <button type="button" className="mac-btn" onClick={() => setIsCreatingAssignment(false)}>Cancel</button>
                <button type="submit" className="mac-btn mac-btn-primary">Publish Assignment</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* AI Lesson Planner Modal */}
      {isLessonModalOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 9999, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
          <div className="glass-panel" style={{ width: '100%', maxWidth: '560px', padding: '24px', background: 'rgba(15,23,42,0.95)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h2 style={{ fontSize: '18px', fontWeight: 800, margin: 0, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Sparkles size={18} style={{ color: '#3b82f6' }} /> AI Lesson Planner
              </h2>
              <button className="mac-btn mac-btn-sm" onClick={() => setIsLessonModalOpen(false)}>Close</button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Topic or Curriculum Standard</label>
                <input 
                  className="mac-input" 
                  value={lessonTopic} 
                  onChange={(e) => setLessonTopic(e.target.value)} 
                  placeholder="e.g. Integration by Parts or Newton's Laws" 
                />
              </div>

              <button 
                className="mac-btn mac-btn-primary" 
                onClick={handleGenerateAILesson} 
                disabled={isGeneratingLesson}
                style={{ alignSelf: 'flex-start', display: 'flex', alignItems: 'center', gap: '6px' }}
              >
                {isGeneratingLesson ? <Bot size={15} className="spin" /> : <Sparkles size={15} />} 
                {isGeneratingLesson ? 'Generating Lesson Plan...' : 'Generate 50-Min Lesson Plan'}
              </button>

              {lessonGeneratedText && (
                <div style={{ marginTop: '12px', padding: '14px', borderRadius: '8px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(59,130,246,0.3)', maxHeight: '240px', overflowY: 'auto', fontSize: '12px', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                  {lessonGeneratedText.split('\n').map((line, idx) => (
                    <p key={idx} style={{ margin: '4px 0' }}>{line}</p>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
