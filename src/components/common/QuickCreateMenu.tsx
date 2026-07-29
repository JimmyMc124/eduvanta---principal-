import React, { useState } from 'react';
import { useOS } from '../../context/OSContext';
import { GlassModal } from './GlassModal';
import { 
  Plus, 
  Users, 
  GraduationCap, 
  DollarSign, 
  UserCheck, 
  Calendar, 
  MessageSquare, 
  ShieldCheck, 
  Sparkles, 
  X,
  FileText
} from 'lucide-react';

export const QuickCreateMenu: React.FC = () => {
  const { 
    isQuickCreateOpen, 
    toggleQuickCreate, 
    quickCreateModalType, 
    openQuickCreateModal, 
    closeQuickCreateModal,
    addStudent,
    addTeacher,
    addFinanceRecord,
    addUserAccount,
    addNotification,
    playSound
  } = useOS();

  // Modal Form States
  const [studentForm, setStudentForm] = useState({
    name: '',
    grade: 'Grade 10',
    section: 'A',
    rollNo: '10-A-25',
    gender: 'Male' as const,
    gpa: 3.8,
    attendancePct: 98,
    feeStatus: 'Paid' as const,
    parentName: '',
    parentContact: '',
    status: 'Active' as const,
    house: 'Gryphon'
  });

  const [teacherForm, setTeacherForm] = useState({
    name: '',
    department: 'STEM',
    subject: '',
    experienceYears: 5,
    rating: 4.8,
    status: 'Active' as const,
    contact: '',
    email: '',
    salary: 85000
  });

  const [financeForm, setFinanceForm] = useState({
    type: 'Revenue' as const,
    category: 'Tuition Fees',
    amount: 2500,
    description: '',
    status: 'Completed' as const
  });

  const [userAccountForm, setUserAccountForm] = useState({
    name: '',
    email: '',
    role: 'Teacher' as const,
    status: 'Active' as const,
    twoFactorEnabled: true,
    ipAddress: '192.168.1.150'
  });

  const [announcementForm, setAnnouncementForm] = useState({
    title: '',
    message: '',
    category: 'Students' as const
  });

  const handleCreateStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentForm.name) return;
    addStudent(studentForm);
    closeQuickCreateModal();
    setStudentForm({
      name: '',
      grade: 'Grade 10',
      section: 'A',
      rollNo: '10-A-25',
      gender: 'Male',
      gpa: 3.8,
      attendancePct: 98,
      feeStatus: 'Paid',
      parentName: '',
      parentContact: '',
      status: 'Active',
      house: 'Gryphon'
    });
  };

  const handleCreateTeacher = (e: React.FormEvent) => {
    e.preventDefault();
    if (!teacherForm.name) return;
    addTeacher(teacherForm);
    closeQuickCreateModal();
    setTeacherForm({
      name: '',
      department: 'STEM',
      subject: '',
      experienceYears: 5,
      rating: 4.8,
      status: 'Active',
      contact: '',
      email: '',
      salary: 85000
    });
  };

  const handleCreateFinance = (e: React.FormEvent) => {
    e.preventDefault();
    if (!financeForm.amount) return;
    addFinanceRecord(financeForm);
    closeQuickCreateModal();
    setFinanceForm({
      type: 'Revenue',
      category: 'Tuition Fees',
      amount: 2500,
      description: '',
      status: 'Completed'
    });
  };

  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userAccountForm.name || !userAccountForm.email) return;
    addUserAccount(userAccountForm);
    closeQuickCreateModal();
    setUserAccountForm({
      name: '',
      email: '',
      role: 'Teacher',
      status: 'Active',
      twoFactorEnabled: true,
      ipAddress: '192.168.1.150'
    });
  };

  const handleCreateAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!announcementForm.title) return;
    addNotification(announcementForm.title, announcementForm.message, announcementForm.category);
    closeQuickCreateModal();
    setAnnouncementForm({
      title: '',
      message: '',
      category: 'Students'
    });
  };

  const quickItems = [
    { type: 'student', label: 'New Student', icon: <Users size={16} className="text-blue-400" />, desc: 'Register a new student profile' },
    { type: 'teacher', label: 'New Faculty', icon: <GraduationCap size={16} className="text-purple-400" />, desc: 'Appoint new teacher or instructor' },
    { type: 'finance', label: 'Log Payment', icon: <DollarSign size={16} className="text-emerald-400" />, desc: 'Record revenue or school expense' },
    { type: 'account', label: 'New Account', icon: <ShieldCheck size={16} className="text-rose-400" />, desc: 'Create user access credentials' },
    { type: 'announcement', label: 'Broadcast Alert', icon: <MessageSquare size={16} className="text-amber-400" />, desc: 'Send school-wide notification' }
  ];

  return (
    <>
      {/* Floating Action Button */}
      <div 
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          zIndex: 150
        }}
      >
        <button
          onClick={toggleQuickCreate}
          style={{
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #2563eb, #7c3aed)',
            color: '#ffffff',
            border: '1px solid rgba(255,255,255,0.2)',
            boxShadow: '0 8px 24px rgba(37, 99, 235, 0.4)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'transform 200ms cubic-bezier(0.16, 1, 0.3, 1)',
            transform: isQuickCreateOpen ? 'rotate(45deg)' : 'rotate(0deg)'
          }}
          title="Quick Action Menu (⌘N)"
        >
          <Plus size={22} />
        </button>

        {/* Quick Popover Menu */}
        {isQuickCreateOpen && (
          <div 
            style={{
              position: 'absolute',
              bottom: '60px',
              right: '0',
              width: '260px',
              backgroundColor: 'var(--bg-popover)',
              backdropFilter: 'var(--backdrop-blur)',
              WebkitBackdropFilter: 'var(--backdrop-blur)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-lg)',
              boxShadow: 'var(--shadow-lg)',
              padding: '8px',
              animation: 'slideUp 180ms cubic-bezier(0.16, 1, 0.3, 1)'
            }}
          >
            <div style={{ padding: '6px 10px', fontSize: '10px', fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '0.05em' }}>
              QUICK CREATE ACTION
            </div>
            {quickItems.map(item => (
              <button
                key={item.type}
                onClick={() => openQuickCreateModal(item.type)}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '8px 10px',
                  border: 'none',
                  background: 'transparent',
                  borderRadius: 'var(--radius-md)',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'background 120ms'
                }}
                className="mac-btn"
              >
                <div style={{ padding: '6px', borderRadius: 'var(--radius-sm)', background: 'var(--bg-surface)' }}>
                  {item.icon}
                </div>
                <div>
                  <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-primary)' }}>
                    {item.label}
                  </div>
                  <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>
                    {item.desc}
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Student Creation Modal */}
      <GlassModal
        isOpen={quickCreateModalType === 'student'}
        onClose={closeQuickCreateModal}
        title="Enroll New Student"
        icon={<Users size={18} className="text-blue-400" />}
      >
        <form onSubmit={handleCreateStudent} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div>
            <label style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px', display: 'block' }}>Full Name *</label>
            <input 
              type="text" 
              required
              placeholder="e.g. Alexander Wright"
              value={studentForm.name}
              onChange={(e) => setStudentForm({ ...studentForm, name: e.target.value })}
              style={{ width: '100%', padding: '8px 12px', backgroundColor: 'var(--bg-input)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', color: 'var(--text-primary)', fontSize: '12px' }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
            <div>
              <label style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px', display: 'block' }}>Grade</label>
              <select 
                value={studentForm.grade}
                onChange={(e) => setStudentForm({ ...studentForm, grade: e.target.value })}
                style={{ width: '100%', padding: '8px', backgroundColor: 'var(--bg-input)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', color: 'var(--text-primary)', fontSize: '12px' }}
              >
                <option value="Grade 9">Grade 9</option>
                <option value="Grade 10">Grade 10</option>
                <option value="Grade 11">Grade 11</option>
                <option value="Grade 12">Grade 12</option>
              </select>
            </div>
            <div>
              <label style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px', display: 'block' }}>Section</label>
              <input 
                type="text" 
                value={studentForm.section}
                onChange={(e) => setStudentForm({ ...studentForm, section: e.target.value })}
                style={{ width: '100%', padding: '8px', backgroundColor: 'var(--bg-input)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', color: 'var(--text-primary)', fontSize: '12px' }}
              />
            </div>
            <div>
              <label style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px', display: 'block' }}>House</label>
              <select 
                value={studentForm.house}
                onChange={(e) => setStudentForm({ ...studentForm, house: e.target.value })}
                style={{ width: '100%', padding: '8px', backgroundColor: 'var(--bg-input)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', color: 'var(--text-primary)', fontSize: '12px' }}
              >
                <option value="Gryphon">Gryphon</option>
                <option value="Phoenix">Phoenix</option>
                <option value="Dragon">Dragon</option>
                <option value="Centaur">Centaur</option>
              </select>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <div>
              <label style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px', display: 'block' }}>Parent Name</label>
              <input 
                type="text" 
                placeholder="Guardian name"
                value={studentForm.parentName}
                onChange={(e) => setStudentForm({ ...studentForm, parentName: e.target.value })}
                style={{ width: '100%', padding: '8px', backgroundColor: 'var(--bg-input)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', color: 'var(--text-primary)', fontSize: '12px' }}
              />
            </div>
            <div>
              <label style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px', display: 'block' }}>Parent Phone</label>
              <input 
                type="text" 
                placeholder="+1 (555) 000-0000"
                value={studentForm.parentContact}
                onChange={(e) => setStudentForm({ ...studentForm, parentContact: e.target.value })}
                style={{ width: '100%', padding: '8px', backgroundColor: 'var(--bg-input)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', color: 'var(--text-primary)', fontSize: '12px' }}
              />
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '10px' }}>
            <button 
              type="button" 
              onClick={closeQuickCreateModal}
              style={{ padding: '8px 16px', background: 'transparent', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '12px' }}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              style={{ padding: '8px 16px', background: 'var(--accent-primary)', border: 'none', borderRadius: 'var(--radius-md)', color: '#fff', fontWeight: 600, cursor: 'pointer', fontSize: '12px' }}
            >
              Enroll Student
            </button>
          </div>
        </form>
      </GlassModal>

      {/* Teacher Creation Modal */}
      <GlassModal
        isOpen={quickCreateModalType === 'teacher'}
        onClose={closeQuickCreateModal}
        title="Appoint New Faculty Member"
        icon={<GraduationCap size={18} className="text-purple-400" />}
      >
        <form onSubmit={handleCreateTeacher} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div>
            <label style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px', display: 'block' }}>Teacher Name *</label>
            <input 
              type="text" 
              required
              placeholder="e.g. Dr. Clara Thorne"
              value={teacherForm.name}
              onChange={(e) => setTeacherForm({ ...teacherForm, name: e.target.value })}
              style={{ width: '100%', padding: '8px 12px', backgroundColor: 'var(--bg-input)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', color: 'var(--text-primary)', fontSize: '12px' }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <div>
              <label style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px', display: 'block' }}>Department</label>
              <select 
                value={teacherForm.department}
                onChange={(e) => setTeacherForm({ ...teacherForm, department: e.target.value })}
                style={{ width: '100%', padding: '8px', backgroundColor: 'var(--bg-input)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', color: 'var(--text-primary)', fontSize: '12px' }}
              >
                <option value="STEM">STEM</option>
                <option value="Mathematics">Mathematics</option>
                <option value="Humanities">Humanities</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Arts & Music">Arts & Music</option>
              </select>
            </div>
            <div>
              <label style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px', display: 'block' }}>Primary Subject</label>
              <input 
                type="text" 
                placeholder="e.g. Calculus & AI"
                value={teacherForm.subject}
                onChange={(e) => setTeacherForm({ ...teacherForm, subject: e.target.value })}
                style={{ width: '100%', padding: '8px', backgroundColor: 'var(--bg-input)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', color: 'var(--text-primary)', fontSize: '12px' }}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <div>
              <label style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px', display: 'block' }}>Official Email</label>
              <input 
                type="email" 
                placeholder="name@eduvanta.org"
                value={teacherForm.email}
                onChange={(e) => setTeacherForm({ ...teacherForm, email: e.target.value })}
                style={{ width: '100%', padding: '8px', backgroundColor: 'var(--bg-input)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', color: 'var(--text-primary)', fontSize: '12px' }}
              />
            </div>
            <div>
              <label style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px', display: 'block' }}>Contact Number</label>
              <input 
                type="text" 
                placeholder="+1 (555) 000-0000"
                value={teacherForm.contact}
                onChange={(e) => setTeacherForm({ ...teacherForm, contact: e.target.value })}
                style={{ width: '100%', padding: '8px', backgroundColor: 'var(--bg-input)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', color: 'var(--text-primary)', fontSize: '12px' }}
              />
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '10px' }}>
            <button 
              type="button" 
              onClick={closeQuickCreateModal}
              style={{ padding: '8px 16px', background: 'transparent', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '12px' }}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              style={{ padding: '8px 16px', background: 'var(--accent-primary)', border: 'none', borderRadius: 'var(--radius-md)', color: '#fff', fontWeight: 600, cursor: 'pointer', fontSize: '12px' }}
            >
              Appoint Faculty
            </button>
          </div>
        </form>
      </GlassModal>

      {/* Finance Log Modal */}
      <GlassModal
        isOpen={quickCreateModalType === 'finance'}
        onClose={closeQuickCreateModal}
        title="Log Financial Transaction"
        icon={<DollarSign size={18} className="text-emerald-400" />}
      >
        <form onSubmit={handleCreateFinance} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <div>
              <label style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px', display: 'block' }}>Transaction Type</label>
              <select 
                value={financeForm.type}
                onChange={(e) => setFinanceForm({ ...financeForm, type: e.target.value as any })}
                style={{ width: '100%', padding: '8px', backgroundColor: 'var(--bg-input)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', color: 'var(--text-primary)', fontSize: '12px' }}
              >
                <option value="Revenue">Revenue (Income)</option>
                <option value="Expense">Expense (Outflow)</option>
              </select>
            </div>
            <div>
              <label style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px', display: 'block' }}>Category</label>
              <select 
                value={financeForm.category}
                onChange={(e) => setFinanceForm({ ...financeForm, category: e.target.value })}
                style={{ width: '100%', padding: '8px', backgroundColor: 'var(--bg-input)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', color: 'var(--text-primary)', fontSize: '12px' }}
              >
                <option value="Tuition Fees">Tuition Fees</option>
                <option value="Faculty Payroll">Faculty Payroll</option>
                <option value="Transport Fees">Transport Fees</option>
                <option value="IT Infrastructure">IT Infrastructure</option>
                <option value="Laboratory Supplies">Laboratory Supplies</option>
              </select>
            </div>
          </div>

          <div>
            <label style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px', display: 'block' }}>Amount ($ USD) *</label>
            <input 
              type="number" 
              required
              placeholder="e.g. 2500"
              value={financeForm.amount}
              onChange={(e) => setFinanceForm({ ...financeForm, amount: parseFloat(e.target.value) || 0 })}
              style={{ width: '100%', padding: '8px 12px', backgroundColor: 'var(--bg-input)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', color: 'var(--text-primary)', fontSize: '12px' }}
            />
          </div>

          <div>
            <label style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px', display: 'block' }}>Description</label>
            <input 
              type="text" 
              placeholder="Details regarding this record..."
              value={financeForm.description}
              onChange={(e) => setFinanceForm({ ...financeForm, description: e.target.value })}
              style={{ width: '100%', padding: '8px 12px', backgroundColor: 'var(--bg-input)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', color: 'var(--text-primary)', fontSize: '12px' }}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '10px' }}>
            <button 
              type="button" 
              onClick={closeQuickCreateModal}
              style={{ padding: '8px 16px', background: 'transparent', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '12px' }}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              style={{ padding: '8px 16px', background: 'var(--accent-primary)', border: 'none', borderRadius: 'var(--radius-md)', color: '#fff', fontWeight: 600, cursor: 'pointer', fontSize: '12px' }}
            >
              Save Transaction
            </button>
          </div>
        </form>
      </GlassModal>

      {/* Broadcast Announcement Modal */}
      <GlassModal
        isOpen={quickCreateModalType === 'announcement'}
        onClose={closeQuickCreateModal}
        title="Broadcast School Announcement"
        icon={<MessageSquare size={18} className="text-amber-400" />}
      >
        <form onSubmit={handleCreateAnnouncement} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div>
            <label style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px', display: 'block' }}>Alert Title *</label>
            <input 
              type="text" 
              required
              placeholder="e.g. Campus Athletic Schedule Update"
              value={announcementForm.title}
              onChange={(e) => setAnnouncementForm({ ...announcementForm, title: e.target.value })}
              style={{ width: '100%', padding: '8px 12px', backgroundColor: 'var(--bg-input)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', color: 'var(--text-primary)', fontSize: '12px' }}
            />
          </div>

          <div>
            <label style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px', display: 'block' }}>Target Audience</label>
            <select 
              value={announcementForm.category}
              onChange={(e) => setAnnouncementForm({ ...announcementForm, category: e.target.value as any })}
              style={{ width: '100%', padding: '8px', backgroundColor: 'var(--bg-input)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', color: 'var(--text-primary)', fontSize: '12px' }}
            >
              <option value="Students">Students & Parents</option>
              <option value="Teachers">Faculty Members</option>
              <option value="System">All Users</option>
              <option value="Exams">Examination Board</option>
            </select>
          </div>

          <div>
            <label style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px', display: 'block' }}>Announcement Content</label>
            <textarea 
              rows={3}
              placeholder="Write broadcast message..."
              value={announcementForm.message}
              onChange={(e) => setAnnouncementForm({ ...announcementForm, message: e.target.value })}
              style={{ width: '100%', padding: '8px 12px', backgroundColor: 'var(--bg-input)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', color: 'var(--text-primary)', fontSize: '12px', fontFamily: 'inherit' }}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '10px' }}>
            <button 
              type="button" 
              onClick={closeQuickCreateModal}
              style={{ padding: '8px 16px', background: 'transparent', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '12px' }}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              style={{ padding: '8px 16px', background: 'var(--accent-primary)', border: 'none', borderRadius: 'var(--radius-md)', color: '#fff', fontWeight: 600, cursor: 'pointer', fontSize: '12px' }}
            >
              Send Broadcast
            </button>
          </div>
        </form>
      </GlassModal>
    </>
  );
};
