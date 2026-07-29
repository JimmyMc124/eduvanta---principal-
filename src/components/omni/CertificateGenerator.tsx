import React, { useState } from 'react';
import { useOS } from '../../context/OSContext';
import { Award, CreditCard, Printer, Download, Sparkles } from 'lucide-react';

export const CertificateGenerator: React.FC = () => {
  const { schoolInfo, addToast } = useOS();
  
  const [docType, setDocType] = useState<'id' | 'honor' | 'report'>('id');
  const [studentName, setStudentName] = useState('Alexander Wright');
  const [grade, setGrade] = useState('Grade 10 - Sec A');
  const [rollNo, setRollNo] = useState('10-A-01');
  const [academicYear, setAcademicYear] = useState('2025-2026');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }} className="animate-fade-in">
      <div className="flex-between">
        <div>
          <h2 style={{ fontSize: '20px', fontWeight: 700, letterSpacing: '-0.02em' }}>
            Official Certificate & Student ID Generator
          </h2>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
            Vector rendering engine for Student Smart IDs, Principal Honors, and Transcripts
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button className="mac-btn" onClick={() => addToast('Print Job', `Sent ${docType.toUpperCase()} print job to Apple AirPrint`, 'info')}>
            <Printer size={16} /> AirPrint Card
          </button>
          <button className="mac-btn mac-btn-primary" onClick={() => addToast('Export PDF', `Vector PDF generated for ${studentName}`, 'success')}>
            <Download size={16} /> Export Vector PDF
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '20px' }}>
        {/* Controls Panel */}
        <div className="glass-panel" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <h3 style={{ fontSize: '15px', fontWeight: 600 }}>Template Configuration</h3>

          <div>
            <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>
              Document Template Type
            </label>
            <div style={{ display: 'flex', gap: '6px' }}>
              <button 
                className={`mac-btn ${docType === 'id' ? 'mac-btn-primary' : ''}`} 
                onClick={() => setDocType('id')}
                style={{ flex: 1, fontSize: '12px' }}
              >
                Smart ID Card
              </button>
              <button 
                className={`mac-btn ${docType === 'honor' ? 'mac-btn-primary' : ''}`} 
                onClick={() => setDocType('honor')}
                style={{ flex: 1, fontSize: '12px' }}
              >
                Honor Certificate
              </button>
            </div>
          </div>

          <div>
            <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
              Student Full Name
            </label>
            <input type="text" className="mac-input" value={studentName} onChange={e => setStudentName(e.target.value)} />
          </div>

          <div>
            <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
              Grade & Section
            </label>
            <input type="text" className="mac-input" value={grade} onChange={e => setGrade(e.target.value)} />
          </div>

          <div>
            <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
              Roll Number / Student ID
            </label>
            <input type="text" className="mac-input" value={rollNo} onChange={e => setRollNo(e.target.value)} />
          </div>
        </div>

        {/* Live Vector Card Visual Preview */}
        <div className="glass-panel" style={{ padding: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.3)' }}>
          {docType === 'id' ? (
            /* Student Smart ID Card Template */
            <div 
              style={{
                width: '380px',
                height: '240px',
                borderRadius: '16px',
                background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
                border: '1px solid rgba(255,255,255,0.2)',
                boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                color: '#ffffff',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              {/* Top Branding */}
              <div className="flex-between">
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '20px' }}>{schoolInfo.logo}</span>
                  <div>
                    <div style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '-0.01em' }}>{schoolInfo.name}</div>
                    <div style={{ fontSize: '9px', color: '#94a3b8' }}>OFFICIAL STUDENT IDENTIFICATION</div>
                  </div>
                </div>
                <span className="mac-badge mac-badge-primary" style={{ fontSize: '9px' }}>RFID Active</span>
              </div>

              {/* Student Details & Photo */}
              <div style={{ display: 'flex', gap: '16px', alignItems: 'center', marginTop: '10px' }}>
                <div 
                  style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '12px',
                    background: '#2563eb',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '22px',
                    fontWeight: 700,
                    boxShadow: '0 4px 12px rgba(37, 99, 235, 0.4)'
                  }}
                >
                  {studentName.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <div style={{ fontSize: '16px', fontWeight: 700 }}>{studentName}</div>
                  <div style={{ fontSize: '12px', color: '#60a5fa', fontWeight: 600 }}>{grade}</div>
                  <div style={{ fontSize: '11px', color: '#94a3b8', fontFamily: 'JetBrains Mono, monospace' }}>ID: {rollNo}</div>
                </div>
              </div>

              {/* Footer Stamp */}
              <div className="flex-between" style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '8px' }}>
                <div style={{ fontSize: '9px', color: '#64748b' }}>ISSUED: 2025/2026 • CPT CAMPUS</div>
                <div style={{ fontSize: '10px', fontStyle: 'italic', fontWeight: 600, color: '#93c5fd' }}>{schoolInfo.principal}</div>
              </div>
            </div>
          ) : (
            /* Honor Certificate Template */
            <div 
              style={{
                width: '460px',
                height: '300px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #181e2b 0%, #0d111a 100%)',
                border: '2px solid #eab308',
                boxShadow: '0 20px 40px rgba(0,0,0,0.6)',
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                textAlign: 'center',
                color: '#ffffff'
              }}
            >
              <div>
                <Award size={32} style={{ color: '#eab308', margin: '0 auto 6px auto' }} />
                <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.15em', color: '#eab308', fontWeight: 700 }}>
                  Certificate of Academic Distinction
                </div>
                <div style={{ fontSize: '18px', fontWeight: 700, marginTop: '8px' }}>{studentName}</div>
                <p style={{ fontSize: '11px', color: '#94a3b8', marginTop: '6px' }}>
                  For maintaining exceptional academic performance and achieving highest GPA honours in {grade}.
                </p>
              </div>

              <div className="flex-between" style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '10px' }}>
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontSize: '10px', color: '#94a3b8' }}>ACADEMIC YEAR</div>
                  <div style={{ fontSize: '11px', fontWeight: 600 }}>{academicYear}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '10px', color: '#94a3b8' }}>SUPERINTENDENT</div>
                  <div style={{ fontSize: '11px', fontWeight: 600, color: '#60a5fa' }}>{schoolInfo.principal}</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
