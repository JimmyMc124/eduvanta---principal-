import React, { useState, useEffect } from 'react';
import { useOS } from '../../context/OSContext';
import { StatCard } from './StatCard';
import { 
  BookOpen, 
  GraduationCap, 
  Clock, 
  CheckCircle2, 
  Award, 
  Sparkles, 
  Play, 
  Pause, 
  RotateCcw, 
  FileText, 
  Book, 
  Upload, 
  Bot, 
  Flame, 
  Send, 
  Calendar, 
  Layers, 
  Check, 
  ChevronRight,
  HelpCircle
} from 'lucide-react';

export const StudentDashboard: React.FC = () => {
  const { addToast, playSound, books } = useOS();

  // Pomodoro Timer State
  const [timerSeconds, setTimerSeconds] = useState<number>(25 * 60);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);

  // Flashcards state
  const flashcards = [
    { id: 1, topic: 'Calculus', question: 'What is the Derivative of e^(2x)?', answer: '2 * e^(2x)' },
    { id: 2, topic: 'Physics', question: "What is Newton's Second Law of Motion?", answer: 'F = m * a (Force = Mass x Acceleration)' },
    { id: 3, topic: 'Computer Science', question: 'What is the Time Complexity of Binary Search?', answer: 'O(log n)' }
  ];
  const [currentCardIdx, setCurrentCardIdx] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);

  // AI Tutor Query State
  const [tutorQuery, setTutorQuery] = useState<string>('');
  const [tutorResponse, setTutorResponse] = useState<string | null>(null);
  const [isQueryingTutor, setIsQueryingTutor] = useState<boolean>(false);

  // Assignments State
  const [assignments, setAssignments] = useState([
    { id: 'asgn-1', title: 'AP Calculus Problem Set 5', subject: 'Mathematics', dueDate: 'Tomorrow, 11:59 PM', status: 'Pending', points: '100 pts' },
    { id: 'asgn-2', title: 'Wave Optics Physics Lab Report', subject: 'Physics', dueDate: 'Aug 2, 2026', status: 'Pending', points: '50 pts' },
    { id: 'asgn-3', title: 'World History Essay - Renaissance', subject: 'History', dueDate: 'Submitted', status: 'Graded', grade: '96/100' }
  ]);

  // Pomodoro Timer Effect
  useEffect(() => {
    let interval: any = null;
    if (isTimerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds(prev => prev - 1);
      }, 1000);
    } else if (timerSeconds === 0 && isTimerRunning) {
      setIsTimerRunning(false);
      playSound('notification');
      addToast('Focus Session Complete!', '25 minutes of deep study completed. Take a 5-min break!', 'success');
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timerSeconds]);

  const toggleTimer = () => {
    playSound('click');
    setIsTimerRunning(prev => !prev);
  };

  const resetTimer = () => {
    playSound('click');
    setIsTimerRunning(false);
    setTimerSeconds(25 * 60);
  };

  const formatTime = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleNextFlashcard = () => {
    playSound('click');
    setIsFlipped(false);
    setCurrentCardIdx(prev => (prev + 1) % flashcards.length);
  };

  const handleTutorSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tutorQuery.trim()) return;
    setIsQueryingTutor(true);
    playSound('click');
    setTimeout(() => {
      setIsQueryingTutor(false);
      setTutorResponse(
        `🤖 **Eduvanta AI Tutor Solution**:\n\n` +
        `To solve "${tutorQuery}", break it down into standard steps:\n` +
        `1. Identify the given variables and target theorem.\n` +
        `2. Apply the chain rule or conservation law.\n` +
        `3. Simplify boundary conditions. Keep up the great work!`
      );
      addToast('AI Tutor Answered', 'Check step-by-step breakdown below.', 'info');
    }, 1000);
  };

  const handleSimulateSubmitAssignment = (id: string) => {
    playSound('save');
    setAssignments(prev => prev.map(a => a.id === id ? { ...a, status: 'Submitted', dueDate: 'Submitted Today' } : a));
    addToast('Assignment Submitted', 'PDF uploaded securely to Eduvanta Portal.', 'success');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Student Welcome Header */}
      <div 
        className="glass-panel" 
        style={{ 
          padding: '24px', 
          background: 'linear-gradient(135deg, rgba(16,185,129,0.2) 0%, rgba(15,23,42,0.65) 100%)',
          border: '1px solid rgba(16,185,129,0.3)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px'
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <span style={{ fontSize: '11px', fontWeight: 700, padding: '3px 10px', borderRadius: '12px', background: '#10b981', color: '#fff', letterSpacing: '0.05em' }}>
              STUDENT LEARNING HUB
            </span>
            <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
              St. Augustine Academy • Grade 12-A
            </span>
          </div>
          <h1 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em', margin: 0 }}>
            Welcome Back, Alex Rivera
          </h1>
          <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#f59e0b', fontWeight: 700 }}>
              <Flame size={15} /> 14-Day Study Streak
            </span>
            <span>•</span>
            <span>Cumulative GPA: <strong style={{ color: '#10b981' }}>3.92 / 4.0</strong></span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'rgba(0,0,0,0.3)', padding: '12px 18px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.08)' }}>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 600 }}>NEXT EXAM</div>
            <div style={{ fontSize: '13px', fontWeight: 700, color: '#f87171' }}>AP Calculus Midterm</div>
          </div>
          <div style={{ fontSize: '20px', fontWeight: 800, color: '#f87171', paddingLeft: '10px', borderLeft: '1px solid rgba(255,255,255,0.1)' }}>
            4 Days
          </div>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <StatCard 
          title="Current GPA" 
          value="3.92" 
          change="Top 5% Rank" 
          changeType="positive" 
          icon={<GraduationCap size={18} />} 
          subtitle="Grade 12-A Honor Roll"
        />
        <StatCard 
          title="Attendance Rate" 
          value="98.4%" 
          change="118 / 120 Days" 
          changeType="positive" 
          icon={<CheckCircle2 size={18} />} 
          subtitle="2 Excused Absences"
        />
        <StatCard 
          title="Pending Homework" 
          value="2" 
          change="Due Tomorrow" 
          changeType="neutral" 
          icon={<Clock size={18} />} 
          subtitle="Calculus & Physics"
        />
        <StatCard 
          title="Library Books" 
          value="2" 
          change="1 Due Soon" 
          changeType="neutral" 
          icon={<BookOpen size={18} />} 
          subtitle="Quantum Physics Vol 1"
        />
      </div>

      {/* Main Student Workspace Split */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '20px' }}>
        {/* Left Column: Schedule, Assignments & Flashcards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Today's Timetable */}
          <div className="glass-panel" style={{ padding: '20px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 700, margin: 0, color: 'var(--text-primary)', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Calendar size={18} style={{ color: '#3b82f6' }} /> Today's Class Schedule
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px' }}>
              <div style={{ padding: '12px', borderRadius: '8px', background: 'rgba(59,130,246,0.15)', border: '1px solid rgba(59,130,246,0.3)' }}>
                <div style={{ fontSize: '10px', color: '#60a5fa', fontWeight: 700 }}>09:00 - 10:15 AM • ROOM 304</div>
                <div style={{ fontWeight: 700, fontSize: '14px', color: 'var(--text-primary)', marginTop: '2px' }}>AP Calculus BC</div>
                <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Prof. Sarah Jenkins</div>
              </div>

              <div style={{ padding: '12px', borderRadius: '8px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <div style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 700 }}>10:30 - 11:45 AM • LAB 2</div>
                <div style={{ fontWeight: 700, fontSize: '14px', color: 'var(--text-primary)', marginTop: '2px' }}>Physics Honors</div>
                <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Dr. Robert Chen</div>
              </div>

              <div style={{ padding: '12px', borderRadius: '8px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <div style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 700 }}>01:15 - 02:30 PM • ROOM 108</div>
                <div style={{ fontWeight: 700, fontSize: '14px', color: 'var(--text-primary)', marginTop: '2px' }}>Computer Science A</div>
                <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Ms. Alanis Vance</div>
              </div>
            </div>
          </div>

          {/* Assignments Portal */}
          <div className="glass-panel" style={{ padding: '20px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 700, margin: 0, color: 'var(--text-primary)', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FileText size={18} style={{ color: '#10b981' }} /> Active Assignments & Homework
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {assignments.map((asgn) => (
                <div key={asgn.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', borderRadius: '8px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', flexWrap: 'wrap', gap: '10px' }}>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '13px', color: 'var(--text-primary)' }}>{asgn.title}</div>
                    <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                      {asgn.subject} • Due: <strong style={{ color: asgn.status === 'Pending' ? '#f59e0b' : '#10b981' }}>{asgn.dueDate}</strong>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)' }}>{asgn.points}</span>
                    {asgn.status === 'Pending' ? (
                      <button className="mac-btn mac-btn-primary mac-btn-sm" onClick={() => handleSimulateSubmitAssignment(asgn.id)}>
                        <Upload size={12} /> Submit PDF
                      </button>
                    ) : (
                      <span style={{ fontSize: '11px', fontWeight: 700, color: '#10b981', background: 'rgba(16,185,129,0.15)', padding: '3px 10px', borderRadius: '12px' }}>
                        {asgn.grade || 'Submitted'}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Flashcard Deck Player */}
          <div className="glass-panel" style={{ padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 700, margin: 0, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Layers size={18} style={{ color: '#8b5cf6' }} /> AP Exam Revision Flashcards
              </h3>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                Card {currentCardIdx + 1} of {flashcards.length}
              </span>
            </div>

            <div 
              onClick={() => setIsFlipped(!isFlipped)}
              style={{ 
                minHeight: '140px', 
                borderRadius: '12px', 
                background: isFlipped ? 'linear-gradient(135deg, rgba(139,92,246,0.2) 0%, rgba(15,23,42,0.8) 100%)' : 'rgba(255,255,255,0.04)', 
                border: isFlipped ? '1px solid rgba(139,92,246,0.4)' : '1px solid rgba(255,255,255,0.08)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '20px',
                cursor: 'pointer',
                textAlign: 'center',
                transition: 'all 0.3s ease'
              }}
            >
              <div style={{ fontSize: '10px', color: '#a855f7', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>
                {flashcards[currentCardIdx].topic} • {isFlipped ? 'ANSWER' : 'QUESTION (Click to flip)'}
              </div>
              <div style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)', maxWidth: '420px' }}>
                {isFlipped ? flashcards[currentCardIdx].answer : flashcards[currentCardIdx].question}
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '12px' }}>
              <button className="mac-btn mac-btn-sm" onClick={handleNextFlashcard} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                Next Card <ChevronRight size={14} />
              </button>
            </div>
          </div>

        </div>

        {/* Right Column: Pomodoro Clock & AI Tutor */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Pomodoro Focus Clock */}
          <div className="glass-panel" style={{ padding: '20px', textAlign: 'center' }}>
            <h3 style={{ fontSize: '15px', fontWeight: 700, margin: 0, color: 'var(--text-primary)', marginBottom: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              <Clock size={16} style={{ color: '#3b82f6' }} /> Focus Study Timer
            </h3>

            <div style={{ fontSize: '36px', fontWeight: 800, fontFamily: 'monospace', color: isTimerRunning ? '#10b981' : 'var(--text-primary)', margin: '14px 0', letterSpacing: '0.05em' }}>
              {formatTime(timerSeconds)}
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
              <button className={`mac-btn ${isTimerRunning ? '' : 'mac-btn-primary'}`} onClick={toggleTimer} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                {isTimerRunning ? <Pause size={14} /> : <Play size={14} />} {isTimerRunning ? 'Pause' : 'Start Focus'}
              </button>
              <button className="mac-btn" onClick={resetTimer}>
                <RotateCcw size={14} />
              </button>
            </div>
          </div>

          {/* AI Student Tutor */}
          <div className="glass-panel" style={{ padding: '20px' }}>
            <h3 style={{ fontSize: '15px', fontWeight: 700, margin: 0, color: 'var(--text-primary)', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Bot size={16} style={{ color: '#a855f7' }} /> AI Homework Assistant
            </h3>

            <form onSubmit={handleTutorSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '12px' }}>
              <textarea 
                className="mac-input" 
                placeholder="Ask any homework question or topic to explain..." 
                value={tutorQuery} 
                onChange={(e) => setTutorQuery(e.target.value)}
                rows={2}
                style={{ fontSize: '12px', resize: 'none' }}
              />
              <button type="submit" className="mac-btn mac-btn-primary mac-btn-sm" disabled={isQueryingTutor} style={{ alignSelf: 'flex-end', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Send size={12} /> Ask Tutor
              </button>
            </form>

            {tutorResponse && (
              <div style={{ padding: '12px', borderRadius: '8px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(168,85,247,0.3)', fontSize: '11px', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                {tutorResponse.split('\n').map((line, idx) => (
                  <p key={idx} style={{ margin: '3px 0' }}>{line}</p>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};
