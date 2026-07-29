import React from 'react';
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
  CheckCircle2 
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
  const { schoolInfo, systemHealth, students, teachers, activities, setActiveTab, toggleAI } = useOS();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }} className="animate-fade-in">
      {/* Hero Welcome Banner */}
      <div 
        className="glass-panel"
        style={{
          padding: '24px',
          background: 'linear-gradient(135deg, rgba(22, 27, 38, 0.8), rgba(30, 41, 59, 0.8))',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px'
        }}
      >
        <div className="flex-between">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', fontWeight: 600, color: 'var(--accent-primary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              <Sparkles size={14} /> Eduvanta School Operating System
            </div>
            <h1 style={{ fontSize: '26px', fontWeight: 700, letterSpacing: '-0.03em', marginTop: '4px', color: 'var(--text-primary)' }}>
              Welcome Back, {schoolInfo.principal}
            </h1>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '2px' }}>
              {schoolInfo.name} • <span style={{ fontStyle: 'italic' }}>"{schoolInfo.motto}"</span>
            </p>
          </div>

          <button 
            className="mac-btn mac-btn-primary"
            onClick={() => toggleAI(true)}
            style={{ padding: '10px 18px', fontSize: '13px' }}
          >
            <Sparkles size={16} /> Launch AI School Assistant
          </button>
        </div>

        {/* Live Hardware & Backend Status Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px', marginTop: '6px' }}>
          <div className="glass-card" style={{ padding: '10px 14px' }}>
            <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Backend Engine</div>
            <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--accent-success)', display: 'flex', alignItems: 'center', gap: '6px', marginTop: '2px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-success)' }} />
              {systemHealth.backend}
            </div>
          </div>

          <div className="glass-card" style={{ padding: '10px 14px' }}>
            <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Database & Latency</div>
            <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--accent-info)', marginTop: '2px' }}>
              {systemHealth.database} ({systemHealth.apiLatency}ms)
            </div>
          </div>

          <div className="glass-card" style={{ padding: '10px 14px' }}>
            <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>CPU & RAM Load</div>
            <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)', marginTop: '2px' }}>
              CPU {systemHealth.cpuUsage}% | RAM {systemHealth.ramUsage}GB
            </div>
          </div>

          <div className="glass-card" style={{ padding: '10px 14px' }}>
            <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Storage & Backup</div>
            <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--accent-secondary)', marginTop: '2px' }}>
              {systemHealth.storageUsage}% Used • Encrypted
            </div>
          </div>
        </div>
      </div>

      {/* Comprehensive Stat Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: '14px' }}>
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

        <StatCard 
          title="Library Books" 
          value="14,200" 
          subtitle="1,120 Currently Borrowed" 
          trend="18 New Additions" 
          trendType="positive"
          icon={<BookOpen size={18} />}
          color="#6366f1"
          onClick={() => setActiveTab('library')}
        />

        <StatCard 
          title="School Buses" 
          value="18 Active" 
          subtitle="18 GPS Live Routes" 
          trend="All Routes Nominal" 
          trendType="positive"
          icon={<Bus size={18} />}
          color="#06b6d4"
          onClick={() => setActiveTab('transport')}
        />

        <StatCard 
          title="Average GPA" 
          value="3.88" 
          subtitle="Top Grade: 12-A (3.97)" 
          trend="+0.08 Academic Lift" 
          trendType="positive"
          icon={<Award size={18} />}
          color="#ec4899"
          onClick={() => setActiveTab('analytics')}
        />

        <StatCard 
          title="Security & Firewall" 
          value="100% Secure" 
          subtitle="0 Breaches • 3 Blocked IPs" 
          trend="Audit Nominal" 
          trendType="positive"
          icon={<ShieldAlert size={18} />}
          color="#10b981"
          onClick={() => setActiveTab('security')}
        />
      </div>

      {/* Main Charts Section */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '16px' }}>
        {/* Revenue & Attendance Matrix */}
        <div className="glass-panel" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div className="flex-between">
            <div>
              <h3 style={{ fontSize: '15px', fontWeight: 600 }}>Revenue & Attendance Performance</h3>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Financial growth & student check-in trends over past 7 months</p>
            </div>
            <span className="mac-badge mac-badge-primary">Live Data</span>
          </div>

          <div style={{ width: '100%', height: '240px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={ATTENDANCE_CHART_DATA}>
                <defs>
                  <linearGradient id="colorAtt" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" stroke="var(--text-muted)" fontSize={12} />
                <YAxis domain={[90, 100]} stroke="var(--text-muted)" fontSize={12} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--bg-popover)', borderRadius: '8px', border: '1px solid var(--border-color)' }}
                />
                <Area type="monotone" dataKey="attendancePct" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorAtt)" name="Attendance %" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* AI Subject Radar Chart */}
        <div className="glass-panel" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <h3 style={{ fontSize: '15px', fontWeight: 600 }}>AI Performance Radar</h3>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Current vs AI Predicted Scores</p>
          </div>

          <div style={{ width: '100%', height: '240px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={PERFORMANCE_RADAR_DATA}>
                <PolarGrid stroke="var(--border-color)" />
                <PolarAngleAxis dataKey="subject" stroke="var(--text-secondary)" fontSize={11} />
                <Radar name="Current" dataKey="currentScore" stroke="#10b981" fill="#10b981" fillOpacity={0.3} />
                <Radar name="AI Prediction" dataKey="aiPrediction" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.3} />
                <Legend wrapperStyle={{ fontSize: '11px' }} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Live System Activity Feed Table */}
      <div className="glass-panel" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
        <div className="flex-between">
          <div>
            <h3 style={{ fontSize: '15px', fontWeight: 600 }}>Live OS Activity & Audit Stream</h3>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Real-time event updates across all departments</p>
          </div>
          <button className="mac-btn mac-btn-sm" onClick={() => setActiveTab('security')}>
            View Audit Log
          </button>
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
              {activities.map(log => (
                <tr key={log.id}>
                  <td style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '12px' }}>{log.timestamp}</td>
                  <td style={{ fontWeight: 600 }}>{log.user}</td>
                  <td>
                    <span className="mac-badge mac-badge-primary">{log.role}</span>
                  </td>
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
    </div>
  );
};
