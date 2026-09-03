// Ear Monkeys audio: every sound is synthesized with the Web Audio API,
// so the game needs no audio asset files.

export const NOTES = [
  { letter: "A", freq: 220.0, color: "#f25f5c", name: "Apple" },
  { letter: "B", freq: 246.94, color: "#ff9f1c", name: "Banana" },
  { letter: "C", freq: 261.63, color: "#ffd23f", name: "Coco" },
  { letter: "D", freq: 293.66, color: "#6bcb77", name: "Dandy" },
  { letter: "E", freq: 329.63, color: "#4d96ff", name: "Echo" },
  { letter: "F", freq: 349.23, color: "#9b5de5", name: "Fig" },
  { letter: "G", freq: 392.0, color: "#ff70a6", name: "Giggles" },
];

let ctx = null;
let noiseBuffer = null;

export function getAudioContext() {
  if (!ctx) {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
  }
  if (ctx.state === "suspended" && typeof ctx.resume === "function") {
    ctx.resume();
  }
  return ctx;
}

export function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function getNoise(c) {
  if (!noiseBuffer) {
    const length = c.sampleRate;
    noiseBuffer = c.createBuffer(1, length, c.sampleRate);
    const data = noiseBuffer.getChannelData(0);
    for (let i = 0; i < length; i++) data[i] = Math.random() * 2 - 1;
  }
  const src = c.createBufferSource();
  src.buffer = noiseBuffer;
  return src;
}

function master(c, level) {
  const g = c.createGain();
  g.gain.value = level;
  g.connect(c.destination);
  return g;
}

// The "true" note: a soft, bell-like piano tone built from decaying partials.
export function playNote(freq, duration = 1.4) {
  const c = getAudioContext();
  if (!c) return wait(duration * 1000);
  const t = c.currentTime;
  const out = master(c, 0.45);
  const partials = [
    [1, 1.0],
    [2, 0.45],
    [3, 0.22],
    [4, 0.12],
    [5, 0.06],
    [6, 0.03],
  ];
  partials.forEach(([harmonic, amp]) => {
    const osc = c.createOscillator();
    osc.type = "sine";
    osc.frequency.value = freq * harmonic;
    const g = c.createGain();
    const decay = duration * (1 - harmonic * 0.09);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.linearRampToValueAtTime(amp, t + 0.012);
    g.gain.exponentialRampToValueAtTime(amp * 0.35, t + 0.25);
    g.gain.exponentialRampToValueAtTime(0.0001, t + decay);
    osc.connect(g);
    g.connect(out);
    osc.start(t);
    osc.stop(t + duration + 0.1);
  });
  return wait(duration * 1000 + 100);
}

// One "hoo" at a given pitch: a breathy attack, a little pitch scoop and vibrato.
function scheduleHoo(c, out, t, freq, len) {
  const voice = c.createGain();
  voice.gain.setValueAtTime(0.0001, t);
  voice.gain.linearRampToValueAtTime(1, t + 0.05);
  voice.gain.setValueAtTime(1, t + len - 0.12);
  voice.gain.exponentialRampToValueAtTime(0.0001, t + len);
  voice.connect(out);

  const body = c.createOscillator();
  body.type = "sine";
  const buzz = c.createOscillator();
  buzz.type = "sawtooth";
  [body, buzz].forEach((o) => {
    o.frequency.setValueAtTime(freq * 1.1, t);
    o.frequency.exponentialRampToValueAtTime(freq, t + 0.08);
  });

  const lfo = c.createOscillator();
  lfo.frequency.value = 5.5;
  const lfoGain = c.createGain();
  lfoGain.gain.setValueAtTime(0, t);
  lfoGain.gain.linearRampToValueAtTime(freq * 0.012, t + 0.2);
  lfo.connect(lfoGain);
  lfoGain.connect(body.frequency);
  lfoGain.connect(buzz.frequency);

  // "oo" vowel colour: keep only the lowest overtones of the buzz.
  const lowpass = c.createBiquadFilter();
  lowpass.type = "lowpass";
  lowpass.frequency.value = freq * 2.4;
  lowpass.Q.value = 4;

  const bodyGain = c.createGain();
  bodyGain.gain.value = 0.55;
  const buzzGain = c.createGain();
  buzzGain.gain.value = 0.28;

  body.connect(bodyGain);
  bodyGain.connect(voice);
  buzz.connect(lowpass);
  lowpass.connect(buzzGain);
  buzzGain.connect(voice);

  // The "h": a short puff of filtered noise.
  const breath = getNoise(c);
  const breathFilter = c.createBiquadFilter();
  breathFilter.type = "bandpass";
  breathFilter.frequency.value = 1200;
  breathFilter.Q.value = 0.8;
  const breathGain = c.createGain();
  breathGain.gain.setValueAtTime(0.12, t);
  breathGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.09);
  breath.connect(breathFilter);
  breathFilter.connect(breathGain);
  breathGain.connect(out);

  [body, buzz, lfo, breath].forEach((n) => {
    n.start(t);
    n.stop(t + len + 0.05);
  });
}

// "Hoo-hoo!" sung at the note's pitch.
export function playHoo(freq) {
  const c = getAudioContext();
  const total = 0.32 + 0.09 + 0.55;
  if (!c) return wait(total * 1000);
  const t = c.currentTime;
  const out = master(c, 0.5);
  scheduleHoo(c, out, t, freq, 0.32);
  scheduleHoo(c, out, t + 0.32 + 0.09, freq, 0.55);
  return wait(total * 1000 + 80);
}

// Celebration: a quick sparkly rising arpeggio.
export function playYay() {
  const c = getAudioContext();
  if (!c) return wait(900);
  const t = c.currentTime;
  const out = master(c, 0.35);
  const steps = [523.25, 659.25, 783.99, 1046.5];
  steps.forEach((f, i) => {
    const start = t + i * 0.09;
    const len = i === steps.length - 1 ? 0.7 : 0.3;
    const osc = c.createOscillator();
    osc.type = "triangle";
    osc.frequency.value = f;
    const g = c.createGain();
    g.gain.setValueAtTime(0.0001, start);
    g.gain.linearRampToValueAtTime(1, start + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, start + len);
    osc.connect(g);
    g.connect(out);
    osc.start(start);
    osc.stop(start + len + 0.05);
  });
  // Sparkles on top.
  for (let i = 0; i < 6; i++) {
    const start = t + 0.3 + i * 0.07;
    const osc = c.createOscillator();
    osc.type = "sine";
    osc.frequency.value = 2093 * (1 + (i % 3) * 0.12);
    const g = c.createGain();
    g.gain.setValueAtTime(0.0001, start);
    g.gain.linearRampToValueAtTime(0.25, start + 0.01);
    g.gain.exponentialRampToValueAtTime(0.0001, start + 0.12);
    osc.connect(g);
    g.connect(out);
    osc.start(start);
    osc.stop(start + 0.15);
  }
  return wait(900);
}

// "Awww...": a droopy, sliding-down wah-wah.
export function playAww() {
  const c = getAudioContext();
  if (!c) return wait(1100);
  const t = c.currentTime;
  const out = master(c, 0.3);
  const glides = [
    [330, 300, 0, 0.38],
    [290, 250, 0.42, 0.38],
    [240, 150, 0.84, 0.55],
  ];
  glides.forEach(([from, to, offset, len]) => {
    const start = t + offset;
    const osc = c.createOscillator();
    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(from, start);
    osc.frequency.exponentialRampToValueAtTime(to, start + len);
    const lp = c.createBiquadFilter();
    lp.type = "lowpass";
    lp.frequency.setValueAtTime(1400, start);
    lp.frequency.exponentialRampToValueAtTime(500, start + len);
    lp.Q.value = 6;
    const g = c.createGain();
    g.gain.setValueAtTime(0.0001, start);
    g.gain.linearRampToValueAtTime(1, start + 0.04);
    g.gain.setValueAtTime(1, start + len - 0.1);
    g.gain.exponentialRampToValueAtTime(0.0001, start + len);
    osc.connect(lp);
    lp.connect(g);
    g.connect(out);
    osc.start(start);
    osc.stop(start + len + 0.05);
  });
  return wait(1450);
}

// Spoken text via the browser's speech synthesis. Resolves when done, or
// right away when the browser has no speech support.
export function speak(text) {
  return new Promise((resolve) => {
    const synth = window.speechSynthesis;
    if (!synth || !window.SpeechSynthesisUtterance) {
      resolve();
      return;
    }
    let done = false;
    let timer = null;
    const finish = () => {
      if (done) return;
      done = true;
      clearTimeout(timer);
      resolve();
    };
    try {
      const utterance = new window.SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1.15;
      utterance.onend = finish;
      utterance.onerror = finish;
      timer = setTimeout(finish, 4000);
      synth.speak(utterance);
    } catch (e) {
      finish();
    }
  });
}

export function stopSpeaking() {
  const synth = window.speechSynthesis;
  if (synth && typeof synth.cancel === "function") synth.cancel();
}
