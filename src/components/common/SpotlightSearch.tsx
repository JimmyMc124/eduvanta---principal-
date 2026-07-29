import React, { useState } from 'react';
import { useOS } from '../../context/OSContext';
import { Search, Command, ArrowRight, User, GraduationCap, Grid, Bus, BookOpen, ShieldCheck, DollarSign, X } from 'lucide-react';
import { NavigationTab } from '../../types';

export const SpotlightSearch: React.FC = () => {
  const { 
    isSpotlightOpen, 
    toggleSpotlight, 
    students, 
    teachers, 
    busRoutes, 
    books, 
    setActiveTab, 
    addToast 
  } = useOS();

  const [query, setQuery] = useState<string>('');

  if (!isSpotlightOpen) return null;

  const filteredStudents = query.trim() ? students.filter(s => s.name.toLowerCase().includes(query.toLowerCase()) || s.rollNo.toLowerCase().includes(query.toLowerCase())) : [];
  const filteredTeachers = query.trim() ? teachers.filter(t => t.name.toLowerCase().includes(query.toLowerCase()) || t.department.toLowerCase().includes(query.toLowerCase())) : [];
  const filteredBuses = query.trim() ? busRoutes.filter(b => b.busNumber.toLowerCase().includes(query.toLowerCase()) || b.driverName.toLowerCase().includes(query.toLowerCase())) : [];
  const filteredBooks = query.trim() ? books.filter(bk => bk.title.toLowerCase().includes(query.toLowerCase()) || bk.author.toLowerCase().includes(query.toLowerCase())) : [];

  const handleSelectTab = (tab: NavigationTab) => {
    setActiveTab(tab);
    toggleSpotlight();
  };

  return (
    <div 
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.65)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        zIndex: 200,
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingTop: '120px'
      }}
      onClick={toggleSpotlight}
    >
      <div 
        className="animate-slide-down"
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '620px',
          maxHeight: '480px',
          backgroundColor: 'var(--bg-popover)',
          backdropFilter: 'var(--backdrop-blur)',
          border: '1px solid var(--border-color-active)',
          borderRadius: 'var(--radius-xl)',
          boxShadow: 'var(--shadow-lg)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden'
        }}
      >
        {/* Search Input Bar */}
        <div 
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '16px 20px',
            borderBottom: '1px solid var(--border-color)',
            background: 'rgba(0,0,0,0.15)'
          }}
        >
          <Search size={20} style={{ color: 'var(--accent-primary)' }} />
          <input 
            type="text" 
            placeholder="Spotlight Search... (Type 'Alexander', 'Physics', 'Bus', 'Library')"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: 'var(--text-primary)',
              fontSize: '16px',
              fontWeight: 500
            }}
          />
          <kbd style={{ 
            background: 'var(--bg-surface)', 
            padding: '3px 8px', 
            borderRadius: '6px', 
            fontSize: '11px', 
            color: 'var(--text-muted)',
            border: '1px solid var(--border-color)'
          }}>ESC</kbd>
        </div>

        {/* Results Area */}
        <div style={{ padding: '16px', overflowY: 'auto', flex: 1, display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {!query.trim() && (
            <div>
              <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '10px', textTransform: 'uppercase' }}>
                Quick OS Navigation
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                <button className="mac-btn" onClick={() => handleSelectTab('dashboard')} style={{ justifyContent: 'flex-start' }}>
                  <Grid size={14} /> Principal Dashboard
                </button>
                <button className="mac-btn" onClick={() => handleSelectTab('students')} style={{ justifyContent: 'flex-start' }}>
                  <User size={14} /> Student Directory
                </button>
                <button className="mac-btn" onClick={() => handleSelectTab('teachers')} style={{ justifyContent: 'flex-start' }}>
                  <GraduationCap size={14} /> Faculty & Departments
                </button>
                <button className="mac-btn" onClick={() => handleSelectTab('transport')} style={{ justifyContent: 'flex-start' }}>
                  <Bus size={14} /> Live Bus Tracker
                </button>
                <button className="mac-btn" onClick={() => handleSelectTab('finance')} style={{ justifyContent: 'flex-start' }}>
                  <DollarSign size={14} /> Financial Ledger
                </button>
                <button className="mac-btn" onClick={() => handleSelectTab('security')} style={{ justifyContent: 'flex-start' }}>
                  <ShieldCheck size={14} /> Security & Firewall
                </button>
              </div>
            </div>
          )}

          {/* Student Search Matches */}
          {filteredStudents.length > 0 && (
            <div>
              <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '8px', textTransform: 'uppercase' }}>
                Students ({filteredStudents.length})
              </div>
              {filteredStudents.map(stu => (
                <div 
                  key={stu.id}
                  onClick={() => {
                    handleSelectTab('students');
                    addToast('Spotlight Match', `Opened record for ${stu.name}`, 'info');
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '10px 12px',
                    borderRadius: 'var(--radius-md)',
                    cursor: 'pointer',
                    transition: 'background 150ms',
                    marginBottom: '4px'
                  }}
                  className="glass-card"
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <User size={16} style={{ color: 'var(--accent-primary)' }} />
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '13px' }}>{stu.name}</div>
                      <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{stu.grade} | GPA: {stu.gpa} | Roll: {stu.rollNo}</div>
                    </div>
                  </div>
                  <ArrowRight size={14} style={{ color: 'var(--text-muted)' }} />
                </div>
              ))}
            </div>
          )}

          {/* Teacher Search Matches */}
          {filteredTeachers.length > 0 && (
            <div>
              <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '8px', textTransform: 'uppercase' }}>
                Faculty ({filteredTeachers.length})
              </div>
              {filteredTeachers.map(tch => (
                <div 
                  key={tch.id}
                  onClick={() => {
                    handleSelectTab('teachers');
                    addToast('Spotlight Match', `Opened profile for ${tch.name}`, 'info');
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '10px 12px',
                    borderRadius: 'var(--radius-md)',
                    cursor: 'pointer',
                    transition: 'background 150ms',
                    marginBottom: '4px'
                  }}
                  className="glass-card"
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <GraduationCap size={16} style={{ color: 'var(--accent-secondary)' }} />
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '13px' }}>{tch.name}</div>
                      <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{tch.subject} ({tch.department})</div>
                    </div>
                  </div>
                  <ArrowRight size={14} style={{ color: 'var(--text-muted)' }} />
                </div>
              ))}
            </div>
          )}

          {/* Bus Matches */}
          {filteredBuses.length > 0 && (
            <div>
              <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '8px', textTransform: 'uppercase' }}>
                School Transport
              </div>
              {filteredBuses.map(bus => (
                <div 
                  key={bus.id}
                  onClick={() => handleSelectTab('transport')}
                  className="glass-card"
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 12px', cursor: 'pointer', marginBottom: '4px' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Bus size={16} style={{ color: 'var(--accent-info)' }} />
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '13px' }}>{bus.busNumber}</div>
                      <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Driver: {bus.driverName} | Location: {bus.currentLocationName}</div>
                    </div>
                  </div>
                  <span className="mac-badge mac-badge-info">{bus.status}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
