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
  UserCheck 
} from 'lucide-react';

export const MacSidebar: React.FC = () => {
  const { activeTab, setActiveTab, schoolInfo, students, teachers } = useOS();
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
      {/* Top Header & Collapse Toggle */}
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
            onClick={() => setCollapsed(prev => !prev)}
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

        {/* User Profile Pill */}
        {!collapsed && (
          <div style={{ padding: '12px 16px 4px 16px' }}>
            <div 
              style={{
                background: 'var(--bg-surface)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-md)',
                padding: '10px 12px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}
            >
              <div 
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: '#2563eb',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  fontWeight: 600,
                  fontSize: '13px'
                }}
              >
                EV
              </div>
              <div style={{ overflow: 'hidden' }}>
                <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-primary)', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
                  {schoolInfo.principal}
                </div>
                <div style={{ fontSize: '10px', color: 'var(--accent-success)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent-success)' }} />
                  Principal Terminal
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Navigation List */}
        <div style={{ padding: '12px 10px', overflowY: 'auto', maxHeight: 'calc(100vh - 180px)' }}>
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
                    onClick={() => setActiveTab(item.id)}
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

      {/* Bottom Footer */}
      {!collapsed && (
        <div style={{ padding: '14px 16px', borderTop: '1px solid var(--border-color-subtle)', fontSize: '11px', color: 'var(--text-muted)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Sparkles size={12} style={{ color: 'var(--accent-primary)' }} />
            <span>Eduvanta OS AI Active</span>
          </div>
        </div>
      )}
    </aside>
  );
};
