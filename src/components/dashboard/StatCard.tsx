import React from 'react';
import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: string;
  trendType?: 'positive' | 'negative' | 'neutral';
  icon: React.ReactNode;
  color?: string;
  onClick?: () => void;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  trend,
  trendType = 'positive',
  icon,
  color = 'var(--accent-primary)',
  onClick
}) => {
  return (
    <div 
      className="glass-card"
      onClick={onClick}
      style={{
        cursor: onClick ? 'pointer' : 'default',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        gap: '12px',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <div className="flex-between">
        <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.03em' }}>
          {title}
        </div>
        <div 
          style={{
            width: '32px',
            height: '32px',
            borderRadius: 'var(--radius-md)',
            background: `rgba(255, 255, 255, 0.05)`,
            color: color,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {icon}
        </div>
      </div>

      <div>
        <div style={{ fontSize: '24px', fontWeight: 700, letterSpacing: '-0.03em', color: 'var(--text-primary)' }}>
          {value}
        </div>
        {subtitle && (
          <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '2px' }}>
            {subtitle}
          </div>
        )}
      </div>

      {trend && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', fontWeight: 600 }}>
          {trendType === 'positive' && <ArrowUpRight size={14} style={{ color: 'var(--accent-success)' }} />}
          {trendType === 'negative' && <ArrowDownRight size={14} style={{ color: 'var(--accent-danger)' }} />}
          {trendType === 'neutral' && <Minus size={14} style={{ color: 'var(--text-muted)' }} />}
          <span style={{ 
            color: trendType === 'positive' ? 'var(--accent-success)' : trendType === 'negative' ? 'var(--accent-danger)' : 'var(--text-muted)' 
          }}>
            {trend}
          </span>
        </div>
      )}
    </div>
  );
};
