
// import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
// import "./TeenDashboard.css";

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
// function ChallengeCard({ challenge, answered, onAnswer }) {
//   return (
//     <section className="card tint-coral" aria-labelledby="chal">
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

// function StatTiles({ user, xp, info }) {
//   const tiles = [
//     ["⚡", xp, "Total XP", "sun"],
//     ["🎯", info.level, "Level", "grape"],
//     ["🔥", user.streak, "Day streak", "coral"],
//     ["✅", user.quizzesDone, "Quizzes done", "mint"],
//   ];
//   return (
//     <ul className="stats">
//       {tiles.map(([emo, val, label, tone]) => (
//         <li key={label} className={`tile tint-${tone}`}>
//           <span className="emo" aria-hidden="true">{emo}</span>
//           <b>{val}</b>
//           <span>{label}</span>
//         </li>
//       ))}
//     </ul>
//   );
// }

// function TopicList({ modules }) {
//   const { openModule, openLocked, askFeedback } = useDash();
//   return (
//     <section className="card" aria-labelledby="topics">
//       <h2 className="h2" id="topics">Topic progress</h2>
//       <ul className="topics">
//         {modules.map((m, i) => {
//           const locked = m.status === "locked";
//           return (
//             <li key={m.id} className={`topic ${m.status}`}>
//               <span className="emo" aria-hidden="true">{locked ? "🔒" : m.emoji}</span>
//               <div className="topic-main">
//                 <b>{m.title}</b>
//                 <Bar pct={m.progress} label={`${m.title}: ${m.progress}% done`} />
//               </div>
//               <div className="btnrow">
//                 {m.status === "done" && (
//                   <>
//                     <button type="button" className="btn ghost sm" onClick={() => openModule(m)}>Review</button>
//                     <button type="button" className="btn ghost sm" onClick={() => askFeedback(m)}>Feedback</button>
//                   </>
//                 )}
//                 {m.status === "current" && <button type="button" className="btn sm" onClick={() => openModule(m)}>Continue</button>}
//                 {m.status === "open" && <button type="button" className="btn sm" onClick={() => openModule(m)}>Start</button>}
//                 {locked && (
//                   <button type="button" className="btn ghost sm" aria-disabled="true" aria-label={`${m.title}, locked`} onClick={() => openLocked(modules[i - 1])}>
//                     Locked
//                   </button>
//                 )}
//               </div>
//             </li>
//           );
//         })}
//       </ul>
//     </section>
//   );
// }

// function LevelCard({ info, nextReward }) {
//   const text = info.isMax ? "Top level reached" : `${info.toNext} XP to Level ${info.level + 1}`;
//   return (
//     <section className="card tint-grape" aria-labelledby="lvl">
//       <h2 className="h2" id="lvl">Level {info.level}</h2>
//       <Bar pct={info.pct} label={text} />
//       <p className="xpline">{text}</p>
//       <p className="reward"><span aria-hidden="true">{nextReward.emoji}</span> Next reward: <b>{nextReward.label}</b></p>
//     </section>
//   );
// }

// function ActivityCard({ items }) {
//   return (
//     <section className="card" aria-labelledby="act">
//       <h2 className="h2" id="act">Recent activity</h2>
//       <ul className="feed">
//         {items.map((a, i) => (
//           <li key={i}>
//             <span className="emo" aria-hidden="true">{a.icon}</span>
//             <div><span>{a.text}</span><span className="muted small">{a.when}</span></div>
//           </li>
//         ))}
//       </ul>
//     </section>
//   );
// }

// function BoardCard({ user, xp, rows }) {
//   const all = [...rows, { nick: user.nickname, xp, me: true }].sort((a, b) => b.xp - a.xp);
//   return (
//     <section className="card" aria-labelledby="lb">
//       <h2 className="h2" id="lb">Leaderboard</h2>
//       <ol className="board">
//         {all.map((r) => (
//           <li key={r.nick} className={r.me ? "me" : ""}>
//             <span>{r.nick}{r.me ? " (you)" : ""}</span>
//             <b>{r.xp} XP</b>
//           </li>
//         ))}
//       </ol>
//     </section>
//   );
// }

// function CaseCard({ item }) {
//   const { go } = useDash();
//   return (
//     <section className="card tint-sun" aria-labelledby="case">
//       <h2 className="h2" id="case">Case of the day</h2>
//       <h3 className="case-title">{item.title}</h3>
//       <p>{item.body}</p>
//       <button type="button" className="btn sm" onClick={() => go("hub", "Case of the day")}>Read the case</button>
//     </section>
//   );
// }

// function LegalCard({ items }) {
//   const { go } = useDash();
//   return (
//     <section className="card" aria-labelledby="legal">
//       <h2 className="h2" id="legal">Laws and awareness</h2>
//       <ul className="legal">
//         {items.map((x) => (
//           <li key={x.id}>
//             <button type="button" className="linkbtn" onClick={() => go("hub", "Laws and awareness")}>{x.title}</button>
//           </li>
//         ))}
//       </ul>
//     </section>
//   );
// }

// /* ========================================================================== */
// /* 5. PAGE                                                                    */
// /* ========================================================================== */
// const NAV = [
//   ["dashboard", "🏠", "Dashboard"],
//   ["modules", "🧩", "Modules", true], // locked: modules for ages 13-16 are not built yet
//   ["hub", "📖", "Knowledge hub"],
//   ["badges", "🏅", "Badges"],
//   ["profile", "👤", "Profile"],
// ];

// export default function TeenDashboard({
//   userName,
//   fetcher = mockFetchDashboard,
//   onNavigate,
//   onOpenModule,
//   onSendFeedback,
// }) {
//   const [toast, setToast] = useState(null);
//   const [answered, setAnswered] = useState(null); // null | true | false
//   const [bonusXp, setBonusXp] = useState(0);
//   const [bonusActivity, setBonusActivity] = useState([]);
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
//       <div className="er solo" data-mode="teen">
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

//   // Use the logged-in user's name when one is passed in, otherwise the data's name
//   const user = {
//     ...data.user,
//     name: userName || data.user.name,
//     nickname: userName || data.user.nickname,
//   };
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
//     setBonusActivity([{ icon: "⚡", when: "Just now", text: `Answered the daily challenge (+${challenge.xp} XP)` }]);
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
//       if (onNavigate) {
//         // onNavigate returns false when that page has no route yet
//         if (onNavigate(id) === false) say(`The ${label} page is not connected yet.`);
//       } else if (id !== "dashboard") {
//         say(`The ${label} page is not connected yet.`);
//       }
//     },
//     askFeedback: (m) => setFeedbackFor(m),
//   };

//   const challengeCard = (
//     <ChallengeCard challenge={challenge} answered={answered} onAnswer={answerChallenge} />
//   );

//   return (
//     <Ctx.Provider value={ctx}>
//       <div className="er" data-mode="teen">
//         <nav className="side" aria-label="Main">
//           <div className="logo"><span aria-hidden="true">🦉</span> EduRights</div>
//           <ul className="nav">
//             {NAV.map(([id, emo, label, locked]) => (
//               <li key={id}>
//                 <button
//                   type="button"
//                   className={locked ? "locked" : undefined}
//                   aria-current={id === "dashboard" ? "page" : undefined}
//                   aria-disabled={locked ? "true" : undefined}
//                   aria-label={locked ? `${label}, locked` : undefined}
//                   onClick={() => (locked ? say("Modules for ages 13-16 are coming soon!") : ctx.go(id, label))}
//                 >
//                   <span aria-hidden="true">{locked ? "🔒" : emo}</span>
//                   <span>{label}</span>
//                 </button>
//               </li>
//             ))}
//           </ul>
//         </nav>

//         <main className="main">
//           <div className="top">
//             <span className="avatar" aria-hidden="true">{user.name.charAt(0)}</span>
//           </div>

//           <header className="teen-head">
//             <h1>Welcome back, {user.name}</h1>
//             <p className="muted"><span aria-hidden="true">🔥</span> {user.streak}-day streak</p>
//           </header>
//           <StatTiles user={user} xp={xp} info={info} />
//           <div className="row a">
//             <TopicList modules={data.modules} />
//             <div className="stack">
//               <LevelCard info={info} nextReward={data.nextReward} />
//               {challengeCard}
//             </div>
//           </div>
//           <div className="row b">
//             <ActivityCard items={[...bonusActivity, ...data.activity]} />
//             <BadgeCard badges={data.badges} />
//             <BoardCard user={user} xp={xp} rows={data.leaderboard} />
//           </div>
//           <div className="row c">
//             <CaseCard item={data.caseOfDay} />
//             <LegalCard items={data.legal} />
//           </div>
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


import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import "./TeenDashboard.css";
import TeenModules from "./TeenModules";

/* ========================================================================== */
/* 1. MOCK DATA (Aligned with the 6 Teen Modules)                             */
/* ========================================================================== */
const MOCK_DATA = {
  user: { name: "Aarav", nickname: "SkyRocket", ageGroup: "13-16", xp: 340, streak: 5, quizzesDone: 2 },
  levelThresholds: [0, 100, 250, 450, 700, 1000],
  nextReward: { emoji: "🎁", label: "Mystery badge" },
  modules: [
    { id: "digital-fingerprint", emoji: "💻", title: "The Digital Fingerprint", status: "done", progress: 100, quizScore: 90 },
    { id: "consent-boundaries", emoji: "🛡️", title: "Consent & Boundaries", status: "current", progress: 40, quizScore: null },
    { id: "juvenile-justice", emoji: "⚖️", title: "Voices, Not Verdicts", status: "locked", progress: 0, quizScore: null },
    { id: "adolescent-labour", emoji: "⚙️", title: "Work Smart, Stay Safe", status: "locked", progress: 0, quizScore: null },
    { id: "consumer-rights", emoji: "🛒", title: "The Consumer Teen", status: "locked", progress: 0, quizScore: null },
    { id: "grievance-portals", emoji: "📞", title: "Direct Line to Help", status: "locked", progress: 0, quizScore: null },
  ],
  badges: [
    { id: "first", emoji: "🛡️", name: "Digital Defender", earned: true },
    { id: "streak3", emoji: "🔥", name: "3-Day Streak", earned: true },
    { id: "quiz90", emoji: "🧠", name: "Quiz Star", earned: true },
    { id: "safecircle", emoji: "🤝", name: "Safe Circle", earned: false, hint: "Finish “Consent & Boundaries”" },
    { id: "voice", emoji: "⚖️", name: "Justice Advocate", earned: false, hint: "Finish “Voices, Not Verdicts”" },
    { id: "champ", emoji: "🏆", name: "Rights Champion", earned: false, hint: "Finish all 6 modules" },
  ],
  challenge: {
    xp: 20,
    question: "True or false: Under the IT Rules (amended 2026), platforms must act on complaints about intimate or morphed images within 2 hours.",
    answer: true,
    explain: "It's true. The February 2026 amendment cut the takedown deadline for such complaints from 24 hours down to 2 hours.",
  },
  activity: [
    { icon: "🏅", when: "Today", text: "Earned the “3-Day Streak” badge" },
    { icon: "✅", when: "Yesterday", text: "Scored 90% in The Digital Fingerprint quiz (+40 XP)" },
    { icon: "📖", when: "2 days ago", text: "Finished The Digital Fingerprint module" },
  ],
  leaderboard: [
    { nick: "MangoNinja", xp: 410 },
    { nick: "BlueTiger", xp: 310 },
    { nick: "StarFox", xp: 290 },
  ],
  caseOfDay: {
    title: "Can Maya be asked to leave school?",
    body: "Maya is 14. Her family asks her to stop school and work at a shop full-time. Which of her rights under the Child and Adolescent Labour Act are involved?",
  },
  legal: [
    { id: 1, title: "Explainer: IT Act, 2000 & DPDP Act, 2023 for Teens" },
    { id: 2, title: "Guide: Reporting anonymously via POCSO e-Box & 1098" },
    { id: 3, title: "Explainer: Juvenile Justice Act, 2015 in plain words" },
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
function ChallengeCard({ challenge, answered, onAnswer }) {
  return (
    <section className="card tint-coral" aria-labelledby="chal">
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
/* 5. PAGE                                                                    */
/* ========================================================================== */
const NAV = [
  ["dashboard", "🏠", "Dashboard"],
  ["modules", "🧩", "Modules"],
  ["hub", "📖", "Knowledge hub"],
  ["badges", "🏅", "Badges"],
  ["profile", "👤", "Profile"],
];

export default function TeenDashboard({
  userName,
  fetcher = mockFetchDashboard,
  onNavigate,
  onOpenModule,
  onSendFeedback,
}) {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [selectedSlug, setSelectedSlug] = useState(null);
  const [toast, setToast] = useState(null);
  const [answered, setAnswered] = useState(null);
  const [bonusXp, setBonusXp] = useState(0);
  const [bonusActivity, setBonusActivity] = useState([]);
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
      <div className="er solo" data-mode="teen">
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

  const user = {
    ...data.user,
    name: userName || data.user.name,
    nickname: userName || data.user.nickname,
  };
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
    setBonusActivity((prev) => [{ icon: "⚡", when: "Just now", text: `Answered the daily challenge (+${challenge.xp} XP)` }, ...prev]);
    say(after > before ? `Level up! You reached Level ${after}.` : `Correct! +${challenge.xp} XP`);
  };

  const handleEarnXp = (pts, reason) => {
    setBonusXp((b) => b + pts);
    setBonusActivity((prev) => [{ icon: "🏆", when: "Just now", text: `${reason} (+${pts} XP)` }, ...prev]);
    say(`Awesome! +${pts} XP earned!`);
  };

  const ctx = {
    say,
    openModule: (m) => {
      if (onOpenModule) {
        onOpenModule(m.id);
      } else {
        setSelectedSlug(m.id);
        setActiveTab("modules");
      }
    },
    openLocked: (prev) => say(prev ? `Finish “${prev.title}” first to unlock this topic.` : "This topic is locked."),
    go: (id, label) => {
      if (id === "dashboard" || id === "modules") {
        setActiveTab(id);
        if (id === "dashboard") setSelectedSlug(null);
      } else if (onNavigate) {
        onNavigate(id);
      } else {
        say(`The ${label} page is not connected yet.`);
      }
    },
    askFeedback: (m) => setFeedbackFor(m),
  };

  return (
    <Ctx.Provider value={ctx}>
      <div className="er" data-mode="teen">
        <nav className="side" aria-label="Main">
          <div className="logo"><span aria-hidden="true">🦉</span> EduRights</div>
          <ul className="nav">
            {NAV.map(([id, emo, label]) => (
              <li key={id}>
                <button
                  type="button"
                  aria-current={activeTab === id ? "page" : undefined}
                  onClick={() => ctx.go(id, label)}
                >
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

          {activeTab === "dashboard" ? (
            <>
              <header className="teen-head">
                <h1>Welcome back, {user.name}</h1>
                <p className="muted"><span aria-hidden="true">🔥</span> {user.streak}-day streak</p>
              </header>
              <StatTiles user={user} xp={xp} info={info} />
              <div className="row a">
                <TopicList modules={data.modules} />
                <div className="stack">
                  <LevelCard info={info} nextReward={data.nextReward} />
                  <ChallengeCard challenge={challenge} answered={answered} onAnswer={answerChallenge} />
                </div>
              </div>
              <div className="row b">
                <ActivityCard items={[...bonusActivity, ...data.activity]} />
                <BadgeCard badges={data.badges} />
                <BoardCard user={user} xp={xp} rows={data.leaderboard} />
              </div>
              <div className="row c">
                <CaseCard item={data.caseOfDay} />
                <LegalCard items={data.legal} />
              </div>
            </>
          ) : (
            <TeenModules
              initialSlug={selectedSlug}
              onSelectSlug={setSelectedSlug}
              onBackToDashboard={() => {
                setSelectedSlug(null);
                setActiveTab("dashboard");
              }}
              onEarnXp={handleEarnXp}
              notify={say}
            />
          )}
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