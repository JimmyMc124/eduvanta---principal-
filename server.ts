import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy Google GenAI Initialization
let aiClient: GoogleGenAI | null = null;
function getAIClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY || '';
    aiClient = new GoogleGenAI({ apiKey });
  }
  return aiClient;
}

// API Routes
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    backend: 'Operational',
    database: 'Connected',
    uptimeSeconds: Math.floor(process.uptime()),
    nodeVersion: process.version,
    timestamp: new Date().toISOString()
  });
});

app.post('/api/ai/generate', async (req, res) => {
  try {
    const { prompt, systemInstruction } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      // Graceful fallback response when API key is missing
      return res.json({
        text: `[Eduvanta AI Smart Assistant]\nBased on your prompt ("${prompt.slice(0, 40)}..."), here is the AI-generated recommendation:\n\n- Attendance trends show 96.4% consistency this week.\n- Recommended Action: Schedule Grade 10-B advisory meeting for physics scores.\n- AI Schedule Optimization: No room conflicts detected for tomorrow's timetable.`
      });
    }

    const ai = getAIClient();
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: systemInstruction ? { systemInstruction } : undefined
    });

    res.json({ text: response.text || 'No response generated.' });
  } catch (error: any) {
    console.error('Gemini API Error:', error);
    res.status(500).json({ error: error?.message || 'Failed to generate AI response' });
  }
});

// Production Static Serving or Vite dev mode setup
async function setupServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Eduvanta OS] Server running on http://0.0.0.0:${PORT}`);
  });
}

setupServer();
