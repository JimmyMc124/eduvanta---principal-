import React, { useState } from 'react';
import { useOS } from '../../context/OSContext';
import { Settings, Save, ShieldCheck, Moon, Sun, Server, Key } from 'lucide-react';

export const SettingsManager: React.FC = () => {
  const { schoolInfo, setSchoolInfo, theme, toggleTheme, addToast } = useOS();

  const [name, setName] = useState(schoolInfo.name);
  const [motto, setMotto] = useState(schoolInfo.motto);
  const [principal, setPrincipal] = useState(schoolInfo.principal);
  const [location, setLocation] = useState(schoolInfo.location);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSchoolInfo(prev => ({
      ...prev,
      name,
      motto,
      principal,
      location
    }));
    addToast('Settings Saved', 'System preferences and school branding updated successfully', 'success');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }} className="animate-fade-in">
      <div className="flex-between">
        <div>
          <h2 style={{ fontSize: '20px', fontWeight: 700, letterSpacing: '-0.02em' }}>
            System Preferences & School Branding
          </h2>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
            Configure school metadata, theme customization, API endpoints, and cloud sync
          </p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }}>
        {/* Branding Form */}
        <div className="glass-panel" style={{ padding: '20px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '16px' }}>School Identity & Branding</h3>

          <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div>
              <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
                School Official Name
              </label>
              <input type="text" className="mac-input" value={name} onChange={e => setName(e.target.value)} required />
            </div>

            <div>
              <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
                Motto / Creed
              </label>
              <input type="text" className="mac-input" value={motto} onChange={e => setMotto(e.target.value)} required />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
                  Superintendent / Principal Name
                </label>
                <input type="text" className="mac-input" value={principal} onChange={e => setPrincipal(e.target.value)} required />
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
                  Campus Location
                </label>
                <input type="text" className="mac-input" value={location} onChange={e => setLocation(e.target.value)} required />
              </div>
            </div>

            <div className="flex-between" style={{ marginTop: '10px' }}>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Changes reflect globally across Eduvanta OS</span>
              <button type="submit" className="mac-btn mac-btn-primary">
                <Save size={14} /> Save Preferences
              </button>
            </div>
          </form>
        </div>

        {/* Theme & Server Settings */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div className="glass-panel" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <h3 style={{ fontSize: '15px', fontWeight: 600 }}>Theme Customization</h3>
            <div className="flex-between">
              <span style={{ fontSize: '13px' }}>Appearance Mode</span>
              <button className="mac-btn" onClick={toggleTheme}>
                {theme === 'dark' ? <Moon size={14} /> : <Sun size={14} />} {theme === 'dark' ? 'Dark Mode' : 'Light Mode'}
              </button>
            </div>
          </div>

          <div className="glass-panel" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <h3 style={{ fontSize: '15px', fontWeight: 600 }}>API & Integration Keys</h3>
            <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
              <div><strong>Google Gemini AI API:</strong> Configured in Cloud Vault</div>
              <div style={{ marginTop: '4px' }}><strong>SMTP Mail Relay:</strong> Active (smtp.eduvanta.org)</div>
              <div style={{ marginTop: '4px' }}><strong>SMS Gateway:</strong> Twilio API Connected</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
