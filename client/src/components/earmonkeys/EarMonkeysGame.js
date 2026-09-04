import React, { useCallback, useEffect, useRef, useState } from "react";
import Monkey from "./Monkey";
import {
  NOTES,
  getAudioContext,
  playNote,
  playNoteShort,
  playHoo,
  playYay,
  playAww,
  speak,
  stopSpeaking,
  stopAllSounds,
  wait,
} from "./audio";
import "./EarMonkeys.css";

// Scene geometry (SVG user units). Monkeys climb from bottom-left to top-right,
// one branch per note, like notes stepping up a staff.
const SCENE_W = 800;
const SCENE_H = 500;
const TRUNK_X = 110;
const FIRST_X = 190;
const STEP_X = 90;
const FIRST_Y = 450;
const STEP_Y = 58;

const IDLE_MESSAGE = "Tap a monkey to hear it sing, or press Start to play!";
const ALL_MONKEYS = NOTES.map((_, i) => i);

// Difficulty: how many monkeys are on the tree. Easier levels hide a random
// set of monkeys, so there are fewer voices to tell apart.
const LEVELS = [3, 4, 5, 6, 7];
const DEFAULT_LEVEL = 7;
const LEVEL_STORAGE_KEY = "earMonkeysLevel";

function loadLevel() {
  try {
    const saved = parseInt(window.localStorage.getItem(LEVEL_STORAGE_KEY), 10);
    if (LEVELS.indexOf(saved) !== -1) return saved;
  } catch (e) {
    // Storage may be unavailable (private mode, etc.); fall through.
  }
  return DEFAULT_LEVEL;
}

function saveLevel(level) {
  try {
    window.localStorage.setItem(LEVEL_STORAGE_KEY, String(level));
  } catch (e) {
    // Ignore: the level just won't be remembered next visit.
  }
}

// A random set of `count` monkey indexes, in branch order.
function pickActive(count) {
  const pool = NOTES.map((_, i) => i);
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const tmp = pool[i];
    pool[i] = pool[j];
    pool[j] = tmp;
  }
  return pool.slice(0, Math.min(count, pool.length)).sort((a, b) => a - b);
}

function branchY(i) {
  return FIRST_Y - i * STEP_Y;
}

function monkeyX(i) {
  return FIRST_X + i * STEP_X;
}

const CONFETTI_COLORS = NOTES.map((n) => n.color);

function makeConfetti(seed) {
  const pieces = [];
  for (let i = 0; i < 26; i++) {
    pieces.push({
      id: `${seed}-${i}`,
      left: Math.random() * 100,
      delay: Math.random() * 0.5,
      duration: 1.4 + Math.random() * 0.9,
      color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
      rotate: Math.random() * 360,
      size: 7 + Math.random() * 7,
    });
  }
  return pieces;
}

function EarMonkeysGame() {
  const [phase, setPhase] = useState("idle"); // idle | intro | playing | guess | feedback
  const [target, setTarget] = useState(null);
  const [right, setRight] = useState(0);
  const [wrong, setWrong] = useState(0);
  const [message, setMessage] = useState(IDLE_MESSAGE);
  const [result, setResult] = useState(null); // right | wrong | null
  const [singing, setSinging] = useState(null);
  const [bouncing, setBouncing] = useState(null);
  const [wobbling, setWobbling] = useState(null);
  const [confetti, setConfetti] = useState([]);
  const [level, setLevel] = useState(loadLevel);
  const [active, setActive] = useState(() => pickActive(loadLevel()));

  // Bumped on every reset/new round so stale async flows stop touching state.
  const runRef = useRef(0);
  const targetRef = useRef(null);
  const phaseRef = useRef("idle");
  const busyRef = useRef(false);
  const mountedRef = useRef(true);
  const levelRef = useRef(level);
  const activeRef = useRef(active);
  // The A-to-G intro plays once per visit (and again after Reset).
  const introPlayedRef = useRef(false);
  const introThenStartRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      runRef.current += 1;
      stopSpeaking();
    };
  }, []);

  const setPhaseSafe = useCallback((p) => {
    phaseRef.current = p;
    setPhase(p);
  }, []);

  const alive = (run) => mountedRef.current && runRef.current === run;

  const applyActive = (indexes) => {
    activeRef.current = indexes;
    setActive(indexes);
  };

  // Pick the next note from the monkeys on the tree, avoiding a repeat.
  const pickTarget = (indexes) => {
    const choices =
      indexes.length > 1 ? indexes.filter((i) => i !== targetRef.current) : indexes;
    return choices[Math.floor(Math.random() * choices.length)];
  };

  const startRound = async () => {
    const run = ++runRef.current;
    const indexes = pickActive(levelRef.current);
    applyActive(indexes);
    const next = pickTarget(indexes);
    targetRef.current = next;
    setTarget(next);
    setResult(null);
    setSinging(null);
    setBouncing(null);
    setWobbling(null);
    setPhaseSafe("playing");
    setMessage("Listen...");
    await playNote(NOTES[next].freq);
    if (!alive(run)) return;
    setPhaseSafe("guess");
    setMessage("Which monkey sings that note?");
  };

  // Intro: every monkey from A to G, each with its note and then its voice.
  const runIntro = async (thenStart) => {
    const run = ++runRef.current;
    introThenStartRef.current = thenStart;
    busyRef.current = false;
    stopAllSounds();
    setResult(null);
    setWobbling(null);
    setConfetti([]);
    applyActive(ALL_MONKEYS);
    setPhaseSafe("intro");
    setMessage("Meet the monkeys! Here is every note from A to G.");
    await wait(900);
    if (!alive(run)) return;
    for (let i = 0; i < NOTES.length; i++) {
      const note = NOTES[i];
      setMessage(`${note.letter}`);
      setBouncing(i);
      await playNoteShort(note.freq);
      if (!alive(run)) return;
      setSinging(i);
      await playHoo(note.freq);
      if (!alive(run)) return;
      setSinging(null);
      setBouncing(null);
      await wait(250);
      if (!alive(run)) return;
    }
    finishIntro(thenStart);
  };

  const finishIntro = (thenStart) => {
    introPlayedRef.current = true;
    setSinging(null);
    setBouncing(null);
    if (thenStart) {
      startRound();
    } else {
      runRef.current += 1;
      applyActive(pickActive(levelRef.current));
      setPhaseSafe("idle");
      setMessage(IDLE_MESSAGE);
    }
  };

  const handleSkipIntro = async () => {
    if (phaseRef.current !== "intro") return;
    // Cancel the intro flow and silence whatever note or hoo is mid-air,
    // so the first round's reference note plays on its own.
    runRef.current += 1;
    stopAllSounds();
    setSinging(null);
    setBouncing(null);
    setPhaseSafe("playing");
    await wait(120);
    if (!mountedRef.current) return;
    finishIntro(introThenStartRef.current);
  };

  const handleStart = () => {
    getAudioContext();
    if (!introPlayedRef.current) {
      runIntro(true);
    } else {
      startRound();
    }
  };

  const handleHearAll = () => {
    if (phaseRef.current !== "idle" || busyRef.current) return;
    getAudioContext();
    runIntro(false);
  };

  const handleReplay = async () => {
    if (phaseRef.current !== "guess" || busyRef.current) return;
    busyRef.current = true;
    const run = runRef.current;
    setMessage("Listen...");
    await playNote(NOTES[targetRef.current].freq);
    busyRef.current = false;
    if (!alive(run)) return;
    setMessage("Which monkey sings that note?");
  };

  const handleReset = () => {
    runRef.current += 1;
    busyRef.current = false;
    stopAllSounds();
    targetRef.current = null;
    setTarget(null);
    setRight(0);
    setWrong(0);
    setResult(null);
    setSinging(null);
    setBouncing(null);
    setWobbling(null);
    setConfetti([]);
    introPlayedRef.current = false;
    applyActive(pickActive(levelRef.current));
    setPhaseSafe("idle");
    setMessage(IDLE_MESSAGE);
  };

  const handleLevelChange = (next) => {
    if (next === levelRef.current) return;
    levelRef.current = next;
    setLevel(next);
    saveLevel(next);
    if (phaseRef.current === "idle") {
      applyActive(pickActive(next));
      return;
    }
    // During the intro all monkeys stay out; the new size applies afterwards.
    if (phaseRef.current === "intro") return;
    // Mid-game: drop the current round and start a fresh one at the new size.
    runRef.current += 1;
    busyRef.current = false;
    stopAllSounds();
    setResult(null);
    setSinging(null);
    setWobbling(null);
    setConfetti([]);
    startRound();
  };

  const practiceHoo = async (i) => {
    if (busyRef.current) return;
    busyRef.current = true;
    const run = runRef.current;
    getAudioContext();
    setSinging(i);
    await playHoo(NOTES[i].freq);
    busyRef.current = false;
    if (!alive(run)) return;
    setSinging(null);
  };

  const handleMonkeyClick = async (i) => {
    if (activeRef.current.indexOf(i) === -1) return;
    if (phaseRef.current === "idle") {
      practiceHoo(i);
      return;
    }
    if (phaseRef.current !== "guess" || busyRef.current) return;

    const run = runRef.current;
    const answer = targetRef.current;
    const note = NOTES[answer];
    const picked = NOTES[i];
    setPhaseSafe("feedback");

    // The monkey you tapped always sings first, so you hear what you chose.
    setMessage(`${picked.name} says hoo-hoo!`);
    setSinging(i);
    await playHoo(picked.freq);
    if (!alive(run)) return;
    setSinging(null);
    await wait(150);
    if (!alive(run)) return;

    if (i === answer) {
      setRight((r) => r + 1);
      setResult("right");
      setMessage(`Yay! It was ${note.letter}!`);
      setConfetti(makeConfetti(Date.now()));
      setBouncing(i);
      speak("Yay!");
      await playYay();
      if (!alive(run)) return;
      setBouncing(null);
      await wait(500);
      if (!alive(run)) return;
      startRound();
    } else {
      setWrong((w) => w + 1);
      setResult("wrong");
      setMessage("Awww...");
      setWobbling(i);
      await playAww();
      if (!alive(run)) return;
      setWobbling(null);
      setMessage(`It was ${note.letter}...`);
      await speak(`Awww. It was ${note.letter}.`);
      if (!alive(run)) return;
      setSinging(answer);
      await playHoo(note.freq);
      if (!alive(run)) return;
      setSinging(null);
      await wait(800);
      if (!alive(run)) return;
      startRound();
    }
  };

  const canClickMonkeys = phase === "idle" || phase === "guess";
  const showLetterBadge = phase === "intro";
  const mood = result || phase;

  return (
    <div className="em">
      <header className="em-header">
        <h1 className="em-title">
          <span role="img" aria-label="monkey">
            🐵
          </span>{" "}
          Ear Monkeys
        </h1>
        <p className="em-subtitle">
          Listen to the note, then tap the monkey that sings it!
        </p>
      </header>

      <div className="em-scoreboard">
        <div className="em-score em-score--right">
          <span className="em-score__label">
            <span role="img" aria-label="right">
              ✅
            </span>{" "}
            Right
          </span>
          <span className="em-score__value">{right}</span>
        </div>
        <div className="em-score em-score--wrong">
          <span className="em-score__label">
            <span role="img" aria-label="wrong">
              ❌
            </span>{" "}
            Wrong
          </span>
          <span className="em-score__value">{wrong}</span>
        </div>
        <button
          type="button"
          className="em-btn em-btn--reset"
          onClick={handleReset}
        >
          ↺ Reset
        </button>
      </div>

      <div className="em-levels" role="group" aria-label="How many monkeys">
        <span className="em-levels__label">Monkeys on the tree:</span>
        <div className="em-levels__buttons">
          {LEVELS.map((n) => (
            <button
              key={n}
              type="button"
              className={`em-level ${level === n ? "em-level--on" : ""}`}
              aria-pressed={level === n}
              onClick={() => handleLevelChange(n)}
            >
              {n}
            </button>
          ))}
        </div>
        <span className="em-levels__note">
          {level === NOTES.length ? "all seven, hardest" : "fewer is easier"}
        </span>
      </div>

      <div
        className={`em-message em-message--${mood} ${showLetterBadge && message.length === 1 ? "em-message--letter" : ""}`}
        aria-live="polite"
      >
        {message}
      </div>

      <div className={`em-scene ${canClickMonkeys ? "" : "em-scene--locked"}`}>
        <svg
          className="em-svg"
          viewBox={`0 0 ${SCENE_W} ${SCENE_H}`}
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <linearGradient id="em-sky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#bfe9ff" />
              <stop offset="100%" stopColor="#eafaff" />
            </linearGradient>
            <linearGradient id="em-trunk" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#7a4a22" />
              <stop offset="55%" stopColor="#9c632f" />
              <stop offset="100%" stopColor="#7a4a22" />
            </linearGradient>
          </defs>

          <rect width={SCENE_W} height={SCENE_H} fill="url(#em-sky)" />

          {/* sun and clouds */}
          <circle cx="560" cy="46" r="26" fill="#ffe266" />
          <g fill="#ffffff" opacity="0.95">
            <ellipse cx="300" cy="70" rx="42" ry="18" />
            <ellipse cx="330" cy="60" rx="30" ry="20" />
            <ellipse cx="270" cy="62" rx="26" ry="16" />
            <ellipse cx="470" cy="150" rx="36" ry="14" />
            <ellipse cx="492" cy="142" rx="24" ry="16" />
          </g>

          {/* ground */}
          <ellipse cx="400" cy="520" rx="520" ry="80" fill="#8fd694" />

          {/* trunk + canopy */}
          <path
            d={`M 78 ${SCENE_H} L 82 120 Q 105 40 128 120 L 140 ${SCENE_H} Z`}
            fill="url(#em-trunk)"
          />
          <g fill="#5fbf6a">
            <circle cx="105" cy="60" r="46" />
            <circle cx="62" cy="90" r="34" />
            <circle cx="150" cy="86" r="34" />
            <circle cx="90" cy="26" r="26" />
            <circle cx="130" cy="34" r="28" />
          </g>
          <g fill="#7ed489">
            <circle cx="112" cy="50" r="22" />
            <circle cx="72" cy="78" r="16" />
          </g>

          {/* branches: one horizontal line per note */}
          {NOTES.map((note, i) => {
            const y = branchY(i);
            return (
              <g key={note.letter}>
                <line
                  x1={TRUNK_X}
                  y1={y}
                  x2={SCENE_W - 14}
                  y2={y}
                  stroke="#8d5a2b"
                  strokeWidth="7"
                  strokeLinecap="round"
                />
                <g fill="#5fbf6a">
                  <circle cx={SCENE_W - 22} cy={y - 8} r="9" />
                  <circle cx={SCENE_W - 10} cy={y + 6} r="8" />
                </g>
              </g>
            );
          })}

          {/* the monkeys */}
          {NOTES.map((note, i) => (
            <Monkey
              key={note.letter}
              x={monkeyX(i)}
              y={branchY(i)}
              note={note}
              hidden={active.indexOf(i) === -1}
              singing={singing === i}
              bouncing={singing === i || bouncing === i}
              wobbling={wobbling === i}
              dimmed={
                phase === "feedback" && result === "wrong" && target !== i && wobbling !== i
              }
              onClick={() => handleMonkeyClick(i)}
            />
          ))}
        </svg>

        {confetti.length > 0 && (
          <div className="em-confetti" aria-hidden="true">
            {confetti.map((p) => (
              <span
                key={p.id}
                className="em-confetti__piece"
                style={{
                  left: `${p.left}%`,
                  animationDelay: `${p.delay}s`,
                  animationDuration: `${p.duration}s`,
                  background: p.color,
                  width: p.size,
                  height: p.size * 0.6,
                  transform: `rotate(${p.rotate}deg)`,
                }}
              />
            ))}
          </div>
        )}
      </div>

      <div className="em-controls">
        {phase === "idle" && (
          <React.Fragment>
            <button type="button" className="em-btn em-btn--start" onClick={handleStart}>
              ▶ Start
            </button>
            <button type="button" className="em-btn em-btn--hearall" onClick={handleHearAll}>
              🎵 Hear A to G
            </button>
          </React.Fragment>
        )}
        {phase === "intro" && (
          <button type="button" className="em-btn em-btn--skip" onClick={handleSkipIntro}>
            ⏭ Skip intro
          </button>
        )}
        {phase === "guess" && (
          <button type="button" className="em-btn em-btn--replay" onClick={handleReplay}>
            🔁 Hear it again
          </button>
        )}
        {(phase === "playing" || phase === "feedback") && (
          <button type="button" className="em-btn em-btn--replay" disabled>
            {phase === "playing" ? "🎵 Playing..." : "🐒 ..."}
          </button>
        )}
      </div>

      <p className="em-hint">
        The monkeys sit on their branches from low A to high G, just like notes
        climbing a staff. On easier levels a few monkeys hide, and a new bunch
        comes out to play each round.
      </p>
    </div>
  );
}

export default EarMonkeysGame;
