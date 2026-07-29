import React, { useState } from 'react';
import { useOS } from '../../context/OSContext';
import { GlassModal } from '../common/GlassModal';
import { 
  Search, 
  UserPlus, 
  Filter, 
  Award, 
  AlertCircle, 
  CheckCircle2, 
  Phone, 
  Mail, 
  FileText,
  Trash2,
  QrCode,
  HeartPulse,
  ShieldAlert,
  DollarSign,
  Upload,
  UserX,
  GraduationCap,
  X
} from 'lucide-react';
import { Student } from '../../types';

export const StudentManager: React.FC = () => {
  const { students, addStudent, updateStudent, deleteStudent, addToast, showContextMenu, playSound } = useOS();

  const [search, setSearch] = useState<string>('');
  const [selectedGrade, setSelectedGrade] = useState<string>('All');
  const [selectedFeeStatus, setSelectedFeeStatus] = useState<string>('All');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isQrModalOpen, setIsQrModalOpen] = useState<boolean>(false);
  const [isImportModalOpen, setIsImportModalOpen] = useState<boolean>(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [inspectorTab, setInspectorTab] = useState<'overview' | 'medical' | 'discipline' | 'fees'>('overview');

  // Enrollment Form State
  const [name, setName] = useState('');
  const [rollNo, setRollNo] = useState('');
  const [grade, setGrade] = useState('Grade 10');
  const [section, setSection] = useState('A');
  const [gender, setGender] = useState<'Male' | 'Female' | 'Other'>('Male');
  const [parentName, setParentName] = useState('');
  const [parentContact, setParentContact] = useState('');
  const [house, setHouse] = useState('Gryphon');
  const [bloodGroup, setBloodGroup] = useState('O+');

  const filtered = students.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(search.toLowerCase()) || 
                          s.rollNo.toLowerCase().includes(search.toLowerCase()) ||
                          s.parentName.toLowerCase().includes(search.toLowerCase());
    const matchesGrade = selectedGrade === 'All' || s.grade === selectedGrade;
    const matchesFee = selectedFeeStatus === 'All' || s.feeStatus === selectedFeeStatus;
    return matchesSearch && matchesGrade && matchesFee;
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
      gpa: 3.85,
      attendancePct: 98.0,
      feeStatus: 'Paid',
      parentName: parentName || 'N/A',
      parentContact: parentContact || 'N/A',
      status: 'Active',
      house,
      bloodGroup
    });
    setIsModalOpen(false);
    setName('');
    setRollNo('');
    setParentName('');
    setParentContact('');
  };

  const handleDelete = (id: string) => {
    deleteStudent(id);
    setSelectedStudent(null);
  };

  const handleToggleSuspend = (stu: Student) => {
    const nextStatus = stu.status === 'Active' ? 'Suspended' : 'Active';
    updateStudent({ ...stu, status: nextStatus });
    setSelectedStudent(prev => prev ? { ...prev, status: nextStatus } : null);
    playSound('click');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }} className="animate-fade-in">
      {/* Header Bar */}
      <div className="flex-between">
        <div>
          <h2 style={{ fontSize: '20px', fontWeight: 800, letterSpacing: '-0.02em' }}>
            Student Management Directory
          </h2>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
            Real-time enrollment records, medical profiles, GPA tracking, and ID generator
          </p>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button 
            className="mac-btn" 
            onClick={() => {
              playSound('click');
              setIsImportModalOpen(true);
            }}
          >
            <Upload size={15} /> Bulk CSV Import
          </button>
          <button 
            className="mac-btn mac-btn-primary" 
            onClick={() => {
              playSound('click');
              setIsModalOpen(true);
            }}
          >
            <UserPlus size={15} /> Enroll New Student
          </button>
        </div>
      </div>

      {/* Filter and Search Control Bar */}
      <div className="glass-panel" style={{ padding: '14px', display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
        <div style={{ position: 'relative', flex: 1, minWidth: '220px' }}>
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
          <Filter size={15} style={{ color: 'var(--text-muted)' }} />
          <select 
            className="mac-input" 
            value={selectedGrade} 
            onChange={(e) => setSelectedGrade(e.target.value)}
            style={{ width: '130px' }}
          >
            <option value="All">All Grades</option>
            <option value="Grade 9">Grade 9</option>
            <option value="Grade 10">Grade 10</option>
            <option value="Grade 11">Grade 11</option>
            <option value="Grade 12">Grade 12</option>
          </select>

          <select 
            className="mac-input" 
            value={selectedFeeStatus} 
            onChange={(e) => setSelectedFeeStatus(e.target.value)}
            style={{ width: '130px' }}
          >
            <option value="All">All Fees</option>
            <option value="Paid">Paid</option>
            <option value="Pending">Pending</option>
            <option value="Overdue">Overdue</option>
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
              <th>House</th>
              <th>Cumulative GPA</th>
              <th>Attendance</th>
              <th>Fee Status</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(student => (
              <tr 
                key={student.id}
                onContextMenu={(e) => showContextMenu(e, [
                  { label: `View Profile: ${student.name}`, action: () => setSelectedStudent(student) },
                  { label: 'Print QR ID Card', action: () => { setSelectedStudent(student); setIsQrModalOpen(true); } },
                  { label: 'Download Transcript PDF', action: () => addToast('PDF Export', `Transcript generated for ${student.name}`, 'success') },
                  { label: 'Delete Student Record', action: () => handleDelete(student.id), danger: true }
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
                <td>
                  <span className="mac-badge mac-badge-neutral">{student.house || 'Gryphon'}</span>
                </td>
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
                  <span className={`mac-badge mac-badge-${student.status === 'Active' ? 'success' : 'danger'}`}>
                    {student.status}
                  </span>
                </td>
                <td>
                  <div style={{ display: 'flex', gap: '4px' }}>
                    <button 
                      className="mac-btn mac-btn-sm" 
                      onClick={() => {
                        playSound('click');
                        setSelectedStudent(student);
                      }}
                    >
                      Inspect
                    </button>
                    <button 
                      className="mac-btn mac-btn-sm"
                      title="Generate ID Card"
                      onClick={() => {
                        playSound('click');
                        setSelectedStudent(student);
                        setIsQrModalOpen(true);
                      }}
                    >
                      <QrCode size={12} />
                    </button>
                  </div>
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
                House
              </label>
              <select className="mac-input" value={house} onChange={e => setHouse(e.target.value)}>
                <option value="Gryphon">Gryphon</option>
                <option value="Phoenix">Phoenix</option>
                <option value="Dragon">Dragon</option>
                <option value="Centaur">Centaur</option>
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

      {/* Bulk Import Modal Simulation */}
      <GlassModal
        isOpen={isImportModalOpen}
        onClose={() => setIsImportModalOpen(false)}
        title="Bulk Student Import (CSV/Excel)"
        subtitle="Upload CSV file with columns: Name, RollNo, Grade, Section, ParentName, ParentContact"
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center', textAlign: 'center' }}>
          <div 
            style={{
              width: '100%',
              padding: '32px 16px',
              border: '2px dashed var(--border-color)',
              borderRadius: 'var(--radius-lg)',
              backgroundColor: 'var(--bg-input)',
              cursor: 'pointer'
            }}
            onClick={() => {
              addToast('Import Completed', '15 Student records imported successfully from sample.csv', 'success');
              setIsImportModalOpen(false);
            }}
          >
            <Upload size={32} style={{ color: 'var(--accent-primary)', marginBottom: '8px' }} />
            <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>
              Click to browse or drop CSV/Excel roster file
            </div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px' }}>
              Supports .csv, .xlsx, .tsv files up to 25MB
            </div>
          </div>
        </div>
      </GlassModal>

      {/* Student Inspector Modal */}
      {selectedStudent && !isQrModalOpen && (
        <GlassModal
          isOpen={!!selectedStudent}
          onClose={() => setSelectedStudent(null)}
          title={`Student Profile Inspector: ${selectedStudent.name}`}
          subtitle={`Roll No: ${selectedStudent.rollNo} • Grade: ${selectedStudent.grade}-${selectedStudent.section} • ID: ${selectedStudent.id}`}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* Inspector Navigation Tabs */}
            <div style={{ display: 'flex', gap: '8px', borderBottom: '1px solid var(--border-color-subtle)', paddingBottom: '8px' }}>
              {[
                { id: 'overview', label: 'Overview', icon: <FileText size={13} /> },
                { id: 'medical', label: 'Medical Info', icon: <HeartPulse size={13} /> },
                { id: 'discipline', label: 'Discipline Log', icon: <ShieldAlert size={13} /> },
                { id: 'fees', label: 'Fee History', icon: <DollarSign size={13} /> }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => {
                    playSound('click');
                    setInspectorTab(tab.id as any);
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '6px 12px',
                    borderRadius: 'var(--radius-md)',
                    border: 'none',
                    backgroundColor: inspectorTab === tab.id ? 'var(--accent-primary-bg)' : 'transparent',
                    color: inspectorTab === tab.id ? 'var(--accent-primary)' : 'var(--text-muted)',
                    fontWeight: inspectorTab === tab.id ? 600 : 400,
                    fontSize: '12px',
                    cursor: 'pointer'
                  }}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Tab Contents */}
            {inspectorTab === 'overview' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
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
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>House Affiliation</div>
                    <div style={{ fontSize: '16px', fontWeight: 700, color: 'var(--accent-secondary)', marginTop: '2px' }}>{selectedStudent.house || 'Gryphon'}</div>
                  </div>
                </div>

                <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <h4 style={{ fontSize: '13px', fontWeight: 600 }}>Parent & Contact Details</h4>
                  <div style={{ fontSize: '12px' }}><strong>Guardian:</strong> {selectedStudent.parentName}</div>
                  <div style={{ fontSize: '12px' }}><strong>Contact Phone:</strong> {selectedStudent.parentContact}</div>
                  <div style={{ fontSize: '12px' }}><strong>Current Status:</strong> {selectedStudent.status}</div>
                </div>
              </div>
            )}

            {inspectorTab === 'medical' && (
              <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <h4 style={{ fontSize: '13px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <HeartPulse size={16} className="text-rose-400" /> Medical & Emergency Profile
                </h4>
                <div style={{ fontSize: '12px' }}><strong>Blood Group:</strong> {selectedStudent.bloodGroup || 'O+'}</div>
                <div style={{ fontSize: '12px' }}><strong>Allergies:</strong> {selectedStudent.allergies?.join(', ') || 'None reported'}</div>
                <div style={{ fontSize: '12px' }}><strong>Emergency Contact:</strong> {selectedStudent.emergencyContact || selectedStudent.parentContact}</div>
                <div style={{ fontSize: '12px' }}><strong>Medical Clearance:</strong> Verified fit for all physical athletic events.</div>
              </div>
            )}

            {inspectorTab === 'discipline' && (
              <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <h4 style={{ fontSize: '13px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <ShieldAlert size={16} className="text-amber-400" /> Behavioral & Commendation History
                </h4>
                <div style={{ fontSize: '12px', padding: '8px', backgroundColor: 'var(--bg-input)', borderRadius: 'var(--radius-sm)' }}>
                  <span className="mac-badge mac-badge-success" style={{ marginRight: '6px' }}>Commendation</span>
                  Principal Academic Excellence Recognition — Q2 Honor Roll
                </div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>0 Detention or Disciplinary Warning logs.</div>
              </div>
            )}

            {inspectorTab === 'fees' && (
              <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <h4 style={{ fontSize: '13px', fontWeight: 600 }}>Fee Ledger Status</h4>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px' }}>
                  <span>Q3 Tuition Fee ($2,450)</span>
                  <span className={`mac-badge mac-badge-${selectedStudent.feeStatus === 'Paid' ? 'success' : 'warning'}`}>
                    {selectedStudent.feeStatus}
                  </span>
                </div>
              </div>
            )}

            {/* Inspector Footer Action Buttons */}
            <div className="flex-between" style={{ marginTop: '12px', borderTop: '1px solid var(--border-color-subtle)', paddingTop: '12px' }}>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button 
                  className="mac-btn mac-btn-sm" 
                  onClick={() => handleToggleSuspend(selectedStudent)}
                  style={{ color: 'var(--accent-warning)' }}
                >
                  <UserX size={13} /> {selectedStudent.status === 'Active' ? 'Suspend Student' : 'Activate Student'}
                </button>
                <button 
                  className="mac-btn mac-btn-sm" 
                  onClick={() => handleDelete(selectedStudent.id)}
                  style={{ color: 'var(--accent-danger)' }}
                >
                  <Trash2 size={13} /> Delete Record
                </button>
              </div>

              <div style={{ display: 'flex', gap: '8px' }}>
                <button 
                  className="mac-btn" 
                  onClick={() => {
                    setIsQrModalOpen(true);
                  }}
                >
                  <QrCode size={14} /> Printable ID Card
                </button>
                <button className="mac-btn mac-btn-primary" onClick={() => setSelectedStudent(null)}>
                  Done
                </button>
              </div>
            </div>
          </div>
        </GlassModal>
      )}

      {/* Printable ID Card Modal */}
      {selectedStudent && isQrModalOpen && (
        <GlassModal
          isOpen={isQrModalOpen}
          onClose={() => setIsQrModalOpen(false)}
          title="Print Official Student ID Card"
        >
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', padding: '16px' }}>
            <div 
              style={{
                width: '320px',
                padding: '20px',
                borderRadius: '16px',
                background: 'linear-gradient(135deg, #1e293b, #0f172a)',
                border: '1px solid rgba(255,255,255,0.2)',
                boxShadow: '0 12px 32px rgba(0,0,0,0.5)',
                color: '#fff',
                position: 'relative'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 800, fontSize: '14px', letterSpacing: '-0.02em', color: '#60a5fa' }}>
                  <GraduationCap size={16} /> Eduvanta St. Augustine Academy
                </div>
                <div style={{ fontSize: '10px', background: '#2563eb', padding: '2px 8px', borderRadius: '10px', fontWeight: 700 }}>
                  STUDENT ID
                </div>
              </div>

              <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
                <div 
                  style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    background: '#3b82f6',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 800,
                    fontSize: '20px'
                  }}
                >
                  {selectedStudent.name.split(' ').map(n => n[0]).join('')}
                </div>

                <div>
                  <div style={{ fontSize: '16px', fontWeight: 700 }}>{selectedStudent.name}</div>
                  <div style={{ fontSize: '11px', color: '#94a3b8' }}>Roll: {selectedStudent.rollNo}</div>
                  <div style={{ fontSize: '11px', color: '#94a3b8' }}>Grade: {selectedStudent.grade}-{selectedStudent.section}</div>
                  <div style={{ fontSize: '11px', color: '#a78bfa' }}>House: {selectedStudent.house || 'Gryphon'}</div>
                </div>
              </div>

              <div style={{ marginTop: '16px', paddingTop: '12px', borderTop: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: '9px', color: '#64748b' }}>VALID UNTIL</div>
                  <div style={{ fontSize: '11px', fontWeight: 600 }}>JUN 2027</div>
                </div>

                {/* Simulated QR barcode */}
                <div style={{ padding: '6px', background: '#ffffff', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <QrCode size={36} style={{ color: '#000000' }} />
                </div>
              </div>
            </div>

            <button 
              className="mac-btn mac-btn-primary" 
              onClick={() => {
                addToast('Print Job Sent', `ID card queued for high-resolution printing`, 'success');
                setIsQrModalOpen(false);
              }}
            >
              Print ID Card
            </button>
          </div>
        </GlassModal>
      )}
    </div>
  );
};
