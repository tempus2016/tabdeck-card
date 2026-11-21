// click_sound: a tiny "tick" made with Web Audio (no sound file). The audio
// context is only created on the first click, inside a tap, so browsers
// that block sound until the page is touched never complain.
let ctx: AudioContext | undefined;

export function playClick(volume: number): boolean {
  const w = window as any;
  const AC = w.AudioContext ?? w.webkitAudioContext;
  if (!AC || !(volume > 0)) return false;
  try {
    ctx ??= new AC() as AudioContext;
    if (ctx.state === "suspended") void ctx.resume();
    const t = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "triangle";
    osc.frequency.setValueAtTime(1800, t);
    osc.frequency.exponentialRampToValueAtTime(900, t + 0.03);
    gain.gain.setValueAtTime(0.0001, t);
    gain.gain.exponentialRampToValueAtTime(Math.min(1, volume), t + 0.003);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.05);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(t);
    osc.stop(t + 0.06);
    return true;
  } catch {
    return false;
  }
}

// `click_sound: true` (volume 0.3) or a volume from 0 to 1.
export function normalizeClickSound(raw: unknown): number | undefined {
  if (raw === true) return 0.3;
  const n = Number(raw);
  return typeof raw === "number" && Number.isFinite(n) && n > 0 ? Math.min(1, Math.round(n * 100) / 100) : undefined;
}
