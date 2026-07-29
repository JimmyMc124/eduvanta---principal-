import React, { useState } from 'react';
import { useOS } from '../../context/OSContext';
import { MessageSquare, Send, Bell, Mail, Smartphone, AlertTriangle, CheckCircle2 } from 'lucide-react';

export const CommunicationCenter: React.FC = () => {
  const { addToast } = useOS();

  const [recipient, setRecipient] = useState('All Parents & Guardians');
  const [subject, setSubject] = useState('');
  const [messageText, setMessageText] = useState('');
  const [channels, setChannels] = useState({
    email: true,
    sms: true,
    push: true,
    emergency: false
  });

  const chats = [
    { id: '1', title: 'Parent Broadcast: Midterm Schedule', sender: 'Principal Vance', time: '10:00 AM', preview: 'Reminder to all parents regarding the Q3 exam timetable...', unread: true },
    { id: '2', title: 'Faculty Council Group', sender: 'Dr. Clara Thorne', time: '09:15 AM', preview: 'Meeting notes from STEM department head briefing...', unread: false },
    { id: '3', title: 'Class 12-A Parent Channel', sender: 'Sarah Jenkins (Class Advisory)', time: '08:45 AM', preview: 'Reminder: Calculus Lab reports are due tomorrow at 11:59 PM.', unread: false },
  ];

  const handleBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageText) return;
    addToast('Broadcast Dispatched', `Broadcast sent to ${recipient} via ${Object.keys(channels).filter(k => (channels as any)[k]).join(', ')}`, 'success');
    setSubject('');
    setMessageText('');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }} className="animate-fade-in">
      <div className="flex-between">
        <div>
          <h2 style={{ fontSize: '20px', fontWeight: 700, letterSpacing: '-0.02em' }}>
            Communications & Broadcast Hub
          </h2>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
            Omnichannel messaging across Email, SMS, Push Notifications and Emergency Alerts
          </p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '18px' }}>
        {/* Chat / Inbox List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {chats.map(chat => (
            <div 
              key={chat.id}
              className="glass-panel"
              style={{
                padding: '14px',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                gap: '6px',
                borderLeft: chat.unread ? '4px solid var(--accent-primary)' : '1px solid var(--border-color)'
              }}
            >
              <div className="flex-between">
                <div style={{ fontWeight: 700, fontSize: '13px', color: 'var(--text-primary)' }}>{chat.title}</div>
                <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>{chat.time}</div>
              </div>
              <div style={{ fontSize: '11px', color: 'var(--accent-primary)', fontWeight: 600 }}>{chat.sender}</div>
              <div style={{ fontSize: '11px', color: 'var(--text-secondary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {chat.preview}
              </div>
            </div>
          ))}
        </div>

        {/* Broadcast Message Composer */}
        <div className="glass-panel" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: 700 }}>Dispatch Broadcast Message</h3>

          <form onSubmit={handleBroadcast} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div>
              <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
                Recipient Group
              </label>
              <select className="mac-input" value={recipient} onChange={e => setRecipient(e.target.value)}>
                <option value="All Parents & Guardians">All Parents & Guardians</option>
                <option value="All Active Faculty & Staff">All Active Faculty & Staff</option>
                <option value="Grade 10 Students">Grade 10 Students</option>
                <option value="Grade 12 Graduation Batch">Grade 12 Graduation Batch</option>
              </select>
            </div>

            <div>
              <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
                Subject Title
              </label>
              <input type="text" className="mac-input" placeholder="e.g. Important Announcement: Parent-Teacher Assembly" value={subject} onChange={e => setSubject(e.target.value)} required />
            </div>

            <div>
              <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
                Message Content
              </label>
              <textarea 
                className="mac-input" 
                rows={4} 
                placeholder="Type official broadcast notice..." 
                value={messageText} 
                onChange={e => setMessageText(e.target.value)} 
                required 
              />
            </div>

            {/* Channels Select */}
            <div>
              <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>
                Delivery Channels
              </label>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <label style={{ fontSize: '12px', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                  <input type="checkbox" checked={channels.email} onChange={e => setChannels({ ...channels, email: e.target.checked })} />
                  <Mail size={14} /> Email
                </label>
                <label style={{ fontSize: '12px', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                  <input type="checkbox" checked={channels.sms} onChange={e => setChannels({ ...channels, sms: e.target.checked })} />
                  <Smartphone size={14} /> SMS Gateway
                </label>
                <label style={{ fontSize: '12px', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                  <input type="checkbox" checked={channels.push} onChange={e => setChannels({ ...channels, push: e.target.checked })} />
                  <Bell size={14} /> Eduvanta App Push
                </label>
              </div>
            </div>

            <div className="flex-between" style={{ marginTop: '10px' }}>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>* Delivered via Cloud Gateway</span>
              <button type="submit" className="mac-btn mac-btn-primary">
                <Send size={14} /> Dispatch Broadcast
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
