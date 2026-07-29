import React, { useState } from 'react';
import { useOS } from '../../context/OSContext';
import { Bus, MapPin, Fuel, Gauge, Phone, AlertCircle, CheckCircle2 } from 'lucide-react';

export const TransportManager: React.FC = () => {
  const { busRoutes, addToast } = useOS();
  const [selectedBus, setSelectedBus] = useState(busRoutes[0]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }} className="animate-fade-in">
      <div className="flex-between">
        <div>
          <h2 style={{ fontSize: '20px', fontWeight: 700, letterSpacing: '-0.02em' }}>
            Transport & Live Bus GPS Telemetry
          </h2>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
            Real-time GPS vehicle tracking, driver profiles, route telemetry & geofence alerts
          </p>
        </div>
        <span className="mac-badge mac-badge-success">
          <CheckCircle2 size={12} /> 18 Active Fleet Units Transmitting
        </span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '16px' }}>
        {/* Fleet Route List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {busRoutes.map(bus => (
            <div 
              key={bus.id}
              onClick={() => setSelectedBus(bus)}
              className="glass-panel"
              style={{
                padding: '14px',
                cursor: 'pointer',
                border: selectedBus.id === bus.id ? '1px solid var(--accent-primary)' : '1px solid var(--border-color)',
                background: selectedBus.id === bus.id ? 'var(--bg-surface-active)' : 'var(--bg-surface)'
              }}
            >
              <div className="flex-between">
                <div style={{ fontWeight: 700, fontSize: '14px', color: 'var(--text-primary)' }}>{bus.busNumber}</div>
                <span className={`mac-badge mac-badge-${bus.status === 'On Route' ? 'success' : bus.status === 'Completed' ? 'primary' : 'warning'}`}>
                  {bus.status}
                </span>
              </div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px' }}>
                Driver: {bus.driverName} • {bus.studentsCount} Students Onboard
              </div>
              <div style={{ fontSize: '11px', color: 'var(--accent-info)', marginTop: '6px', fontWeight: 500 }}>
                📍 {bus.currentLocationName}
              </div>
            </div>
          ))}
        </div>

        {/* Live GPS Telemetry Canvas Map Visualizer */}
        <div className="glass-panel" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div className="flex-between">
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: 700 }}>GPS Telemetry: {selectedBus.busNumber}</h3>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Route: {selectedBus.routeName}</p>
            </div>
            <button className="mac-btn mac-btn-sm" onClick={() => addToast('GPS Ping', `Dispatched geofence ping to Driver ${selectedBus.driverName}`, 'info')}>
              Ping Driver Terminal
            </button>
          </div>

          {/* Interactive Map Visual Simulation */}
          <div 
            style={{
              width: '100%',
              height: '240px',
              borderRadius: 'var(--radius-lg)',
              background: '#090d16',
              border: '1px solid var(--border-color)',
              position: 'relative',
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {/* Grid Map Background Overlay */}
            <div 
              style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.08) 1px, transparent 1px)',
                backgroundSize: '24px 24px'
              }}
            />

            {/* Route Vector Path Line */}
            <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
              <path d="M 40 180 Q 150 50, 300 120 T 550 80" fill="none" stroke="#3b82f6" strokeWidth="3" strokeDasharray="6 6" />
            </svg>

            {/* Active Bus Marker Animation */}
            <div 
              style={{
                position: 'absolute',
                top: '40%',
                left: '52%',
                transform: 'translate(-50%, -50%)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '4px',
                zIndex: 10
              }}
            >
              <div 
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  background: 'var(--accent-primary)',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 0 20px var(--accent-primary)'
                }}
                className="animate-fade-in"
              >
                <Bus size={20} />
              </div>
              <span className="mac-badge mac-badge-primary" style={{ fontSize: '10px' }}>
                {selectedBus.currentLocationName} ({selectedBus.speedKmH} km/h)
              </span>
            </div>

            {/* School Campus Destination Pin */}
            <div style={{ position: 'absolute', top: '25%', right: '12%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <MapPin size={22} style={{ color: 'var(--accent-success)' }} />
              <span style={{ fontSize: '10px', color: 'var(--accent-success)', fontWeight: 700 }}>Eduvanta Campus</span>
            </div>
          </div>

          {/* Telemetry Stats Bar */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '12px' }}>
            <div className="glass-card">
              <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Speed Gauge</div>
              <div style={{ fontSize: '18px', fontWeight: 700, color: 'var(--accent-primary)' }}>{selectedBus.speedKmH} km/h</div>
            </div>
            <div className="glass-card">
              <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Fuel Level</div>
              <div style={{ fontSize: '18px', fontWeight: 700, color: 'var(--accent-success)' }}>{selectedBus.fuelPct}%</div>
            </div>
            <div className="glass-card">
              <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Onboard Students</div>
              <div style={{ fontSize: '18px', fontWeight: 700, color: 'var(--accent-info)' }}>{selectedBus.studentsCount}</div>
            </div>
            <div className="glass-card">
              <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Driver Phone</div>
              <div style={{ fontSize: '13px', fontWeight: 600, marginTop: '4px' }}>{selectedBus.driverPhone}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
