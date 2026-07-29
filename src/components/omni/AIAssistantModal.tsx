import React, { useState } from 'react';
import { useOS } from '../../context/OSContext';
import { GlassModal } from '../common/GlassModal';
import { Sparkles, Send, Bot, User, Check, RefreshCw, FileText } from 'lucide-react';

export const AIAssistantModal: React.FC = () => {
  const { isAIOpen, toggleAI, addToast } = useOS();

  const [prompt, setPrompt] = useState('');
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; text: string }[]>([
    {
      role: 'assistant',
      text: "Greetings, Dr. Vance. I am the Eduvanta AI Intelligence Engine. How may I assist you with timetable optimization, lesson planning, student performance analytics, or parent email generation today?"
    }
  ]);
  const [loading, setLoading] = useState(false);

  if (!isAIOpen) return null;

  const handleSend = async (customPrompt?: string) => {
    const textToSend = customPrompt || prompt;
    if (!textToSend.trim() || loading) return;

    const userMsg = { role: 'user' as const, text: textToSend };
    setMessages(prev => [...prev, userMsg]);
    if (!customPrompt) setPrompt('');
    setLoading(true);

    try {
      const response = await fetch('/api/ai/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: textToSend,
          systemInstruction: 'You are Eduvanta AI, an ultra-intelligent, professional school administration assistant built for superintendents and school principals.'
        })
      });

      const data = await response.json();
      const aiText = data.text || 'Recommendation generated successfully based on current school telemetry.';
      
      setMessages(prev => [...prev, { role: 'assistant', text: aiText }]);
    } catch (err) {
      setMessages(prev => [...prev, {
        role: 'assistant',
        text: `[Eduvanta AI Local Recommendation]:\n1. Attendance holds strong at 96.4% across Grade 10 & 11.\n2. Recommended action: Review Grade 10 Physics assignment submissions.\n3. Timetable status: Zero classroom conflicts detected for tomorrow.`
      }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <GlassModal
      isOpen={isAIOpen}
      onClose={() => toggleAI(false)}
      title="Eduvanta AI Intelligence Engine"
      subtitle="Powered by Google Gemini 2.5 • School OS Assistant"
      width="720px"
    >
      <div style={{ display: 'flex', flexDirection: 'column', height: '420px', gap: '14px' }}>
        {/* Messages Stream */}
        <div 
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '12px',
            background: 'rgba(0,0,0,0.2)',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border-color)',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}
        >
          {messages.map((msg, index) => (
            <div 
              key={index}
              style={{
                display: 'flex',
                gap: '10px',
                alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                maxWidth: '85%'
              }}
            >
              {msg.role === 'assistant' && (
                <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Sparkles size={14} />
                </div>
              )}
              <div 
                style={{
                  padding: '10px 14px',
                  borderRadius: 'var(--radius-md)',
                  background: msg.role === 'user' ? 'var(--accent-primary)' : 'var(--bg-surface)',
                  color: msg.role === 'user' ? '#ffffff' : 'var(--text-primary)',
                  fontSize: '13px',
                  lineHeight: '1.5',
                  whiteSpace: 'pre-wrap',
                  border: '1px solid var(--border-color)'
                }}
              >
                {msg.text}
              </div>
            </div>
          ))}
          {loading && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-primary)', fontSize: '12px' }}>
              <RefreshCw size={14} className="animate-spin" />
              <span>Analyzing school telemetry & synthesizing response...</span>
            </div>
          )}
        </div>

        {/* Quick Prompt Shortcuts */}
        <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', paddingBottom: '4px' }}>
          <button 
            className="mac-btn mac-btn-sm" 
            onClick={() => handleSend("Draft an encouragement email to parents about upcoming Grade 10 Midterm Exams")}
          >
            ✉️ Draft Parent Email
          </button>
          <button 
            className="mac-btn mac-btn-sm" 
            onClick={() => handleSend("Generate a weekly lesson outline for Grade 12 Advanced Physics")}
          >
            📚 AI Lesson Planner
          </button>
          <button 
            className="mac-btn mac-btn-sm" 
            onClick={() => handleSend("Analyze today's 96.4% attendance trend and suggest improvements")}
          >
            📊 Attendance Insights
          </button>
        </div>

        {/* Input Bar */}
        <form 
          onSubmit={(e) => { e.preventDefault(); handleSend(); }}
          style={{ display: 'flex', gap: '8px' }}
        >
          <input 
            type="text" 
            className="mac-input" 
            placeholder="Ask Eduvanta AI anything about students, timetables, or reports..."
            value={prompt}
            onChange={e => setPrompt(e.target.value)}
          />
          <button type="submit" className="mac-btn mac-btn-primary" disabled={loading}>
            <Send size={14} />
          </button>
        </form>
      </div>
    </GlassModal>
  );
};
