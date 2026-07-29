import React, { useState } from 'react';
import { useOS } from '../../context/OSContext';
import { GlassModal } from '../common/GlassModal';
import { ShieldCheck, Lock, Unlock, Key, RefreshCw, UserPlus, ShieldAlert, Database, Cloud, Trash2, Smartphone, Monitor, History, Check } from 'lucide-react';

export const AccountAndSecurityManager: React.FC = () => {
  const { userAccounts, addUserAccount, deleteUserAccount, toggleUserStatus, activities, addToast, playSound } = useOS();

  const [activeTab, setActiveTab] = useState<'accounts' | 'sessions' | 'permissions' | 'audit'>('accounts');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<'Principal' | 'Admin' | 'Teacher' | 'Staff' | 'Parent' | 'Student'>('Teacher');
  const [auditSearch, setAuditSearch] = useState('');

  const activeSessions = [
    { id: 'sess-1', device: 'Apple MacBook Pro M3 Max', os: 'macOS Sequoia 15.1', ip: '192.168.1.104 (Cupertino)', location: 'Cupertino, CA', user: 'Dr. Eleanor Vance (Principal)', time: 'Active Now' },
    { id: 'sess-2', device: 'Apple iPad Pro 12.9"', os: 'iPadOS 18.0', ip: '192.168.1.112', location: 'San Jose, CA', user: 'Marcus Vance', time: '12m ago' },
    { id: 'sess-3', device: 'Dell XPS 15', os: 'Windows 11 Pro', ip: '192.168.1.101', location: 'Santa Clara, CA', user: 'Sarah Johnson', time: '1h ago' },
    { id: 'sess-4', device: 'Apple iPhone 16 Pro', os: 'iOS 18.1', ip: '72.14.201.88', location: 'San Francisco, CA', user: 'David Chen', time: '2h ago' }
  ];

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

  const filteredLogs = activities.filter(l => 
    l.user.toLowerCase().includes(auditSearch.toLowerCase()) || 
    l.action.toLowerCase().includes(auditSearch.toLowerCase()) ||
    l.category.toLowerCase().includes(auditSearch.toLowerCase())
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }} className="animate-fade-in">
      <div className="flex-between">
        <div>
          <h2 style={{ fontSize: '20px', fontWeight: 800, letterSpacing: '-0.02em' }}>
            Security, Accounts & Audit Trail
          </h2>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
            User authentication directory, role permissions matrix, active sessions & cloud firewall
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button 
            className="mac-btn" 
            onClick={() => {
              playSound('backupCompleted');
              addToast('Database Snapshot', 'Firestore & Cloud SQL DB snapshot completed (v4.2-snap)', 'success');
            }}
          >
            <Database size={15} /> Backup Firestore DB
          </button>
          <button 
            className="mac-btn mac-btn-primary" 
            onClick={() => {
              playSound('click');
              setIsModalOpen(true);
            }}
          >
            <UserPlus size={15} /> Provision User Account
          </button>
        </div>
      </div>

      {/* Security Status Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px' }}>
        <div className="glass-panel" style={{ padding: '16px' }}>
          <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Firewall Status</div>
          <div style={{ fontSize: '15px', fontWeight: 700, color: 'var(--accent-success)', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <ShieldCheck size={16} /> Shield Active
          </div>
          <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '2px' }}>0 Unhandled Threats</div>
        </div>

        <div className="glass-panel" style={{ padding: '16px' }}>
          <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Blocked Intrusion Vector</div>
          <div style={{ fontSize: '15px', fontWeight: 700, color: 'var(--accent-warning)', marginTop: '4px' }}>
            3 Malicious IPs Blocked
          </div>
          <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '2px' }}>IP: 185.220.101.4</div>
        </div>

        <div className="glass-panel" style={{ padding: '16px' }}>
          <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>2FA Security Coverage</div>
          <div style={{ fontSize: '15px', fontWeight: 700, color: 'var(--accent-primary)', marginTop: '4px' }}>
            94.8% Enforced
          </div>
          <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '2px' }}>OAuth 2.0 & Authenticator</div>
        </div>

        <div className="glass-panel" style={{ padding: '16px' }}>
          <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Cloud Data Encryption</div>
          <div style={{ fontSize: '15px', fontWeight: 700, color: 'var(--accent-info)', marginTop: '4px' }}>
            AES-256 Enabled
          </div>
          <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '2px' }}>Cloud Run Container Vault</div>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div style={{ display: 'flex', gap: '8px', borderBottom: '1px solid var(--border-color-subtle)', paddingBottom: '8px' }}>
        {[
          { id: 'accounts', label: 'User Directory', icon: <UserPlus size={14} /> },
          { id: 'sessions', label: 'Active Sessions', icon: <Monitor size={14} /> },
          { id: 'permissions', label: 'Role Matrix', icon: <ShieldCheck size={14} /> },
          { id: 'audit', label: 'Full Audit Trail', icon: <History size={14} /> }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => {
              playSound('click');
              setActiveTab(tab.id as any);
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 14px',
              borderRadius: 'var(--radius-md)',
              border: 'none',
              backgroundColor: activeTab === tab.id ? 'var(--accent-primary-bg)' : 'transparent',
              color: activeTab === tab.id ? 'var(--accent-primary)' : 'var(--text-muted)',
              fontWeight: activeTab === tab.id ? 600 : 400,
              fontSize: '12px',
              cursor: 'pointer'
            }}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab Content: User Accounts Directory */}
      {activeTab === 'accounts' && (
        <div className="mac-table-container">
          <table className="mac-table">
            <thead>
              <tr>
                <th>Account Name</th>
                <th>Email Address</th>
                <th>Assigned Role</th>
                <th>2FA Status</th>
                <th>Last Login</th>
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
                  <td style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{user.lastLogin}</td>
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
                      <button 
                        className="mac-btn mac-btn-sm" 
                        onClick={() => deleteUserAccount(user.id)}
                        style={{ color: 'var(--accent-danger)' }}
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Tab Content: Active Sessions */}
      {activeTab === 'sessions' && (
        <div className="glass-panel" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <h3 style={{ fontSize: '15px', fontWeight: 700 }}>Active Terminal & Device Sessions</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {activeSessions.map(sess => (
              <div 
                key={sess.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px 16px',
                  backgroundColor: 'var(--bg-surface)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-md)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Monitor size={20} className="text-blue-400" />
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>
                      {sess.device} • <span style={{ color: 'var(--accent-success)' }}>{sess.time}</span>
                    </div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                      User: {sess.user} | IP: {sess.ip} | OS: {sess.os}
                    </div>
                  </div>
                </div>

                <button 
                  className="mac-btn mac-btn-sm"
                  onClick={() => addToast('Session Terminated', `Revoked access token for ${sess.device}`, 'warning')}
                  style={{ color: 'var(--accent-danger)' }}
                >
                  Revoke Session
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab Content: Role Permissions Matrix */}
      {activeTab === 'permissions' && (
        <div className="glass-panel" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <h3 style={{ fontSize: '15px', fontWeight: 700 }}>Role Access & Authorization Matrix</h3>
          <div className="mac-table-container">
            <table className="mac-table">
              <thead>
                <tr>
                  <th>Role</th>
                  <th>Student Records</th>
                  <th>Faculty Payroll</th>
                  <th>Security Firewall</th>
                  <th>Financial Ledger</th>
                  <th>System Settings</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { role: 'Principal', students: 'Full Control', payroll: 'Full Control', security: 'Full Control', finance: 'Full Control', settings: 'Full Control' },
                  { role: 'Admin', students: 'Full Control', payroll: 'View Only', security: 'Full Control', finance: 'View Only', settings: 'Full Control' },
                  { role: 'Teacher', students: 'View / Edit Grades', payroll: 'None', security: 'None', finance: 'None', settings: 'None' },
                  { role: 'Parent', students: 'View Ward Only', payroll: 'None', security: 'None', finance: 'Pay Dues', settings: 'None' },
                  { role: 'Student', students: 'View Self Only', payroll: 'None', security: 'None', finance: 'None', settings: 'None' }
                ].map((row, idx) => (
                  <tr key={idx}>
                    <td style={{ fontWeight: 700 }}>{row.role}</td>
                    <td><span className="mac-badge mac-badge-success">{row.students}</span></td>
                    <td><span className="mac-badge mac-badge-primary">{row.payroll}</span></td>
                    <td><span className="mac-badge mac-badge-neutral">{row.security}</span></td>
                    <td><span className="mac-badge mac-badge-primary">{row.finance}</span></td>
                    <td><span className="mac-badge mac-badge-neutral">{row.settings}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab Content: Full Audit Trail */}
      {activeTab === 'audit' && (
        <div className="glass-panel" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div className="flex-between">
            <h3 style={{ fontSize: '15px', fontWeight: 700 }}>Full OS System Audit Logs</h3>
            <input 
              type="text" 
              placeholder="Search logs by user or action..."
              className="mac-input"
              style={{ width: '240px' }}
              value={auditSearch}
              onChange={(e) => setAuditSearch(e.target.value)}
            />
          </div>

          <div className="mac-table-container">
            <table className="mac-table">
              <thead>
                <tr>
                  <th>Timestamp</th>
                  <th>User / Agent</th>
                  <th>Role</th>
                  <th>Action Description</th>
                  <th>Category</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredLogs.map(log => (
                  <tr key={log.id}>
                    <td style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '11px' }}>{log.timestamp}</td>
                    <td style={{ fontWeight: 600 }}>{log.user}</td>
                    <td><span className="mac-badge mac-badge-primary">{log.role}</span></td>
                    <td>{log.action}</td>
                    <td>{log.category}</td>
                    <td>
                      <span className={`mac-badge mac-badge-${log.status === 'Success' ? 'success' : log.status === 'Warning' ? 'warning' : 'danger'}`}>
                        {log.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Provision User Account Modal */}
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
