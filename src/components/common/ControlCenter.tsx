import React, { useState } from 'react';
import { useOS } from '../../context/OSContext';
import { 
  Sliders, 
  Sun, 
  Moon, 
  Wifi, 
  Server, 
  Volume2, 
  Sparkles, 
  ShieldCheck, 
  Cpu, 
  HardDrive, 
  Activity, 
  X, 
  Check 
} from 'lucide-react';

export const ControlCenter: React.FC = () => {
  const { 
    isControlCenterOpen, 
    toggleControlCenter, 
    theme, 
    toggleTheme, 
    systemHealth, 
    schoolInfo, 
    setActiveTab, 
    toggleAI 
  } = useOS();

  const [volume, setVolume] = useState<number>(75);
  const [brightness, setBrightness] = useState<number>(90);
  const [doNotDisturb, setDoNotDisturb] = useState<boolean>(false);

  if (!isControlCenterOpen) return null;

  return (
    <div 
      className="animate-slide-down"
      style={{
        position: 'fixed',
        top: '44px',
        right: '16px',
        width: '340px',
        backgroundColor: 'var(--bg-popover)',
        backdropFilter: 'var(--backdrop-blur)',
        WebkitBackdropFilter: 'var(--backdrop-blur)',
        border: '1px solid var(--border-color)',
        borderRadius: 'var(--radius-xl)',
        boxShadow: 'var(--shadow-lg)',
        padding: '16px',
        zIndex: 120,
        display: 'flex',
        flexDirection: 'column',
        gap: '12px'
      }}
    >
      {/* Header */}
      <div className="flex-between" style={{ paddingBottom: '8px', borderBottom: '1px solid var(--border-color-subtle)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600, fontSize: '14px', color: 'var(--text-primary)' }}>
          <Sliders size={16} style={{ color: 'var(--accent-primary)' }} />
          <span>Eduvanta Control Center</span>
        </div>
        <button 
          onClick={toggleControlCenter}
          style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
        >
          <X size={16} />
        </button>
      </div>

      {/* Top 2x2 Grid Modules */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
        {/* Network & Connectivity */}
        <div className="glass-card" style={{ padding: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'var(--accent-primary-bg)', color: 'var(--accent-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Wifi size={14} />
            </div>
            <div>
              <div style={{ fontSize: '11px', fontWeight: 600 }}>Cloud Run Engine</div>
              <div style={{ fontSize: '10px', color: 'var(--accent-success)' }}>Connected</div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'var(--accent-info-bg)', color: 'var(--accent-info)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Server size={14} />
            </div>
            <div>
              <div style={{ fontSize: '11px', fontWeight: 600 }}>Firestore DB</div>
              <div style={{ fontSize: '10px', color: 'var(--accent-success)' }}>{systemHealth.apiLatency}ms</div>
            </div>
          </div>
        </div>

        {/* Theme & DND Toggles */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <button 
            onClick={toggleTheme}
            style={{
              flex: 1,
              padding: '10px',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-color)',
              background: 'var(--bg-surface)',
              color: 'var(--text-primary)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              cursor: 'pointer',
              fontSize: '12px',
              fontWeight: 500
            }}
          >
            {theme === 'dark' ? <Moon size={16} style={{ color: '#a78bfa' }} /> : <Sun size={16} style={{ color: '#f59e0b' }} />}
            <span>{theme === 'dark' ? 'Dark Mode' : 'Light Mode'}</span>
          </button>

          <button 
            onClick={() => setDoNotDisturb(prev => !prev)}
            style={{
              flex: 1,
              padding: '10px',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-color)',
              background: doNotDisturb ? 'var(--accent-secondary)' : 'var(--bg-surface)',
              color: doNotDisturb ? '#ffffff' : 'var(--text-primary)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              cursor: 'pointer',
              fontSize: '12px',
              fontWeight: 500
            }}
          >
            <ShieldCheck size={16} />
            <span>{doNotDisturb ? 'Focus On' : 'Focus Mode'}</span>
          </button>
        </div>
      </div>

      {/* Sliders */}
      <div className="glass-card" style={{ padding: '12px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <div>
          <div className="flex-between" style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px' }}>
            <span>Display Brightness</span>
            <span>{brightness}%</span>
          </div>
          <input 
            type="range" 
            min="10" 
            max="100" 
            value={brightness} 
            onChange={(e) => setBrightness(Number(e.target.value))}
            style={{ width: '100%', accentColor: 'var(--accent-primary)', cursor: 'pointer' }}
          />
        </div>

        <div>
          <div className="flex-between" style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px' }}>
            <span>Auditory Chimes</span>
            <span>{volume}%</span>
          </div>
          <input 
            type="range" 
            min="0" 
            max="100" 
            value={volume} 
            onChange={(e) => setVolume(Number(e.target.value))}
            style={{ width: '100%', accentColor: 'var(--accent-primary)', cursor: 'pointer' }}
          />
        </div>
      </div>

      {/* System Resource Usage Metrics */}
      <div className="glass-card" style={{ padding: '12px', display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>CPU</div>
          <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--accent-primary)' }}>{systemHealth.cpuUsage}%</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>RAM</div>
          <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--accent-secondary)' }}>{systemHealth.ramUsage}GB</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Storage</div>
          <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--accent-success)' }}>{systemHealth.storageUsage}%</div>
        </div>
      </div>

      {/* Quick Launch Shortcuts */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
        <button 
          className="mac-btn" 
          onClick={() => { setActiveTab('omni-tools'); toggleControlCenter(); }}
          style={{ justifyContent: 'flex-start', fontSize: '12px' }}
        >
          <Sliders size={14} /> Omni Tools
        </button>
        <button 
          className="mac-btn mac-btn-primary" 
          onClick={() => { toggleAI(true); toggleControlCenter(); }}
          style={{ justifyContent: 'flex-start', fontSize: '12px' }}
        >
          <Sparkles size={14} /> Eduvanta AI
        </button>
      </div>
    </div>
  );
};
