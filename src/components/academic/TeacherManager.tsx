import React, { useState } from 'react';
import { useOS } from '../../context/OSContext';
import { GlassModal } from '../common/GlassModal';
import { UserPlus, Star, Mail, Phone, GraduationCap, Building2, Trash2, Calendar, DollarSign, Award, FileText } from 'lucide-react';
import { Teacher } from '../../types';

export const TeacherManager: React.FC = () => {
  const { teachers, addTeacher, deleteTeacher, addToast, playSound } = useOS();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
  const [inspectorTab, setInspectorTab] = useState<'schedule' | 'payroll' | 'performance'>('schedule');

  // Form State
  const [name, setName] = useState('');
  const [department, setDepartment] = useState('STEM');
  const [subject, setSubject] = useState('');
  const [experienceYears, setExperienceYears] = useState(5);
  const [contact, setContact] = useState('');
  const [email, setEmail] = useState('');
  const [salary, setSalary] = useState(85000);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !subject) return;
    addTeacher({
      name,
      department,
      subject,
      experienceYears: Number(experienceYears),
      rating: 4.9,
      status: 'Active',
      contact: contact || '+1 (555) 000-0000',
      email: email || `${name.toLowerCase().replace(/\s+/g, '.')}@eduvanta.org`,
      salary: Number(salary)
    });
    setIsModalOpen(false);
    setName('');
    setSubject('');
    setContact('');
    setEmail('');
  };

  const handleDelete = (id: string) => {
    deleteTeacher(id);
    setSelectedTeacher(null);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }} className="animate-fade-in">
      <div className="flex-between">
        <div>
          <h2 style={{ fontSize: '20px', fontWeight: 800, letterSpacing: '-0.02em' }}>
            Faculty & Department Directory
          </h2>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
            Manage professors, department chairs, payroll, teaching assignments, and performance ratings
          </p>
        </div>
        <button 
          className="mac-btn mac-btn-primary" 
          onClick={() => {
            playSound('click');
            setIsModalOpen(true);
          }}
        >
          <UserPlus size={16} /> Appoint Faculty Member
        </button>
      </div>

      {/* Grid of Teacher Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
        {teachers.map(tch => (
          <div key={tch.id} className="glass-panel" style={{ padding: '18px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div className="flex-between">
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div 
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))',
                    color: '#fff',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '15px'
                  }}
                >
                  {tch.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '14px', color: 'var(--text-primary)' }}>{tch.name}</div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{tch.department} Dept</div>
                </div>
              </div>
              <span className={`mac-badge mac-badge-${tch.status === 'Active' ? 'success' : 'warning'}`}>
                {tch.status}
              </span>
            </div>

            <div className="glass-card" style={{ padding: '10px 12px', fontSize: '12px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <div><strong>Subject:</strong> {tch.subject}</div>
              <div><strong>Experience:</strong> {tch.experienceYears} Years</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <strong>Performance:</strong>
                <Star size={12} fill="#f59e0b" color="#f59e0b" />
                <span style={{ fontWeight: 700, color: '#f59e0b' }}>{tch.rating} / 5.0</span>
              </div>
            </div>

            <div style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '3px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Mail size={12} /> {tch.email}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Phone size={12} /> {tch.contact}</div>
            </div>

            <div className="flex-between" style={{ marginTop: '4px' }}>
              <button 
                className="mac-btn mac-btn-sm" 
                onClick={() => {
                  playSound('click');
                  setSelectedTeacher(tch);
                }}
              >
                Faculty Inspector
              </button>
              <button 
                className="mac-btn mac-btn-sm mac-btn-primary" 
                onClick={() => addToast('Faculty Audit', `Generated performance audit for ${tch.name}`, 'success')}
              >
                Audit Report
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Appoint Faculty Modal */}
      <GlassModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title="Appoint New Faculty Member" 
        subtitle="Add a new professor or department head to Eduvanta OS"
      >
        <form onSubmit={handleCreate} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div>
            <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
              Faculty Name *
            </label>
            <input type="text" className="mac-input" placeholder="e.g. Dr. Julian Croft" value={name} onChange={e => setName(e.target.value)} required />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
                Department
              </label>
              <select className="mac-input" value={department} onChange={e => setDepartment(e.target.value)}>
                <option value="STEM">STEM</option>
                <option value="Mathematics">Mathematics</option>
                <option value="Humanities">Humanities</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Arts & Music">Arts & Music</option>
              </select>
            </div>

            <div>
              <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
                Primary Subject
              </label>
              <input type="text" className="mac-input" placeholder="e.g. Astrophysics" value={subject} onChange={e => setSubject(e.target.value)} required />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
            <div>
              <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
                Experience (Years)
              </label>
              <input type="number" className="mac-input" value={experienceYears} onChange={e => setExperienceYears(Number(e.target.value))} />
            </div>

            <div>
              <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
                Salary ($/year)
              </label>
              <input type="number" className="mac-input" value={salary} onChange={e => setSalary(Number(e.target.value))} />
            </div>

            <div>
              <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
                Contact Phone
              </label>
              <input type="text" className="mac-input" placeholder="+1 (555) 000-0000" value={contact} onChange={e => setContact(e.target.value)} />
            </div>
          </div>

          <div className="flex-between" style={{ marginTop: '10px' }}>
            <button type="button" className="mac-btn" onClick={() => setIsModalOpen(false)}>Cancel</button>
            <button type="submit" className="mac-btn mac-btn-primary">Confirm Appointment</button>
          </div>
        </form>
      </GlassModal>

      {/* Teacher Profile Inspector Modal */}
      {selectedTeacher && (
        <GlassModal
          isOpen={!!selectedTeacher}
          onClose={() => setSelectedTeacher(null)}
          title={`Faculty Profile Inspector: ${selectedTeacher.name}`}
          subtitle={`Department: ${selectedTeacher.department} • Subject: ${selectedTeacher.subject}`}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* Inspector Navigation Tabs */}
            <div style={{ display: 'flex', gap: '8px', borderBottom: '1px solid var(--border-color-subtle)', paddingBottom: '8px' }}>
              {[
                { id: 'schedule', label: 'Assigned Schedule', icon: <Calendar size={13} /> },
                { id: 'payroll', label: 'Payroll & Compensation', icon: <DollarSign size={13} /> },
                { id: 'performance', label: 'Performance Audit', icon: <Award size={13} /> }
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

            {inspectorTab === 'schedule' && (
              <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <h4 style={{ fontSize: '13px', fontWeight: 600 }}>Active Class Assignments</h4>
                <div style={{ fontSize: '12px' }}>• Grade 12 Advanced Calculus (Mon/Wed/Fri 09:00 AM)</div>
                <div style={{ fontSize: '12px' }}>• Grade 10 Honors Mathematics (Tue/Thu 11:30 AM)</div>
                <div style={{ fontSize: '12px' }}>• Departmental Board Meeting (Fri 03:00 PM)</div>
              </div>
            )}

            {inspectorTab === 'payroll' && (
              <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <h4 style={{ fontSize: '13px', fontWeight: 600 }}>Compensation Package</h4>
                <div style={{ fontSize: '12px' }}><strong>Annual Base Salary:</strong> ${(selectedTeacher.salary || 85000).toLocaleString()} / year</div>
                <div style={{ fontSize: '12px' }}><strong>Payroll Status:</strong> Disbursed via Direct Deposit</div>
                <div style={{ fontSize: '12px' }}><strong>Leave Balance:</strong> {selectedTeacher.leaveBalance || 12} Days Remaining</div>
              </div>
            )}

            {inspectorTab === 'performance' && (
              <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <h4 style={{ fontSize: '13px', fontWeight: 600 }}>Student Feedback & Evaluation</h4>
                <div style={{ fontSize: '12px', color: '#f59e0b', fontWeight: 700 }}>
                  Rating: {selectedTeacher.rating} / 5.0 (Top 5% Faculty)
                </div>
                <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                  "Exceptional clarity in explaining complex concepts. Outstanding student engagement and exam pass rate (98.4%)."
                </div>
              </div>
            )}

            <div className="flex-between" style={{ borderTop: '1px solid var(--border-color-subtle)', paddingTop: '12px' }}>
              <button 
                className="mac-btn mac-btn-sm" 
                onClick={() => handleDelete(selectedTeacher.id)}
                style={{ color: 'var(--accent-danger)' }}
              >
                <Trash2 size={13} /> Remove Faculty Member
              </button>
              <button className="mac-btn mac-btn-primary" onClick={() => setSelectedTeacher(null)}>
                Close
              </button>
            </div>
          </div>
        </GlassModal>
      )}
    </div>
  );
};
