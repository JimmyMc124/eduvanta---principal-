import React, { useState } from 'react';
import { useOS } from '../../context/OSContext';
import { GlassModal } from '../common/GlassModal';
import { ShieldCheck, Lock, Unlock, Key, RefreshCw, UserPlus, ShieldAlert, Database, Cloud } from 'lucide-react';

export const AccountAndSecurityManager: React.FC = () => {
  const { userAccounts, addUserAccount, toggleUserStatus, addToast } = useOS();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<'Principal' | 'Admin' | 'Teacher' | 'Staff' | 'Parent' | 'Student'>('Teacher');

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;
    addUserAccount({
      name,
      email,
      role,
      status: 'Active',
      twoFactorEnabled: true,
      ipAddress: '192.168.1.150'
    });
    setIsModalOpen(false);
    setName('');
    setEmail('');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }} className="animate-fade-in">
      <div className="flex-between">
        <div>
          <h2 style={{ fontSize: '20px', fontWeight: 700, letterSpacing: '-0.02em' }}>
            Security, Accounts & Audit Trail
          </h2>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
            User authentication directory, role permissions, firewall monitoring & database backups
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button 
            className="mac-btn" 
            onClick={() => addToast('Database Backup', 'Initiated Cloud Snapshot: 100% complete', 'success')}
          >
            <Database size={16} /> Backup Firestore DB
          </button>
          <button className="mac-btn mac-btn-primary" onClick={() => setIsModalOpen(true)}>
            <UserPlus size={16} /> Provision User Account
          </button>
        </div>
      </div>

      {/* Security Status Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <div className="glass-panel" style={{ padding: '16px' }}>
          <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Firewall Status</div>
          <div style={{ fontSize: '16px', fontWeight: 700, color: 'var(--accent-success)', marginTop: '4px' }}>
            🛡️ Shield Active
          </div>
          <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '2px' }}>0 Unhandled Threats</div>
        </div>

        <div className="glass-panel" style={{ padding: '16px' }}>
          <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Blocked Attack Vectors</div>
          <div style={{ fontSize: '16px', fontWeight: 700, color: 'var(--accent-warning)', marginTop: '4px' }}>
            3 Malicious IPs Blocked
          </div>
          <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '2px' }}>IP: 185.220.101.4</div>
        </div>

        <div className="glass-panel" style={{ padding: '16px' }}>
          <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>2FA Security Coverage</div>
          <div style={{ fontSize: '16px', fontWeight: 700, color: 'var(--accent-primary)', marginTop: '4px' }}>
            94.8% Enforced
          </div>
          <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '2px' }}>OAuth 2.0 & Authenticator</div>
        </div>

        <div className="glass-panel" style={{ padding: '16px' }}>
          <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Cloud Data Encryption</div>
          <div style={{ fontSize: '16px', fontWeight: 700, color: 'var(--accent-info)', marginTop: '4px' }}>
            AES-256 Enabled
          </div>
          <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '2px' }}>Cloud Run Container Vault</div>
        </div>
      </div>

      {/* Accounts Directory Table */}
      <div className="mac-table-container">
        <table className="mac-table">
          <thead>
            <tr>
              <th>Account Name</th>
              <th>Email Address</th>
              <th>Assigned Role</th>
              <th>2FA Status</th>
              <th>Last IP Login</th>
              <th>Status</th>
              <th>Account Actions</th>
            </tr>
          </thead>
          <tbody>
            {userAccounts.map(user => (
              <tr key={user.id}>
                <td style={{ fontWeight: 600 }}>{user.name}</td>
                <td style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{user.email}</td>
                <td><span className="mac-badge mac-badge-primary">{user.role}</span></td>
                <td>
                  <span className={`mac-badge mac-badge-${user.twoFactorEnabled ? 'success' : 'warning'}`}>
                    {user.twoFactorEnabled ? '2FA Active' : '2FA Disabled'}
                  </span>
                </td>
                <td style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '11px' }}>{user.ipAddress}</td>
                <td>
                  <span className={`mac-badge mac-badge-${user.status === 'Active' ? 'success' : 'danger'}`}>
                    {user.status}
                  </span>
                </td>
                <td>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    <button 
                      className="mac-btn mac-btn-sm" 
                      onClick={() => toggleUserStatus(user.id)}
                    >
                      {user.status === 'Active' ? <Lock size={12} /> : <Unlock size={12} />}
                      {user.status === 'Active' ? 'Suspend' : 'Activate'}
                    </button>
                    <button 
                      className="mac-btn mac-btn-sm" 
                      onClick={() => addToast('Password Reset', `Password reset token dispatched to ${user.email}`, 'info')}
                    >
                      <Key size={12} /> Reset
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Create Account Modal */}
      <GlassModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Provision User Account"
        subtitle="Grant Eduvanta OS permissions to new faculty, staff or admin"
      >
        <form onSubmit={handleCreate} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div>
            <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
              User Full Name
            </label>
            <input type="text" className="mac-input" placeholder="e.g. Dr. Arthur Vance" value={name} onChange={e => setName(e.target.value)} required />
          </div>

          <div>
            <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
              Email Address
            </label>
            <input type="email" className="mac-input" placeholder="user@eduvanta.org" value={email} onChange={e => setEmail(e.target.value)} required />
          </div>

          <div>
            <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
              Assigned Role
            </label>
            <select className="mac-input" value={role} onChange={e => setRole(e.target.value as any)}>
              <option value="Teacher">Teacher</option>
              <option value="Admin">Admin</option>
              <option value="Staff">Staff</option>
              <option value="Principal">Principal</option>
              <option value="Parent">Parent</option>
              <option value="Student">Student</option>
            </select>
          </div>

          <div className="flex-between" style={{ marginTop: '10px' }}>
            <button type="button" className="mac-btn" onClick={() => setIsModalOpen(false)}>Cancel</button>
            <button type="submit" className="mac-btn mac-btn-primary">Provision Account</button>
          </div>
        </form>
      </GlassModal>
    </div>
  );
};
