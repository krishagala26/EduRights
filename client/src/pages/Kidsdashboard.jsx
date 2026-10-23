
// import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
// import "./KidsDashboard.css";

// /* ========================================================================== */
// /* 1. MOCK DATA                                                               */
// /* ========================================================================== */
// const MOCK_DATA = {
//   user: { name: "Aarav", nickname: "SkyRocket", ageGroup: "8-12", xp: 340, streak: 5, quizzesDone: 2 },
//   // levelThresholds[i] = XP needed to reach level i+1
//   levelThresholds: [0, 100, 250, 450, 700, 1000],
//   nextReward: { emoji: "🎁", label: "Mystery badge" },
//   modules: [
//     { id: "education", emoji: "📚", title: "Right to Education", status: "done", progress: 100, quizScore: 90 },
//     { id: "safety", emoji: "🛡️", title: "Right to Safety", status: "done", progress: 100, quizScore: 80 },
//     { id: "play", emoji: "⚽", title: "Right to Play", status: "current", progress: 40, quizScore: null },
//     { id: "health", emoji: "🩺", title: "Right to Health", status: "locked", progress: 0, quizScore: null },
//     { id: "voice", emoji: "🗣️", title: "Right to Be Heard", status: "locked", progress: 0, quizScore: null },
//     { id: "identity", emoji: "🪪", title: "Right to Identity", status: "locked", progress: 0, quizScore: null },
//   ],
//   badges: [
//     { id: "first", emoji: "🚀", name: "First Steps", earned: true },
//     { id: "streak3", emoji: "🔥", name: "3-Day Streak", earned: true },
//     { id: "quiz90", emoji: "🧠", name: "Quiz Star", earned: true },
//     { id: "reader", emoji: "📚", name: "Bookworm", earned: true },
//     { id: "voice", emoji: "🗣️", name: "Voice of Change", earned: false, hint: "Finish “Right to Be Heard”" },
//     { id: "champ", emoji: "🏆", name: "Rights Champion", earned: false, hint: "Finish all 6 topics" },
//   ],
//   challenge: {
//     xp: 20,
//     question: "True or false: every child has the right to play and rest.",
//     answer: true,
//     explain: "It's true. Children have the right to rest, to play and to join in fun activities.",
//   },
//   activity: [
//     { icon: "🏅", when: "Today", text: "Earned the “3-Day Streak” badge" },
//     { icon: "✅", when: "Yesterday", text: "Scored 80% in the Right to Safety quiz (+40 XP)" },
//     { icon: "📖", when: "2 days ago", text: "Finished the Right to Education topic" },
//   ],
//   leaderboard: [
//     { nick: "MangoNinja", xp: 410 },
//     { nick: "BlueTiger", xp: 310 },
//     { nick: "StarFox", xp: 290 },
//   ],
//   caseOfDay: {
//     title: "Can Maya be asked to leave school?",
//     body: "Maya is 14. Her family asks her to stop school and work at a shop full-time. Which of her rights are involved?",
//   },
//   // FR-08: later, fill this from your laws / awareness API
//   legal: [
//     { id: 1, title: "Explainer: the “best interests of the child” idea" },
//     { id: 2, title: "Guide: who can you talk to when you feel unsafe?" },
//     { id: 3, title: "Explainer: what the UN Convention on the Rights of the Child says" },
//   ],
// };

// async function mockFetchDashboard() {
//   await new Promise((r) => setTimeout(r, 500));
//   return MOCK_DATA;
// }

// /* ========================================================================== */
// /* 2. HELPERS                                                                 */
// /* ========================================================================== */
// const Ctx = createContext(null);
// const useDash = () => useContext(Ctx);

// function levelInfo(xp, thresholds) {
//   let level = 1;
//   thresholds.forEach((need, i) => { if (xp >= need) level = i + 1; });
//   const isMax = level >= thresholds.length;
//   const floor = thresholds[level - 1];
//   const ceil = isMax ? floor : thresholds[level];
//   const pct = isMax ? 100 : Math.round(((xp - floor) / (ceil - floor)) * 100);
//   return { level, pct, toNext: isMax ? 0 : ceil - xp, isMax };
// }

// const starsFor = (score) => (score >= 90 ? 3 : score >= 70 ? 2 : 1);

// function useDashboardData(fetcher) {
//   const [attempt, setAttempt] = useState(0);
//   const [state, setState] = useState({ status: "loading", data: null });
//   useEffect(() => {
//     let alive = true;
//     setState({ status: "loading", data: null });
//     fetcher()
//       .then((data) => alive && setState({ status: "ready", data }))
//       .catch(() => alive && setState({ status: "error", data: null }));
//     return () => { alive = false; };
//   }, [fetcher, attempt]);
//   return [state, () => setAttempt((n) => n + 1)];
// }

// /* ========================================================================== */
// /* 3. SMALL PIECES                                                            */
// /* ========================================================================== */
// function Mascot({ size = 112 }) {
//   const ink = "#24204A";
//   return (
//     <svg viewBox="0 0 120 120" width={size} height={size} role="img" aria-label="Ollie the owl, your guide" style={{ flexShrink: 0 }}>
//       <g stroke={ink} strokeWidth="4" strokeLinejoin="round" strokeLinecap="round">
//         <path d="M26 44 L32 14 L54 32 Z" fill="#8B6CFF" />
//         <path d="M94 44 L88 14 L66 32 Z" fill="#8B6CFF" />
//         <ellipse cx="60" cy="70" rx="38" ry="40" fill="#8B6CFF" />
//         <ellipse cx="22" cy="78" rx="9" ry="20" fill="#6C4CF5" />
//         <ellipse cx="98" cy="78" rx="9" ry="20" fill="#6C4CF5" />
//         <ellipse cx="60" cy="90" rx="20" ry="17" fill="#E4DCFF" />
//         <circle cx="44" cy="58" r="14" fill="#fff" />
//         <circle cx="76" cy="58" r="14" fill="#fff" />
//         <path d="M53 68 L67 68 L60 80 Z" fill="#FFC93C" />
//         <ellipse cx="48" cy="112" rx="10" ry="4" fill="#FFC93C" />
//         <ellipse cx="72" cy="112" rx="10" ry="4" fill="#FFC93C" />
//       </g>
//       <circle cx="46" cy="59" r="6" fill={ink} />
//       <circle cx="74" cy="59" r="6" fill={ink} />
//       <circle cx="48" cy="57" r="2" fill="#fff" />
//       <circle cx="76" cy="57" r="2" fill="#fff" />
//     </svg>
//   );
// }

// function Bar({ pct, label }) {
//   const [w, setW] = useState(0);
//   useEffect(() => {
//     const id = requestAnimationFrame(() => setW(pct));
//     return () => cancelAnimationFrame(id);
//   }, [pct]);
//   return (
//     <div className="bar" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={pct} aria-label={label}>
//       <i style={{ width: `${w}%` }} />
//     </div>
//   );
// }

// function Stars({ score }) {
//   const n = starsFor(score);
//   return (
//     <span className="stars" role="img" aria-label={`${n} out of 3 stars`}>
//       {[1, 2, 3].map((i) => (
//         <span key={i} className={i <= n ? "on" : ""} aria-hidden="true">★</span>
//       ))}
//     </span>
//   );
// }

// function BadgeGrid({ badges }) {
//   return (
//     <ul className="badges">
//       {badges.map((b) => (
//         <li key={b.id} className={`badge ${b.earned ? "" : "locked"}`}>
//           <span className="medal" aria-hidden="true">{b.earned ? b.emoji : "🔒"}</span>
//           <span className="bname">{b.name}</span>
//           {!b.earned && b.hint && <span className="hint">{b.hint}</span>}
//           <span className="sr">{b.earned ? "Earned" : "Locked"}</span>
//         </li>
//       ))}
//     </ul>
//   );
// }

// function FeedbackDialog({ module, onClose, onSend }) {
//   const ref = useRef(null);
//   const [text, setText] = useState("");
//   useEffect(() => {
//     const d = ref.current;
//     if (d && !d.open) d.showModal();
//   }, []);
//   return (
//     <dialog ref={ref} className="dlg" onClose={onClose} aria-labelledby="fb-title">
//       <h2 className="h2" id="fb-title">What did you think of “{module.title}”?</h2>
//       <label className="sr" htmlFor="fb-text">Your feedback</label>
//       <textarea id="fb-text" className="area" rows={4} value={text} onChange={(e) => setText(e.target.value)}
//         placeholder="Tell us what you liked or what was confusing." />
//       <div className="btnrow">
//         <button type="button" className="btn" disabled={!text.trim()} onClick={() => { onSend(text.trim()); ref.current.close(); }}>Send feedback</button>
//         <button type="button" className="btn ghost" onClick={() => ref.current.close()}>Cancel</button>
//       </div>
//     </dialog>
//   );
// }

// /* ========================================================================== */
// /* 4. SECTIONS                                                                */
// /* ========================================================================== */
// function ChallengeCard({ challenge, answered, onAnswer, streak, showStreak }) {
//   return (
//     <section className="card tint-coral" aria-labelledby="chal">
//       {showStreak && <p className="streak"><span aria-hidden="true">🔥</span> {streak}-day streak</p>}
//       <h2 className="h2" id="chal">Daily challenge</h2>
//       <p>{challenge.question}</p>
//       {answered === null ? (
//         <>
//           <div className="btnrow">
//             <button type="button" className="btn" onClick={() => onAnswer(true)}>True</button>
//             <button type="button" className="btn ghost" onClick={() => onAnswer(false)}>False</button>
//           </div>
//           <p><span className="chip light">+{challenge.xp} XP</span></p>
//         </>
//       ) : (
//         <>
//           <p className="result">{answered === challenge.answer ? `Correct! +${challenge.xp} XP` : "Not this time."}</p>
//           <p>{challenge.explain}</p>
//         </>
//       )}
//     </section>
//   );
// }

// function BadgeCard({ badges }) {
//   return (
//     <section className="card" aria-labelledby="mybadges">
//       <h2 className="h2" id="mybadges">Your badges</h2>
//       <BadgeGrid badges={badges} />
//     </section>
//   );
// }

// // Six stops on a winding road. Add more coordinates here if you add more topics.
// const NODE_POS = [[14, 26], [50, 16], [86, 26], [86, 74], [50, 84], [14, 74]];
// const ROAD = "M14 26 Q32 8 50 16 T86 26 C98 32 98 68 86 74 Q68 92 50 84 T14 74";

// function KidsHero({ user, xp, info, nextReward }) {
//   return (
//     <section className="card hero" aria-labelledby="hello">
//       <Mascot size={112} />
//       <div className="hero-body">
//         <h1 id="hello">Hi, {user.name}!</h1>
//         <p className="bubble">
//           {info.isMax ? "You reached the top level. Amazing!" : `Only ${info.toNext} XP to Level ${info.level + 1}. You can do it!`}
//         </p>
//         <div className="xprow">
//           <span className="chip">Level {info.level}</span>
//           <span>{xp} XP</span>
//         </div>
//         <Bar pct={info.pct} label={info.isMax ? "Top level reached" : `${info.toNext} XP to Level ${info.level + 1}`} />
//         <p className="reward"><span aria-hidden="true">{nextReward.emoji}</span> Next reward: <b>{nextReward.label}</b></p>
//       </div>
//     </section>
//   );
// }

// function AdventurePath({ modules }) {
//   const { openModule, openLocked } = useDash();
//   const list = modules.slice(0, NODE_POS.length);
//   const current = list.find((m) => m.status === "current");
//   return (
//     <section className="card" aria-labelledby="adv">
//       <h2 className="h2" id="adv">Your learning adventure</h2>
//       <div className="path">
//         <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true" focusable="false">
//           <path d={ROAD} className="road-edge" />
//           <path d={ROAD} className="road" />
//           <path d={ROAD} className="road-dash" />
//         </svg>
//         <ol className="nodes">
//           {list.map((m, i) => {
//             const [x, y] = NODE_POS[i];
//             const locked = m.status === "locked";
//             const label = m.status === "done" ? "completed" : locked ? "locked" : "in progress";
//             return (
//               <li key={m.id} style={{ left: `${x}%`, top: `${y}%` }}>
//                 <button
//                   type="button"
//                   className={`node ${m.status}`}
//                   aria-disabled={locked}
//                   aria-label={`${m.title}, ${label}`}
//                   onClick={() => (locked ? openLocked(list[i - 1]) : openModule(m))}
//                 >
//                   <span className="circle" aria-hidden="true">
//                     {locked ? "🔒" : m.emoji}
//                     {m.status === "done" && <span className="tick">✓</span>}
//                   </span>
//                   <span className="name">{m.title}</span>
//                 </button>
//               </li>
//             );
//           })}
//         </ol>
//       </div>
//       {current && (
//         <div className="cta">
//           <button type="button" className="btn big" onClick={() => openModule(current)}>Continue: {current.title}</button>
//           <span className="muted">{current.progress}% done</span>
//         </div>
//       )}
//     </section>
//   );
// }

// function LibraryCard() {
//   const { go } = useDash();
//   const items = [
//     ["📰", "Articles", "Short reads about your rights"],
//     ["❓", "FAQs", "Quick answers to big questions"],
//     ["⚖️", "Cases", "Real-life examples to think through"],
//   ];
//   return (
//     <section className="card tint-sky" aria-labelledby="lib">
//       <h2 className="h2" id="lib">Rights library</h2>
//       <ul className="libitems">
//         {items.map(([emo, name, desc]) => (
//           <li key={name}>
//             <button type="button" className="libitem" onClick={() => go("hub", name)}>
//               <span className="emo" aria-hidden="true">{emo}</span>
//               <span><b>{name}</b><span className="desc">{desc}</span></span>
//             </button>
//           </li>
//         ))}
//       </ul>
//     </section>
//   );
// }

// function RevisitRow({ modules }) {
//   const { openModule, askFeedback } = useDash();
//   const done = modules.filter((m) => m.status === "done");
//   if (!done.length) return null;
//   return (
//     <section className="card" aria-labelledby="rev">
//       <h2 className="h2" id="rev">Revisit a topic</h2>
//       <div className="revisit">
//         {done.map((m) => (
//           <article key={m.id} className="mini">
//             <span className="emo" aria-hidden="true">{m.emoji}</span>
//             <h3>{m.title}</h3>
//             <Stars score={m.quizScore} />
//             <div className="btnrow">
//               <button type="button" className="btn sm" onClick={() => openModule(m)}>Read again</button>
//               <button type="button" className="btn ghost sm" onClick={() => askFeedback(m)}>Feedback</button>
//             </div>
//           </article>
//         ))}
//       </div>
//     </section>
//   );
// }

// /* ========================================================================== */
// /* 5. PAGE                                                                    */
// /* ========================================================================== */
// const NAV = [
//   ["dashboard", "🏠", "Dashboard"],
//   ["modules", "🧩", "Modules"],
//   ["hub", "📖", "Knowledge hub"],
//   ["badges", "🏅", "Badges"],
//   ["profile", "👤", "Profile"],
// ];

// export default function KidsDashboard({
//   fetcher = mockFetchDashboard,
//   onNavigate,
//   onOpenModule,
//   onSendFeedback,
// }) {
//   const [toast, setToast] = useState(null);
//   const [answered, setAnswered] = useState(null); // null | true | false
//   const [bonusXp, setBonusXp] = useState(0);
//   const [feedbackFor, setFeedbackFor] = useState(null);
//   const [{ status, data }, retry] = useDashboardData(fetcher);

//   const say = useCallback((msg) => setToast({ msg, id: Date.now() }), []);
//   useEffect(() => {
//     if (!toast) return undefined;
//     const id = setTimeout(() => setToast(null), 2800);
//     return () => clearTimeout(id);
//   }, [toast]);

//   const toastBox = (
//     <div className="toastwrap" role="status" aria-live="polite">
//       {toast && <div className="toast" key={toast.id}>{toast.msg}</div>}
//     </div>
//   );

//   /* ---- loading / error ---- */
//   if (status !== "ready") {
//     return (
//       <div className="er solo" data-mode="kids">
//         <main className="main center">
//           <div className="card state" role={status === "error" ? "alert" : "status"}>
//             <Mascot size={96} />
//             {status === "loading" ? (
//               <p className="h2">Loading your dashboard…</p>
//             ) : (
//               <>
//                 <p className="h2">We could not load your dashboard.</p>
//                 <p>Check your connection and try again.</p>
//                 <button type="button" className="btn" onClick={retry}>Try again</button>
//               </>
//             )}
//           </div>
//         </main>
//       </div>
//     );
//   }

//   const xp = data.user.xp + bonusXp;
//   const info = levelInfo(xp, data.levelThresholds);
//   const { challenge } = data;

//   const answerChallenge = (choice) => {
//     setAnswered(choice);
//     if (choice !== challenge.answer) {
//       say("Not this time. Read the answer below.");
//       return;
//     }
//     const before = levelInfo(xp, data.levelThresholds).level;
//     const after = levelInfo(xp + challenge.xp, data.levelThresholds).level;
//     setBonusXp((b) => b + challenge.xp);
//     say(after > before ? `Level up! You reached Level ${after}.` : `Correct! +${challenge.xp} XP`);
//   };

//   const ctx = {
//     say,
//     openModule: (m) => {
//       if (onOpenModule) onOpenModule(m.id);
//       else say(`“${m.title}” will open here once the module page is connected.`);
//     },
//     openLocked: (prev) => say(prev ? `Finish “${prev.title}” first to unlock this topic.` : "This topic is locked."),
//     go: (id, label) => {
//       if (onNavigate) onNavigate(id);
//       else if (id !== "dashboard") say(`The ${label} page is not connected yet.`);
//     },
//     askFeedback: (m) => setFeedbackFor(m),
//   };

//   const challengeCard = (
//     <ChallengeCard challenge={challenge} answered={answered} onAnswer={answerChallenge} streak={data.user.streak} showStreak />
//   );

//   return (
//     <Ctx.Provider value={ctx}>
//       <div className="er" data-mode="kids">
//         <nav className="side" aria-label="Main">
//           <div className="logo"><span aria-hidden="true">🦉</span> EduRights</div>
//           <ul className="nav">
//             {NAV.map(([id, emo, label]) => (
//               <li key={id}>
//                 <button type="button" aria-current={id === "dashboard" ? "page" : undefined} onClick={() => ctx.go(id, label)}>
//                   <span aria-hidden="true">{emo}</span>
//                   <span>{label}</span>
//                 </button>
//               </li>
//             ))}
//           </ul>
//         </nav>

//         <main className="main">
//           <div className="top">
//             <span className="avatar" aria-hidden="true">{data.user.name.charAt(0)}</span>
//           </div>

//           <KidsHero user={data.user} xp={xp} info={info} nextReward={data.nextReward} />
//           <div className="row a">
//             <AdventurePath modules={data.modules} />
//             {challengeCard}
//           </div>
//           <div className="row c">
//             <BadgeCard badges={data.badges} />
//             <LibraryCard />
//           </div>
//           <div className="row"><RevisitRow modules={data.modules} /></div>
//         </main>

//         {feedbackFor && (
//           <FeedbackDialog
//             module={feedbackFor}
//             onClose={() => setFeedbackFor(null)}
//             onSend={(text) => {
//               onSendFeedback?.({ moduleId: feedbackFor.id, text });
//               say("Thanks! Your feedback was sent.");
//             }}
//           />
//         )}
//         {toastBox}
//       </div>
//     </Ctx.Provider>
//   );
// }

/**
 * EduRights – Kids Dashboard (ages 8-12)      src/pages/KidsDashboard.jsx
 * ---------------------------------------------------------------------------
 * Covers: FR-01 (personalised dashboard), FR-04 (levels, points, rewards),
 *         FR-05 (scores, badges, level), FR-06 (revisit topics),
 *         FR-09 (feedback on completed modules), FR-11 (child-friendly, responsive)
 *
 * STANDALONE: needs only React. No login, no router, no backend.
 * All data comes from MOCK_DATA below, so the page works on its own.
 * Styles live in KidsDashboard.css.
 *
 * WHEN YOUR BACKEND IS READY (later, not needed now)
 *   <KidsDashboard fetcher={() => fetch("/api/dashboard").then(r => r.json())} />
 *   Return the same shape as MOCK_DATA and nothing else changes.
 *
 * OPTIONAL PROPS
 *   userName        string              the logged-in user's name (replaces the mock name)
 *   fetcher         () => Promise<data> replace the mock data
 *   onNavigate      (id) => void        sidebar clicks: "modules" | "hub" | "badges" | "profile"
 *   onOpenModule    (moduleId) => void  when a topic is opened
 *   onSendFeedback  ({moduleId, text})  when feedback is sent
 */
import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import "./KidsDashboard.css";

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
/* 4. SECTIONS                                                                */
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
/* 5. PAGE                                                                    */
/* ========================================================================== */
const NAV = [
  ["dashboard", "🏠", "Dashboard"],
  ["modules", "🧩", "Modules"],
  ["hub", "📖", "Knowledge hub"],
  ["badges", "🏅", "Badges"],
  ["profile", "👤", "Profile"],
];

export default function KidsDashboard({
  userName,
  fetcher = mockFetchDashboard,
  onNavigate,
  onOpenModule,
  onSendFeedback,
}) {
  const [toast, setToast] = useState(null);
  const [answered, setAnswered] = useState(null); // null | true | false
  const [bonusXp, setBonusXp] = useState(0);
  const [feedbackFor, setFeedbackFor] = useState(null);
  const [{ status, data }, retry] = useDashboardData(fetcher);

  const say = useCallback((msg) => setToast({ msg, id: Date.now() }), []);
  useEffect(() => {
    if (!toast) return undefined;
    const id = setTimeout(() => setToast(null), 2800);
    return () => clearTimeout(id);
  }, [toast]);

  const toastBox = (
    <div className="toastwrap" role="status" aria-live="polite">
      {toast && <div className="toast" key={toast.id}>{toast.msg}</div>}
    </div>
  );

  /* ---- loading / error ---- */
  if (status !== "ready") {
    return (
      <div className="er solo" data-mode="kids">
        <main className="main center">
          <div className="card state" role={status === "error" ? "alert" : "status"}>
            <Mascot size={96} />
            {status === "loading" ? (
              <p className="h2">Loading your dashboard…</p>
            ) : (
              <>
                <p className="h2">We could not load your dashboard.</p>
                <p>Check your connection and try again.</p>
                <button type="button" className="btn" onClick={retry}>Try again</button>
              </>
            )}
          </div>
        </main>
      </div>
    );
  }

  // Use the logged-in user's name when one is passed in, otherwise the data's name
  const user = { ...data.user, name: userName || data.user.name };
  const xp = data.user.xp + bonusXp;
  const info = levelInfo(xp, data.levelThresholds);
  const { challenge } = data;

  const answerChallenge = (choice) => {
    setAnswered(choice);
    if (choice !== challenge.answer) {
      say("Not this time. Read the answer below.");
      return;
    }
    const before = levelInfo(xp, data.levelThresholds).level;
    const after = levelInfo(xp + challenge.xp, data.levelThresholds).level;
    setBonusXp((b) => b + challenge.xp);
    say(after > before ? `Level up! You reached Level ${after}.` : `Correct! +${challenge.xp} XP`);
  };

  const ctx = {
    say,
    openModule: (m) => {
      if (onOpenModule) onOpenModule(m.id);
      else say(`“${m.title}” will open here once the module page is connected.`);
    },
    openLocked: (prev) => say(prev ? `Finish “${prev.title}” first to unlock this topic.` : "This topic is locked."),
    go: (id, label) => {
      if (onNavigate) onNavigate(id);
      else if (id !== "dashboard") say(`The ${label} page is not connected yet.`);
    },
    askFeedback: (m) => setFeedbackFor(m),
  };

  const challengeCard = (
    <ChallengeCard challenge={challenge} answered={answered} onAnswer={answerChallenge} streak={data.user.streak} showStreak />
  );

  return (
    <Ctx.Provider value={ctx}>
      <div className="er" data-mode="kids">
        <nav className="side" aria-label="Main">
          <div className="logo"><span aria-hidden="true">🦉</span> EduRights</div>
          <ul className="nav">
            {NAV.map(([id, emo, label]) => (
              <li key={id}>
                <button type="button" aria-current={id === "dashboard" ? "page" : undefined} onClick={() => ctx.go(id, label)}>
                  <span aria-hidden="true">{emo}</span>
                  <span>{label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <main className="main">
          <div className="top">
            <span className="avatar" aria-hidden="true">{user.name.charAt(0)}</span>
          </div>

          <KidsHero user={user} xp={xp} info={info} nextReward={data.nextReward} />
          <div className="row a">
            <AdventurePath modules={data.modules} />
            {challengeCard}
          </div>
          <div className="row c">
            <BadgeCard badges={data.badges} />
            <LibraryCard />
          </div>
          <div className="row"><RevisitRow modules={data.modules} /></div>
        </main>

        {feedbackFor && (
          <FeedbackDialog
            module={feedbackFor}
            onClose={() => setFeedbackFor(null)}
            onSend={(text) => {
              onSendFeedback?.({ moduleId: feedbackFor.id, text });
              say("Thanks! Your feedback was sent.");
            }}
          />
        )}
        {toastBox}
      </div>
    </Ctx.Provider>
  );
}