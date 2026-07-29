import React, { useState } from 'react';
import { useOS } from '../../context/OSContext';
import { Calendar as CalendarIcon, Plus, MapPin, Users, Clock } from 'lucide-react';

export const CalendarView: React.FC = () => {
  const { events, addToast } = useOS();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }} className="animate-fade-in">
      <div className="flex-between">
        <div>
          <h2 style={{ fontSize: '20px', fontWeight: 700, letterSpacing: '-0.02em' }}>
            Academic Calendar & Master Schedule
          </h2>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
            Exams, board meetings, sports events, holidays, and deadlines
          </p>
        </div>

        <button className="mac-btn mac-btn-primary" onClick={() => addToast('Event Added', 'Created new academic event in calendar', 'success')}>
          <Plus size={16} /> Schedule School Event
        </button>
      </div>

      {/* Grid of Events */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
        {events.map(evt => (
          <div key={evt.id} className="glass-panel" style={{ padding: '18px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div className="flex-between">
              <span className="mac-badge mac-badge-primary">{evt.type}</span>
              <span style={{ fontSize: '11px', fontFamily: 'JetBrains Mono, monospace', color: 'var(--text-muted)' }}>
                {evt.date}
              </span>
            </div>

            <div style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)' }}>{evt.title}</div>

            <div style={{ fontSize: '12px', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Clock size={12} /> {evt.time}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><MapPin size={12} /> {evt.location}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Users size={12} /> {evt.participants}</div>
            </div>

            <button className="mac-btn mac-btn-sm" onClick={() => addToast('Calendar Sync', `Synced "${evt.title}" with Apple Calendar iCal`, 'info')}>
              Sync to iCal
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
