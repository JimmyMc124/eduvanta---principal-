import React from 'react';
import { useOS } from '../../context/OSContext';
import { NavigationTab } from '../../types';
import { 
  LayoutDashboard, 
  Users, 
  GraduationCap, 
  BarChart3, 
  Grid, 
  BookOpen, 
  Bus, 
  Award, 
  MessageSquare, 
  DollarSign, 
  Sparkles, 
  Sliders 
} from 'lucide-react';

export const MacDock: React.FC = () => {
  const { activeTab, setActiveTab, toggleAI, toggleControlCenter } = useOS();

  const dockItems: { id: NavigationTab | 'ai' | 'control'; label: string; icon: React.ReactNode; color: string }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} />, color: '#3b82f6' },
    { id: 'students', label: 'Students', icon: <Users size={20} />, color: '#10b981' },
    { id: 'teachers', label: 'Teachers', icon: <GraduationCap size={20} />, color: '#8b5cf6' },
    { id: 'omni-tools', label: 'Omni Tools', icon: <Grid size={20} />, color: '#f59e0b' },
    { id: 'analytics', label: 'Analytics', icon: <BarChart3 size={20} />, color: '#ec4899' },
    { id: 'transport', label: 'Bus GPS', icon: <Bus size={20} />, color: '#06b6d4' },
    { id: 'library', label: 'Library', icon: <BookOpen size={20} />, color: '#6366f1' },
    { id: 'finance', label: 'Finance', icon: <DollarSign size={20} />, color: '#10b981' },
    { id: 'communication', label: 'Messages', icon: <MessageSquare size={20} />, color: '#3b82f6' },
    { id: 'certificates', label: 'Certificates', icon: <Award size={20} />, color: '#eab308' },
    { id: 'ai', label: 'Eduvanta AI', icon: <Sparkles size={20} />, color: '#a78bfa' },
    { id: 'control', label: 'Control Center', icon: <Sliders size={20} />, color: '#64748b' }
  ];

  const handleClick = (id: NavigationTab | 'ai' | 'control') => {
    if (id === 'ai') {
      toggleAI(true);
    } else if (id === 'control') {
      toggleControlCenter();
    } else {
      setActiveTab(id as NavigationTab);
    }
  };

  return (
    <div 
      style={{
        position: 'fixed',
        bottom: '16px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 90,
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '8px 16px',
        background: 'var(--bg-dock)',
        backdropFilter: 'var(--backdrop-blur)',
        WebkitBackdropFilter: 'var(--backdrop-blur)',
        border: '1px solid var(--border-color)',
        borderRadius: 'var(--radius-xl)',
        boxShadow: 'var(--shadow-lg)'
      }}
    >
      {dockItems.map((item) => {
        const isActive = activeTab === item.id;
        return (
          <div 
            key={item.id}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}
          >
            <button
              onClick={() => handleClick(item.id)}
              className="dock-item-btn"
              title={item.label}
              style={{
                width: '42px',
                height: '42px',
                borderRadius: 'var(--radius-md)',
                border: 'none',
                background: isActive ? `rgba(255,255,255,0.15)` : 'rgba(255, 255, 255, 0.05)',
                color: item.color,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'transform 200ms cubic-bezier(0.34, 1.56, 0.64, 1), background 150ms',
                boxShadow: isActive ? '0 4px 12px rgba(0,0,0,0.3)' : 'none'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.25) translateY(-6px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1) translateY(0)';
              }}
            >
              {item.icon}
            </button>
            {/* Active Dot */}
            {isActive && (
              <span 
                style={{
                  width: '4px',
                  height: '4px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--text-primary)',
                  marginTop: '4px'
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};
