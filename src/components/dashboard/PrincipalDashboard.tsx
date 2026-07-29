import React, { useState } from 'react';
import { useOS } from '../../context/OSContext';
import { StatCard } from './StatCard';
import { 
  Users, 
  GraduationCap, 
  UserCheck, 
  DollarSign, 
  BookOpen, 
  Bus, 
  Activity, 
  TrendingUp, 
  Sparkles, 
  Server, 
  Cpu, 
  HardDrive, 
  ShieldAlert, 
  Award, 
  CheckCircle2,
  CloudSun,
  Camera,
  DoorClosed,
  UserPlus,
  ShieldCheck,
  Clock,
  Calendar,
  Layers,
  Zap,
  Radio,
  FileSpreadsheet
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  BarChart, 
  Bar, 
  Legend, 
  RadarChart, 
  Radar, 
  PolarGrid, 
  PolarAngleAxis 
} from 'recharts';
import { 
  ATTENDANCE_CHART_DATA, 
  REVENUE_CHART_DATA, 
  PERFORMANCE_RADAR_DATA 
} from '../../data/mockData';

export const PrincipalDashboard: React.FC = () => {
  const { schoolInfo, systemHealth, students, teachers, activities, events, setActiveTab, toggleAI, playSound } = useOS();
  const [activeTimelineCategory, setActiveTimelineCategory] = useState<string>('All');

  const commandScores = [
    { label: 'Overall School Health', score: 96, color: '#3b82f6' },
    { label: 'Attendance Rate', score: 95, color: '#10b981' },
    { label: 'Academic Standing', score: 92, color: '#8b5cf6' },
    { label: 'Financial Health', score: 98, color: '#f59e0b' },
    { label: 'Discipline & Safety', score: 94, color: '#06b6d4' },
    { label: 'Infrastructure', score: 97, color: '#ec4899' }
  ];

  const filteredActivities = activities.filter(a => activeTimelineCategory === 'All' || a.category === activeTimelineCategory);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }} className="animate-fade-in">
      {/* Principal Command Center Hero Header */}
      <div 
        className="glass-panel"
        style={{
          padding: '24px',
          background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.85), rgba(30, 41, 59, 0.85))',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px'
        }}
      >
        <div className="flex-between">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11px', fontWeight: 700, color: 'var(--accent-primary)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              <Zap size={14} /> Principal Command Center Terminal
            </div>
            <h1 style={{ fontSize: '26px', fontWeight: 800, letterSpacing: '-0.03em', marginTop: '4px', color: 'var(--text-primary)' }}>
              {schoolInfo.principal}
            </h1>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '2px' }}>
              {schoolInfo.name} • <span style={{ fontStyle: 'italic', color: 'var(--text-muted)' }}>"{schoolInfo.motto}"</span>
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button 
              className="mac-btn mac-btn-primary"
              onClick={() => {
                playSound('click');
                toggleAI(true);
              }}
              style={{ padding: '10px 18px', fontSize: '13px', fontWeight: 600 }}
            >
              <Sparkles size={16} /> Launch AI School Assistant
            </button>
          </div>
        </div>

        {/* Command Health Score Rings */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '12px' }}>
          {commandScores.map((item, idx) => (
            <div 
              key={idx}
              className="glass-card"
              style={{
                padding: '12px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                gap: '8px'
              }}
            >
              {/* Circular SVG Ring */}
              <div style={{ position: 'relative', width: '56px', height: '56px' }}>
                <svg width="56" height="56" viewBox="0 0 56 56">
                  <circle cx="28" cy="28" r="22" stroke="rgba(255,255,255,0.08)" strokeWidth="4" fill="none" />
                  <circle 
                    cx="28" 
                    cy="28" 
                    r="22" 
                    stroke={item.color} 
                    strokeWidth="4" 
                    fill="none" 
                    strokeDasharray="138"
                    strokeDashoffset={138 - (138 * item.score) / 100}
                    strokeLinecap="round"
                    style={{ transition: 'stroke-dashoffset 1s ease-in-out' }}
                  />
                </svg>
                <span 
                  style={{ 
                    position: 'absolute', 
                    inset: 0, 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    fontSize: '13px',
                    fontWeight: 700,
                    color: 'var(--text-primary)'
                  }}
                >
                  {item.score}%
                </span>
              </div>
              <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-secondary)' }}>
                {item.label}
              </div>
            </div>
          ))}
        </div>

        {/* Live Counters & System Telemetry Pill Row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '10px' }}>
          <div className="glass-card" style={{ padding: '10px 14px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Radio size={16} className="text-emerald-400" />
            <div>
              <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Online Right Now</div>
              <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)' }}>
                1,142 Students • 84 Faculty
              </div>
            </div>
          </div>

          <div className="glass-card" style={{ padding: '10px 14px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Bus size={16} className="text-blue-400" />
            <div>
              <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>GPS Fleet Telemetry</div>
              <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)' }}>
                18 Buses Active • 0 Delay
              </div>
            </div>
          </div>

          <div className="glass-card" style={{ padding: '10px 14px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Server size={16} className="text-purple-400" />
            <div>
              <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Server & API Latency</div>
              <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--accent-success)' }}>
                {systemHealth.backend} ({systemHealth.apiLatency}ms)
              </div>
            </div>
          </div>

          <div className="glass-card" style={{ padding: '10px 14px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <ShieldCheck size={16} className="text-rose-400" />
            <div>
              <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Security Firewall</div>
              <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)' }}>
                32 CCTV • Perimeter Secured
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Weather & Live Campus Status Widget Row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '14px' }}>
        {/* Weather Widget */}
        <div className="glass-panel" style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div className="flex-between">
            <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-muted)' }}>CAMPUS WEATHER</div>
            <CloudSun size={18} style={{ color: '#f59e0b' }} />
          </div>
          <div>
            <div style={{ fontSize: '28px', fontWeight: 800, color: 'var(--text-primary)' }}>24°C</div>
            <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)' }}>Cupertino Campus • Clear Skies</div>
          </div>
          <div style={{ fontSize: '11px', color: 'var(--text-muted)', borderTop: '1px solid var(--border-color-subtle)', paddingTop: '8px' }}>
            Rain Chance: <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>10%</span> • Advisory: <span style={{ color: 'var(--accent-success)', fontWeight: 600 }}>Outdoor Athletics Clear</span>
          </div>
        </div>

        {/* Live Finance Snapshot */}
        <div className="glass-panel" style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div className="flex-between">
            <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-muted)' }}>TODAY'S FINANCE LEDGER</div>
            <DollarSign size={18} style={{ color: '#10b981' }} />
          </div>
          <div>
            <div style={{ fontSize: '24px', fontWeight: 800, color: '#10b981' }}>+$48,500</div>
            <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)' }}>Tuition & Bus Fee Batch Receipts</div>
          </div>
          <div style={{ fontSize: '11px', color: 'var(--text-muted)', borderTop: '1px solid var(--border-color-subtle)', paddingTop: '8px' }}>
            Pending Dues: <span style={{ color: 'var(--accent-warning)', fontWeight: 600 }}>$42,500</span> • Payroll Due: <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>Aug 1</span>
          </div>
        </div>

        {/* Campus Security Summary */}
        <div className="glass-panel" style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div className="flex-between">
            <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-muted)' }}>SECURITY & CCTV</div>
            <Camera size={18} style={{ color: '#ec4899' }} />
          </div>
          <div>
            <div style={{ fontSize: '24px', fontWeight: 800, color: 'var(--text-primary)' }}>32 / 32 Live</div>
            <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--accent-success)' }}>All Perimeter Gates Locked & Monitored</div>
          </div>
          <div style={{ fontSize: '11px', color: 'var(--text-muted)', borderTop: '1px solid var(--border-color-subtle)', paddingTop: '8px' }}>
            Visitors Checked-in: <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>12</span> • Intrusions: <span style={{ color: 'var(--accent-success)', fontWeight: 600 }}>0</span>
          </div>
        </div>
      </div>

      {/* Stat Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <StatCard 
          title="Total Students" 
          value="3,420" 
          subtitle="1,750 Male • 1,670 Female" 
          trend="+4.2% Enrollment" 
          trendType="positive"
          icon={<Users size={18} />}
          color="#3b82f6"
          onClick={() => setActiveTab('students')}
        />

        <StatCard 
          title="Active Faculty" 
          value={teachers.length} 
          subtitle="184 Teachers • 65 Staff" 
          trend="100% Department Shift" 
          trendType="neutral"
          icon={<GraduationCap size={18} />}
          color="#8b5cf6"
          onClick={() => setActiveTab('teachers')}
        />

        <StatCard 
          title="Today's Attendance" 
          value="96.4%" 
          subtitle="Weekly Avg: 95.8%" 
          trend="+1.2% vs last month" 
          trendType="positive"
          icon={<UserCheck size={18} />}
          color="#10b981"
          onClick={() => setActiveTab('analytics')}
        />

        <StatCard 
          title="Monthly Revenue" 
          value="$310,000" 
          subtitle="Pending Fees: $42,500" 
          trend="+$35,000 Profit" 
          trendType="positive"
          icon={<DollarSign size={18} />}
          color="#f59e0b"
          onClick={() => setActiveTab('finance')}
        />
      </div>

      {/* Main Charts Section */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '16px' }}>
        {/* Revenue vs Expenses Bar Chart */}
        <div className="glass-panel" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div className="flex-between">
            <div>
              <h3 style={{ fontSize: '15px', fontWeight: 700 }}>Financial Ledger & Income vs Expenses</h3>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Monthly comparison across tuition, payroll, and maintenance</p>
            </div>
            <button className="mac-btn mac-btn-sm" onClick={() => setActiveTab('finance')}>
              Open Finance Manager
            </button>
          </div>

          <div style={{ width: '100%', height: '240px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={REVENUE_CHART_DATA}>
                <XAxis dataKey="month" stroke="var(--text-muted)" fontSize={11} />
                <YAxis stroke="var(--text-muted)" fontSize={11} />
                <Tooltip contentStyle={{ backgroundColor: 'var(--bg-popover)', borderRadius: '8px', border: '1px solid var(--border-color)' }} />
                <Legend wrapperStyle={{ fontSize: '11px' }} />
                <Bar dataKey="revenue" name="Revenue ($)" fill="#10b981" radius={[4, 4, 0, 0]} />
                <Bar dataKey="expenses" name="Expenses ($)" fill="#f43f5e" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* AI Radar */}
        <div className="glass-panel" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <h3 style={{ fontSize: '15px', fontWeight: 700 }}>Academic Performance Radar</h3>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Current department averages vs AI predictions</p>
          </div>

          <div style={{ width: '100%', height: '240px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={PERFORMANCE_RADAR_DATA}>
                <PolarGrid stroke="var(--border-color)" />
                <PolarAngleAxis dataKey="subject" stroke="var(--text-secondary)" fontSize={10} />
                <Radar name="Current" dataKey="currentScore" stroke="#10b981" fill="#10b981" fillOpacity={0.3} />
                <Radar name="AI Prediction" dataKey="aiPrediction" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.3} />
                <Legend wrapperStyle={{ fontSize: '11px' }} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Activity Timeline Section */}
      <div className="glass-panel" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div className="flex-between">
          <div>
            <h3 style={{ fontSize: '15px', fontWeight: 700 }}>Real-Time Activity Timeline</h3>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Live stream of academic, administrative, and security operations</p>
          </div>

          {/* Category Filter Pills */}
          <div style={{ display: 'flex', gap: '6px' }}>
            {['All', 'Academic', 'Finance', 'Attendance', 'Security', 'Transport'].map(cat => (
              <button
                key={cat}
                onClick={() => {
                  playSound('click');
                  setActiveTimelineCategory(cat);
                }}
                style={{
                  padding: '4px 10px',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '11px',
                  border: '1px solid',
                  borderColor: activeTimelineCategory === cat ? 'var(--accent-primary)' : 'var(--border-color)',
                  backgroundColor: activeTimelineCategory === cat ? 'var(--accent-primary-bg)' : 'transparent',
                  color: activeTimelineCategory === cat ? 'var(--accent-primary)' : 'var(--text-muted)',
                  cursor: 'pointer'
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Timeline View */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', position: 'relative', paddingLeft: '20px' }}>
          {/* Vertical Timeline Bar */}
          <div 
            style={{ 
              position: 'absolute', 
              top: '10px', 
              bottom: '10px', 
              left: '7px', 
              width: '2px', 
              backgroundColor: 'var(--border-color)' 
            }} 
          />

          {filteredActivities.map((log, idx) => (
            <div 
              key={log.id} 
              style={{ 
                position: 'relative', 
                display: 'flex', 
                alignItems: 'flex-start', 
                justifyContent: 'space-between',
                gap: '12px',
                padding: '12px 16px',
                backgroundColor: 'var(--bg-surface)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-md)'
              }}
            >
              {/* Timeline Bullet Node */}
              <div 
                style={{
                  position: 'absolute',
                  left: '-19px',
                  top: '18px',
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  backgroundColor: log.status === 'Success' ? 'var(--accent-success)' : log.status === 'Warning' ? 'var(--accent-warning)' : 'var(--accent-danger)',
                  boxShadow: `0 0 8px ${log.status === 'Success' ? 'var(--accent-success)' : 'var(--accent-danger)'}`
                }}
              />

              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)' }}>{log.user}</span>
                  <span className="mac-badge mac-badge-primary">{log.role}</span>
                  <span style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Clock size={11} /> {log.timestamp}
                  </span>
                </div>
                <div style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                  {log.action}
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span className="mac-badge mac-badge-neutral">{log.category}</span>
                <span className={`mac-badge mac-badge-${log.status === 'Success' ? 'success' : log.status === 'Warning' ? 'warning' : 'danger'}`}>
                  {log.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
