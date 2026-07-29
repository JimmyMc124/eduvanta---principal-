// Web Audio API Apple-style Soft UI Sound Synthesizer
let audioCtx: AudioContext | null = null;

const getAudioContext = (): AudioContext | null => {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
};

export type SoundEffectType = 
  | 'loginSuccess'
  | 'loginFailure'
  | 'notification'
  | 'studentCreated'
  | 'teacherCreated'
  | 'accountDeleted'
  | 'saveCompleted'
  | 'errorAlert'
  | 'backupCompleted'
  | 'logout'
  | 'click';

export const playSoundEffect = (type: SoundEffectType, enabled = true) => {
  if (!enabled) return;
  // User directive: remove general UI/song effects and ONLY play a sound effect for messages/notifications
  if (type !== 'notification') return;

  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;

    // Gentle, clean Apple-style message tone (C6 -> G6 dual chime)
    [1046.50, 1567.98].forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.08);
      gain.gain.setValueAtTime(0.12, now + idx * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.35);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + idx * 0.08);
      osc.stop(now + idx * 0.08 + 0.35);
    });
  } catch (e) {
    console.warn('Audio play error:', e);
  }
};
