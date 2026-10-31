// Teen profile (ages 13-16). Same cleaner look as the teen dashboard.
// Real data: name, email, age group and Logout.
// Sample data (until progress is saved in Firestore): XP, level, streak
// and badges.

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, LogOut } from "lucide-react";
import { signOut } from "firebase/auth";
import { auth } from "./Firebase.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import "./TeenProfile.css";

const SAMPLE = { xp: 340, level: 3, streak: 5 };

const BADGES = [
  { id: "first", emoji: "🚀", name: "First Steps", earned: true },
  { id: "streak3", emoji: "🔥", name: "3-Day Streak", earned: true },
  { id: "quiz90", emoji: "🧠", name: "Quiz Star", earned: true },
  { id: "reader", emoji: "📚", name: "Bookworm", earned: true },
  { id: "voice", emoji: "🗣️", name: "Voice of Change", earned: false, hint: "Finish “Digital Complaint Boxes”" },
  { id: "champ", emoji: "🏆", name: "Rights Champion", earned: false, hint: "Finish all 6 modules" },
];

export default function TeenProfile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [busy, setBusy] = useState(false);

  // The name field depends on what Register.jsx saved in Firestore.
  const name =
    user?.name || user?.fullName || user?.username || user?.displayName || "Student";
  const nickname = user?.nickname || name;
  const email = user?.email || "Not available";
  const earned = BADGES.filter((b) => b.earned).length;

  const tiles = [
    { emoji: "⚡", value: SAMPLE.xp, label: "Total XP", tone: "sun" },
    { emoji: "🎯", value: SAMPLE.level, label: "Level", tone: "grape" },
    { emoji: "🔥", value: SAMPLE.streak, label: "Day streak", tone: "coral" },
    { emoji: "🏅", value: earned, label: "Badges earned", tone: "mint" },
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
    <div className="tp-page">
      <div className="tp-inner">
        <button type="button" className="tp-back" onClick={() => navigate("/dashboard")}>
          <ArrowLeft size={16} /> Back to Dashboard
        </button>

        {/* Header */}
        <header className="tp-head">
          <span className="tp-avatar" aria-hidden="true">
            {name.charAt(0).toUpperCase()}
          </span>
          <div className="tp-head__text">
            <h1>{name}</h1>
            <p>
              <span className="tp-chip">Ages 13-16</span>
              <span className="tp-muted">{email}</span>
            </p>
          </div>
          <button type="button" className="tp-logout" onClick={handleLogout} disabled={busy}>
            <LogOut size={16} />
            {busy ? "Logging out..." : "Log out"}
          </button>
        </header>

        {/* Stat tiles */}
        <ul className="tp-tiles">
          {tiles.map((t) => (
            <li key={t.label} className={`tp-tile tp-tone-${t.tone}`}>
              <span aria-hidden="true">{t.emoji}</span>
              <b>{t.value}</b>
              <span>{t.label}</span>
            </li>
          ))}
        </ul>

        <div className="tp-grid">
          {/* Account */}
          <section className="tp-card">
            <h2>Account details</h2>
            <dl className="tp-details">
              <div>
                <dt>Name</dt>
                <dd>{name}</dd>
              </div>
              <div>
                <dt>Nickname</dt>
                <dd>
                  {nickname}
                  <span className="tp-note">Editing is coming soon</span>
                </dd>
              </div>
              <div>
                <dt>Email</dt>
                <dd>{email}</dd>
              </div>
              <div>
                <dt>Age group</dt>
                <dd>13-16</dd>
              </div>
            </dl>
          </section>

          {/* Privacy */}
          <section className="tp-card">
            <h2>Your privacy</h2>
            <p className="tp-text">
              EduRights stores your username, email, date of birth and learning progress so
              your dashboard can be personalised for you.
            </p>
            <p className="tp-text">
              Never share your password with anyone. If something online ever feels wrong,
              talk to a trusted adult.
            </p>
          </section>
        </div>

        {/* Badges */}
        <section className="tp-card tp-badges-card">
          <h2>
            Badges <span className="tp-muted">{earned} of {BADGES.length} earned</span>
          </h2>
          <ul className="tp-badges">
            {BADGES.map((b) => (
              <li key={b.id} className={`tp-badge ${b.earned ? "" : "is-locked"}`}>
                <span className="tp-medal" aria-hidden="true">{b.earned ? b.emoji : "🔒"}</span>
                <span className="tp-badge__name">{b.name}</span>
                {!b.earned && b.hint && <span className="tp-badge__hint">{b.hint}</span>}
                <span className="tp-sr">{b.earned ? "Earned" : "Locked"}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}