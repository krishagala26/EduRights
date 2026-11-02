// Kids Knowledge Hub (ages 8-12). A friendly library with four sections:
// Stories, Big Words, Questions and Who can help, plus Ollie's tip of the
// day. All text lives in components/Kidshub/kidsHubContent.js.

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Lightbulb, ChevronDown, Phone } from "lucide-react";
import {
  sections,
  tips,
  stories,
  words,
  questions,
  helpCards,
  safetySteps,
  helpNote,
}
from "../components/Kidshub/Kidshubcontent.js";
import "./Kidsknowledgehub.css";



function Owl({ size = 110 }) {
  const ink = "#24204A";
  return (
    <svg
      viewBox="0 0 120 120"
      width={size}
      height={size}
      role="img"
      aria-label="Ollie the owl, your guide"
      className="kh-owl"
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

// A new tip each day (the same tip all day)
function tipOfTheDay() {
  const now = new Date();
  const dayOfYear = Math.floor((now - new Date(now.getFullYear(), 0, 0)) / 86400000);
  return tips[dayOfYear % tips.length];
}

export default function KidsKnowledgeHub() {
  const navigate = useNavigate();
  const [section, setSection] = useState("stories");
  const [openStory, setOpenStory] = useState(null);
  const [done, setDone] = useState({});

  return (
    <div className="kh">
      <div className="kh-inner">
        <button type="button" className="kh-back" onClick={() => navigate("/dashboard")}>
          <ArrowLeft size={18} /> Back to Dashboard
        </button>

        {/* Hero */}
        <section className="kh-hero">
          <Owl />
          <div>
            <span className="kh-eyebrow">📚 Knowledge Hub</span>
            <h1>Ollie’s Library</h1>
            <p className="kh-bubble">Pick something to explore. Stories, big words and answers are all here!</p>
          </div>
        </section>

        {/* Tip of the day */}
        <aside className="kh-tip" aria-label="Ollie's tip of the day">
          <span className="kh-tip__icon" aria-hidden="true">
            <Lightbulb size={22} />
          </span>
          <div>
            <b>Ollie’s tip of the day</b>
            <p>{tipOfTheDay()}</p>
          </div>
        </aside>

        {/* Section buttons */}
        <div className="kh-tabs" role="group" aria-label="Choose a section">
          {sections.map((s) => (
            <button
              key={s.id}
              type="button"
              className={`kh-tab ${section === s.id ? "is-active" : ""}`}
              aria-pressed={section === s.id}
              onClick={() => setSection(s.id)}
            >
              <span aria-hidden="true">{s.emoji}</span> {s.label}
            </button>
          ))}
        </div>

        {/* ---------- Stories ---------- */}
        {section === "stories" && (
          <section className="kh-panel" aria-label="Stories">
            <ul className="kh-grid kh-grid--stories">
              {stories.map((st) => {
                const open = openStory === st.id;
                return (
                  <li key={st.id} className={`kh-card kh-tone-${st.tone} ${open ? "is-open" : ""}`}>
                    <span className="kh-card__emoji" aria-hidden="true">{st.emoji}</span>
                    <h2>{st.title}</h2>
                    <span className="kh-meta">{st.minutes} min read</span>

                    <button
                      type="button"
                      className="kh-btn"
                      aria-expanded={open}
                      onClick={() => setOpenStory(open ? null : st.id)}
                    >
                      {open ? "Close story" : "Read story"}
                      <ChevronDown size={16} className="kh-chevron" aria-hidden="true" />
                    </button>

                    {open && (
                      <div className="kh-story">
                        {st.body.map((p) => (
                          <p key={p}>{p}</p>
                        ))}
                        <p className="kh-lesson">
                          <span aria-hidden="true">🦉</span> <b>Ollie says:</b> {st.lesson}
                        </p>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </section>
        )}

        {/* ---------- Big Words ---------- */}
        {section === "words" && (
          <section className="kh-panel" aria-label="Big words">
            <ul className="kh-grid kh-grid--words">
              {words.map((w) => (
                <li key={w.id} className="kh-word">
                  <span className="kh-word__emoji" aria-hidden="true">{w.emoji}</span>
                  <h2>{w.word}</h2>
                  <p>{w.meaning}</p>
                  <p className="kh-example">
                    <b>Example:</b> {w.example}
                  </p>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* ---------- Questions ---------- */}
        {section === "questions" && (
          <section className="kh-panel" aria-label="Questions kids ask">
            <div className="kh-faq">
              {questions.map((item) => (
                <details key={item.id} className="kh-q">
                  <summary>{item.q}</summary>
                  <div className="kh-answer">
                    <span className="kh-answer__owl" aria-hidden="true">🦉</span>
                    <p>{item.a}</p>
                  </div>
                </details>
              ))}
            </div>
          </section>
        )}

        {/* ---------- Who can help ---------- */}
        {section === "help" && (
          <section className="kh-panel" aria-label="Who can help">
            <ul className="kh-grid kh-grid--help">
              {helpCards.map((h) => (
                <li key={h.id} className={`kh-card kh-tone-${h.tone}`}>
                  <span className="kh-card__emoji" aria-hidden="true">{h.emoji}</span>
                  <h2>{h.title}</h2>
                  {h.number && (
                    <span className="kh-number">
                      <Phone size={16} aria-hidden="true" /> {h.number}
                    </span>
                  )}
                  <p>{h.text}</p>
                </li>
              ))}
            </ul>

            <div className="kh-steps">
              <h2>My safety steps</h2>
              <p>Tick each one when you know it!</p>
              <ul>
                {safetySteps.map((step) => (
                  <li key={step}>
                    <label>
                      <input
                        type="checkbox"
                        checked={!!done[step]}
                        onChange={() => setDone((d) => ({ ...d, [step]: !d[step] }))}
                      />
                      <span>{step}</span>
                    </label>
                  </li>
                ))}
              </ul>
              <p className="kh-steps__note">{helpNote}</p>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}