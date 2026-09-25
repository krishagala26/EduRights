/**
 * EduRights – Dashboard          src/pages/Dashboard.jsx
 * ---------------------------------------------------------------------------
 * Covers: FR-01 (personalised dashboard), FR-04 (levels, points, rewards),
 *         FR-05 (scores, badges, level), FR-06 (revisit topics),
 *         FR-09 (feedback on completed modules), FR-11 (child-friendly, responsive)
 *
 * STANDALONE: needs only React. No login, no router, no backend.
 * All data comes from MOCK_DATA below, so the page works on its own.
 *
 * TWO LOOKS, ONE COMPONENT
 *   "8-12"  -> playful: mascot, winding adventure path, big XP bar
 *   "13-16" -> cleaner: stats strip, topic progress, activity feed, leaderboard
 *   The switch at the top right changes the look. Once login exists, hide the
 *   switch with showSwitch={false} and pass the child's age group from their profile.
 *
 * WHEN YOUR BACKEND IS READY (later, not needed now)
 *   <Dashboard fetcher={() => fetch("/api/dashboard").then(r => r.json())} />
 *   Return the same shape as MOCK_DATA and nothing else changes.
 *
 * OPTIONAL PROPS
 *   ageGroup        "8-12" | "13-16"   starting look (default "8-12")
 *   showSwitch      true | false        show the age-group switch (default true)
 *   fetcher         () => Promise<data> replace the mock data
 *   onNavigate      (id) => void        sidebar clicks: "modules" | "hub" | "badges" | "profile"
 *   onOpenModule    (moduleId) => void  when a topic is opened
 *   onSendFeedback  ({moduleId, text})  when feedback is sent
 */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

import { useLocation } from "react-router-dom";

/* ========================================================================== */
/* 1. MOCK DATA                                                               */
/* ========================================================================== */
const MOCK_DATA = {
  user: { name: "Aarav", nickname: "SkyRocket", ageGroup: "8-12", xp: 340, streak: 5, quizzesDone: 2 },
  // levelThresholds[i] = XP needed to reach level i+1
  levelThresholds: [0, 100, 250, 450, 700, 1000],
  nextReward: { emoji: "🎁", label: "Mystery badge" },
  modules: [
    { id: "education", emoji: "📚", title: "Right to Education", status: "done", progress: 100, quizScore: 90 },
    { id: "safety", emoji: "🛡️", title: "Right to Safety", status: "done", progress: 100, quizScore: 80 },
    { id: "play", emoji: "⚽", title: "Right to Play", status: "current", progress: 40, quizScore: null },
    { id: "health", emoji: "🩺", title: "Right to Health", status: "locked", progress: 0, quizScore: null },
    { id: "voice", emoji: "🗣️", title: "Right to Be Heard", status: "locked", progress: 0, quizScore: null },
    { id: "identity", emoji: "🪪", title: "Right to Identity", status: "locked", progress: 0, quizScore: null },
  ],
  badges: [
    { id: "first", emoji: "🚀", name: "First Steps", earned: true },
    { id: "streak3", emoji: "🔥", name: "3-Day Streak", earned: true },
    { id: "quiz90", emoji: "🧠", name: "Quiz Star", earned: true },
    { id: "reader", emoji: "📚", name: "Bookworm", earned: true },
    { id: "voice", emoji: "🗣️", name: "Voice of Change", earned: false, hint: "Finish “Right to Be Heard”" },
    { id: "champ", emoji: "🏆", name: "Rights Champion", earned: false, hint: "Finish all 6 topics" },
  ],
  challenge: {
    xp: 20,
    question: "True or false: every child has the right to play and rest.",
    answer: true,
    explain: "It's true. Children have the right to rest, to play and to join in fun activities.",
  },
  activity: [
    { icon: "🏅", when: "Today", text: "Earned the “3-Day Streak” badge" },
    { icon: "✅", when: "Yesterday", text: "Scored 80% in the Right to Safety quiz (+40 XP)" },
    { icon: "📖", when: "2 days ago", text: "Finished the Right to Education topic" },
  ],
  leaderboard: [
    { nick: "MangoNinja", xp: 410 },
    { nick: "BlueTiger", xp: 310 },
    { nick: "StarFox", xp: 290 },
  ],
  caseOfDay: {
    title: "Can Maya be asked to leave school?",
    body: "Maya is 14. Her family asks her to stop school and work at a shop full-time. Which of her rights are involved?",
  },
  // FR-08: later, fill this from your laws / awareness API
  legal: [
    { id: 1, title: "Explainer: the “best interests of the child” idea" },
    { id: 2, title: "Guide: who can you talk to when you feel unsafe?" },
    { id: 3, title: "Explainer: what the UN Convention on the Rights of the Child says" },
  ],
};

async function mockFetchDashboard() {
  await new Promise((r) => setTimeout(r, 500));
  return MOCK_DATA;
}

/* ========================================================================== */
/* 2. HELPERS                                                                 */
/* ========================================================================== */
const Ctx = createContext(null);
const useDash = () => useContext(Ctx);

function levelInfo(xp, thresholds) {
  let level = 1;
  thresholds.forEach((need, i) => { if (xp >= need) level = i + 1; });
  const isMax = level >= thresholds.length;
  const floor = thresholds[level - 1];
  const ceil = isMax ? floor : thresholds[level];
  const pct = isMax ? 100 : Math.round(((xp - floor) / (ceil - floor)) * 100);
  return { level, pct, toNext: isMax ? 0 : ceil - xp, isMax };
}

const starsFor = (score) => (score >= 90 ? 3 : score >= 70 ? 2 : 1);

function useDashboardData(fetcher) {
  const [attempt, setAttempt] = useState(0);
  const [state, setState] = useState({ status: "loading", data: null });
  useEffect(() => {
    let alive = true;
    setState({ status: "loading", data: null });
    fetcher()
      .then((data) => alive && setState({ status: "ready", data }))
      .catch(() => alive && setState({ status: "error", data: null }));
    return () => { alive = false; };
  }, [fetcher, attempt]);
  return [state, () => setAttempt((n) => n + 1)];
}

/* ========================================================================== */
/* 3. SMALL PIECES                                                            */
/* ========================================================================== */
function Mascot({ size = 112 }) {
  const ink = "#24204A";
  return (
    <svg viewBox="0 0 120 120" width={size} height={size} role="img" aria-label="Ollie the owl, your guide" style={{ flexShrink: 0 }}>
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

function Bar({ pct, label }) {
  const [w, setW] = useState(0);
  useEffect(() => {
    const id = requestAnimationFrame(() => setW(pct));
    return () => cancelAnimationFrame(id);
  }, [pct]);
  return (
    <div className="bar" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={pct} aria-label={label}>
      <i style={{ width: `${w}%` }} />
    </div>
  );
}

function Stars({ score }) {
  const n = starsFor(score);
  return (
    <span className="stars" role="img" aria-label={`${n} out of 3 stars`}>
      {[1, 2, 3].map((i) => (
        <span key={i} className={i <= n ? "on" : ""} aria-hidden="true">★</span>
      ))}
    </span>
  );
}

function BadgeGrid({ badges }) {
  return (
    <ul className="badges">
      {badges.map((b) => (
        <li key={b.id} className={`badge ${b.earned ? "" : "locked"}`}>
          <span className="medal" aria-hidden="true">{b.earned ? b.emoji : "🔒"}</span>
          <span className="bname">{b.name}</span>
          {!b.earned && b.hint && <span className="hint">{b.hint}</span>}
          <span className="sr">{b.earned ? "Earned" : "Locked"}</span>
        </li>
      ))}
    </ul>
  );
}

function FeedbackDialog({ module, onClose, onSend }) {
  const ref = useRef(null);
  const [text, setText] = useState("");
  useEffect(() => {
    const d = ref.current;
    if (d && !d.open) d.showModal();
  }, []);
  return (
    <dialog ref={ref} className="dlg" onClose={onClose} aria-labelledby="fb-title">
      <h2 className="h2" id="fb-title">What did you think of “{module.title}”?</h2>
      <label className="sr" htmlFor="fb-text">Your feedback</label>
      <textarea id="fb-text" className="area" rows={4} value={text} onChange={(e) => setText(e.target.value)}
        placeholder="Tell us what you liked or what was confusing." />
      <div className="btnrow">
        <button type="button" className="btn" disabled={!text.trim()} onClick={() => { onSend(text.trim()); ref.current.close(); }}>Send feedback</button>
        <button type="button" className="btn ghost" onClick={() => ref.current.close()}>Cancel</button>
      </div>
    </dialog>
  );
}

/* ========================================================================== */
/* 4. SECTIONS SHARED BY BOTH LOOKS                                           */
/* ========================================================================== */
function ChallengeCard({ challenge, answered, onAnswer, streak, showStreak }) {
  return (
    <section className="card tint-coral" aria-labelledby="chal">
      {showStreak && <p className="streak"><span aria-hidden="true">🔥</span> {streak}-day streak</p>}
      <h2 className="h2" id="chal">Daily challenge</h2>
      <p>{challenge.question}</p>
      {answered === null ? (
        <>
          <div className="btnrow">
            <button type="button" className="btn" onClick={() => onAnswer(true)}>True</button>
            <button type="button" className="btn ghost" onClick={() => onAnswer(false)}>False</button>
          </div>
          <p><span className="chip light">+{challenge.xp} XP</span></p>
        </>
      ) : (
        <>
          <p className="result">{answered === challenge.answer ? `Correct! +${challenge.xp} XP` : "Not this time."}</p>
          <p>{challenge.explain}</p>
        </>
      )}
    </section>
  );
}

function BadgeCard({ badges }) {
  return (
    <section className="card" aria-labelledby="mybadges">
      <h2 className="h2" id="mybadges">Your badges</h2>
      <BadgeGrid badges={badges} />
    </section>
  );
}

/* ========================================================================== */
/* 5. LOOK FOR AGES 8-12                                                      */
/* ========================================================================== */
// Six stops on a winding road. Add more coordinates here if you add more topics.
const NODE_POS = [[14, 26], [50, 16], [86, 26], [86, 74], [50, 84], [14, 74]];
const ROAD = "M14 26 Q32 8 50 16 T86 26 C98 32 98 68 86 74 Q68 92 50 84 T14 74";

function KidsHero({ user, xp, info, nextReward }) {
  return (
    <section className="card hero" aria-labelledby="hello">
      <Mascot size={112} />
      <div className="hero-body">
        <h1 id="hello">Hi, {user.name}!</h1>
        <p className="bubble">
          {info.isMax ? "You reached the top level. Amazing!" : `Only ${info.toNext} XP to Level ${info.level + 1}. You can do it!`}
        </p>
        <div className="xprow">
          <span className="chip">Level {info.level}</span>
          <span>{xp} XP</span>
        </div>
        <Bar pct={info.pct} label={info.isMax ? "Top level reached" : `${info.toNext} XP to Level ${info.level + 1}`} />
        <p className="reward"><span aria-hidden="true">{nextReward.emoji}</span> Next reward: <b>{nextReward.label}</b></p>
      </div>
    </section>
  );
}

function AdventurePath({ modules }) {
  const { openModule, openLocked } = useDash();
  const list = modules.slice(0, NODE_POS.length);
  const current = list.find((m) => m.status === "current");
  return (
    <section className="card" aria-labelledby="adv">
      <h2 className="h2" id="adv">Your learning adventure</h2>
      <div className="path">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true" focusable="false">
          <path d={ROAD} className="road-edge" />
          <path d={ROAD} className="road" />
          <path d={ROAD} className="road-dash" />
        </svg>
        <ol className="nodes">
          {list.map((m, i) => {
            const [x, y] = NODE_POS[i];
            const locked = m.status === "locked";
            const label = m.status === "done" ? "completed" : locked ? "locked" : "in progress";
            return (
              <li key={m.id} style={{ left: `${x}%`, top: `${y}%` }}>
                <button
                  type="button"
                  className={`node ${m.status}`}
                  aria-disabled={locked}
                  aria-label={`${m.title}, ${label}`}
                  onClick={() => (locked ? openLocked(list[i - 1]) : openModule(m))}
                >
                  <span className="circle" aria-hidden="true">
                    {locked ? "🔒" : m.emoji}
                    {m.status === "done" && <span className="tick">✓</span>}
                  </span>
                  <span className="name">{m.title}</span>
                </button>
              </li>
            );
          })}
        </ol>
      </div>
      {current && (
        <div className="cta">
          <button type="button" className="btn big" onClick={() => openModule(current)}>Continue: {current.title}</button>
          <span className="muted">{current.progress}% done</span>
        </div>
      )}
    </section>
  );
}

function LibraryCard() {
  const { go } = useDash();
  const items = [
    ["📰", "Articles", "Short reads about your rights"],
    ["❓", "FAQs", "Quick answers to big questions"],
    ["⚖️", "Cases", "Real-life examples to think through"],
  ];
  return (
    <section className="card tint-sky" aria-labelledby="lib">
      <h2 className="h2" id="lib">Rights library</h2>
      <ul className="libitems">
        {items.map(([emo, name, desc]) => (
          <li key={name}>
            <button type="button" className="libitem" onClick={() => go("hub", name)}>
              <span className="emo" aria-hidden="true">{emo}</span>
              <span><b>{name}</b><span className="desc">{desc}</span></span>
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}

function RevisitRow({ modules }) {
  const { openModule, askFeedback } = useDash();
  const done = modules.filter((m) => m.status === "done");
  if (!done.length) return null;
  return (
    <section className="card" aria-labelledby="rev">
      <h2 className="h2" id="rev">Revisit a topic</h2>
      <div className="revisit">
        {done.map((m) => (
          <article key={m.id} className="mini">
            <span className="emo" aria-hidden="true">{m.emoji}</span>
            <h3>{m.title}</h3>
            <Stars score={m.quizScore} />
            <div className="btnrow">
              <button type="button" className="btn sm" onClick={() => openModule(m)}>Read again</button>
              <button type="button" className="btn ghost sm" onClick={() => askFeedback(m)}>Feedback</button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

/* ========================================================================== */
/* 6. LOOK FOR AGES 13-16                                                     */
/* ========================================================================== */
function StatTiles({ user, xp, info }) {
  const tiles = [
    ["⚡", xp, "Total XP", "sun"],
    ["🎯", info.level, "Level", "grape"],
    ["🔥", user.streak, "Day streak", "coral"],
    ["✅", user.quizzesDone, "Quizzes done", "mint"],
  ];
  return (
    <ul className="stats">
      {tiles.map(([emo, val, label, tone]) => (
        <li key={label} className={`tile tint-${tone}`}>
          <span className="emo" aria-hidden="true">{emo}</span>
          <b>{val}</b>
          <span>{label}</span>
        </li>
      ))}
    </ul>
  );
}

function TopicList({ modules }) {
  const { openModule, openLocked, askFeedback } = useDash();
  return (
    <section className="card" aria-labelledby="topics">
      <h2 className="h2" id="topics">Topic progress</h2>
      <ul className="topics">
        {modules.map((m, i) => {
          const locked = m.status === "locked";
          return (
            <li key={m.id} className={`topic ${m.status}`}>
              <span className="emo" aria-hidden="true">{locked ? "🔒" : m.emoji}</span>
              <div className="topic-main">
                <b>{m.title}</b>
                <Bar pct={m.progress} label={`${m.title}: ${m.progress}% done`} />
              </div>
              <div className="btnrow">
                {m.status === "done" && (
                  <>
                    <button type="button" className="btn ghost sm" onClick={() => openModule(m)}>Review</button>
                    <button type="button" className="btn ghost sm" onClick={() => askFeedback(m)}>Feedback</button>
                  </>
                )}
                {m.status === "current" && <button type="button" className="btn sm" onClick={() => openModule(m)}>Continue</button>}
                {locked && (
                  <button type="button" className="btn ghost sm" aria-disabled="true" aria-label={`${m.title}, locked`} onClick={() => openLocked(modules[i - 1])}>
                    Locked
                  </button>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

function LevelCard({ info, nextReward }) {
  const text = info.isMax ? "Top level reached" : `${info.toNext} XP to Level ${info.level + 1}`;
  return (
    <section className="card tint-grape" aria-labelledby="lvl">
      <h2 className="h2" id="lvl">Level {info.level}</h2>
      <Bar pct={info.pct} label={text} />
      <p className="xpline">{text}</p>
      <p className="reward"><span aria-hidden="true">{nextReward.emoji}</span> Next reward: <b>{nextReward.label}</b></p>
    </section>
  );
}

function ActivityCard({ items }) {
  return (
    <section className="card" aria-labelledby="act">
      <h2 className="h2" id="act">Recent activity</h2>
      <ul className="feed">
        {items.map((a, i) => (
          <li key={i}>
            <span className="emo" aria-hidden="true">{a.icon}</span>
            <div><span>{a.text}</span><span className="muted small">{a.when}</span></div>
          </li>
        ))}
      </ul>
    </section>
  );
}

function BoardCard({ user, xp, rows }) {
  const all = [...rows, { nick: user.nickname, xp, me: true }].sort((a, b) => b.xp - a.xp);
  return (
    <section className="card" aria-labelledby="lb">
      <h2 className="h2" id="lb">Leaderboard</h2>
      <ol className="board">
        {all.map((r) => (
          <li key={r.nick} className={r.me ? "me" : ""}>
            <span>{r.nick}{r.me ? " (you)" : ""}</span>
            <b>{r.xp} XP</b>
          </li>
        ))}
      </ol>
    </section>
  );
}

function CaseCard({ item }) {
  const { go } = useDash();
  return (
    <section className="card tint-sun" aria-labelledby="case">
      <h2 className="h2" id="case">Case of the day</h2>
      <h3 className="case-title">{item.title}</h3>
      <p>{item.body}</p>
      <button type="button" className="btn sm" onClick={() => go("hub", "Case of the day")}>Read the case</button>
    </section>
  );
}

function LegalCard({ items }) {
  const { go } = useDash();
  return (
    <section className="card" aria-labelledby="legal">
      <h2 className="h2" id="legal">Laws and awareness</h2>
      <ul className="legal">
        {items.map((x) => (
          <li key={x.id}>
            <button type="button" className="linkbtn" onClick={() => go("hub", "Laws and awareness")}>{x.title}</button>
          </li>
        ))}
      </ul>
    </section>
  );
}

/* ========================================================================== */
/* 7. PAGE                                                                    */
/* ========================================================================== */
const NAV = [
  ["dashboard", "🏠", "Dashboard"],
  ["modules", "🧩", "Modules"],
  ["hub", "📖", "Knowledge hub"],
  ["badges", "🏅", "Badges"],
  ["profile", "👤", "Profile"],
];

export default function Dashboard({
  ageGroup: startAge = "8-12",
  showSwitch = false,
  fetcher = mockFetchDashboard,
  onNavigate,
  onOpenModule,
  onSendFeedback,
}) {
  const location = useLocation();

  // Information passed from Login.jsx
  const loggedInAgeGroup = location.state?.ageGroup || startAge;
  const loggedInUser = location.state?.user || null;

  // Dashboard state
  const [ageGroup, setAgeGroup] = useState(loggedInAgeGroup);
  const [toast, setToast] = useState(null);
  const [answered, setAnswered] = useState(null);
  const [bonusXp, setBonusXp] = useState(0);
  const [bonusActivity, setBonusActivity] = useState([]);
  const [feedbackFor, setFeedbackFor] = useState(null);

  const [{ status, data }, retry] = useDashboardData(fetcher);

  // Keep age group synchronized with Login
  useEffect(() => {
    setAgeGroup(loggedInAgeGroup);
  }, [loggedInAgeGroup]);

  // Toast helper
  const say = useCallback((msg) => {
    setToast({
      msg,
      id: Date.now(),
    });
  }, []);

  // Automatically hide toast
  useEffect(() => {
    if (!toast) return undefined;

    const id = setTimeout(() => {
      setToast(null);
    }, 2800);

    return () => clearTimeout(id);
  }, [toast]);

  const toastBox = (
    <div
      className="toastwrap"
      role="status"
      aria-live="polite"
    >
      {toast && (
        <div className="toast" key={toast.id}>
          {toast.msg}
        </div>
      )}
    </div>
  );

  /* ---------------------------------------------------------------------- */
  /* Loading / Error                                                        */
  /* ---------------------------------------------------------------------- */

  if (status !== "ready") {
    return (
      <div className="er solo" data-mode="kids">
        <style>{CSS}</style>

        <main className="main center">
          <div
            className="card state"
            role={status === "error" ? "alert" : "status"}
          >
            <Mascot size={96} />

            {status === "loading" ? (
              <p className="h2">
                Loading your dashboard…
              </p>
            ) : (
              <>
                <p className="h2">
                  We could not load your dashboard.
                </p>

                <p>
                  Check your connection and try again.
                </p>

                <button
                  type="button"
                  className="btn"
                  onClick={retry}
                >
                  Try again
                </button>
              </>
            )}
          </div>
        </main>
      </div>
    );
  }

  /* ---------------------------------------------------------------------- */
  /* Dashboard data                                                         */
  /* ---------------------------------------------------------------------- */

  const kids = ageGroup === "8-12";

  const dashboardUser = {
    ...data.user,
    name: loggedInUser?.username || data.user.name,
    ageGroup,
  };

  const challenge = data.challenge;

  const xp = data.user.xp + bonusXp;

  const info = levelInfo(
    xp,
    data.levelThresholds
  );

  /* ---------------------------------------------------------------------- */
  /* Daily challenge                                                       */
  /* ---------------------------------------------------------------------- */

  const answerChallenge = (choice) => {
    setAnswered(choice);

    if (choice !== challenge.answer) {
      say("Not this time. Read the answer below.");
      return;
    }

    const before = levelInfo(
      xp,
      data.levelThresholds
    ).level;

    const after = levelInfo(
      xp + challenge.xp,
      data.levelThresholds
    ).level;

    setBonusXp((currentXp) => currentXp + challenge.xp);

    setBonusActivity([
      {
        icon: "⚡",
        when: "Just now",
        text: `Answered the daily challenge (+${challenge.xp} XP)`,
      },
    ]);

    if (after > before) {
      say(`Level up! You reached Level ${after}.`);
    } else {
      say(`Correct! +${challenge.xp} XP`);
    }
  };

  /* ---------------------------------------------------------------------- */
  /* Shared dashboard context                                              */
  /* ---------------------------------------------------------------------- */

  const ctx = {
    say,

    openModule: (module) => {
      if (onOpenModule) {
        onOpenModule(module.id);
      } else {
        say(
          `“${module.title}” will open here once the module page is connected.`
        );
      }
    },

    openLocked: (previousModule) => {
      if (previousModule) {
        say(
          `Finish “${previousModule.title}” first to unlock this topic.`
        );
      } else {
        say("This topic is locked.");
      }
    },

    go: (id, label) => {
      if (onNavigate) {
        onNavigate(id);
      } else if (id !== "dashboard") {
        say(
          `The ${label} page is not connected yet.`
        );
      }
    },

    askFeedback: (module) => {
      setFeedbackFor(module);
    },
  };

  const challengeCard = (
    <ChallengeCard
      challenge={challenge}
      answered={answered}
      onAnswer={answerChallenge}
      streak={data.user.streak}
      showStreak={kids}
    />
  );

  /* ---------------------------------------------------------------------- */
  /* Render                                                                 */
  /* ---------------------------------------------------------------------- */

  return (
    <Ctx.Provider value={ctx}>
      <div
        className="er"
        data-mode={kids ? "kids" : "teen"}
      >
        <style>{CSS}</style>

        {/* Navigation */}
        <nav className="side" aria-label="Main">
          <div className="logo">
            <span aria-hidden="true">🦉</span>
            EduRights
          </div>

          <ul className="nav">
            {NAV.map(([id, emoji, label]) => (
              <li key={id}>
                <button
                  type="button"
                  aria-current={
                    id === "dashboard"
                      ? "page"
                      : undefined
                  }
                  onClick={() => ctx.go(id, label)}
                >
                  <span aria-hidden="true">
                    {emoji}
                  </span>

                  <span>{label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <main className="main">
          {/* Top bar */}
          <div className="top">
            {showSwitch && (
              <div
                className="seg"
                role="group"
                aria-label="Switch view"
              >
                <button
                  type="button"
                  aria-pressed={kids}
                  onClick={() => setAgeGroup("8-12")}
                >
                  Ages 8-12
                </button>

                <button
                  type="button"
                  aria-pressed={!kids}
                  onClick={() => setAgeGroup("13-16")}
                >
                  Ages 13-16
                </button>
              </div>
            )}

            <span
              className="avatar"
              aria-hidden="true"
            >
              {dashboardUser.name.charAt(0)}
            </span>
          </div>

          {/* -------------------------------------------------------------- */}
          {/* Kids dashboard                                                  */}
          {/* -------------------------------------------------------------- */}

          {kids ? (
            <>
              <KidsHero
                user={dashboardUser}
                xp={xp}
                info={info}
                nextReward={data.nextReward}
              />

              <div className="row a">
                <AdventurePath
                  modules={data.modules}
                />

                {challengeCard}
              </div>

              <div className="row c">
                <BadgeCard
                  badges={data.badges}
                />

                <LibraryCard />
              </div>

              <div className="row">
                <RevisitRow
                  modules={data.modules}
                />
              </div>
            </>
          ) : (
            /* -------------------------------------------------------------- */
            /* Teen dashboard                                                  */
            /* -------------------------------------------------------------- */
            <>
              <header className="teen-head">
                <h1>
                  Welcome back, {dashboardUser.name}
                </h1>

                <p className="muted">
                  <span aria-hidden="true">
                    🔥
                  </span>{" "}
                  {data.user.streak}-day streak
                </p>
              </header>

              <StatTiles
                user={dashboardUser}
                xp={xp}
                info={info}
              />

              <div className="row a">
                <TopicList
                  modules={data.modules}
                />

                <div className="stack">
                  <LevelCard
                    info={info}
                    nextReward={data.nextReward}
                  />

                  {challengeCard}
                </div>
              </div>

              <div className="row b">
                <ActivityCard
                  items={[
                    ...bonusActivity,
                    ...data.activity,
                  ]}
                />

                <BadgeCard
                  badges={data.badges}
                />

                <BoardCard
                  user={dashboardUser}
                  xp={xp}
                  rows={data.leaderboard}
                />
              </div>

              <div className="row c">
                <CaseCard
                  item={data.caseOfDay}
                />

                <LegalCard
                  items={data.legal}
                />
              </div>
            </>
          )}
        </main>

        {/* Feedback dialog */}
        {feedbackFor && (
          <FeedbackDialog
            module={feedbackFor}
            onClose={() => setFeedbackFor(null)}
            onSend={(text) => {
              onSendFeedback?.({
                moduleId: feedbackFor.id,
                text,
              });

              setFeedbackFor(null);

              say(
                "Thanks! Your feedback was sent."
              );
            }}
          />
        )}

        {toastBox}
      </div>
    </Ctx.Provider>
  );
}

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@500;600;700&family=Nunito:wght@500;700;800&family=Outfit:wght@500;600;700&display=swap');

/* keeps starter-template CSS from squashing the layout */
body{margin:0;display:block}

.er{
  --ink:#24204A; --muted:#5B5780;
  --sky:#4CB5FF; --sun:#FFC93C; --coral:#FF6F61; --mint:#34D3A0; --grape:#6C4CF5;
  --sky-t:#D6ECFF; --sun-t:#FFF1C2; --coral-t:#FFD9D4; --mint-t:#CFF6E8; --grape-t:#E4DCFF;
  font-family:'Nunito',system-ui,sans-serif;
  color:var(--ink); background:var(--bg); min-height:100vh;
  display:grid; grid-template-columns:230px minmax(0,1fr); font-size:var(--base); line-height:1.45;
  text-align:left;
}
.er *{box-sizing:border-box}
.er[data-mode="kids"]{--bg:#EAF4FF;--bd:3px;--radius:26px;--lift:6px;--barh:26px;--base:17px;--head:'Fredoka',system-ui,sans-serif}
.er[data-mode="teen"]{--bg:#F4F3FF;--bd:2px;--radius:16px;--lift:3px;--barh:12px;--base:15px;--head:'Outfit',system-ui,sans-serif}
.er.solo{grid-template-columns:1fr}
:where(.er) :where(button,textarea){font:inherit;color:var(--ink)}
.er :focus-visible{outline:3px solid var(--grape);outline-offset:3px}
:where(.er) :where(h1,h2,h3,p){margin:0}
:where(.er) :where(ul,ol){list-style:none;margin:0;padding:0}
.sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}
.muted{color:var(--muted)} .small{font-size:.85em}

/* shell */
.side{position:sticky;top:0;height:100vh;padding:22px 14px;background:#fff;border-right:var(--bd) solid var(--ink)}
.logo{font-family:var(--head);font-weight:700;font-size:1.5rem;display:flex;gap:8px;align-items:center;padding:0 10px 18px}
.nav{display:flex;flex-direction:column;gap:6px}
.nav button{width:100%;display:flex;align-items:center;gap:12px;text-align:left;cursor:pointer;
  font-family:var(--head);font-weight:600;font-size:1.05em;padding:11px 14px;background:none;
  border:var(--bd) solid transparent;border-radius:calc(var(--radius) * .6)}
.nav button:hover{background:var(--sun-t)}
.nav button[aria-current="page"]{background:var(--sun);border-color:var(--ink)}
.main{padding:22px clamp(16px,3vw,36px) 48px;width:100%;max-width:1180px;margin:0 auto;min-width:0}
.main.center{display:grid;place-items:center;min-height:100vh}
.top{display:flex;flex-wrap:wrap;gap:12px;justify-content:flex-end;align-items:center;margin-bottom:18px}
.seg{display:inline-flex;border:2px solid var(--ink);border-radius:999px;overflow:hidden;background:#fff}
.seg button{border:0;background:none;padding:8px 16px;font-weight:800;cursor:pointer}
.seg button[aria-pressed="true"]{background:var(--ink);color:#fff}
.avatar{width:40px;height:40px;border-radius:50%;background:var(--coral);border:2px solid var(--ink);
  display:grid;place-items:center;font-family:var(--head);font-weight:700}

/* layout */
.row{display:grid;gap:24px;margin-top:24px}
.row.a{grid-template-columns:minmax(0,1.7fr) minmax(0,1fr)}
.row.b{grid-template-columns:repeat(3,minmax(0,1fr))}
.row.c{grid-template-columns:repeat(2,minmax(0,1fr))}
.stack{display:grid;gap:24px;align-content:start}

/* cards + buttons */
.card{background:#fff;border:var(--bd) solid var(--ink);border-radius:var(--radius);
  box-shadow:0 var(--lift) 0 var(--ink);padding:clamp(16px,2.4vw,24px);min-width:0}
.card p+p,.card p+.chips,.card p+.btnrow,.card p+button,.card p+div.btnrow{margin-top:10px}
.tint-coral{background:var(--coral-t)} .tint-sky{background:var(--sky-t)} .tint-sun{background:var(--sun-t)}
.tint-mint{background:var(--mint-t)} .tint-grape{background:var(--grape-t)}
.h2{font-family:var(--head);font-weight:700;font-size:1.35rem;line-height:1.2;margin-bottom:12px}
.btn{font-family:var(--head);font-weight:600;background:var(--sun);border:var(--bd) solid var(--ink);
  border-radius:999px;padding:11px 22px;cursor:pointer;box-shadow:0 4px 0 var(--ink);
  transition:transform .08s,box-shadow .08s}
.btn:hover{border-color:var(--ink)}
.btn:active{transform:translateY(3px);box-shadow:0 1px 0 var(--ink)}
.btn.big{font-size:1.15em;padding:14px 28px}
.btn.sm{font-size:.9em;padding:7px 14px;box-shadow:0 3px 0 var(--ink)}
.btn.ghost{background:#fff}
.btn[aria-disabled="true"]{color:var(--muted);border-color:var(--muted);box-shadow:0 3px 0 var(--muted);cursor:not-allowed}
.btn:disabled{opacity:.5;cursor:not-allowed}
.btnrow,.chips{display:flex;flex-wrap:wrap;gap:8px}
.chip{display:inline-block;font-family:var(--head);font-weight:600;background:var(--ink);color:#fff;border-radius:999px;padding:3px 14px}
.chip.light{background:#fff;color:var(--ink);border:2px solid var(--ink)}
.linkbtn{background:none;border:0;padding:0;text-align:left;cursor:pointer;font-weight:700;text-decoration:underline;text-underline-offset:3px}

/* progress bar */
.bar{height:var(--barh);border:var(--bd) solid var(--ink);border-radius:999px;background:#fff;overflow:hidden}
.bar>i{display:block;height:100%;background:var(--mint);transition:width .9s cubic-bezier(.2,.8,.2,1)}

/* kids hero */
.hero{background:var(--sun);display:grid;grid-template-columns:auto minmax(0,1fr);gap:22px;align-items:center}
.hero h1{font-family:var(--head);font-weight:700;font-size:clamp(1.8rem,4vw,2.6rem);line-height:1.1}
.bubble{position:relative;display:inline-block;background:#fff;border:var(--bd) solid var(--ink);
  border-radius:18px;padding:8px 14px;margin:12px 0 16px 8px !important;font-weight:800}
.bubble::before{content:'';position:absolute;left:-10px;top:50%;width:14px;height:14px;background:#fff;
  border-left:var(--bd) solid var(--ink);border-bottom:var(--bd) solid var(--ink);transform:translateY(-50%) rotate(45deg)}
.xprow{display:flex;align-items:center;gap:12px;margin-bottom:8px;font-family:var(--head);font-weight:600}
.reward{margin-top:12px}

/* adventure path */
.path{position:relative;aspect-ratio:16/10;margin:10px 4px 60px}
.path svg{position:absolute;inset:0;width:100%;height:100%;overflow:visible}
.path path{fill:none;stroke-linecap:round;vector-effect:non-scaling-stroke}
.road-edge{stroke:var(--ink);stroke-width:34px}
.road{stroke:var(--sun-t);stroke-width:26px}
.road-dash{stroke:var(--ink);stroke-width:3px;stroke-dasharray:2 14}
.nodes li{position:absolute;transform:translate(-50%,-34px)}
.node{display:flex;flex-direction:column;align-items:center;gap:8px;width:112px;padding:0;background:none;border:0;cursor:pointer;text-align:center}
.node .circle{position:relative;width:68px;height:68px;border-radius:50%;display:grid;place-items:center;font-size:30px;
  background:#E7E6F0;border:var(--bd) solid var(--ink);box-shadow:0 5px 0 var(--ink)}
.node.done .circle{background:var(--mint)}
.node.current .circle{background:var(--sun)}
.node.current .circle::after{content:'';position:absolute;inset:-10px;border-radius:50%;border:var(--bd) solid var(--coral);
  animation:pulse 1.8s ease-out infinite}
.node .tick{position:absolute;right:-8px;top:-8px;width:26px;height:26px;border-radius:50%;background:#fff;
  border:2px solid var(--ink);display:grid;place-items:center;font-size:14px;font-weight:800}
.node .name{font-family:var(--head);font-weight:600;font-size:.88em;line-height:1.15;background:#fff;
  border:2px solid var(--ink);border-radius:12px;padding:3px 8px}
.node[aria-disabled="true"]{cursor:not-allowed}
.node[aria-disabled="true"] .name{color:var(--muted);border-color:var(--muted)}
@keyframes pulse{0%{transform:scale(.85);opacity:1}100%{transform:scale(1.3);opacity:0}}
.cta{display:flex;flex-wrap:wrap;align-items:center;gap:14px;margin-top:22px}

/* challenge, badges, library, revisit */
.streak{font-family:var(--head);font-weight:700;font-size:1.6rem;margin-bottom:8px}
.result{font-family:var(--head);font-weight:700;font-size:1.2rem}
.badges{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px 10px}
.badge{position:relative;display:flex;flex-direction:column;align-items:center;gap:6px;text-align:center;font-weight:800;font-size:.88em;line-height:1.2}
.medal{width:64px;height:64px;border-radius:50%;display:grid;place-items:center;font-size:30px;background:var(--grape-t);border:var(--bd) solid var(--ink)}
.badge.locked .medal{background:#E7E6F0;opacity:.8}
.badge.locked .bname{color:var(--muted)}
.hint{font-weight:600;font-size:.85em;color:var(--muted)}
.revisit{display:grid;grid-template-columns:repeat(auto-fill,minmax(210px,1fr));gap:16px}
.mini{display:flex;flex-direction:column;gap:8px;align-items:flex-start;padding:16px;background:var(--mint-t);
  border:var(--bd) solid var(--ink);border-radius:calc(var(--radius) * .7)}
.mini h3{font-family:var(--head);font-weight:600;font-size:1.1rem}
.mini .emo{font-size:34px}
.stars{font-size:1.5rem;letter-spacing:2px}
.stars span{color:#fff;-webkit-text-stroke:1.5px var(--ink)}
.stars span.on{color:#FFC93C}

.libitems{display:grid;gap:10px}
.libitem{display:flex;align-items:center;gap:14px;width:100%;text-align:left;cursor:pointer;background:#fff;
  border:var(--bd) solid var(--ink);border-radius:calc(var(--radius) * .6);padding:10px 16px}
.libitem b{display:block;font-family:var(--head);font-weight:600;font-size:1.05em}
.libitem .emo{font-size:28px}
.libitem .desc{display:block;color:var(--muted);font-size:.9em}

/* teen */
.teen-head{margin-bottom:18px}
.teen-head h1{font-family:var(--head);font-weight:700;font-size:clamp(1.6rem,3.4vw,2.2rem)}
.stats{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:16px}
.tile{display:flex;flex-direction:column;gap:2px;padding:14px 16px;border:var(--bd) solid var(--ink);
  border-radius:var(--radius);box-shadow:0 var(--lift) 0 var(--ink)}
.tile b{font-family:var(--head);font-size:1.9rem;line-height:1.1}
.tile .emo{font-size:20px}
.topics{display:grid;gap:14px}
.topic{display:grid;grid-template-columns:auto minmax(0,1fr) 176px;gap:14px;align-items:center}
.topic .btnrow{justify-content:flex-end}
.topic .emo{font-size:26px;width:36px;text-align:center}
.topic-main{display:grid;gap:6px}
.topic.locked .topic-main b{color:var(--muted)}
.xpline{margin-top:8px;font-weight:800}
.feed{display:grid;gap:14px}
.feed li{display:grid;grid-template-columns:auto minmax(0,1fr);gap:12px}
.feed li>div{display:grid;gap:2px}
.board{display:grid;gap:8px}
.board li{display:flex;justify-content:space-between;gap:10px;padding:8px 12px;border-radius:12px}
.board li.me{background:var(--sun);border:2px solid var(--ink)}
.case-title{font-family:var(--head);font-weight:600;font-size:1.1rem;margin-bottom:8px}
.legal{display:grid;gap:12px}

/* dialog, states, toast */
.dlg{width:min(460px,92vw);padding:22px;color:var(--ink);background:#fff;border:var(--bd) solid var(--ink);
  border-radius:var(--radius);box-shadow:0 var(--lift) 0 var(--ink)}
.dlg::backdrop{background:rgba(36,32,74,.55)}
.area{display:block;width:100%;margin:0 0 14px;padding:10px 12px;resize:vertical;background:#fff;
  border:2px solid var(--ink);border-radius:12px}
.state{display:grid;justify-items:center;gap:14px;text-align:center;max-width:420px}
.toastwrap{position:fixed;left:0;right:0;bottom:92px;display:flex;justify-content:center;pointer-events:none;z-index:50;padding:0 16px}
.toast{background:var(--ink);color:#fff;font-weight:800;padding:12px 22px;border-radius:999px;text-align:center}

/* tablet + mobile */
@media (max-width:900px){
  .er{grid-template-columns:minmax(0,1fr)}
  .side{position:fixed;top:auto;bottom:0;left:0;right:0;height:auto;padding:6px 6px calc(6px + env(safe-area-inset-bottom,0px));
    border-right:0;border-top:var(--bd) solid var(--ink);z-index:40}
  .logo{display:none}
  .nav{flex-direction:row;justify-content:space-around;gap:2px}
  .nav button{flex-direction:column;gap:2px;padding:6px 4px;font-size:.72em;text-align:center}
  .main{padding-bottom:110px}
  .row.a,.row.b,.row.c{grid-template-columns:minmax(0,1fr)}
  .stats{grid-template-columns:repeat(2,minmax(0,1fr))}
}
@media (max-width:600px){
  .path{aspect-ratio:1/1.1}
  .node{width:96px}
  .hero{grid-template-columns:minmax(0,1fr);justify-items:start}
  .topic{grid-template-columns:auto minmax(0,1fr)}
  .topic .btnrow{grid-column:1 / -1;justify-content:flex-start}
}
@media (min-width:901px){ .toastwrap{bottom:28px} }
@media (prefers-reduced-motion:reduce){
  .er *,.er *::after{animation:none !important;transition:none !important}
}
`;