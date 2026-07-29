import React, { useEffect } from 'react';
import { useOS } from '../../context/OSContext';

export const ContextMenu: React.FC = () => {
  const { contextMenu, hideContextMenu } = useOS();

  useEffect(() => {
    const handleGlobalClick = () => hideContextMenu();
    window.addEventListener('click', handleGlobalClick);
    return () => window.removeEventListener('click', handleGlobalClick);
  }, [hideContextMenu]);

  if (!contextMenu.visible) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: `${contextMenu.y}px`,
        left: `${contextMenu.x}px`,
        zIndex: 300,
        width: '200px',
        backgroundColor: 'var(--bg-popover)',
        backdropFilter: 'var(--backdrop-blur)',
        WebkitBackdropFilter: 'var(--backdrop-blur)',
        border: '1px solid var(--border-color-active)',
        borderRadius: 'var(--radius-md)',
        boxShadow: 'var(--shadow-lg)',
        padding: '5px',
        display: 'flex',
        flexDirection: 'column',
        gap: '2px'
      }}
      onClick={(e) => e.stopPropagation()}
    >
      {contextMenu.items.map((item, index) => (
        <button
          key={index}
          onClick={() => {
            item.action();
            hideContextMenu();
          }}
          style={{
            width: '100%',
            textAlign: 'left',
            padding: '7px 10px',
            borderRadius: 'var(--radius-sm)',
            border: 'none',
            background: 'transparent',
            color: item.danger ? 'var(--accent-danger)' : 'var(--text-primary)',
            fontSize: '12px',
            fontWeight: 500,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            transition: 'background 120ms'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = item.danger ? 'var(--accent-danger-bg)' : 'var(--bg-surface-hover)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
          }}
        >
          <span>{item.label}</span>
          {item.icon && <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{item.icon}</span>}
        </button>
      ))}
    </div>
  );
};
