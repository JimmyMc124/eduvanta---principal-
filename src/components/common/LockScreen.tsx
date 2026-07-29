import React, { useState } from 'react';
import { useOS } from '../../context/OSContext';
import { Lock, Fingerprint, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

export const LockScreen: React.FC = () => {
  const { isLocked, unlockDashboard, schoolInfo, userRole, setUserRole } = useOS();
  const [pin, setPin] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string>('');

  if (!isLocked) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = unlockDashboard(pin);
    if (!success) {
      setErrorMsg('Incorrect Security PIN. (Default: 1234)');
      setPin('');
    } else {
      setErrorMsg('');
      setPin('');
    }
  };

  return (
    <div 
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(5, 7, 15, 0.85)',
        backdropFilter: 'blur(32px)',
        WebkitBackdropFilter: 'blur(32px)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        animation: 'fadeIn 300ms ease-out'
      }}
    >
      <div 
        style={{
          width: '100%',
          maxWidth: '380px',
          backgroundColor: 'var(--bg-popover)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-xl)',
          padding: '32px 28px',
          boxShadow: 'var(--shadow-xl)',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '20px'
        }}
      >
        {/* Principal Avatar */}
        <div style={{ position: 'relative' }}>
          <div 
            style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #2563eb, #7c3aed)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              fontSize: '28px',
              fontWeight: 700,
              boxShadow: '0 8px 24px rgba(37, 99, 235, 0.4)',
              border: '2px solid rgba(255,255,255,0.2)'
            }}
          >
            EV
          </div>
          <div 
            style={{
              position: 'absolute',
              bottom: '2px',
              right: '2px',
              backgroundColor: 'var(--bg-surface)',
              border: '1px solid var(--border-color)',
              borderRadius: '50%',
              padding: '4px',
              color: 'var(--accent-primary)'
            }}
          >
            <Lock size={12} />
          </div>
        </div>

        {/* User Info */}
        <div>
          <h2 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '4px' }}>
            {schoolInfo.principal}
          </h2>
          <div style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
            <ShieldCheck size={12} className="text-emerald-400" />
            <span>Principal Terminal — {schoolInfo.name}</span>
          </div>
        </div>

        {/* PIN Form */}
        <form onSubmit={handleSubmit} style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ position: 'relative', width: '100%' }}>
            <input 
              type="password"
              placeholder="Enter PIN (e.g. 1234)"
              value={pin}
              onChange={(e) => {
                setPin(e.target.value);
                setErrorMsg('');
              }}
              autoFocus
              style={{
                width: '100%',
                padding: '12px 16px',
                textAlign: 'center',
                letterSpacing: '0.3em',
                fontSize: '16px',
                fontWeight: 700,
                backgroundColor: 'var(--bg-input)',
                border: errorMsg ? '1px solid var(--accent-danger)' : '1px solid var(--border-color)',
                borderRadius: 'var(--radius-lg)',
                color: 'var(--text-primary)',
                outline: 'none'
              }}
            />
            <button 
              type="submit"
              style={{
                position: 'absolute',
                right: '8px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'var(--accent-primary)',
                border: 'none',
                color: '#ffffff',
                borderRadius: 'var(--radius-md)',
                padding: '8px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <ArrowRight size={14} />
            </button>
          </div>

          {errorMsg && (
            <div style={{ fontSize: '11px', color: 'var(--accent-danger)', fontWeight: 500 }}>
              {errorMsg}
            </div>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%', marginTop: '6px' }}>
            <div style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>
              Select Login Role
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '6px' }}>
              <button 
                type="button" 
                onClick={() => setUserRole('Principal')}
                style={{
                  padding: '6px 4px',
                  borderRadius: '6px',
                  fontSize: '11px',
                  fontWeight: 600,
                  border: userRole === 'Principal' ? '1px solid #3b82f6' : '1px solid var(--border-color)',
                  background: userRole === 'Principal' ? 'rgba(59,130,246,0.2)' : 'transparent',
                  color: userRole === 'Principal' ? '#60a5fa' : 'var(--text-secondary)',
                  cursor: 'pointer'
                }}
              >
                Principal
              </button>
              <button 
                type="button" 
                onClick={() => setUserRole('Teacher')}
                style={{
                  padding: '6px 4px',
                  borderRadius: '6px',
                  fontSize: '11px',
                  fontWeight: 600,
                  border: userRole === 'Teacher' ? '1px solid #8b5cf6' : '1px solid var(--border-color)',
                  background: userRole === 'Teacher' ? 'rgba(139,92,246,0.2)' : 'transparent',
                  color: userRole === 'Teacher' ? '#a78bfa' : 'var(--text-secondary)',
                  cursor: 'pointer'
                }}
              >
                Teacher
              </button>
              <button 
                type="button" 
                onClick={() => setUserRole('Student')}
                style={{
                  padding: '6px 4px',
                  borderRadius: '6px',
                  fontSize: '11px',
                  fontWeight: 600,
                  border: userRole === 'Student' ? '1px solid #10b981' : '1px solid var(--border-color)',
                  background: userRole === 'Student' ? 'rgba(16,185,129,0.2)' : 'transparent',
                  color: userRole === 'Student' ? '#34d399' : 'var(--text-secondary)',
                  cursor: 'pointer'
                }}
              >
                Student
              </button>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginTop: '8px' }}>
            <button 
              type="button"
              onClick={() => unlockDashboard('1234')}
              style={{
                background: 'transparent',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-md)',
                padding: '8px 14px',
                fontSize: '11px',
                color: 'var(--text-secondary)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <Fingerprint size={14} style={{ color: 'var(--accent-primary)' }} />
              <span>Touch ID / Quick Unlock as {userRole}</span>
            </button>
          </div>
        </form>

        <div style={{ fontSize: '10px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
          <Sparkles size={10} style={{ color: 'var(--accent-primary)' }} />
          <span>Eduvanta Secure Session Gate</span>
        </div>
      </div>
    </div>
  );
};
