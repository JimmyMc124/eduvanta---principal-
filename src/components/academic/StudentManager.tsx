import React, { useState } from 'react';
import { useOS } from '../../context/OSContext';
import { GlassModal } from '../common/GlassModal';
import { Search, UserPlus, Filter, Award, AlertCircle, CheckCircle2, Phone, Mail, FileText } from 'lucide-react';
import { Student } from '../../types';

export const StudentManager: React.FC = () => {
  const { students, addStudent, addToast, showContextMenu } = useOS();

  const [search, setSearch] = useState<string>('');
  const [selectedGrade, setSelectedGrade] = useState<string>('All');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  // Form State
  const [name, setName] = useState('');
  const [rollNo, setRollNo] = useState('');
  const [grade, setGrade] = useState('Grade 10');
  const [section, setSection] = useState('A');
  const [gender, setGender] = useState<'Male' | 'Female' | 'Other'>('Male');
  const [parentName, setParentName] = useState('');
  const [parentContact, setParentContact] = useState('');

  const filtered = students.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(search.toLowerCase()) || s.rollNo.toLowerCase().includes(search.toLowerCase());
    const matchesGrade = selectedGrade === 'All' || s.grade === selectedGrade;
    return matchesSearch && matchesGrade;
  });

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !rollNo) return;
    addStudent({
      name,
      rollNo,
      grade,
      section,
      gender,
      gpa: 3.8,
      attendancePct: 98.0,
      feeStatus: 'Paid',
      parentName: parentName || 'N/A',
      parentContact: parentContact || 'N/A',
      status: 'Active'
    });
    setIsModalOpen(false);
    setName('');
    setRollNo('');
    setParentName('');
    setParentContact('');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }} className="animate-fade-in">
      {/* Header Bar */}
      <div className="flex-between">
        <div>
          <h2 style={{ fontSize: '20px', fontWeight: 700, letterSpacing: '-0.02em' }}>
            Student Management Directory
          </h2>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
            Real-time enrollment records, transcripts, GPA monitoring, and attendance tracking
          </p>
        </div>
        <button className="mac-btn mac-btn-primary" onClick={() => setIsModalOpen(true)}>
          <UserPlus size={16} /> Enroll New Student
        </button>
      </div>

      {/* Filter and Search Control Bar */}
      <div className="glass-panel" style={{ padding: '14px', display: 'flex', gap: '12px', alignItems: 'center' }}>
        <div style={{ position: 'relative', flex: 1 }}>
          <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input 
            type="text" 
            placeholder="Search student name, roll number, parent name..." 
            className="mac-input"
            style={{ paddingLeft: '36px' }}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Filter size={16} style={{ color: 'var(--text-muted)' }} />
          <select 
            className="mac-input" 
            value={selectedGrade} 
            onChange={(e) => setSelectedGrade(e.target.value)}
            style={{ width: '140px' }}
          >
            <option value="All">All Grades</option>
            <option value="Grade 9">Grade 9</option>
            <option value="Grade 10">Grade 10</option>
            <option value="Grade 11">Grade 11</option>
            <option value="Grade 12">Grade 12</option>
          </select>
        </div>
      </div>

      {/* Main Student Table */}
      <div className="mac-table-container">
        <table className="mac-table">
          <thead>
            <tr>
              <th>Roll No</th>
              <th>Student Name</th>
              <th>Grade & Sec</th>
              <th>Gender</th>
              <th>Cumulative GPA</th>
              <th>Attendance</th>
              <th>Fee Status</th>
              <th>Parent / Guardian</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(student => (
              <tr 
                key={student.id}
                onContextMenu={(e) => showContextMenu(e, [
                  { label: `View Profile: ${student.name}`, action: () => setSelectedStudent(student) },
                  { label: 'Print Official Student ID', action: () => addToast('Print Job', `ID card queued for ${student.name}`, 'info') },
                  { label: 'Export Transcript PDF', action: () => addToast('PDF Export', `Transcript downloaded for ${student.name}`, 'success') }
                ])}
              >
                <td style={{ fontFamily: 'JetBrains Mono, monospace', fontWeight: 600 }}>{student.rollNo}</td>
                <td>
                  <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{student.name}</div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>ID: {student.id}</div>
                </td>
                <td>
                  <span className="mac-badge mac-badge-primary">{student.grade}-{student.section}</span>
                </td>
                <td>{student.gender}</td>
                <td>
                  <span style={{ fontWeight: 700, color: student.gpa >= 3.8 ? 'var(--accent-success)' : 'var(--text-primary)' }}>
                    {student.gpa.toFixed(2)}
                  </span>
                </td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <div style={{ width: '40px', height: '6px', borderRadius: '3px', background: 'var(--bg-input)', overflow: 'hidden' }}>
                      <div style={{ width: `${student.attendancePct}%`, height: '100%', background: 'var(--accent-success)' }} />
                    </div>
                    <span style={{ fontSize: '12px', fontWeight: 600 }}>{student.attendancePct}%</span>
                  </div>
                </td>
                <td>
                  <span className={`mac-badge mac-badge-${student.feeStatus === 'Paid' ? 'success' : student.feeStatus === 'Pending' ? 'warning' : 'danger'}`}>
                    {student.feeStatus}
                  </span>
                </td>
                <td>
                  <div style={{ fontSize: '12px', fontWeight: 500 }}>{student.parentName}</div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{student.parentContact}</div>
                </td>
                <td>
                  <button 
                    className="mac-btn mac-btn-sm" 
                    onClick={() => setSelectedStudent(student)}
                  >
                    Inspect
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Enroll Student Modal */}
      <GlassModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title="Enroll New Student" 
        subtitle="Add a new student profile to Eduvanta OS database"
      >
        <form onSubmit={handleCreate} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
                Full Student Name
              </label>
              <input type="text" className="mac-input" placeholder="e.g. Benjamin Hayes" value={name} onChange={e => setName(e.target.value)} required />
            </div>

            <div>
              <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
                Roll Number
              </label>
              <input type="text" className="mac-input" placeholder="e.g. 10-A-22" value={rollNo} onChange={e => setRollNo(e.target.value)} required />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
            <div>
              <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
                Grade Level
              </label>
              <select className="mac-input" value={grade} onChange={e => setGrade(e.target.value)}>
                <option value="Grade 9">Grade 9</option>
                <option value="Grade 10">Grade 10</option>
                <option value="Grade 11">Grade 11</option>
                <option value="Grade 12">Grade 12</option>
              </select>
            </div>

            <div>
              <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
                Section
              </label>
              <input type="text" className="mac-input" value={section} onChange={e => setSection(e.target.value)} />
            </div>

            <div>
              <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
                Gender
              </label>
              <select className="mac-input" value={gender} onChange={e => setGender(e.target.value as any)}>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
                Parent / Guardian Name
              </label>
              <input type="text" className="mac-input" placeholder="e.g. Thomas Hayes" value={parentName} onChange={e => setParentName(e.target.value)} />
            </div>

            <div>
              <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
                Parent Contact Phone
              </label>
              <input type="text" className="mac-input" placeholder="+1 (555) 000-0000" value={parentContact} onChange={e => setParentContact(e.target.value)} />
            </div>
          </div>

          <div className="flex-between" style={{ marginTop: '10px' }}>
            <button type="button" className="mac-btn" onClick={() => setIsModalOpen(false)}>Cancel</button>
            <button type="submit" className="mac-btn mac-btn-primary">Confirm Enrollment</button>
          </div>
        </form>
      </GlassModal>

      {/* Student Profile Inspector Modal */}
      {selectedStudent && (
        <GlassModal
          isOpen={!!selectedStudent}
          onClose={() => setSelectedStudent(null)}
          title={`Student Inspector: ${selectedStudent.name}`}
          subtitle={`Roll No: ${selectedStudent.rollNo} • Status: ${selectedStudent.status}`}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
              <div className="glass-card">
                <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>GPA Score</div>
                <div style={{ fontSize: '20px', fontWeight: 700, color: 'var(--accent-success)' }}>{selectedStudent.gpa}</div>
              </div>
              <div className="glass-card">
                <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Attendance Rate</div>
                <div style={{ fontSize: '20px', fontWeight: 700, color: 'var(--accent-primary)' }}>{selectedStudent.attendancePct}%</div>
              </div>
              <div className="glass-card">
                <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Fee Ledger</div>
                <div style={{ fontSize: '20px', fontWeight: 700, color: selectedStudent.feeStatus === 'Paid' ? 'var(--accent-success)' : 'var(--accent-warning)' }}>
                  {selectedStudent.feeStatus}
                </div>
              </div>
            </div>

            <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <h4 style={{ fontSize: '13px', fontWeight: 600 }}>Parent & Contact Details</h4>
              <div style={{ fontSize: '12px' }}><strong>Guardian:</strong> {selectedStudent.parentName}</div>
              <div style={{ fontSize: '12px' }}><strong>Contact Phone:</strong> {selectedStudent.parentContact}</div>
              <div style={{ fontSize: '12px' }}><strong>Enrolled Campus:</strong> St. Augustine Main Campus</div>
            </div>

            <div className="flex-between">
              <button 
                className="mac-btn" 
                onClick={() => addToast('PDF Transcript', `Exported full transcript for ${selectedStudent.name}`, 'success')}
              >
                <FileText size={14} /> Download Transcript PDF
              </button>
              <button className="mac-btn mac-btn-primary" onClick={() => setSelectedStudent(null)}>
                Close Inspector
              </button>
            </div>
          </div>
        </GlassModal>
      )}
    </div>
  );
};
