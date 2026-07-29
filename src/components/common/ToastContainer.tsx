import React from 'react';
import { useOS } from '../../context/OSContext';
import { CheckCircle2, AlertTriangle, Info, XCircle, GraduationCap } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts } = useOS();

  if (!toasts.length) return null;

  const getIcon = (type: string) => {
    switch (type) {
      case 'success': return <CheckCircle2 size={16} style={{ color: 'var(--accent-success)' }} />;
      case 'warning': return <AlertTriangle size={16} style={{ color: 'var(--accent-warning)' }} />;
      case 'danger': return <XCircle size={16} style={{ color: 'var(--accent-danger)' }} />;
      default: return <Info size={16} style={{ color: 'var(--accent-info)' }} />;
    }
  };

  return (
    <div 
      style={{
        position: 'fixed',
        top: '48px',
        right: '20px',
        zIndex: 250,
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        maxWidth: '320px',
        pointerEvents: 'none'
      }}
    >
      {toasts.map((toast) => (
        <div 
          key={toast.id}
          className="animate-slide-down"
          style={{
            pointerEvents: 'auto',
            backgroundColor: 'var(--bg-popover)',
            backdropFilter: 'var(--backdrop-blur)',
            WebkitBackdropFilter: 'var(--backdrop-blur)',
            border: '1px solid var(--border-color-active)',
            borderRadius: 'var(--radius-lg)',
            boxShadow: 'var(--shadow-lg)',
            padding: '12px 14px',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '10px'
          }}
        >
          <div style={{ marginTop: '2px' }}>
            {getIcon(toast.type)}
          </div>
          <div style={{ flex: 1 }}>
            <div className="flex-between" style={{ marginBottom: '2px' }}>
              <span style={{ fontWeight: 600, fontSize: '12px', color: 'var(--text-primary)' }}>
                {toast.title}
              </span>
              <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>
                {toast.timestamp}
              </span>
            </div>
            <div style={{ fontSize: '11px', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
              {toast.message}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
