import { useEffect, useState } from "react";


import digitalFingerprint from '../components/Teenmodule/digitalFingerprint.js';
import consentBoundaries from '../components/Teenmodule/consentBoundaries.js';
import juvenileJustice from '../components/Teenmodule/juvenileJustice.js';
import adolescentLabour from '../components/Teenmodule/adolescentLabour.js';



/* ========================================================================== */
/* 1. MODULE CATALOG & CONNECTED CONTENT MAP                                  */
/* ========================================================================== */
export const teenModules = [
  {
    id: 1,
    slug: "digital-fingerprint",
    title: "Module 1: The Digital Fingerprint (Privacy & Cyber Laws)",
    name: "The Digital Fingerprint",
    topic: "Cyber Safety & Data Privacy",
    icon: "💻",
    coreTheme: "The IT Act, 2000, cyberbullying, and digital footprints.",
    path: "/modules/digital-fingerprint",
    tone: "mint",
    animated: true,
  },
  {
    id: 2,
    slug: "consent-boundaries",
    title: "Module 2: Consent & Boundaries (Youth Protection)",
    name: "Consent & Boundaries",
    topic: "Personal Safety & POCSO",
    icon: "🛡️",
    coreTheme: "The POCSO Act, 2012, recognizing coercion, and bodily autonomy.",
    path: "/modules/consent-boundaries",
    tone: "coral",
  },
  {
    id: 3,
    slug: "juvenile-justice",
    title: "Module 3: Voices, Not Verdicts (Juvenile Justice)",
    name: "Voices, Not Verdicts",
    topic: "Juvenile Justice Rights",
    icon: "⚖️",
    coreTheme: "The Juvenile Justice Act, 2015, and rights of minors.",
    path: "/modules/juvenile-justice",
    tone: "sky",
  },
  {
    id: 4,
    slug: "adolescent-labour",
    title: "Module 4: Work Smart, Stay Safe (Adolescent Labour)",
    name: "Work Smart, Stay Safe",
    topic: "Adolescent Labour Laws",
    icon: "⚙️",
    coreTheme: "Child vs. Adolescent rules under the Child Labour Act, 1986.",
    path: "/modules/adolescent-labour",
    tone: "sun",
  },
  {
    id: 5,
    slug: "consumer-rights",
    title: "Module 5: The Consumer Teen (Scams & E-Commerce)",
    name: "The Consumer Teen",
    topic: "Digital Consumer Rights",
    icon: "🛒",
    coreTheme: "Consumer Protection Act, 2019, spotting online scams and phishing.",
    path: "/modules/consumer-rights",
    tone: "grape",
  },
  {
    id: 6,
    slug: "grievance-portals",
    title: "Module 6: Direct Line to Help (Grievance & Action)",
    name: "Direct Line to Help",
    topic: "Emergency Action & Portals",
    icon: "📞",
    coreTheme: "Using e-BaalNidan and 1098 for confidential grievance redressal.",
    path: "/modules/grievance-portals",
    tone: "emerald",
    animated: true,
  },
];

// Map connected module data by slug
const MODULE_CONTENT = {
  "digital-fingerprint": digitalFingerprint,
  "consent-boundaries": consentBoundaries,
  "juvenile-justice": juvenileJustice,
  "adolescent-labour": adolescentLabour,
};

/* ========================================================================== */
/* 2. INTERACTIVE MODULE READER (For Module 1 & Module 2)                     */
/* ========================================================================== */
function ModuleReader({ content, onBack, onEarnXp }) {
  const [tab, setTab] = useState("scenarios"); // "scenarios" | "learn" | "quiz" | "action"
  const [scenarioIdx, setScenarioIdx] = useState(0);
  const [pickedChoices, setPickedChoices] = useState({});
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [checkedActions, setCheckedActions] = useState({});

  const SceneComponent = content.scene;
  const activeScenario = content.scenarios[scenarioIdx];

  const handleSubmitQuiz = () => {
    if (quizSubmitted) return;
    setQuizSubmitted(true);
    let earned = 0;
    content.quiz.questions.forEach((q) => {
      if (quizAnswers[q.id] === q.correctOptionId) earned += q.xp || 10;
    });
    if (earned > 0 && onEarnXp) {
      onEarnXp(earned, `Completed ${content.title} Quiz`);
    }
  };

  return (
    <div className="stack" style={{ gap: "1.25rem" }}>
      <div className="btnrow" style={{ justifyContent: "space-between", alignItems: "center" }}>
        <button type="button" className="btn ghost sm" onClick={onBack}>
          ← All Teen Modules
        </button>
        <span className="chip light">⏱️ {content.minutes} mins</span>
      </div>

      {/* Header Banner */}
      <section className={`card tint-${content.tone}`}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <span className="emo" style={{ fontSize: "2.2rem" }} aria-hidden="true">{content.emoji}</span>
          <div>
            <p className="muted small" style={{ margin: 0 }}>Module {content.number} · {content.topic}</p>
            <h1 className="h2" style={{ margin: "0.2rem 0" }}>{content.title}</h1>
            <p className="small" style={{ margin: 0 }}>{content.coreTheme}</p>
          </div>
        </div>
        {content.note && (
          <p className="card" style={{ marginTop: "1rem", background: "rgba(255,255,255,0.75)", padding: "0.75rem" }}>
            <strong>Note:</strong> {content.note}
          </p>
        )}
      </section>

      {/* Hook Card */}
      {content.hook && (
        <section className="card">
          <h2 className="h2">{content.hook.label}</h2>
          <p>{content.hook.text}</p>
          {SceneComponent && (
            <div style={{ marginTop: "1rem" }}>
              <SceneComponent />
            </div>
          )}
        </section>
      )}

      {/* Section Navigation */}
      <div className="btnrow">
        <button type="button" className={`btn sm ${tab === "scenarios" ? "" : "ghost"}`} onClick={() => setTab("scenarios")}>
          1. Scenarios ({content.scenarios.length})
        </button>
        <button type="button" className={`btn sm ${tab === "learn" ? "" : "ghost"}`} onClick={() => setTab("learn")}>
          2. Know the Facts
        </button>
        <button type="button" className={`btn sm ${tab === "quiz" ? "" : "ghost"}`} onClick={() => setTab("quiz")}>
          3. Quiz ({content.quiz.questions.length})
        </button>
        <button type="button" className={`btn sm ${tab === "action" ? "" : "ghost"}`} onClick={() => setTab("action")}>
          4. Action Toolkit
        </button>
      </div>

      {/* TAB 1: SCENARIOS */}
      {tab === "scenarios" && activeScenario && (
        <section className="card">
          <div className="btnrow" style={{ marginBottom: "1rem" }}>
            {content.scenarios.map((s, idx) => (
              <button
                key={s.id}
                type="button"
                className={`btn sm ${idx === scenarioIdx ? "" : "ghost"}`}
                onClick={() => setScenarioIdx(idx)}
              >
                Scenario {idx + 1}: {s.title}
              </button>
            ))}
          </div>

          <h2 className="h2">{activeScenario.title}</h2>
          <p className="muted">{activeScenario.context}</p>

          {/* Chat messages */}
          <ul className="feed" style={{ margin: "1rem 0", padding: "1rem", background: "rgba(0,0,0,0.03)", borderRadius: "12px" }}>
            {activeScenario.messages.map((m, i) => (
              <li key={i} style={{ marginBottom: "0.5rem" }}>
                {m.from ? <b>{m.from}: </b> : <em className="muted">[System] </em>}
                <span>{m.text}</span>
              </li>
            ))}
          </ul>

          {/* Interactive Decision Steps */}
          {activeScenario.steps.map((st) => {
            const key = `${activeScenario.id}_${st.id}`;
            const chosen = pickedChoices[key];
            return (
              <div key={st.id} className="card" style={{ marginTop: "1rem" }}>
                <p><b>{st.prompt}</b></p>
                <div className="stack" style={{ gap: "0.5rem" }}>
                  {st.choices.map((c) => {
                    const isSelected = chosen?.id === c.id;
                    return (
                      <button
                        key={c.id}
                        type="button"
                        className={`btn ${isSelected ? "" : "ghost"}`}
                        style={{ textAlign: "left", justifyContent: "flex-start" }}
                        onClick={() => setPickedChoices((prev) => ({ ...prev, [key]: c }))}
                      >
                        {c.text}
                      </button>
                    );
                  })}
                </div>
                {chosen && (
                  <div style={{ marginTop: "0.75rem", padding: "0.75rem", borderRadius: "8px", background: "rgba(139, 108, 255, 0.1)" }}>
                    <b>
                      {chosen.rating === "best" ? "✅ Best move: " : chosen.rating === "okay" ? "⚠️ Okay, but think: " : "🚨 Risky choice: "}
                    </b>
                    <span>{chosen.feedback}</span>
                  </div>
                )}
              </div>
            );
          })}

          {/* Key Takeaways */}
          <div className="card tint-sun" style={{ marginTop: "1rem" }}>
            <h3 className="h2">Remember</h3>
            <ul>
              {activeScenario.remember.map((r, i) => (
                <li key={i}>{r}</li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* TAB 2: LEARN / LAWS / HELPLINES */}
      {tab === "learn" && (
        <div className="stack" style={{ gap: "1.25rem" }}>
          <section className="card">
            <h2 className="h2">{content.learn.heading}</h2>
            <p className="muted">{content.learn.intro}</p>
            <div className="row b" style={{ marginTop: "1rem" }}>
              {content.learn.cards.map((c) => (
                <div key={c.id} className="card">
                  <span className="emo" aria-hidden="true">{c.emoji}</span>
                  <h3 className="h2">{c.title}</h3>
                  <p>{c.text}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="card tint-grape">
            <h2 className="h2">{content.learn.laws.title}</h2>
            <ul className="feed">
              {content.learn.laws.rows.map((r, i) => (
                <li key={i} style={{ marginBottom: "0.75rem" }}>
                  <div>
                    <b>{r.law}: </b>
                    <span>{r.plain}</span>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          <section className="card">
            <h2 className="h2">{content.learn.bonus.title}</h2>
            <div className="row b">
              {content.learn.bonus.items.map((b) => (
                <div key={b.id} className="card">
                  <span className="emo" aria-hidden="true">{b.emoji}</span>
                  <b>{b.title}</b>
                  <p className="small">{b.text}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="card tint-coral">
            <h2 className="h2">Helplines & Official Portals</h2>
            <ul className="feed">
              {content.learn.helplines.map((h, i) => (
                <li key={i}>
                  <span className="emo" aria-hidden="true">📞</span>
                  <div>
                    <b>{h.label}: {h.value}</b> — <span>{h.note}</span>
                  </div>
                </li>
              ))}
            </ul>
            <div className="btnrow" style={{ marginTop: "1rem" }}>
              {content.learn.links.map((l, i) => (
                <a key={i} href={l.href} target="_blank" rel="noreferrer" className="btn ghost sm">
                  🔗 {l.label}
                </a>
              ))}
            </div>
            <p className="muted small" style={{ marginTop: "1rem" }}>{content.learn.disclaimer}</p>
          </section>
        </div>
      )}

      {/* TAB 3: QUIZ */}
      {tab === "quiz" && (
        <section className="card">
          <h2 className="h2">{content.quiz.title}</h2>
          <div className="stack" style={{ gap: "1rem" }}>
            {content.quiz.questions.map((q, idx) => {
              const picked = quizAnswers[q.id];
              const isCorrect = picked === q.correctOptionId;
              return (
                <div key={q.id} className="card">
                  <p><b>Q{idx + 1}. {q.prompt}</b> <span className="chip light">+{q.xp} XP</span></p>
                  <div className="stack" style={{ gap: "0.5rem" }}>
                    {q.options.map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        disabled={quizSubmitted}
                        className={`btn ${picked === opt.id ? "" : "ghost"}`}
                        style={{ textAlign: "left", justifyContent: "flex-start" }}
                        onClick={() => setQuizAnswers((prev) => ({ ...prev, [q.id]: opt.id }))}
                      >
                        {opt.text}
                      </button>
                    ))}
                  </div>
                  {quizSubmitted && (
                    <p style={{ marginTop: "0.75rem" }}>
                      <b>{isCorrect ? `✅ Correct! (+${q.xp} XP)` : "❌ Not quite."}</b> {q.explanation}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
          {!quizSubmitted && (
            <div className="btnrow" style={{ marginTop: "1rem" }}>
              <button
                type="button"
                className="btn"
                disabled={Object.keys(quizAnswers).length < content.quiz.questions.length}
                onClick={handleSubmitQuiz}
              >
                Submit Quiz Answers
              </button>
            </div>
          )}
        </section>
      )}

      {/* TAB 4: ACTION TOOLKIT & CREDENTIAL */}
      {tab === "action" && (
        <div className="stack" style={{ gap: "1.25rem" }}>
          <section className="card tint-mint">
            <h2 className="h2">{content.action.title}</h2>
            <p>{content.action.intro}</p>
            <ul className="feed">
              {content.action.items.map((item, idx) => (
                <li key={idx}>
                  <label style={{ display: "flex", alignItems: "center", gap: "0.6rem", cursor: "pointer" }}>
                    <input
                      type="checkbox"
                      checked={!!checkedActions[idx]}
                      onChange={(e) => setCheckedActions((prev) => ({ ...prev, [idx]: e.target.checked }))}
                    />
                    <span>{item}</span>
                  </label>
                </li>
              ))}
            </ul>
          </section>

          <section className="card tint-sun">
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <span className="emo" style={{ fontSize: "2.2rem" }}>{content.credential.emoji}</span>
              <div>
                <h3 className="h2" style={{ margin: 0 }}>Badge Credential: {content.credential.name}</h3>
                <p style={{ margin: "0.25rem 0 0" }}>{content.credential.text}</p>
              </div>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}

/* ========================================================================== */
/* 3. TEEN MODULES OVERVIEW & ROUTER                                          */
/* ========================================================================== */
export default function TeenModules({
  initialSlug = null,
  onSelectSlug,
  onBackToDashboard,
  onEarnXp,
  notify,
}) {
  const [activeSlug, setActiveSlug] = useState(initialSlug);

  useEffect(() => {
    setActiveSlug(initialSlug);
  }, [initialSlug]);

  const handleOpenModule = (mod) => {
    if (MODULE_CONTENT[mod.slug]) {
      setActiveSlug(mod.slug);
      onSelectSlug?.(mod.slug);
    } else {
      notify?.(`“${mod.name}” content is coming soon! Try Module 1 or Module 2.`);
    }
  };

  const activeContent = activeSlug ? MODULE_CONTENT[activeSlug] : null;

  if (activeContent) {
    return (
      <ModuleReader
        content={activeContent}
        onBack={() => {
          setActiveSlug(null);
          onSelectSlug?.(null);
        }}
        onEarnXp={onEarnXp}
      />
    );
  }

  return (
    <div className="stack" style={{ gap: "1.25rem" }}>
      <header className="teen-head" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h1>Teen Modules (Ages 13–16)</h1>
          <p className="muted">Interactive legal literacy, cyber safety, and real-world rights.</p>
        </div>
        {onBackToDashboard && (
          <button type="button" className="btn ghost sm" onClick={onBackToDashboard}>
            ← Back to Dashboard
          </button>
        )}
      </header>

      <div className="row b">
        {teenModules.map((mod) => {
          const isReady = Boolean(MODULE_CONTENT[mod.slug]);
          return (
            <section key={mod.id} className={`card tint-${mod.tone}`} style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span className="emo" style={{ fontSize: "2rem" }} aria-hidden="true">{mod.icon}</span>
                  <span className="chip light">{isReady ? "Available Now" : "Coming Soon"}</span>
                </div>
                <h2 className="h2" style={{ marginTop: "0.75rem" }}>{mod.name}</h2>
                <p className="muted small" style={{ margin: "0.25rem 0" }}><b>{mod.topic}</b></p>
                <p>{mod.coreTheme}</p>
              </div>
              <div className="btnrow" style={{ marginTop: "1rem" }}>
                <button
                  type="button"
                  className={`btn sm ${isReady ? "" : "ghost"}`}
                  onClick={() => handleOpenModule(mod)}
                >
                  {isReady ? "Start Module" : "Preview Locked"}
                </button>
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}