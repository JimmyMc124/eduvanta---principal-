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
  GraduationCap 
} from 'lucide-react';

export const MacTopBar: React.FC = () => {
  const { 
    activeTab, 
    theme, 
    toggleTheme, 
    toggleControlCenter, 
    toggleSpotlight, 
    toggleAI, 
    schoolInfo, 
    setSchoolInfo,
    systemHealth,
    toasts,
    showContextMenu 
  } = useOS();

  const [timeString, setTimeString] = useState<string>('');
  const [dateString, setDateString] = useState<string>('');
  const [schoolMenuOpen, setSchoolMenuOpen] = useState<boolean>(false);

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
    transport: 'Transport & GPS Bus Tracking',
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
          <span style={{ fontSize: '14px', filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.3))' }}>
            {schoolInfo.logo}
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
              style={{ width: '100%', justifyContent: 'flex-start', border: 'none', background: 'transparent', padding: '8px 10px' }}
            >
              🎓 St. Augustine International
            </div>
            <div 
              className="mac-btn" 
              onClick={() => handleSchoolSelect('Eduvanta STEM Prep Academy', 'San Jose Tech Park')}
              style={{ width: '100%', justifyContent: 'flex-start', border: 'none', background: 'transparent', padding: '8px 10px' }}
            >
              ⚡ Eduvanta STEM Prep
            </div>
            <div 
              className="mac-btn" 
              onClick={() => handleSchoolSelect('Elysium International School', 'San Francisco, CA')}
              style={{ width: '100%', justifyContent: 'flex-start', border: 'none', background: 'transparent', padding: '8px 10px' }}
            >
              🏛️ Elysium International
            </div>
          </div>
        )}

        <div style={{ color: 'var(--text-muted)', fontSize: '11px' }}>
          • {tabLabels[activeTab] || 'Dashboard'}
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
