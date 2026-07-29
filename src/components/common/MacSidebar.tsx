import React, { useState } from 'react';
import { useOS } from '../../context/OSContext';
import { NavigationTab } from '../../types';
import { 
  LayoutDashboard, 
  Users, 
  GraduationCap, 
  BarChart3, 
  Grid, 
  Calendar, 
  BookOpen, 
  Bus, 
  Award, 
  ShieldCheck, 
  MessageSquare, 
  DollarSign, 
  Settings, 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  UserCheck,
  Bell,
  Lock,
  LogOut,
  Volume2,
  VolumeX,
  ShieldAlert
} from 'lucide-react';

export const MacSidebar: React.FC = () => {
  const { 
    activeTab, 
    setActiveTab, 
    schoolInfo, 
    students, 
    teachers,
    unreadNotificationCount,
    toggleNotificationCenter,
    soundEnabled,
    toggleSound,
    lockDashboard,
    addToast,
    playSound
  } = useOS();

  const [collapsed, setCollapsed] = useState<boolean>(false);

  const navGroups: {
    group: string;
    items: { id: NavigationTab; label: string; icon: React.ReactNode; badge?: string | number }[];
  }[] = [
    {
      group: 'MAIN OS',
      items: [
        { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={16} /> },
        { id: 'omni-tools', label: 'Control Center / Omni', icon: <Grid size={16} />, badge: '18+' },
        { id: 'analytics', label: 'Analytics & AI', icon: <BarChart3 size={16} /> }
      ]
    },
    {
      group: 'ACADEMICS',
      items: [
        { id: 'students', label: 'Students', icon: <Users size={16} />, badge: students.length },
        { id: 'teachers', label: 'Teachers & Staff', icon: <GraduationCap size={16} />, badge: teachers.length },
        { id: 'timetable', label: 'Timetable Builder', icon: <UserCheck size={16} /> }
      ]
    },
    {
      group: 'INFRASTRUCTURE',
      items: [
        { id: 'library', label: 'Library Catalog', icon: <BookOpen size={16} /> },
        { id: 'transport', label: 'Bus GPS Tracking', icon: <Bus size={16} />, badge: 'Live' },
        { id: 'certificates', label: 'Certificates & IDs', icon: <Award size={16} /> }
      ]
    },
    {
      group: 'OPERATIONS',
      items: [
        { id: 'finance', label: 'Finance & Payroll', icon: <DollarSign size={16} /> },
        { id: 'communication', label: 'Messages & Alerts', icon: <MessageSquare size={16} /> },
        { id: 'calendar', label: 'Academic Calendar', icon: <Calendar size={16} /> },
        { id: 'security', label: 'Security & Accounts', icon: <ShieldCheck size={16} /> },
        { id: 'settings', label: 'System Settings', icon: <Settings size={16} /> }
      ]
    }
  ];

  const handleLogout = () => {
    playSound('logout');
    addToast('Logged Out', 'Principal session terminated securely', 'info');
    setTimeout(() => {
      lockDashboard();
    }, 400);
  };

  return (
    <aside 
      style={{
        width: collapsed ? '68px' : '230px',
        height: '100%',
        backgroundColor: 'var(--bg-sidebar)',
        backdropFilter: 'var(--backdrop-blur)',
        WebkitBackdropFilter: 'var(--backdrop-blur)',
        borderRight: '1px solid var(--border-color)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        transition: 'width 250ms cubic-bezier(0.16, 1, 0.3, 1)',
        overflow: 'hidden',
        zIndex: 50
      }}
    >
      {/* Top Brand Header & Collapse Toggle */}
      <div>
        <div 
          style={{
            padding: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: collapsed ? 'center' : 'space-between',
            borderBottom: '1px solid var(--border-color-subtle)'
          }}
        >
          {!collapsed && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div 
                style={{ 
                  width: '32px', 
                  height: '32px', 
                  borderRadius: 'var(--radius-md)', 
                  background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff',
                  fontWeight: 700,
                  boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)'
                }}
              >
                E
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: '14px', letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>
                  Eduvanta
                </div>
                <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>
                  School OS v4.2
                </div>
              </div>
            </div>
          )}
          <button 
            onClick={() => {
              playSound('click');
              setCollapsed(prev => !prev);
            }}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text-muted)',
              cursor: 'pointer',
              padding: '6px',
              borderRadius: 'var(--radius-sm)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>
        </div>

        {/* Navigation List */}
        <div style={{ padding: '12px 10px', overflowY: 'auto', maxHeight: 'calc(100vh - 280px)', scrollbarWidth: 'none' }}>
          {navGroups.map((grp, idx) => (
            <div key={idx} style={{ marginBottom: '16px' }}>
              {!collapsed && (
                <div style={{ 
                  fontSize: '10px', 
                  fontWeight: 700, 
                  color: 'var(--text-muted)', 
                  letterSpacing: '0.05em', 
                  padding: '4px 10px 6px 10px' 
                }}>
                  {grp.group}
                </div>
              )}
              {grp.items.map(item => {
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      playSound('click');
                      setActiveTab(item.id);
                    }}
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: collapsed ? 'center' : 'space-between',
                      padding: collapsed ? '10px 0' : '8px 12px',
                      marginBottom: '2px',
                      borderRadius: 'var(--radius-md)',
                      border: 'none',
                      background: isActive ? 'var(--accent-primary-bg)' : 'transparent',
                      color: isActive ? 'var(--accent-primary)' : 'var(--text-secondary)',
                      fontWeight: isActive ? 600 : 400,
                      fontSize: '13px',
                      cursor: 'pointer',
                      transition: 'all 150ms'
                    }}
                    title={collapsed ? item.label : undefined}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      {item.icon}
                      {!collapsed && <span>{item.label}</span>}
                    </div>
                    {!collapsed && item.badge !== undefined && (
                      <span className="mac-badge mac-badge-primary">
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Profile & Actions Section */}
      <div 
        style={{ 
          borderTop: '1px solid var(--border-color-subtle)',
          backgroundColor: 'var(--bg-surface)',
          padding: collapsed ? '12px 8px' : '12px 14px',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px'
        }}
      >
        {/* Profile Details Box */}
        {!collapsed ? (
          <div 
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '6px 8px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'rgba(255,255,255,0.02)',
              border: '1px solid var(--border-color-subtle)'
            }}
          >
            {/* Principal Profile Photo Avatar */}
            <div style={{ position: 'relative' }}>
              <div 
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #2563eb, #7c3aed)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  fontWeight: 700,
                  fontSize: '13px',
                  boxShadow: '0 2px 8px rgba(37, 99, 235, 0.3)'
                }}
              >
                EV
              </div>
              {/* Online Status Indicator */}
              <span 
                style={{
                  position: 'absolute',
                  bottom: '0',
                  right: '0',
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--accent-success)',
                  border: '2px solid var(--bg-sidebar)',
                  boxShadow: '0 0 6px var(--accent-success)'
                }}
                title="Status: Online & Terminal Active"
              />
            </div>

            <div style={{ overflow: 'hidden', flex: 1 }}>
              <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                {schoolInfo.principal}
              </div>
              <div style={{ fontSize: '10px', color: 'var(--accent-primary)', fontWeight: 600 }}>
                Principal
              </div>
              <div style={{ fontSize: '9px', color: 'var(--text-muted)', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                {schoolInfo.name}
              </div>
            </div>
          </div>
        ) : (
          <div style={{ display: 'flex', justifyContent: 'center', position: 'relative' }}>
            <div 
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #2563eb, #7c3aed)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                fontWeight: 700,
                fontSize: '13px'
              }}
              title={`${schoolInfo.principal} - Principal`}
            >
              EV
            </div>
            <span 
              style={{
                position: 'absolute',
                bottom: '0',
                right: '12px',
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                backgroundColor: 'var(--accent-success)',
                border: '2px solid var(--bg-sidebar)'
              }}
            />
          </div>
        )}

        {/* Action Buttons Toolbar */}
        <div 
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: collapsed ? 'center' : 'space-between',
            gap: '4px',
            flexWrap: collapsed ? 'wrap' : 'nowrap'
          }}
        >
          {/* Notifications Button */}
          <button
            onClick={toggleNotificationCenter}
            style={{
              position: 'relative',
              background: 'transparent',
              border: 'none',
              color: 'var(--text-secondary)',
              cursor: 'pointer',
              padding: '6px',
              borderRadius: 'var(--radius-sm)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            title="Notifications Center"
          >
            <Bell size={15} />
            {unreadNotificationCount > 0 && (
              <span 
                style={{
                  position: 'absolute',
                  top: '2px',
                  right: '2px',
                  width: '7px',
                  height: '7px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--accent-primary)'
                }}
              />
            )}
          </button>

          {/* Sound Toggle Button */}
          <button
            onClick={toggleSound}
            style={{
              background: 'transparent',
              border: 'none',
              color: soundEnabled ? 'var(--accent-success)' : 'var(--text-muted)',
              cursor: 'pointer',
              padding: '6px',
              borderRadius: 'var(--radius-sm)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            title={soundEnabled ? 'Audio Effects On' : 'Audio Effects Muted'}
          >
            {soundEnabled ? <Volume2 size={15} /> : <VolumeX size={15} />}
          </button>

          {/* Settings Button */}
          <button
            onClick={() => {
              playSound('click');
              setActiveTab('settings');
            }}
            style={{
              background: 'transparent',
              border: 'none',
              color: activeTab === 'settings' ? 'var(--accent-primary)' : 'var(--text-secondary)',
              cursor: 'pointer',
              padding: '6px',
              borderRadius: 'var(--radius-sm)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            title="System Settings"
          >
            <Settings size={15} />
          </button>

          {/* Lock Dashboard Button */}
          <button
            onClick={lockDashboard}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text-secondary)',
              cursor: 'pointer',
              padding: '6px',
              borderRadius: 'var(--radius-sm)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            title="Lock Dashboard Terminal"
          >
            <Lock size={15} />
          </button>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--accent-danger)',
              cursor: 'pointer',
              padding: '6px',
              borderRadius: 'var(--radius-sm)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            title="Logout Principal Terminal"
          >
            <LogOut size={15} />
          </button>
        </div>
      </div>
    </aside>
  );
};
