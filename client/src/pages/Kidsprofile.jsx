// Kids profile (ages 8-12). Same playful look as the kids dashboard.
// Real data: name, age group and Logout.
// Sample data (until progress is saved in Firestore): level, XP, streak,
// modules done and badges.

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { signOut } from "firebase/auth";
import { auth } from "./Firebase.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import "./KidsProfile.css";

const SAMPLE = {
  level: 3,
  xp: 340,
  xpMax: 450,
  streak: 5,
  modulesDone: 2,
  modulesTotal: 6,
};

const BADGES = [
  { id: "first", emoji: "🚀", name: "First Steps", earned: true },
  { id: "streak3", emoji: "🔥", name: "3-Day Streak", earned: true },
  { id: "quiz90", emoji: "🧠", name: "Quiz Star", earned: true },
  { id: "reader", emoji: "📚", name: "Bookworm", earned: true },
  { id: "voice", emoji: "🗣️", name: "Voice of Change", earned: false, hint: "Finish “Digital Complaint Boxes”" },
  { id: "champ", emoji: "🏆", name: "Rights Champion", earned: false, hint: "Finish all 6 modules" },
];

function Owl({ size = 120 }) {
  const ink = "#24204A";
  return (
    <svg
      viewBox="0 0 120 120"
      width={size}
      height={size}
      role="img"
      aria-label="Ollie the owl, your guide"
      className="kp-owl"
    >
      <g stroke={ink} strokeWidth="4" strokeLinejoin="round" strokeLinecap="round">
        <path d="M26 44 L32 14 L54 32 Z" fill="#8B6CFF" />
        <path d="M94 44 L88 14 L66 32 Z" fill="#8B6CFF" />
        <ellipse cx="60" cy="70" rx="38" ry="40" fill="#8B6CFF" />
        <ellipse cx="22" cy="78" rx="9" ry="20" fill="#6C4CF5" />
        <ellipse cx="98" cy="78" rx="9" ry="20" fill="#6C4CF5" />
        <ellipse cx="60" cy="90" rx="20" ry="17" fill="#E4DCFF" />
        <circle cx="44" cy="58" r="14" fill="#fff" />
        <circle cx="76" cy="58" r="14" fill="#fff" />
        <path d="M53 68 L67 68 L60 80 Z" fill="#FFC93C" />
        <ellipse cx="48" cy="112" rx="10" ry="4" fill="#FFC93C" />
        <ellipse cx="72" cy="112" rx="10" ry="4" fill="#FFC93C" />
      </g>
      <circle cx="46" cy="59" r="6" fill={ink} />
      <circle cx="74" cy="59" r="6" fill={ink} />
      <circle cx="48" cy="57" r="2" fill="#fff" />
      <circle cx="76" cy="57" r="2" fill="#fff" />
    </svg>
  );
}

export default function KidsProfile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [busy, setBusy] = useState(false);

  // The name field depends on what Register.jsx saved in Firestore.
  const name =
    user?.name || user?.fullName || user?.username || user?.displayName || "Friend";

  const xpPct = Math.round((SAMPLE.xp / SAMPLE.xpMax) * 100);
  const earned = BADGES.filter((b) => b.earned).length;

  const counters = [
    { emoji: "⚡", value: SAMPLE.xp, label: "Total XP", tone: "sun" },
    { emoji: "🔥", value: SAMPLE.streak, label: "Day streak", tone: "coral" },
    { emoji: "🏅", value: `${earned}/${BADGES.length}`, label: "Badges", tone: "mint" },
    { emoji: "🧩", value: `${SAMPLE.modulesDone}/${SAMPLE.modulesTotal}`, label: "Modules done", tone: "sky" },
  ];

  const handleLogout = async () => {
    setBusy(true);
    try {
      await signOut(auth); // sign out of Firebase
    } catch (error) {
      console.error("Sign out error:", error);
    }
    logout(); // clear AuthContext + saved token
    navigate("/login", { replace: true });
  };

  return (
    <div className="kp-page">
      <div className="kp-inner">
        <button type="button" className="kp-back" onClick={() => navigate("/dashboard")}>
          <ArrowLeft size={18} /> Back to Dashboard
        </button>

        {/* Hero */}
        <section className="kp-hero">
          <div className="kp-owl-wrap">
            <Owl />
            <span className="kp-level">Lv {SAMPLE.level}</span>
          </div>
          <div>
            <h1>Hi, {name}!</h1>
            <p className="kp-bubble">You are a Level {SAMPLE.level} Explorer. Keep going!</p>
            <div className="kp-xprow">
              <span className="kp-chip">Level {SAMPLE.level}</span>
              <span>
                {SAMPLE.xp} / {SAMPLE.xpMax} XP
              </span>
            </div>
            <div
              className="kp-bar"
              role="progressbar"
              aria-label="Experience points"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={xpPct}
            >
              <i style={{ width: `${xpPct}%` }} />
            </div>
            <p className="kp-hint">
              {SAMPLE.xpMax - SAMPLE.xp} XP to Level {SAMPLE.level + 1}
            </p>
          </div>
        </section>

        {/* Counters */}
        <ul className="kp-counters">
          {counters.map((c) => (
            <li key={c.label} className={`kp-counter kp-tone-${c.tone}`}>
              <span className="kp-counter__emoji" aria-hidden="true">{c.emoji}</span>
              <b>{c.value}</b>
              <span>{c.label}</span>
            </li>
          ))}
        </ul>

        {/* Badges */}
        <section className="kp-card">
          <h2>My collection</h2>
          <ul className="kp-badges">
            {BADGES.map((b) => (
              <li key={b.id} className={`kp-badge ${b.earned ? "" : "is-locked"}`}>
                <span className="kp-medal" aria-hidden="true">{b.earned ? b.emoji : "🔒"}</span>
                <span className="kp-badge__name">{b.name}</span>
                {!b.earned && b.hint && <span className="kp-badge__hint">{b.hint}</span>}
                <span className="kp-sr">{b.earned ? "Earned" : "Locked"}</span>
              </li>
            ))}
          </ul>
        </section>

        <div className="kp-row">
          {/* About me */}
          <section className="kp-card">
            <h2>About me</h2>
            <ul className="kp-facts">
              <li>
                <span>My name</span>
                <b>{name}</b>
              </li>
              <li>
                <span>My group</span>
                <b>Explorer, ages 8-12</b>
              </li>
            </ul>
          </section>

          {/* Logout */}
          <section className="kp-card kp-bye">
            <span className="kp-bye__emoji" aria-hidden="true">🦉</span>
            <h2>All done for today?</h2>
            <p>Ollie will keep your spot safe until you come back.</p>
            <button type="button" className="kp-logout" onClick={handleLogout} disabled={busy}>
              {busy ? "Logging out..." : "Say bye for now 👋"}
            </button>
          </section>
        </div>
      </div>
    </div>
  );
}