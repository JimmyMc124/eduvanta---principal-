import React, { useState } from 'react';
import { useOS } from '../../context/OSContext';
import { NotificationCategory, NotificationItem } from '../../types';
import { 
  Bell, 
  CheckCheck, 
  Trash2, 
  Pin, 
  Search, 
  X, 
  Users, 
  GraduationCap, 
  DollarSign, 
  UserCheck, 
  Award, 
  Server, 
  ShieldCheck, 
  Sparkles,
  Filter
} from 'lucide-react';

export const NotificationCenter: React.FC = () => {
  const { 
    isNotificationCenterOpen, 
    toggleNotificationCenter, 
    notifications, 
    unreadNotificationCount, 
    markNotificationRead, 
    markAllNotificationsRead, 
    deleteNotification, 
    togglePinNotification,
    playSound 
  } = useOS();

  const [activeCategory, setActiveCategory] = useState<NotificationCategory | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  if (!isNotificationCenterOpen) return null;

  const categories: (NotificationCategory | 'All')[] = [
    'All',
    'Students',
    'Teachers',
    'Finance',
    'Attendance',
    'Exams',
    'System',
    'Security'
  ];

  const categoryIcons: Record<string, React.ReactNode> = {
    Students: <Users size={12} className="text-blue-400" />,
    Teachers: <GraduationCap size={12} className="text-purple-400" />,
    Finance: <DollarSign size={12} className="text-emerald-400" />,
    Attendance: <UserCheck size={12} className="text-amber-400" />,
    Exams: <Award size={12} className="text-pink-400" />,
    System: <Server size={12} className="text-cyan-400" />,
    Security: <ShieldCheck size={12} className="text-rose-400" />,
    All: <Sparkles size={12} className="text-blue-400" />
  };

  const filteredNotifications = notifications.filter(item => {
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
    const matchesSearch = searchQuery === '' || 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      item.message.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Sort pinned first, then by read status
  const sortedNotifications = [...filteredNotifications].sort((a, b) => {
    if (a.isPinned !== b.isPinned) return a.isPinned ? -1 : 1;
    if (a.isRead !== b.isRead) return a.isRead ? 1 : -1;
    return 0;
  });

  return (
    <div 
      style={{
        position: 'fixed',
        top: '42px',
        right: '16px',
        width: '380px',
        maxHeight: '85vh',
        backgroundColor: 'var(--bg-popover)',
        backdropFilter: 'var(--backdrop-blur)',
        WebkitBackdropFilter: 'var(--backdrop-blur)',
        border: '1px solid var(--border-color)',
        borderRadius: 'var(--radius-lg)',
        boxShadow: 'var(--shadow-lg)',
        zIndex: 200,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        animation: 'slideDown 200ms cubic-bezier(0.16, 1, 0.3, 1)'
      }}
    >
      {/* Header */}
      <div 
        style={{
          padding: '14px 16px',
          borderBottom: '1px solid var(--border-color-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'rgba(255,255,255,0.02)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Bell size={16} style={{ color: 'var(--accent-primary)' }} />
          <span style={{ fontWeight: 700, fontSize: '14px', color: 'var(--text-primary)' }}>
            Notifications
          </span>
          {unreadNotificationCount > 0 && (
            <span 
              style={{
                backgroundColor: 'var(--accent-primary)',
                color: '#ffffff',
                fontSize: '11px',
                fontWeight: 700,
                padding: '2px 7px',
                borderRadius: '10px'
              }}
            >
              {unreadNotificationCount} new
            </span>
          )}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          {unreadNotificationCount > 0 && (
            <button 
              onClick={markAllNotificationsRead}
              title="Mark all as read"
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--text-muted)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                fontSize: '11px',
                padding: '4px 6px',
                borderRadius: 'var(--radius-sm)'
              }}
            >
              <CheckCheck size={14} />
              <span>Mark all read</span>
            </button>
          )}
          <button 
            onClick={toggleNotificationCenter}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text-muted)',
              cursor: 'pointer',
              padding: '4px',
              borderRadius: 'var(--radius-sm)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <X size={16} />
          </button>
        </div>
      </div>

      {/* Search Input */}
      <div style={{ padding: '8px 12px', borderBottom: '1px solid var(--border-color-subtle)' }}>
        <div 
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: 'var(--bg-input)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-md)',
            padding: '4px 10px'
          }}
        >
          <Search size={12} style={{ color: 'var(--text-muted)' }} />
          <input 
            type="text"
            placeholder="Search alerts or announcements..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: 'var(--text-primary)',
              fontSize: '11px',
              width: '100%'
            }}
          />
        </div>
      </div>

      {/* Category Pills Slider */}
      <div 
        style={{
          display: 'flex',
          gap: '6px',
          padding: '8px 12px',
          overflowX: 'auto',
          borderBottom: '1px solid var(--border-color-subtle)',
          scrollbarWidth: 'none'
        }}
      >
        {categories.map(cat => {
          const isActive = activeCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => {
                playSound('click');
                setActiveCategory(cat);
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                padding: '3px 10px',
                borderRadius: 'var(--radius-full)',
                fontSize: '10px',
                fontWeight: isActive ? 600 : 400,
                border: '1px solid',
                borderColor: isActive ? 'var(--accent-primary)' : 'var(--border-color)',
                backgroundColor: isActive ? 'var(--accent-primary-bg)' : 'transparent',
                color: isActive ? 'var(--accent-primary)' : 'var(--text-secondary)',
                whiteSpace: 'nowrap',
                cursor: 'pointer',
                transition: 'all 120ms'
              }}
            >
              {categoryIcons[cat]}
              <span>{cat}</span>
            </button>
          );
        })}
      </div>

      {/* Notifications List */}
      <div style={{ overflowY: 'auto', flex: 1, padding: '8px 0', minHeight: '220px' }}>
        {sortedNotifications.length === 0 ? (
          <div style={{ padding: '32px 16px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '12px' }}>
            <Bell size={28} style={{ opacity: 0.3, margin: '0 auto 8px auto' }} />
            <div>No notifications found</div>
          </div>
        ) : (
          sortedNotifications.map(item => (
            <div 
              key={item.id}
              onClick={() => markNotificationRead(item.id)}
              style={{
                padding: '10px 16px',
                borderBottom: '1px solid var(--border-color-subtle)',
                backgroundColor: item.isRead ? 'transparent' : 'rgba(59, 130, 246, 0.04)',
                cursor: 'pointer',
                transition: 'background 150ms',
                position: 'relative'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  {!item.isRead && (
                    <span 
                      style={{
                        width: '6px',
                        height: '6px',
                        borderRadius: '50%',
                        backgroundColor: 'var(--accent-primary)',
                        flexShrink: 0
                      }} 
                    />
                  )}
                  <span style={{ fontWeight: 600, fontSize: '12px', color: 'var(--text-primary)' }}>
                    {item.title}
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      togglePinNotification(item.id);
                    }}
                    title={item.isPinned ? 'Unpin' : 'Pin'}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      color: item.isPinned ? 'var(--accent-warning)' : 'var(--text-muted)',
                      cursor: 'pointer',
                      padding: '2px'
                    }}
                  >
                    <Pin size={12} />
                  </button>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteNotification(item.id);
                    }}
                    title="Delete"
                    style={{
                      background: 'transparent',
                      border: 'none',
                      color: 'var(--text-muted)',
                      cursor: 'pointer',
                      padding: '2px'
                    }}
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
              </div>

              <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '4px', lineHeight: 1.4 }}>
                {item.message}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '6px', fontSize: '10px', color: 'var(--text-muted)' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  {categoryIcons[item.category]}
                  <span>{item.category}</span>
                </span>
                <span>{item.timestamp}</span>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Footer */}
      <div 
        style={{
          padding: '8px 16px',
          borderTop: '1px solid var(--border-color-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: '11px',
          color: 'var(--text-muted)',
          background: 'rgba(255,255,255,0.01)'
        }}
      >
        <span>Eduvanta Real-time Gateway</span>
        <button 
          onClick={() => {
            playSound('click');
            toggleNotificationCenter();
          }}
          style={{
            background: 'transparent',
            border: 'none',
            color: 'var(--accent-primary)',
            cursor: 'pointer',
            fontSize: '11px',
            fontWeight: 600
          }}
        >
          Close Panel
        </button>
      </div>
    </div>
  );
};
