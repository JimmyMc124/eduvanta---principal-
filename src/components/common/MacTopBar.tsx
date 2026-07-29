import React, { useState, useEffect } from 'react';
import { useOS } from '../../context/OSContext';
import { 
  Search, 
  Sliders, 
  Sparkles, 
  Sun, 
  Moon, 
  CloudSun, 
  Wifi, 
  Server, 
  Bell, 
  ChevronDown, 
  GraduationCap,
  Zap,
  Building2,
  UserCheck,
  User,
  Crown,
  BookOpen,
  Shield
} from 'lucide-react';
import { UserRole } from '../../types';

export const MacTopBar: React.FC = () => {
  const { 
    activeTab, 
    userRole,
    setUserRole,
    theme, 
    toggleTheme, 
    toggleControlCenter, 
    toggleSpotlight, 
    toggleAI, 
    schoolInfo, 
    setSchoolInfo,
    systemHealth,
    toasts,
    addToast,
    playSound,
    showContextMenu 
  } = useOS();

  const [timeString, setTimeString] = useState<string>('');
  const [dateString, setDateString] = useState<string>('');
  const [schoolMenuOpen, setSchoolMenuOpen] = useState<boolean>(false);
  const [roleMenuOpen, setRoleMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeString(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
      setDateString(now.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const tabLabels: Record<string, string> = {
    dashboard: 'Principal Dashboard',
    students: 'Student Directory & Records',
    teachers: 'Faculty & Department Manager',
    analytics: 'School Analytics & AI Predictions',
    'omni-tools': 'Omni Tools Control Center',
    timetable: 'Interactive Timetable Builder',
    library: 'Library Catalog & Loans',
    certificates: 'Certificates & ID Generator',
    security: 'Security, Firewall & Audit Logs',
    communication: 'Communications & Messages',
    finance: 'Financial Ledger & Payroll',
    calendar: 'Academic Calendar & Events',
    settings: 'System Preferences & Branding',
    'ai-studio': 'Eduvanta AI Intelligence Engine'
  };

  const handleSchoolSelect = (name: string, location: string) => {
    setSchoolInfo(prev => ({ ...prev, name, location }));
    setSchoolMenuOpen(false);
  };

  return (
    <header 
      className="eduvanta-topbar" 
      style={{
        height: '36px',
        width: '100%',
        backgroundColor: 'var(--bg-topbar)',
        backdropFilter: 'var(--backdrop-blur)',
        WebkitBackdropFilter: 'var(--backdrop-blur)',
        borderBottom: '1px solid var(--border-color)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 16px',
        fontSize: '12px',
        fontWeight: 500,
        zIndex: 100,
        color: 'var(--text-primary)'
      }}
      onContextMenu={(e) => showContextMenu(e, [
        { label: 'Toggle Control Center', action: toggleControlCenter },
        { label: 'Open Spotlight (⌘K)', action: toggleSpotlight },
        { label: 'Switch Theme', action: toggleTheme }
      ])}
    >
      {/* Left Segment: Brand & School Switcher */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px', position: 'relative' }}>
        <div 
          onClick={() => setSchoolMenuOpen(prev => !prev)}
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '6px', 
            cursor: 'pointer',
            padding: '2px 8px',
            borderRadius: 'var(--radius-sm)',
            background: schoolMenuOpen ? 'var(--bg-surface-active)' : 'transparent',
            transition: 'background 150ms'
          }}
        >
          <span style={{ display: 'flex', alignItems: 'center' }}>
            <GraduationCap size={15} style={{ color: 'var(--accent-primary)' }} />
          </span>
          <span style={{ fontWeight: 600, letterSpacing: '-0.01em', color: 'var(--text-primary)' }}>
            Eduvanta OS
          </span>
          <span style={{ color: 'var(--text-muted)' }}>|</span>
          <span style={{ color: 'var(--text-secondary)' }}>{schoolInfo.name}</span>
          <ChevronDown size={12} style={{ color: 'var(--text-muted)' }} />
        </div>

        {/* Dropdown Menu */}
        {schoolMenuOpen && (
          <div 
            className="animate-slide-down"
            style={{
              position: 'absolute',
              top: '32px',
              left: '0',
              width: '260px',
              backgroundColor: 'var(--bg-popover)',
              backdropFilter: 'var(--backdrop-blur)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-md)',
              boxShadow: 'var(--shadow-lg)',
              padding: '6px',
              zIndex: 110
            }}
          >
            <div style={{ padding: '6px 10px', fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>
              Active Campuses
            </div>
            <div 
              className="mac-btn" 
              onClick={() => handleSchoolSelect('St. Augustine International Academy', 'Cupertino Campus, CA')}
              style={{ width: '100%', justifyContent: 'flex-start', border: 'none', background: 'transparent', padding: '8px 10px', display: 'flex', alignItems: 'center', gap: '8px' }}
            >
              <GraduationCap size={14} style={{ color: 'var(--accent-primary)' }} /> St. Augustine International
            </div>
            <div 
              className="mac-btn" 
              onClick={() => handleSchoolSelect('Eduvanta STEM Prep Academy', 'San Jose Tech Park')}
              style={{ width: '100%', justifyContent: 'flex-start', border: 'none', background: 'transparent', padding: '8px 10px', display: 'flex', alignItems: 'center', gap: '8px' }}
            >
              <Zap size={14} style={{ color: '#f59e0b' }} /> Eduvanta STEM Prep
            </div>
            <div 
              className="mac-btn" 
              onClick={() => handleSchoolSelect('Elysium International School', 'San Francisco, CA')}
              style={{ width: '100%', justifyContent: 'flex-start', border: 'none', background: 'transparent', padding: '8px 10px', display: 'flex', alignItems: 'center', gap: '8px' }}
            >
              <Building2 size={14} style={{ color: '#8b5cf6' }} /> Elysium International
            </div>
          </div>
        )}

        <div style={{ color: 'var(--text-muted)', fontSize: '11px' }}>
          • {tabLabels[activeTab] || 'Dashboard'}
        </div>

        {/* Role Switcher Pill */}
        <div style={{ position: 'relative' }}>
          <div 
            onClick={() => setRoleMenuOpen(prev => !prev)}
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '6px', 
              cursor: 'pointer',
              padding: '2px 8px',
              borderRadius: 'var(--radius-full)',
              background: userRole === 'Principal' ? 'rgba(59,130,246,0.15)' : userRole === 'Teacher' ? 'rgba(139,92,246,0.15)' : 'rgba(16,185,129,0.15)',
              border: `1px solid ${userRole === 'Principal' ? 'rgba(59,130,246,0.3)' : userRole === 'Teacher' ? 'rgba(139,92,246,0.3)' : 'rgba(16,185,129,0.3)'}`,
              color: userRole === 'Principal' ? '#60a5fa' : userRole === 'Teacher' ? '#a78bfa' : '#34d399',
              fontSize: '11px',
              fontWeight: 700
            }}
          >
            <UserCheck size={12} />
            <span>Role: {userRole}</span>
            <ChevronDown size={10} />
          </div>

          {roleMenuOpen && (
            <div 
              className="animate-slide-down"
              style={{
                position: 'absolute',
                top: '28px',
                left: '0',
                width: '180px',
                backgroundColor: 'var(--bg-popover)',
                backdropFilter: 'var(--backdrop-blur)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-md)',
                boxShadow: 'var(--shadow-lg)',
                padding: '4px',
                zIndex: 120
              }}
            >
              <div style={{ padding: '4px 8px', fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>
                Switch Workspace Role
              </div>
              <div 
                className="mac-btn" 
                onClick={() => {
                  playSound('click');
                  setUserRole('Principal');
                  setRoleMenuOpen(false);
                  addToast('Role Switched', 'Switched to Principal Executive Command Center', 'info');
                }}
                style={{ width: '100%', justifyContent: 'flex-start', border: 'none', background: 'transparent', padding: '6px 8px', fontSize: '11px', fontWeight: userRole === 'Principal' ? 700 : 500, color: '#60a5fa', display: 'flex', alignItems: 'center', gap: '6px' }}
              >
                <Crown size={13} /> Principal Mode
              </div>
              <div 
                className="mac-btn" 
                onClick={() => {
                  playSound('click');
                  setUserRole('Teacher');
                  setRoleMenuOpen(false);
                  addToast('Role Switched', 'Switched to Teacher Classroom Workspace', 'info');
                }}
                style={{ width: '100%', justifyContent: 'flex-start', border: 'none', background: 'transparent', padding: '6px 8px', fontSize: '11px', fontWeight: userRole === 'Teacher' ? 700 : 500, color: '#a78bfa', display: 'flex', alignItems: 'center', gap: '6px' }}
              >
                <BookOpen size={13} /> Teacher Mode
              </div>
              <div 
                className="mac-btn" 
                onClick={() => {
                  playSound('click');
                  setUserRole('Student');
                  setRoleMenuOpen(false);
                  addToast('Role Switched', 'Switched to Student Learning Hub', 'info');
                }}
                style={{ width: '100%', justifyContent: 'flex-start', border: 'none', background: 'transparent', padding: '6px 8px', fontSize: '11px', fontWeight: userRole === 'Student' ? 700 : 500, color: '#34d399', display: 'flex', alignItems: 'center', gap: '6px' }}
              >
                <GraduationCap size={13} /> Student Mode
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Center Segment: Quick Spotlight Trigger */}
      <div 
        onClick={toggleSpotlight}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          background: 'var(--bg-input)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-full)',
          padding: '3px 14px',
          cursor: 'pointer',
          color: 'var(--text-muted)',
          fontSize: '11px',
          transition: 'all 150ms'
        }}
      >
        <Search size={12} />
        <span>Search students, teachers, tools...</span>
        <kbd style={{ 
          background: 'rgba(255,255,255,0.1)', 
          padding: '1px 5px', 
          borderRadius: '4px', 
          fontSize: '10px',
          fontFamily: 'JetBrains Mono, monospace'
        }}>⌘K</kbd>
      </div>

      {/* Right Segment: Widgets, Status, Control Center */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        {/* Weather Widget */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: 'var(--text-secondary)' }}>
          <CloudSun size={13} style={{ color: '#f59e0b' }} />
          <span>22°C Cupertino</span>
        </div>

        {/* System Health Badge */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px' }}>
          <span style={{ 
            width: '7px', 
            height: '7px', 
            borderRadius: '50%', 
            backgroundColor: 'var(--accent-success)',
            boxShadow: '0 0 6px var(--accent-success)'
          }} />
          <span style={{ color: 'var(--text-muted)' }}>
            {systemHealth.apiLatency}ms | CPU {systemHealth.cpuUsage}%
          </span>
        </div>

        {/* AI Assistant Button */}
        <button 
          onClick={() => toggleAI()}
          style={{
            background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(139, 92, 246, 0.2))',
            border: '1px solid rgba(139, 92, 246, 0.3)',
            borderRadius: 'var(--radius-sm)',
            padding: '3px 8px',
            color: '#a78bfa',
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            cursor: 'pointer',
            fontSize: '11px',
            fontWeight: 600
          }}
        >
          <Sparkles size={12} />
          <span>Eduvanta AI</span>
        </button>

        {/* Control Center Toggle */}
        <button 
          onClick={toggleControlCenter}
          title="Toggle Apple Control Center"
          style={{
            background: 'transparent',
            border: 'none',
            color: 'var(--text-secondary)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            padding: '4px',
            borderRadius: 'var(--radius-sm)'
          }}
        >
          <Sliders size={14} />
        </button>

        {/* Time and Date */}
        <div style={{ display: 'flex', gap: '8px', fontWeight: 600, color: 'var(--text-primary)' }}>
          <span>{dateString}</span>
          <span>{timeString}</span>
        </div>
      </div>
    </header>
  );
};
