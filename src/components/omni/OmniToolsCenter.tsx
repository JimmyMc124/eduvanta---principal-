import React from 'react';
import { useOS } from '../../context/OSContext';
import { NavigationTab } from '../../types';
import { 
  Users, 
  GraduationCap, 
  Calendar, 
  BookOpen, 
  Bus, 
  Award, 
  ShieldCheck, 
  DollarSign, 
  MessageSquare, 
  FileSpreadsheet, 
  Sparkles, 
  Clock, 
  Building, 
  CreditCard, 
  FileText, 
  Cpu, 
  Settings, 
  HardDrive 
} from 'lucide-react';

export const OmniToolsCenter: React.FC = () => {
  const { setActiveTab, toggleAI, addToast } = useOS();

  const omniModules: {
    id: string;
    title: string;
    description: string;
    icon: React.ReactNode;
    color: string;
    badge: string;
    action: () => void;
  }[] = [
    { id: '1', title: 'Student Directory', description: 'Complete enrollment, GPA & attendance records', icon: <Users size={22} />, color: '#3b82f6', badge: 'Core', action: () => setActiveTab('students') },
    { id: '2', title: 'Faculty & Staff', description: 'Department chairs, workload & reviews', icon: <GraduationCap size={22} />, color: '#8b5cf6', badge: 'Core', action: () => setActiveTab('teachers') },
    { id: '3', title: 'Timetable Matrix', description: 'Drag-and-drop weekly class schedule optimizer', icon: <Clock size={22} />, color: '#f59e0b', badge: 'Interactive', action: () => setActiveTab('timetable') },
    { id: '4', title: 'Library Catalog', description: 'Book reservation queue & loan tracking', icon: <BookOpen size={22} />, color: '#6366f1', badge: 'Active', action: () => setActiveTab('library') },
    { id: '5', title: 'Bus GPS Tracking', description: 'Real-time vehicle telemetry & route progress', icon: <Bus size={22} />, color: '#06b6d4', badge: 'Live GPS', action: () => setActiveTab('transport') },
    { id: '6', title: 'ID & Certificates', description: 'Student ID cards, honor roll & report generator', icon: <Award size={22} />, color: '#eab308', badge: 'Templates', action: () => setActiveTab('certificates') },
    { id: '7', title: 'Financial Ledger', description: 'Tuition fees, payroll, invoices & revenue graphs', icon: <DollarSign size={22} />, color: '#10b981', badge: 'Financial', action: () => setActiveTab('finance') },
    { id: '8', title: 'Messages & Alerts', description: 'Parent broadcasts, student chats & SMS center', icon: <MessageSquare size={22} />, color: '#ec4899', badge: 'Inbox', action: () => setActiveTab('communication') },
    { id: '9', title: 'Academic Calendar', description: 'Exams, board meetings, sports & holidays', icon: <Calendar size={22} />, color: '#f97316', badge: 'Events', action: () => setActiveTab('calendar') },
    { id: '10', title: 'Security & Firewall', description: 'IP logs, 2FA enforcement, audit trail', icon: <ShieldCheck size={22} />, color: '#14b8a6', badge: 'Protected', action: () => setActiveTab('security') },
    { id: '11', title: 'Eduvanta AI Assistant', description: 'Lesson planner, email writer & schedule AI', icon: <Sparkles size={22} />, color: '#a78bfa', badge: 'AI Engine', action: () => toggleAI(true) },
    { id: '12', title: 'Bulk Data Importer', description: 'CSV/Excel student & teacher batch uploader', icon: <FileSpreadsheet size={22} />, color: '#0284c7', badge: 'Batch Tool', action: () => addToast('Batch Importer', 'Drag and drop .CSV or .XLSX files to parse student lists', 'info') }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }} className="animate-fade-in">
      <div className="flex-between">
        <div>
          <h2 style={{ fontSize: '20px', fontWeight: 700, letterSpacing: '-0.02em' }}>
            Omni Tools Control Hub
          </h2>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
            Apple Control Center suite housing all 18+ school operational modules
          </p>
        </div>
        <button className="mac-btn mac-btn-primary" onClick={() => toggleAI(true)}>
          <Sparkles size={16} /> Open Eduvanta AI Studio
        </button>
      </div>

      {/* Grid of Tools */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
        {omniModules.map(tool => (
          <div 
            key={tool.id}
            className="glass-card"
            onClick={tool.action}
            style={{
              padding: '20px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '14px',
              cursor: 'pointer',
              border: '1px solid var(--border-color)',
              transition: 'all 200ms cubic-bezier(0.16, 1, 0.3, 1)'
            }}
          >
            <div className="flex-between">
              <div 
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: 'var(--radius-lg)',
                  background: `${tool.color}15`,
                  color: tool.color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: `0 4px 12px ${tool.color}25`
                }}
              >
                {tool.icon}
              </div>
              <span className="mac-badge mac-badge-primary">
                {tool.badge}
              </span>
            </div>

            <div>
              <div style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)' }}>
                {tool.title}
              </div>
              <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px', lineHeight: '1.4' }}>
                {tool.description}
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: 600, color: tool.color }}>
              Launch Module →
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
