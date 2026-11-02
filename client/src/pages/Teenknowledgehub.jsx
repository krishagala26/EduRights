// Teen Knowledge Hub (ages 13-16). Four sections: Law explainers, Case of
// the day, Know your rights and Get help. Law explainers and Know your
// rights can be searched and filtered by topic. All text lives in
// components/Teenhub/teenHubContent.js.

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Search, ExternalLink, RefreshCw, Phone, Check, X } from "lucide-react";
import {
  sections,
  topics,
  explainers,
  cases,
  rights,
  helplines,
  channels,
  portals,
  reportSteps,
  disclaimer,
} from "../components/Teenhub/teenHubContent.js";
import "./TeenKnowledgeHub.css";

// A new case each day (the same case all day)
function caseOfTheDayIndex() {
  const now = new Date();
  const dayOfYear = Math.floor((now - new Date(now.getFullYear(), 0, 0)) / 86400000);
  return dayOfYear % cases.length;
}

export default function TeenKnowledgeHub() {
  const navigate = useNavigate();
  const [section, setSection] = useState("explainers");
  const [topic, setTopic] = useState("All");
  const [query, setQuery] = useState("");
  const [caseIndex, setCaseIndex] = useState(caseOfTheDayIndex);
  const [picked, setPicked] = useState(null); // option id chosen for the current case

  const q = query.trim().toLowerCase();
  const matches = (item, text) =>
    (topic === "All" || item.topic === topic) && (q === "" || text.toLowerCase().includes(q));

  const shownExplainers = explainers.filter((e) =>
    matches(e, [e.title, e.short, e.plain, ...e.points].join(" "))
  );
  const shownRights = rights.filter((r) =>
    matches(r, [r.title, r.when, r.remember, ...r.steps].join(" "))
  );

  const todaysCase = cases[caseIndex];
  const chosen = picked ? todaysCase.options.find((o) => o.id === picked) : null;

  const nextCase = () => {
    setCaseIndex((i) => (i + 1) % cases.length);
    setPicked(null);
  };

  const showFilters = section === "explainers" || section === "rights";

  return (
    <div className="th">
      <div className="th-inner">
        <button type="button" className="th-back" onClick={() => navigate("/dashboard")}>
          <ArrowLeft size={16} /> Back to Dashboard
        </button>

        <header className="th-head">
          <span className="th-eyebrow">Youth Advocate</span>
          <h1>Knowledge Hub</h1>
          <p>
            The laws behind your rights, real situations to think through, and who to contact
            when you need help.
          </p>
        </header>

        {/* Sections */}
        <div className="th-tabs" role="group" aria-label="Choose a section">
          {sections.map((s) => (
            <button
              key={s.id}
              type="button"
              className={`th-tab ${section === s.id ? "is-active" : ""}`}
              aria-pressed={section === s.id}
              onClick={() => setSection(s.id)}
            >
              {s.label}
            </button>
          ))}
        </div>

        {/* Search and topic filters */}
        {showFilters && (
          <div className="th-filters">
            <label className="th-search">
              <Search size={18} aria-hidden="true" />
              <span className="th-sr">Search the hub</span>
              <input
                type="search"
                placeholder="Search laws, rights and steps"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </label>
            <div className="th-chips" role="group" aria-label="Filter by topic">
              {topics.map((t) => (
                <button
                  key={t}
                  type="button"
                  className={`th-chip ${topic === t ? "is-active" : ""}`}
                  aria-pressed={topic === t}
                  onClick={() => setTopic(t)}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ---------- Law explainers ---------- */}
        {section === "explainers" && (
          <section className="th-panel" aria-label="Law explainers">
            <p className="th-count" role="status">
              {shownExplainers.length} {shownExplainers.length === 1 ? "explainer" : "explainers"}
            </p>
            <div className="th-list">
              {shownExplainers.map((e) => (
                <details key={e.id} className="th-item">
                  <summary>
                    <span className="th-item__main">
                      <b>{e.title}</b>
                      <span>{e.short}</span>
                    </span>
                    <span className="th-item__tags">
                      <span className="th-topic" data-topic={e.topic}>{e.topic}</span>
                      <span className="th-year">{e.year}</span>
                    </span>
                  </summary>
                  <div className="th-body">
                    <p>{e.plain}</p>
                    <h3>What it means for you</h3>
                    <ul>
                      {e.points.map((p) => (
                        <li key={p}>
                          <Check size={16} aria-hidden="true" />
                          <span>{p}</span>
                        </li>
                      ))}
                    </ul>
                    <a href={e.link.href} target="_blank" rel="noopener noreferrer" className="th-link">
                      {e.link.label}
                      <ExternalLink size={14} aria-hidden="true" />
                      <span className="th-sr"> (opens in a new tab)</span>
                    </a>
                  </div>
                </details>
              ))}
              {shownExplainers.length === 0 && (
                <p className="th-empty">Nothing matches that search. Try another word or topic.</p>
              )}
            </div>
          </section>
        )}

        {/* ---------- Case of the day ---------- */}
        {section === "case" && (
          <section className="th-panel" aria-label="Case of the day">
            <div className="th-card th-case">
              <div className="th-case__head">
                <span className="th-topic" data-topic={todaysCase.topic}>{todaysCase.topic}</span>
                <span className="th-count">
                  Case {caseIndex + 1} of {cases.length}
                </span>
              </div>
              <h2>{todaysCase.title}</h2>
              <p className="th-case__situation">{todaysCase.situation}</p>
              <p className="th-case__question">{todaysCase.question}</p>

              <div className="th-options">
                {todaysCase.options.map((o, i) => {
                  let state = "";
                  if (picked) {
                    if (o.correct) state = "is-correct";
                    else if (o.id === picked) state = "is-wrong";
                    else state = "is-dim";
                  }
                  return (
                    <button
                      key={o.id}
                      type="button"
                      className={`th-option ${state}`}
                      onClick={() => !picked && setPicked(o.id)}
                      disabled={!!picked}
                    >
                      <span className="th-letter" aria-hidden="true">
                        {String.fromCharCode(65 + i)}
                      </span>
                      <span className="th-option__text">{o.text}</span>
                      {picked && o.correct && <Check size={20} aria-hidden="true" />}
                      {picked && o.id === picked && !o.correct && <X size={20} aria-hidden="true" />}
                    </button>
                  );
                })}
              </div>

              {chosen && (
                <div className={`th-feedback ${chosen.correct ? "is-correct" : "is-wrong"}`} role="status">
                  <b>{chosen.correct ? "Strong choice" : "Not the best move"}</b>
                  <p>{chosen.why}</p>
                  {!chosen.correct && (
                    <p>
                      <b>The better move:</b>{" "}
                      {todaysCase.options.find((o) => o.correct).why}
                    </p>
                  )}
                  <p className="th-takeaway">{todaysCase.takeaway}</p>
                  <ul className="th-related" aria-label="Related">
                    {todaysCase.related.map((r) => (
                      <li key={r}>{r}</li>
                    ))}
                  </ul>
                </div>
              )}

              <button type="button" className="th-btn" onClick={nextCase}>
                <RefreshCw size={16} aria-hidden="true" /> Try another case
              </button>
            </div>
          </section>
        )}

        {/* ---------- Know your rights ---------- */}
        {section === "rights" && (
          <section className="th-panel" aria-label="Know your rights">
            <p className="th-count" role="status">
              {shownRights.length} {shownRights.length === 1 ? "fact sheet" : "fact sheets"}
            </p>
            <div className="th-list">
              {shownRights.map((r) => (
                <details key={r.id} className="th-item">
                  <summary>
                    <span className="th-item__main">
                      <b>
                        <span aria-hidden="true">{r.emoji}</span> {r.title}
                      </b>
                      <span>{r.when}</span>
                    </span>
                    <span className="th-item__tags">
                      <span className="th-topic" data-topic={r.topic}>{r.topic}</span>
                    </span>
                  </summary>
                  <div className="th-body">
                    <ol className="th-steps">
                      {r.steps.map((s) => (
                        <li key={s}>{s}</li>
                      ))}
                    </ol>
                    <p className="th-remember">
                      <b>Remember:</b> {r.remember}
                    </p>
                    <ul className="th-contacts" aria-label="Who to contact">
                      {r.contacts.map((c) => (
                        <li key={c.label}>
                          <Phone size={14} aria-hidden="true" />
                          <span>{c.label}:</span> <b>{c.value}</b>
                        </li>
                      ))}
                    </ul>
                  </div>
                </details>
              ))}
              {shownRights.length === 0 && (
                <p className="th-empty">Nothing matches that search. Try another word or topic.</p>
              )}
            </div>
          </section>
        )}

        {/* ---------- Get help ---------- */}
        {section === "help" && (
          <section className="th-panel" aria-label="Get help">
            <ul className="th-helplines">
              {helplines.map((h) => (
                <li key={h.id}>
                  <b className="th-number">{h.value}</b>
                  <span>
                    <b>{h.label}</b>
                    <span className="th-note">{h.note}</span>
                  </span>
                </li>
              ))}
            </ul>

            <div className="th-card">
              <h2>How to report, step by step</h2>
              <ol className="th-report">
                {reportSteps.map((s) => (
                  <li key={s.id}>
                    <b>{s.title}</b>
                    <span>{s.text}</span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="th-card">
              <h2>Where should I report?</h2>
              <ul className="th-channels">
                {channels.map((c) => (
                  <li key={c.id}>
                    <span>{c.situation}</span>
                    <b>{c.where}</b>
                  </li>
                ))}
              </ul>
            </div>

            <div className="th-card">
              <h2>Official websites</h2>
              <p className="th-note">Best opened together with a trusted adult.</p>
              <ul className="th-portals">
                {portals.map((p) => (
                  <li key={p.href}>
                    <a href={p.href} target="_blank" rel="noopener noreferrer" className="th-link">
                      {p.label}
                      <ExternalLink size={14} aria-hidden="true" />
                      <span className="th-sr"> (opens in a new tab)</span>
                    </a>
                    <span className="th-note">{p.note}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        <p className="th-disclaimer">{disclaimer}</p>
      </div>
    </div>
  );
}